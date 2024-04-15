"use client";
import { HoverEffect } from "@/components/ui/archive/card-hover-effect";
import { links } from "@/lib/tune-archive";
export default function Page() {
  return (
    <div className="max-w-5xl relative top-12 mx-auto px-20">
      <HoverEffect items={links} />
    </div>
  );
}
