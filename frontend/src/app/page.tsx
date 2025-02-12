import Products from "@/components/products/Products";
import { productsApi } from "@/lib/api/products";

interface PageProps {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: PageProps) {
  const resolvedParams = await Promise.resolve(searchParams);
  const page = resolvedParams?.page ? parseInt(resolvedParams.page, 10) : 1;

  const initialData = await productsApi.getAll(page, 6);

  return (
    <main className="container mx-auto px-4 py-8">
      <Products initialData={initialData} />
    </main>
  );
}
