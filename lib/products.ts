export type Category = "Tops" | "Outerwear" | "Knitwear" | "Bottoms";

export interface ColourOption {
  name: string;
  hex: string;
  swatch: string;
  images: string[];
}

export interface Product {
  slug: string;
  name: string;
  brand?: string;
  eur: number;
  category: Category;
  image: string;
  colours: ColourOption[];
  badge?: "New";
}

const shots = (slug: string, colour: string, n: number) => {
  const order = [...Array(n).keys()].slice(1);
  order.push(0);
  return order.map((i) => `/images/products/${slug}/${colour}-${i}.webp`);
};

const colour = (
  slug: string,
  name: string,
  hex: string,
  n: number,
  file: string = name.toLowerCase(),
): ColourOption => ({
  name,
  hex,
  swatch: `/images/products/${slug}/${file}-0.webp`,
  images: shots(slug, file, n),
});

const HOODIE_SLUG = "stwd-studio-hoodie";
const HOODIE_COLOURS: ColourOption[] = [
  colour(HOODIE_SLUG, "Black", "#1a1a1a", 6),
  colour(HOODIE_SLUG, "Blue", "#33506e", 6),
  colour(HOODIE_SLUG, "Brown", "#6f5f4d", 6),
  colour(HOODIE_SLUG, "Pink", "#caa9ab", 2),
];

const JEANS_SLUG = "super-baggy";
const JEANS_COLOURS: ColourOption[] = [
  colour(JEANS_SLUG, "Black", "#1a1a1a", 5),
];

const STRAIGHT_SLUG = "straight-leg-jeans";
const STRAIGHT_IMG = "leg-jeans";
const STRAIGHT_COLOURS: ColourOption[] = [
  colour(STRAIGHT_IMG, "Black", "#2b2b2b", 6),
  colour(STRAIGHT_IMG, "Light grey", "#c4c1b8", 5, "white"),
];

const BAGGY_SLUG = "baggy-jeans";
const BAGGY_COLOURS: ColourOption[] = [
  colour(BAGGY_SLUG, "Dark grey", "#3a3a3c", 6, "black"),
  colour(BAGGY_SLUG, "Blue denim", "#6f93b8", 8, "blue"),
  colour(BAGGY_SLUG, "Light grey", "#c4c1b8", 7, "light-grey"),
  colour(BAGGY_SLUG, "Mottled dark blue", "#26324a", 7, "dark-blue"),
];

const PRINTED_IMG = "bershka-baggy-jeans";
const PRINTED_COLOURS: ColourOption[] = [
  colour(PRINTED_IMG, "Mottled dark grey", "#75726a", 5, "grey"),
];

const SKATER_SLUG = "skater-joggers";
const SKATER_COLOURS: ColourOption[] = [
  colour(SKATER_SLUG, "Black", "#2b2b2b", 7),
  colour(SKATER_SLUG, "Grey", "#b8b8b8", 7),
];

const TEE_IMG = "t-shirt-1";
const TEE_COLOURS: ColourOption[] = [colour(TEE_IMG, "Black", "#1a1a1a", 6)];

const POLO_IMG = "t-shirt-2";
const POLO_COLOURS: ColourOption[] = [colour(POLO_IMG, "Black", "#1a1a1a", 6)];

const GRAPHIC_IMG = "t-shirt-3";
const GRAPHIC_COLOURS: ColourOption[] = [colour(GRAPHIC_IMG, "Black", "#1a1a1a", 6)];

const BOXY_IMG = "t-shirt-4";
const BOXY_COLOURS: ColourOption[] = [
  colour(BOXY_IMG, "Light grey", "#c4c1b8", 6, "light"),
  colour(BOXY_IMG, "Dark grey", "#3a3a3c", 6, "dark"),
];

const BASIC_IMG = "t-shirt-5";
const BASIC_COLOURS: ColourOption[] = [
  colour(BASIC_IMG, "Black", "#1a1a1a", 6),
  colour(BASIC_IMG, "Grey", "#b8b8b8", 6),
  colour(BASIC_IMG, "White", "#f0f0ee", 6),
];

const FAUX_IMG = "jacket-1";
const FAUX_COLOURS: ColourOption[] = [
  colour(FAUX_IMG, "Black", "#1a1a1a", 6),
  colour(FAUX_IMG, "Dark brown", "#3b2d24", 5, "dark-brown"),
];

const BOMBER_IMG = "jacket-2";
const BOMBER_COLOURS: ColourOption[] = [colour(BOMBER_IMG, "Beige", "#cbb89a", 4)];

const CROC_IMG = "jacket-3";
const CROC_COLOURS: ColourOption[] = [colour(CROC_IMG, "Brown", "#5a4636", 6)];

const TRUCKER_IMG = "jacket-4";
const TRUCKER_COLOURS: ColourOption[] = [
  colour(TRUCKER_IMG, "Green", "#2f4034", 5),
  colour(TRUCKER_IMG, "Black", "#1a1a1a", 5),
];

