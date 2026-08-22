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
      className={`inline-block bg-secondary text-white font-bold py-3 px-6 rounded-md hover:bg-secondary/90 transition-colors ${className}`}
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
      className={`inline-block border-2 border-primary text-primary font-medium py-3 px-6 rounded-md hover:bg-primary/10 transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}
