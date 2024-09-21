// a route handler is a function that handles an http request

import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";
// export a get function for handling get request

// if you add this request argument in the route-handler the Next.js will not cache the results, if you remove it will do so
// export a function with GET name to handle get requests
export async function GET(request: NextRequest) {
  // return NextResponse.json("hello")
  // return NextResponse.json([
  // { id: 1, name: "John" },
  // { id: 2, name: "Sam" },
  // ]);

  // now instead of hard coding the user objects we query the DB to get the users
  const users = await prisma.user.findMany();
  console.log(users);
  return NextResponse.json(users);
}

// to handle post requests export a function with POST to handle post requests

export async function POST(request: NextRequest) {
  const body = await request.json(); // request.json() return a promise!
  //----------------------------
  // in this function we want to return whatever get in the request body
  // return NextResponse.json(body)
  //----------------------------
  // todo
  // validate the data we get
  // if invalid return 400
  // else, create an entry in DB and return the data
  // ------------
  // validation using zod
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  // return NextResponse.json({ id: 11, name: body.name }, {status: 201});// 201 to indicate an object was created

  const user = await prisma.user.findUnique({where:{ email: body.email}});

  if (user) {
    return NextResponse.json({ error: "user already exists" }, { status: 400 });
  }

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
