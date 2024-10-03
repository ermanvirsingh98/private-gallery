"use client";

import { ImageGrid } from "@/components/image-grid";
import { SearchResult } from "./page";
// import { SearchResult } from "./page";

// export default function GalleryGrid({ images }: { images: SearchResult[] }) {
export default function GalleryGrid({ images }: { images: SearchResult[] }) {
  return <ImageGrid images={images} />;
}
