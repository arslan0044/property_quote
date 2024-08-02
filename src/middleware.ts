import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
const getUserFromToken = async (token: string)  => {
  try {
    // Decode token and get user information
    return await jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      username: string;
      email: string;
      isAdmin: boolean;
    };
  } catch (error) {
    return console.log(error);
  }
};

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isLoginPath = path === "/login";
  const isClientPath = path === "/client";
  const isAdminPath = path === "/client" || path === "/" || path === "/admin";

  // Extract token from cookies
  const token = request.cookies.get("token")?.value || "";
  const user = token ? getUserFromToken(token) : null;
  if (!isLoginPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  if(user){
    if (isLoginPath) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
      }
   if (!isAdminPath && user.isAdmin) { 
    return NextResponse.redirect(new URL("/", request.nextUrl));
     }
     if (!user.isAdmin && path !== "/client") {
      return NextResponse.redirect(new URL("/client", request.nextUrl));
    }
  }


  return NextResponse.next();
}

// Middleware should not run on these paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
