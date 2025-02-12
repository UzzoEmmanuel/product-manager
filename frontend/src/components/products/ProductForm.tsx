"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().optional(),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(0.01, "Le prix doit être supérieur à 0")
  ),

  stock: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Le stock doit être positif")
  ),
  image: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
}

export function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
    },
    mode: "onChange",
    criteriaMode: "all",
  });

  const handleSubmit = async (values: FormValues) => {
    const formData = new FormData();
    const isDirty = form.formState.dirtyFields;

    if (isDirty.name) {
      formData.append("name", values.name);
    }
    if (isDirty.description) {
      formData.append("description", values.description || "");
    }
    if (isDirty.price) {
      formData.append("price", values.price.toString());
    }
    if (isDirty.stock) {
      formData.append("stock", values.stock.toString());
    }
    if (values.image?.[0]) {
      formData.append("image", values.image[0]);
    }

    await onSubmit(formData);
  };

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description || "",
        price: product.price,
        stock: product.stock,
      });
    }
  }, [product, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description du produit" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prix</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" min="0" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onChange(e.target.files)}
                  {...field}
                  value={undefined}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">{product ? "Mettre à jour" : "Créer"}</Button>
        </div>
      </form>
    </Form>
  );
}
