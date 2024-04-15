"use client";
import { HoverEffect } from "@/components/ui/archive/card-hover-effect";
import link from "@/lib/tune-data.json";

export default function Page() {
  return (
    <div className="max-w-5xl relative  mx-auto px-20">
      <HoverEffect items={link} />
    </div>
  );
}
