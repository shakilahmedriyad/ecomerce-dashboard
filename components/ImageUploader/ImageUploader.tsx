import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImageIcon, ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploaderProps {
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const onUpload = (value: any) => {
    onChange(value.info.secure_url);
  };
  return (
    <div>
      <div className="flex mb-4 items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <Button
              size={"icon"}
              className="absolute top-2 right-2 z-10"
              variant={"destructive"}
              onClick={() => onRemove(url)}
            >
              <Trash className="h-4 w-4" />
            </Button>
            <Image className="object-cover" fill alt="image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="xrujkpiy">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              variant={"secondary"}
              onClick={onClick}
            >
              <ImagePlus className="w-4 h-4 mr-2" />
              upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUploader;
