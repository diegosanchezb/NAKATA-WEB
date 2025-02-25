import { useState } from "react";

interface Props {
  images: string[];
}

export const GridImages = ({ images }: Props) => {
  const [activeImage, setActiveImage] = useState([0]);
  const handleImageClick = (image: string) => {
    setActiveImage(image);
  };

  return (
    <div className="flex-1 flex flex-col gap-3 relative">
      <div className="bg-green-400 h-[550px] p-4 rounded-lg border border-pink-300">
        <img
          src={activeImage}
          alt="Imagen de producto"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex mt-4 gap-2">
        {images.map((image, index) => (
          <button
            className={`w-16 h-16 p-1 border ${
              activeImage === image ? "border-pink-300" : "border-transparent"
            } rounded-lg hover:border-black focus:outline-none`}
            key={index}
            onClick={() => handleImageClick(image)}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
