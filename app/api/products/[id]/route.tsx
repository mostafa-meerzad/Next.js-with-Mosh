import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

export function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // validate the request, if invalid return 400
  // find the product in db, if not found return 404
  // return product

  if (params.id > 10) {
    return NextResponse.json({ error: "product not found" }, { status: 404 });
  }
  return NextResponse.json({ name: "testProduct", price: 99, id: 7 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // todo
  // validate the request, if not valid return 400
  // find product and update in db, if not found return 404
  // return updated product object

  const body = await request.json();
//   const validation = schema.safeParse(body);
  const validation = schema.safeParse(body);

  if (params.id > 10) {
    return NextResponse.json({ error: "product not found" }, { status: 404 });
  }

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  return NextResponse.json(
    { id: 6, name: body.name, price: body.price },
    { status: 201 }
  );
}

export function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // todo
  // if invalid id return 404
  // delete product and return

  if (params.id > 10) {
    return NextResponse.json({ error: "product not found" }, { status: 404 });
  }
  return NextResponse.json({}, { status: 201 });
}
