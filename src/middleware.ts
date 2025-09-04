import {NextRequest, NextResponse} from "next/server";

const PUBLIC_PATHS = ["/login"];

export function middleware(request: NextRequest) {
 const {pathname} = request.nextUrl;
 const user = request.cookies.get("user");

 const isLoggedIn = Boolean(user);
 const isPublicPath = PUBLIC_PATHS.includes(pathname);

 if (isLoggedIn) {
  if (!pathname.startsWith("/dashboard")) {
   return NextResponse.redirect(new URL("/dashboard", request.url));
  }
 } else {
  if (!isPublicPath) {
   return NextResponse.redirect(new URL("/login", request.url));
  }
 }

 return NextResponse.next();
}

export const config = {
 matcher: ["/((?!_next|_vercel|api|favicon.ico|assets|.*\\..*).*)"],
};
