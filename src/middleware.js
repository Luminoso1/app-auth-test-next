import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export async function middleware(request) {
    const path = request.nextUrl.pathname;
    console.log(path);
    const isPublic = path === "/sign-in" || path === "/sign-up";
  const token = request.cookies.get("session")?.value;

  const verifitationToken =
    token &&
    (await verifyToken(token).catch((err) => {
      console.log("Verification token Error:", err);
    }));

  if (isPublic && !verifitationToken) {
    return;
  }

  if (request.url.includes("/sign-in") || request.url.includes("/sign-up") && verifitationToken) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (!verifitationToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/home"],
};
