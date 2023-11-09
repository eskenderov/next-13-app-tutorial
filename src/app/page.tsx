import Image from "next/image";
import s from "./page.module.scss";
export default function Home() {
  return (
    <main className="page" style={{ margin: 0 }}>
      <div className={s.hero}>
        <Image
          alt="Toyota gt86"
          src="/images/skaly.jpeg"
          placeholder="blur"
          blurDataURL="/images/skaly.jpeg"
          quality={100}
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="container"></div>
    </main>
  );
}
