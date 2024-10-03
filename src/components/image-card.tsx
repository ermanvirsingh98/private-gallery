import { SearchResult } from "@/app/gallery/page";
import { CldImage } from "next-cloudinary";
import React, { useState } from "react";
import { Heart } from "./icons/heart";
import { FullHeart } from "./icons/full-heart";
import { setAsFavoriteAction } from "@/app//gallery/actions";

const ImageCard = ({ imageData }: { imageData: SearchResult }) => {
  const [isFavorited, setIsFavorited] = useState(
    imageData.tags.includes("favorite")
  );

  const handleFavoriteToggle = async () => {
    // Optimistically update the UI
    setIsFavorited((prev) => !prev);

    // Call the server action
    await setAsFavoriteAction(imageData.public_id, !isFavorited);
  };

  return (
    <div className="w-[250px] relative">
      <div className="overflow-hidden rounded-md h-full">
        <CldImage
          className="h-full w-full object-cover transition-all hover:scale-105 aspect-[3/4]"
          src={imageData.public_id}
          width="400"
          height="400"
          alt="an image of something"
        />
      </div>
      {isFavorited ? (
        <FullHeart
          onClick={handleFavoriteToggle}
          className="absolute top-2 right-3 cursor-pointer"
        />
      ) : (
        <Heart
          onClick={handleFavoriteToggle}
          className="absolute top-2 right-3 cursor-pointer"
        />
      )}
    </div>
  );
};

export default ImageCard;
