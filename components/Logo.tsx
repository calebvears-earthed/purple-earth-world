import Link from "next/link";

const sources = {
  lockup: "/brand/logo/purple-earth-luminous-globe-transparent.svg",
  "lockup-reverse": "/brand/logo/purple-earth-luminous-globe-reverse.svg",
  wordmark: "/brand/logo/purple-earth-wordmark.svg",
  "wordmark-reverse": "/brand/logo/purple-earth-wordmark-reverse.svg",
  symbol: "/brand/logo/purple-earth-symbol.svg",
} as const;

export function Logo({
  variant = "lockup",
  width = 200,
  linked = false,
  className,
}: {
  variant?: keyof typeof sources;
  width?: number;
  linked?: boolean;
  className?: string;
}) {
  const image = (
    <img
      src={sources[variant]}
      alt={linked ? "" : "Purple Earth"}
      width={width}
      style={{ width, height: "auto" }}
    />
  );
  if (!linked) return <span className={className}>{image}</span>;
  return (
    <Link href="/" className={className || "logo"} aria-label="Purple Earth, home">
      {image}
    </Link>
  );
}
