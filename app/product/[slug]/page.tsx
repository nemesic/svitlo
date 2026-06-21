import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, PRODUCTS } from "@/lib/products";
import BuyBox from "./buy-box";

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

  return (
    <div>
      <div className="px-[clamp(18px,5vw,40px)] pt-[26px] font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        <Link href="/" className="hover:opacity-60">
          Home
        </Link>
        <span className="px-2 opacity-40">/</span>
        <Link href="/shop" className="hover:opacity-60">
          Shop
        </Link>
        <span className="px-2 opacity-40">/</span>
        <span className="text-ink">{product.name}</span>
      </div>

      <section className="grid grid-cols-1 items-start gap-0 px-[clamp(18px,5vw,40px)] pb-10 pt-6 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-2.5">
          <div className="relative col-span-2 aspect-[4/5] overflow-hidden bg-placeholder">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover grayscale contrast-[1.03]"
            />
          </div>
          {[
            "/images/editorial/pdp-detail-1.jpg",
            "/images/editorial/pdp-detail-2.jpg",
          ].map((src) => (
            <div
              key={src}
              className="relative aspect-square overflow-hidden bg-placeholder"
            >
              <Image
                src={src}
                alt="detail"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover grayscale contrast-[1.03]"
              />
            </div>
          ))}
        </div>

        <BuyBox product={product} />
      </section>
    </div>
  );
}
