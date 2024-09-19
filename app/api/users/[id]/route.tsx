import { NextRequest, NextResponse } from "next/server";

// just like the way we access route params in the components we do the same thing here
// one way
// interface Props {
//   params: {
// id: number;
//   };
// }

// export function GET(request: NextRequest, props: Props) {}
// or destructure it
// export function GET(request: NextRequest, { params }: Props) {}
// or

export function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // todo
  // fetch data from a db
  //if not found, return 404
  // return data

  // let's pretend we got the data form a db
  if (params.id > 10) {
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  }

  return NextResponse.json({ id: 1, name: "Mostafa" });
}

// NOTE: PUT is used to replace an object, PATCH to update one or more properties

// to update a user we should send a request to the route that represents an individual user (api/users/1)
// with the request we attach a user object to the body of the request

// export a function with PUT name that gets "request" and "params" as arguments
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
    const body = await request.json();
  // todo
  // validate the request body
  // if invalid, return a 400

  // fetch the user with the given id
  // if doesn't exist, return 404

  // update the user
  // return the updated user

   if(!body.name) return NextResponse.json({ error: "name is required" }, {status: 400});

   if(params.id > 10) return NextResponse.json({ error: "user not found"}, {status: 404});

   return NextResponse.json({ id: 5, name: body.name    });

}


// to delete a user you should send a request to the endpoint that represents an individual user
// export a function that takes "request" and "params" as arguments

export async function DELETE(request: NextRequest, { params }: { params:{id: number}}){

    // fetch the user from db
    // if not found return 404
    // delete the user
    // return 200
    const body = await request.json();
    if( body.id > 10){
        return NextResponse.json({ error: "user not found"}, {status: 404})
    }
    return NextResponse.json({})
}
