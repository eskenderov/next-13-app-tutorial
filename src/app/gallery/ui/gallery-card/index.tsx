import Image from "next/image";
import { PhotoType } from "./types";
import { shimmer, toBase64 } from "@/services/utils";

export const GalleryCard = ({ src, alt }: PhotoType) => {
  return (
    <div className="card">
      <Image
        src={src?.medium}
        alt={alt}
        width={280}
        height={280}
        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
    </div>
  );
};
