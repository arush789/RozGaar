import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password, username } = await req.json();
    console.log({ email, password, username });
    const hashedPassword = await hash(password, 10);
    const response = await fetch("http://localhost:3001/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password: hashedPassword,
        username,
      }),
    });
  } catch (e) {
    console.log({ e });
  }
  return NextResponse.json({
    message: "Registration successful",
    status: "success",
  });
}
