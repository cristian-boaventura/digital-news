import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/saved") {
    console.log(req);
    return NextResponse.redirect(new URL("/wd/general", req.nextUrl.origin));
  }
}
