"use client";

import { SearchResult } from "@/app/(dashboard)/gallery/page";
import ImageCard from "./ImageCard";

export function ImageGrid({ images }: { images: SearchResult[] }) {
  return images.map((image: SearchResult, i: number) => (
    <ImageCard key={i} imageData={image} />
  ));
}
