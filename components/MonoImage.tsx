import Image from "next/image";

export default function MonoImage({
  src,
  alt,
  className = "",
  sizes = "(max-width: 760px) 50vw, 25vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover grayscale contrast-[1.03] transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0 ${className}`}
    />
  );
}
