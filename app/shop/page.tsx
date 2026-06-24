import ShopView from "./shop-view";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  return <ShopView initialCategory={category} />;
}
