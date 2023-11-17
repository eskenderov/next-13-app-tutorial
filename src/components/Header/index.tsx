import Image from "next/image";
import s from "./style.module.scss";
import Logo from "@/assets/images/logo.svg";
import Link from "next/link";
import { HeaderNavigation } from "./ui/Navigation";
import { HeaderAction } from "./ui/Action";
import { HeaderAccount } from "./ui/Account";
import { HeaderCart } from "./ui/Cart";

export async function Header() {
  return (
    <header className={s.header}>
      <div className="container">
        <div className={s.wrapper}>
          <Link href="/" className={s.logo}>
            <Image src={Logo} alt="logo" width={70} height={70} />
          </Link>
          <HeaderNavigation />
          <HeaderAction>
            <HeaderCart />
            <HeaderAccount />
          </HeaderAction>
        </div>
      </div>
    </header>
  );
}
