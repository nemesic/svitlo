export type Category = "Tops" | "Outerwear" | "Knitwear" | "Bottoms";

export interface Product {
  slug: string;
  name: string;
  eur: number;
  category: Category;
  image: string;
  colours: number;
  badge?: "New";
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface Seed {
  name: string;
  eur: number;
  category: Category;
  colours: number;
  badge?: "New";
}

const SEEDS: Seed[] = [
  { name: "Boxy Heavyweight Tee", eur: 95, category: "Tops", colours: 4, badge: "New" },
  { name: "Garment-Dyed Hoodie", eur: 185, category: "Tops", colours: 3, badge: "New" },
  { name: "Wide Pleated Trouser", eur: 165, category: "Bottoms", colours: 2 },
  { name: "Wool-Blend Overshirt", eur: 245, category: "Outerwear", colours: 2 },
  { name: "Technical Cargo Pant", eur: 175, category: "Bottoms", colours: 3 },
  { name: "Ribbed Merino Crew", eur: 155, category: "Knitwear", colours: 4 },
  { name: "Cropped Bomber Jacket", eur: 295, category: "Outerwear", colours: 2, badge: "New" },
  { name: "Relaxed Oxford Shirt", eur: 135, category: "Tops", colours: 3 },
  { name: "Chunky Cardigan", eur: 215, category: "Knitwear", colours: 2 },
  { name: "Wool Topcoat", eur: 420, category: "Outerwear", colours: 2 },
  { name: "Lambswool Beanie", eur: 65, category: "Knitwear", colours: 3 },
  { name: "Straight-Leg Denim", eur: 145, category: "Bottoms", colours: 2 },
];

export const PRODUCTS: Product[] = SEEDS.map((s) => {
  const slug = slugify(s.name);
  return { ...s, slug, image: `/images/products/${slug}.jpg` };
});

export const CATEGORIES: ("All" | Category)[] = [
  "All",
  "Tops",
  "Outerwear",
  "Knitwear",
  "Bottoms",
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
