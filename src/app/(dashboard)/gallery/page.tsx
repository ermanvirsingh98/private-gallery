import cloudinary from "cloudinary";

import UploadButton from "./upload-button";
import { ImageGrid } from "@/components/ImageGrid";
// import Layout from "../layouts/layout";
import { auth } from "@/auth";
import { ROLES } from "@/const";
import { AnyARecord } from "dns";

export type SearchResult = {
  public_id: string;
  tags: string[];
};

export default async function Gallery({ searchParams }: any) {
  const session = await auth();
  const isAdmin = session?.user.role === ROLES.ADMIN;

  const results = (await cloudinary.v2.search
    // .expression(`resource_type:image${search ? ` AND tags=${search}` : ""}`)
    .expression(`resource_type:image`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(10)
    // .next_cursor(
    //   "bc824e41e1dc28d93ee4703abbebda5c3fdf721ae4e41b41163ab641dc974f184c0f10ce5f8eb03f082c3a41a6e80484"
    // )
    .execute()) as { resources: SearchResult[]; next_cursor: string };

  console.log("results", results);

  return (
    <>
      <div className="text-right px-8 py-4">{isAdmin && <UploadButton />}</div>
      <div className="h-[400px] rounded-md bg-accent mx-8 mb-4"></div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-5 px-8">
        <ImageGrid images={results.resources} />
      </div>
    </>
  );
}
