import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log({ email, password });
    const hashedPassword = await hash(password, 10);
    const response = await fetch("http://localhost:3001/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password: hashedPassword,
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
