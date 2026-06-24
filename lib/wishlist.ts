export function toggleWish(slugs: string[], slug: string): string[] {
  return slugs.includes(slug)
    ? slugs.filter((s) => s !== slug)
    : [slug, ...slugs];
}

export function isWished(slugs: string[], slug: string): boolean {
  return slugs.includes(slug);
}

export function wishCount(slugs: string[]): number {
  return slugs.length;
}
