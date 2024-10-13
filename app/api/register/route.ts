import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  // todo
  // validate the provided data by the user if not valid return 400
  // find the user with provided info if found return 400
  // create a new user with the provided info

  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: body.email } });

  if (user)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(body.password, 10);
  const newUser = await prisma.user.create({
    data: { email: body.email, hashedPassword },
  });

  //   return NextResponse.json(newUser, { status: 201 });// do not return the newUser with hashedPassword included for security reasons

  return NextResponse.json({email: newUser.email}, {status: 201})
}
