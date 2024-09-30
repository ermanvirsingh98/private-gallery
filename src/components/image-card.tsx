import { SearchResult } from "@/app/(admin)/admin/gallery/page";
import { CldImage } from "next-cloudinary";
import React from "react";

const ImageCard = ({ image }: { image: SearchResult }) => {
  console.log("ImageGrid", image);

  return (
    <div className="w-[250px]">
      <div className="overflow-hidden rounded-md h-full">
        <CldImage
          className="h-full w-full object-cover transition-all hover:scale-105 aspect-[3/4]"
          src={image.public_id}
          width="400"
          height="400"
          alt="an image of something"
        />
      </div>
    </div>
  );
};

export default ImageCard;
