import { auth } from "@/auth"; // Assuming you have an auth middleware function
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Check if the user is authenticated
  const isAuthenticated = req.auth !== null; // Adjust based on your authentication logic
  const userRole = req.auth?.user?.role; // Assuming req.auth contains user role

  // Define routes
  const isLoginPage = pathname.startsWith('/login');
  const isAdminRoute = pathname.startsWith('/admin');
  const isGalleryRoute = pathname.startsWith('/gallery');

  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/gallery', req.url)); 
  }

  // If it's an admin route
  if (isAdminRoute) {
    // Allow ADMIN users access to all admin routes
    if (isAuthenticated && userRole === 'ADMIN') {
      return NextResponse.next(); // Allow access for admin users
    }
    // If not authenticated or not an admin, redirect to login
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If it's a gallery route and the user is not authenticated, redirect to login
  if (isGalleryRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If authenticated or not accessing a protected route, proceed
  return NextResponse.next();
});

export const config = {
  // Apply this middleware to the necessary routes
  matcher: ['/admin/:path*', '/login', '/', '/gallery'], // Include login and other public paths if needed
};