const WASHED_IMG = "jacket-5";
const WASHED_COLOURS: ColourOption[] = [colour(WASHED_IMG, "Beige", "#d0c7b0", 7)];

const make = (
  slug: string,
  name: string,
  brand: string,
  eur: number,
  category: Category,
  badge?: "New",
): Product => ({
  slug,
  name,
  brand,
  eur,
  category,
  badge,
  colours: HOODIE_COLOURS,
  image: HOODIE_COLOURS[0].images[0],
});

export const PRODUCTS: Product[] = [
  {
    slug: JEANS_SLUG,
    name: "Super Baggy Patch Jeans",
    brand: "BERSHKA",
    eur: 49.99,
    category: "Bottoms",
    badge: "New",
    colours: JEANS_COLOURS,
    image: JEANS_COLOURS[0].images[0],
  },
  {
    slug: STRAIGHT_SLUG,
    name: "Straight Leg Jeans",
    brand: "PULL&BEAR",
    eur: 35.99,
    category: "Bottoms",
    colours: STRAIGHT_COLOURS,
    image: STRAIGHT_COLOURS[0].images[0],
  },
  {
    slug: BAGGY_SLUG,
    name: "Super Baggy Jeans",
    brand: "PULL&BEAR",
    eur: 39.99,
    category: "Bottoms",
    badge: "New",
    colours: BAGGY_COLOURS,
    image: BAGGY_COLOURS[0].images[0],
  },
  {
    slug: "printed-baggy-jeans",
    name: "Super Printed Baggy Jeans",
    brand: "BERSHKA",
    eur: 39.99,
    category: "Bottoms",
    badge: "New",
    colours: PRINTED_COLOURS,
    image: PRINTED_COLOURS[0].images[0],
  },
  {
    slug: SKATER_SLUG,
    name: "Skater Joggers",
    brand: "PULL&BEAR",
    eur: 35.99,
    category: "Bottoms",
    colours: SKATER_COLOURS,
    image: SKATER_COLOURS[0].images[0],
  },
  {
    slug: "illustration-print-tee",
    name: "Illustration Print Tee",
    brand: "BERSHKA",
    eur: 15.99,
    category: "Tops",
    colours: TEE_COLOURS,
    image: TEE_COLOURS[0].images[0],
  },
  {
    slug: "retrosport-polo",
    name: "Retrosport Polo Shirt",
    brand: "BERSHKA",
    eur: 25.99,
    category: "Tops",
    badge: "New",
    colours: POLO_COLOURS,
    image: POLO_COLOURS[0].images[0],
  },
  {
    slug: "graphic-tee",
    name: "Graphic Print Tee",
    brand: "PULL&BEAR",
    eur: 19.99,
    category: "Tops",
    colours: GRAPHIC_COLOURS,
    image: GRAPHIC_COLOURS[0].images[0],
  },
  {
    slug: "boxy-print-tee",
    name: "Boxy Print Tee",
    brand: "BERSHKA",
    eur: 17.99,
    category: "Tops",
    colours: BOXY_COLOURS,
    image: BOXY_COLOURS[0].images[0],
  },
  {
    slug: "loose-basic-tee",
    name: "Loose Fit Basic Tee",
    brand: "PULL&BEAR",
    eur: 15.99,
    category: "Tops",
    badge: "New",
    colours: BASIC_COLOURS,
    image: BASIC_COLOURS[0].images[0],
  },
  {
    slug: "faux-leather-jacket",
    name: "Faux Leather Jacket",
    brand: "BERSHKA",
    eur: 59.99,
    category: "Outerwear",
    badge: "New",
    colours: FAUX_COLOURS,
    image: FAUX_COLOURS[0].images[0],
  },
  {
    slug: "bomber-jacket",
    name: "Bomber Jacket",
    brand: "BERSHKA",
    eur: 45.99,
    category: "Outerwear",
    badge: "New",
    colours: BOMBER_COLOURS,
    image: BOMBER_COLOURS[0].images[0],
  },
  {
    slug: "croc-faux-leather-jacket",
    name: "Croc Faux Leather Jacket",
    brand: "BERSHKA",
    eur: 49.99,
    category: "Outerwear",
    badge: "New",
    colours: CROC_COLOURS,
    image: CROC_COLOURS[0].images[0],
  },
  {
    slug: "faux-leather-trucker-jacket",
    name: "Faux Leather Trucker Jacket",
    brand: "BERSHKA",
    eur: 49.99,
    category: "Outerwear",
    badge: "New",
    colours: TRUCKER_COLOURS,
    image: TRUCKER_COLOURS[0].images[0],
  },
  {
    slug: "washed-faux-leather-bomber",
    name: "Washed Faux Leather Bomber",
    brand: "PULL&BEAR",
    eur: 45.99,
    category: "Outerwear",
    badge: "New",
    colours: WASHED_COLOURS,
    image: WASHED_COLOURS[0].images[0],
  },
  make(HOODIE_SLUG, "STWD Studio Hoodie", "PULL&BEAR", 36, "Outerwear"),
];

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
