import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ImageZoom from "./ImageZoom";

const images = [
  "/images/imagematch1.jpg",
  "/images/imagematch2.jpg",
  "/images/imagematch3.jpg",
  "/images/imagematch4.jpg",
];

export function ImageCarousel() {

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };


  return (
    <div className="w-full flex justify-center">
      {/* Increase carousel max width so images appear larger before clicking */}
      <div className="relative max-w-4xl w-full">
        <ImageZoom
          src={images[currentIndex]}
          alt="carousel"
          // Show the whole image inside the carousel (no crop) and make it slightly smaller to avoid visible pixelation
          className="w-full h-auto sm:max-h-[24vh] md:max-h-[30vh] lg:max-h-[36vh] object-contain rounded-lg shadow-md"
          onPrev={prevImage}
          onNext={nextImage}
        />
        <button
          onClick={prevImage}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          <ChevronRight size={16} />
        </button>
        </div>
    </div>
  );    
}


export default ImageCarousel;
