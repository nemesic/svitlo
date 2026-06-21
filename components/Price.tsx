"use client";

import { useStore } from "@/app/store-provider";

export default function Price({
  eur,
  className = "",
}: {
  eur: number;
  className?: string;
}) {
  const { price } = useStore();
  return <span className={className}>{price(eur)}</span>;
}
