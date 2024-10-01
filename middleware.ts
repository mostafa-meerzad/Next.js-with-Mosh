import { NextRequest, NextResponse } from "next/server";

// here is a simpler and shorter way of import and exporting of the middleware function
export { default } from "next-auth/middleware";

// instead of these two lines
// import middleware from "next-auth/middleware";
// export default middleware

// when working with next-auth this middleware function is already implemented
// export function middleware(request: NextRequest) {
//   // here you handle the actions that bust be taken before getting to a protected route
//   return NextResponse.redirect(new URL("/new-page", request.url));
// }
// this config object is one of conventions Next.js is looking for
export const config = {
  // mather object is a single string or an array of strings indicating routes
  // you can also include parameters like "id" here
  matcher: ["/users/:id*"],
  // *: zero or more
  // +: zero or one
  // ?: zero or one
};
