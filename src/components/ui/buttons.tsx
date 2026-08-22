import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export const primaryButtonClasses =
  "bg-primary hover:bg-primary/90 inline-block rounded-md px-6 py-3 font-bold text-white transition-colors";

export function PrimaryButton({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={cn(primaryButtonClasses, className)}>
      {children}
    </Link>
  );
}

export function SecondaryButton({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "border-primary text-primary hover:bg-primary/10 inline-block rounded-md border-2 px-6 py-3 font-medium transition-colors",
        className,
      )}
    >
      {children}
    </Link>
  );
}
