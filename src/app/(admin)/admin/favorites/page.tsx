// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
import cloudinary from "cloudinary";

import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { CldUploadButton } from "next-cloudinary";
import { CldImage } from "next-cloudinary";
import { SearchResult } from "../gallery/page";
import { ImageGrid } from "@/components/image-grid";
import { useEffect } from "react";

export default async function FavoritesPage() {
  const results = (await cloudinary.v2.search
    .expression("resource_type:image AND tags=favorite")
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(30)
    .execute()) as { resources: SearchResult[] };

  return (
    <div className="h-full px-4 py-6 lg:px-8">
      <div className="flex flex-wrap gap-5 pb-4">
        <ImageGrid images={results.resources} />
      </div>
    </div>
  );
}
