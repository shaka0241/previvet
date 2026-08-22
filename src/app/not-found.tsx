import Link from "next/link";
import { errorPages } from "@/content/data";

export default function NotFound() {
  return (
    <main className="from-secondary flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b to-[#2a4a7f] px-4 text-center text-white">
      <p className="font-heading text-7xl font-bold opacity-40">404</p>
      <h1 className="font-heading text-3xl font-bold md:text-4xl">
        {errorPages.notFoundTitle}
      </h1>
      <p className="max-w-md text-gray-100">{errorPages.notFoundMessage}</p>
      <Link
        href="/"
        className="bg-primary hover:bg-primary/90 mt-2 inline-block rounded-md px-6 py-3 font-bold transition-colors"
      >
        {errorPages.backHomeLabel}
      </Link>
    </main>
  );
}
