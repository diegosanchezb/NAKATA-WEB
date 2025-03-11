import { FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ProductFormValues } from "../../../lib/validators";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

interface Props {
  setValue: UseFormSetValue<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
}

interface ImagesPreview {
  file?: File;
  previewUrl: string;
}

export const UploaderImages = ({ setValue, errors, watch }: Props) => {
  const [images, setImages] = useState<ImagesPreview[]>([]);

  const formImages = watch("images");
  useEffect(() => {
    if (formImages && formImages.length > 0 && images.length == 0) {
      const existinImages = formImages.map((url) => ({
        previewUrl: url,
      }));
      setImages(existinImages);
      setValue("images", formImages);
    }
  }, [formImages, images.length, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);

      setValue(
        "images",
        updatedImages.map((img) => img.file || img.previewUrl)
      );
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    setValue(
      "images",
      updatedImages.map((img) => img.file || img.previewUrl)
    );
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sx file:font-semibold file:bg-pink-300 file:text-black hover:file:bg-green-400"
      />
      <div className="grid grid-cols-4 lg:grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div key={index}>
            <div className="border border-pink-300 w-full h-20 rounded-md p-1 relative lg:h-28">
              <img
                src={image.previewUrl}
                alt={`Preview${index}`}
                className="rounded-md w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="flex justify-end absolute -top-3 -right-4 hover:scale-110 transition-all z-10"
              >
                <IoIosClose size={22} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {formImages?.length === 0 && errors.images && (
        <p className="text-red-500 text-xs mt-1">{errors.images.message}</p>
      )}
    </>
  );
};
