import { db } from "@/services/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import * as z from "zod";

const userShema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(50, "Username must be no more than 50 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must have than 6 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password, email } = userShema.parse(body);

    // search for email
    const exicitingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (exicitingUserByEmail)
      return NextResponse.json(
        {
          message: "User with this email already exists",
        },
        { status: 409 }
      );

    // search for username
    const exicitingUserByUsername = await db.user.findUnique({
      where: { username: username },
    });
    if (exicitingUserByUsername)
      return NextResponse.json(
        {
          message: "User with this username already exists",
        },
        { status: 409 }
      );

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;
    return NextResponse.json(
      {
        user: { ...rest },
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    const errorMessage = error?.issues[0]?.message || "Something went wrong";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
