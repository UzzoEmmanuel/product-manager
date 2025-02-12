"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ProductDialog } from "./ProductDialog";
import { Button } from "@/components/ui/button";
import { Product, ProductsResponse } from "@/types/product";
import { useState } from "react";
import ProductList from "./ProductList";

interface ProductsProps {
  initialData: ProductsResponse;
}

export default function Products({ initialData }: ProductsProps) {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleCreate = () => {
    setSelectedProduct(undefined);
    setOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      setSelectedProduct(undefined);
    }
  };

  const handleDeleteSuccess = () => {
    if (initialData.data.items.length === 1 && currentPage > 1) {
      router.push(`?page=${currentPage - 1}`);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Produits</h1>
        <Button onClick={handleCreate}>Ajouter un produit</Button>
      </div>

      <ProductList
        initialData={initialData}
        onEdit={handleEdit}
        onDeleteSuccess={handleDeleteSuccess}
      />

      <ProductDialog
        open={open}
        onOpenChange={handleOpenChange}
        product={selectedProduct}
      />
    </>
  );
}
