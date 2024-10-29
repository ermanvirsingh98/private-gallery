"use client";

import { CldUploadButton } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ImagePlus } from "lucide-react";

export type UploadResult = {
  info: {
    public_id: string;
  };
  event: "success";
};

export default function UploadButton() {
  const router = useRouter();

  return (
    <Button asChild>
      <CldUploadButton
        onSuccess={(result: any) => {
          setTimeout(() => {
            router.refresh();
          }, 2000);
        }}
        uploadPreset="jxuwkkev"
      >
        <div className="flex gap-2">
          <ImagePlus size="16px" />
          Upload
        </div>
      </CldUploadButton>
    </Button>
  );
}
