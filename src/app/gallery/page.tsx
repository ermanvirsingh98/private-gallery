import cloudinary from "cloudinary";

import UploadButton from "./upload-button";
import { ImageGrid } from "@/components/ImageGrid";
import Layout from "../layouts/layout";
import { auth } from "@/auth";
import { ROLES } from "@/const";

export type SearchResult = {
  public_id: string;
  tags: string[];
};

export default async function AdminDashboard() {
  const session = await auth();
  const isAdmin = session?.user.role === ROLES.ADMIN;

  const results = (await cloudinary.v2.search
    // .expression(`resource_type:image${search ? ` AND tags=${search}` : ""}`)
    .expression(`resource_type:image`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(30)
    .execute()) as { resources: SearchResult[] };

  return (
    <Layout>
      <div className="text-right px-8 py-4">{isAdmin && <UploadButton />}</div>
      <div className="flex flex-wrap gap-5 justify-center">
        <ImageGrid images={results.resources} />;
      </div>
    </Layout>
  );
}
