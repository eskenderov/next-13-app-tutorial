import Link from "next/link";
import s from "./style.module.scss";
export const GuardText = () => {
  return (
    <div className={s.main}>
      Please <Link href="/auth/sign-in">login</Link> to see your profile page.
    </div>
  );
};
