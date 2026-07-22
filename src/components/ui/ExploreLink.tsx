import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExploreLinkProps {
  href: string;
  label: string;
  className?: string;
}

export function ExploreLink({ href, label, className }: ExploreLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-navy",
        className
      )}
    >
      {label}
      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
