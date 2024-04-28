"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { IMAGE_API, IMAGE_SIZES } from "@/lib/igdb-config";

import { useState } from "react";

// Custom hook to handle image loading state and apply fade-in effect
const useImageOnLoad = () => {
  const [isLoaded, setIsLoaded] = useState(false); // State to track if image is loaded

  // Function to set isLoaded to true once the image has loaded
  const handleImageOnLoad = () => {
    setIsLoaded(true);
  };

  // CSS styles to apply fade-in effect based on isLoaded state
  const css = {
    fade: {
      opacity: isLoaded ? 1 : 0, // Apply opacity 1 if loaded, else 0
      transition: "opacity 300ms ease-in 0ms", // Smooth transition for the fade effect
    },
  };

  return { handleImageOnLoad, css }; // Return the handler and styles
};

// Props definition for CustomImage component
interface CustomImageProps {
  name: string; // Name of the image for alt text
  imageId: string; // ID for the image
  altText: string; // additional alt text
  size: keyof typeof IMAGE_SIZES; // size key from IMAGE_SIZES
  cover: { image_id: string }; // cover object containing an image ID
  source: string; // source URL for the image
  classes: string; // additional CSS classes
}

// CustomImage component to display images with optional sources and effects
const CustomImage: React.FC<CustomImageProps> = ({
  name,
  imageId,
  altText,
  size = "c-big", // Default size is "c-big"
  cover,
  source,
  classes = "",
  ...props
}) => {
  const { handleImageOnLoad, css } = useImageOnLoad(); // Use custom hook for loading state

  return (
    <Image
      alt={altText ? `${name} ${altText}` : ""} // Construct alt text using name and altText prop
      src={
        source ?? // Use source prop if provided
        `${IMAGE_API}/${IMAGE_SIZES[size]}/${imageId ?? cover?.image_id}.png` // Construct image URL using API constants and props
      }
      onLoad={handleImageOnLoad} // Handle load event to trigger fade effect
      style={{ ...css.fade }} // Apply fade-in effect styles
      className={twMerge("object-cover rounded-xl", classes)} // Merge default and prop classes
      unoptimized // Disable optimization to handle external or dynamic images
      fill // Fill the container while preserving aspect ratio
      {...props} // Spread any other props to the Image component
    />
  );
};

export default CustomImage;
