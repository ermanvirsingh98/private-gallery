import { auth } from "@/auth"; // Assuming you have an auth middleware function
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Check if the user is authenticated
  const isAuthenticated = req.auth !== null; // Adjust this based on how you determine authentication status

  // Define routes
  const isLoginPage = pathname.startsWith('/login');
  const isPublicPage = pathname === '/' || pathname.startsWith('/gallery'); // Modify this based on your public pages
  const isAdminRoute = pathname.startsWith('/admin');

  // Redirect authenticated users from the login page to the dashboard
  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url)); // Change '/dashboard' to your actual dashboard route
  }

  // If it's an admin route and the user is not authenticated, redirect to login
  if (isAdminRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Allow access to public pages
  if (isPublicPage) {
    return NextResponse.next();
  }

  // If authenticated or not accessing a protected route, proceed
  return NextResponse.next();
});

export const config = {
  // Apply this middleware to the necessary routes
  matcher: ['/admin/:path*', '/login', '/'], // Include login and other public paths if needed
};
