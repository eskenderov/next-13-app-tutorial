import { GuardText } from "@comps/GuardText";
import { getServerSession } from "next-auth";
import React from "react";
import { authConfig } from "../api/auth/[...nextauth]/options";
import { CartCard } from "./ui/Card";

const CartPage = async () => {
  const session = await getServerSession(authConfig);
  if (!session?.user) {
    return <GuardText pageName="cart" />;
  }

  return (
    <main className="page">
      <div className="container">
        <CartCard />
      </div>
    </main>
  );
};

export default CartPage;
