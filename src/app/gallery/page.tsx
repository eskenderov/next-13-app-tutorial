import s from "./page.module.scss";
import { GalleryCard } from "./ui/gallery-card";
import { PhotoType } from "./ui/gallery-card/types";
const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

async function getImages() {
  const res = await fetch(
    "https://api.pexels.com/v1/curated?page=1&per_page=100",
    {
      headers: {
        Authorization: API_KEY!,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch images from Pexels");
  }

  const responseJson = await res.json();
  return responseJson.photos;
}

export default async function GalleryPage() {
  const images = await getImages();
  return (
    <main className="page">
      <div className="container">
        <div className={s.list}>
          {images?.map((image: PhotoType) => (
            <GalleryCard key={image.alt} {...image} />
          ))}
        </div>
      </div>
    </main>
  );
}
