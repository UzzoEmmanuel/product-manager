"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useDeleteProduct } from "@/hooks/useProducts";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDeleteSuccess: () => void;
}

export function ProductCard({
  product,
  onEdit,
  onDeleteSuccess,
}: ProductCardProps) {
  const deleteProduct = useDeleteProduct();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteProduct.mutateAsync(product.id);

      onDeleteSuccess();

      toast({
        title: "Produit supprimé",
        description: `${product.name} a été supprimé avec succès.`,
      });
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le produit.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              quality={80}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-500">
              Pas d&apos;image disponible
            </div>
          )}
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-lg font-bold">{product.price}€</span>
          <span className="text-sm">Stock: {product.stock}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end gap-2">
        <Button variant="outline" onClick={() => onEdit(product)}>
          Modifier
        </Button>
        <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Supprimer</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible. Cela supprimera définitivement le
                produit &quot;{product.name}&quot;.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
