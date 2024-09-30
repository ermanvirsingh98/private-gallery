// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
import cloudinary from "cloudinary";

import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { CldUploadButton } from "next-cloudinary";
import { CldImage } from "next-cloudinary";
import GalleryGrid from "./image-grid";
import UploadButton from "./upload-button";

export type SearchResult = {
  public_id: string;
  // tags: string[];
};

export default async function AdminDashboard() {
  const results = (await cloudinary.v2.search
    // .expression(`resource_type:image${search ? ` AND tags=${search}` : ""}`)
    .expression(`resource_type:image`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(30)
    .execute()) as { resources: SearchResult[] };

  console.log(results);

  return (
    <div className="h-full px-4 py-6 lg:px-8">
      <div className="text-right py-3">
        <UploadButton />
      </div>
      <div className="flex flex-wrap gap-5 pb-4">
        <GalleryGrid images={results.resources} />
      </div>
    </div>
  );
}
