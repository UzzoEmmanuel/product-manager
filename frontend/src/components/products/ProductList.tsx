"use client";

import { useSearchParams } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { Product, ProductsResponse } from "@/types/product";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ProductListProps {
  limit?: number;
  onEdit: (product: Product) => void;
  initialData: ProductsResponse;
  onDeleteSuccess: () => void;
}
export default function ProductList({
  limit = 6,
  onEdit,
  initialData,
  onDeleteSuccess,
}: ProductListProps) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, error } = useProducts(page, limit, initialData);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur lors du chargement des produits</div>;
  }

  if (!data?.data || !data.data.items) {
    return <div>Aucun produit disponible</div>;
  }

  const { items, meta } = data.data;

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {items.length === 0 ? (
          <div>Aucun produit trouvé</div>
        ) : (
          items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDeleteSuccess={onDeleteSuccess}
            />
          ))
        )}
      </div>

      {meta.totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious href={`?page=${page - 1}`} />
              </PaginationItem>
            )}

            {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href={`?page=${pageNumber}`}
                    isActive={pageNumber === page}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            {page < meta.totalPages && (
              <PaginationItem>
                <PaginationNext href={`?page=${page + 1}`} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
