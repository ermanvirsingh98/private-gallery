"use client";

import { SearchResult } from "@/app/(admin)/admin/gallery/page";
import ImageCard from "./image-card";

export function ImageGrid({ images }: { images: SearchResult[] }) {
  return images.map((image: SearchResult, i: number) => (
    <ImageCard key={i} image={image} />
  ));
}
