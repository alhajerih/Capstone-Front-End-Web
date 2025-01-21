import { NextResponse } from "next/server";

const homePage = "/";
const privateRoutes = ["/transactions", "/profile", "/users", "/dashboard"];
const publicRoutes = ["/login", "/register", "/signup"];

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  const isPrivateRoute =
    privateRoutes.includes(path) || path.includes("/dashboard");
  const isHomePage = path === homePage;

  // Get token from cookies
  const token = request.cookies.get("token")?.value;

  // Redirect to login if accessing private route without token
  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to dashboard if logged-in user tries to access public routes
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect to home if URL doesn't match any conditions
  if (!isPublicRoute && !isPrivateRoute && !isHomePage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|img/|favicon.ico|.*\\.png).*)"],
};
