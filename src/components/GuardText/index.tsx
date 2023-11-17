import Link from "next/link";
import s from "./style.module.scss";
export const GuardText = ({ pageName }: { pageName: string }) => {
  return (
    <div className={s.main}>
      Please <Link href="/auth/sign-in">login</Link> to see your {pageName}{" "}
      page.
    </div>
  );
};
