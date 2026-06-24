import Image from "next/image";

export default function MonoImage({
  src,
  alt,
  className = "",
  sizes = "(max-width: 760px) 50vw, 25vw",
  priority = false,
  quality,
  zoom = true,
  draggable,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  zoom?: boolean;
  draggable?: boolean;
}) {
  const motionCls = zoom
    ? "transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015]"
    : "";
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={quality}
      draggable={draggable}
      className={`object-cover ${motionCls} ${className}`}
    />
  );
}
