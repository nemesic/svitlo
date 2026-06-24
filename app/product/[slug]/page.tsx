import { notFound } from "next/navigation";
import { getProduct, PRODUCTS } from "@/lib/products";
import ProductView from "./product-view";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return <ProductView product={product} />;
}
