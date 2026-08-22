import Link from "next/link";
import type { ReactNode } from "react";

export function PrimaryButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`bg-secondary hover:bg-secondary/90 inline-block rounded-md px-6 py-3 font-bold text-white transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}

export function SecondaryButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`border-primary text-primary hover:bg-primary/10 inline-block rounded-md border-2 px-6 py-3 font-medium transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}
