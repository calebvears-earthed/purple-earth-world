import Image from "next/image";
import type { Frame } from "@/lib/catalog";

export function CampaignImage({
  frame,
  priority = false,
  sizes,
  className = "",
}: {
  frame: Frame;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  return (
    <Image
      src={frame.src}
      alt={frame.alt}
      fill
      sizes={sizes}
      priority={priority}
      fetchPriority={priority ? "high" : "auto"}
      quality={62}
      className={className}
    />
  );
}
