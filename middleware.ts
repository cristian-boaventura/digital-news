import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authStateListener } from "@/utils/firebase.utils";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/saved") {
    authStateListener((user) => {
      if (user) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(
          new URL("/wd/general", req.nextUrl.origin)
        );
      }
    });
  }
}
