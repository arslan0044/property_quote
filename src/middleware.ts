import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
export const admin = {
  matcher: ['/admin/:path*', '/client/:path*'],
}
export const Client = {
  matcher: ['/client/:path*'],
}
const getUserFromToken = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload as {
      id: string;
      username: string;
      email: string;
      isAdmin: boolean;
    };
  } catch (error) {
    return console.log(error);
  }
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isLoginPath = path === "/";
  const isClientPath = Client;
  const isAdminPath = admin;
 

  // Extract token from cookies
  const token = request.cookies.get("token")?.value || "";
  const user = token ? await getUserFromToken(token) : null;
  if (!isLoginPath && !token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (user) {
    if (isLoginPath) {
      return NextResponse.redirect(new URL("/admin", request.nextUrl));
    }
    if (!isAdminPath && user.isAdmin) {
      return NextResponse.redirect(new URL("/admin", request.nextUrl));
    }
    if (!user.isAdmin && !isClientPath) {
      return NextResponse.redirect(new URL("/client", request.nextUrl));
    }
  }

  return NextResponse.next();
}

// Middleware should not run on these paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
