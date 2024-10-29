import { auth } from "@/auth"; // Assuming you have an auth middleware function
import { NextResponse } from "next/server";

// Route configuration object
const routeConfig = {
  '/login': {
    requiresAuth: false, // No authentication required
    redirectIfAuthenticated: '/gallery', // Redirect authenticated users to gallery
  },
  '/gallery': {
    requiresAuth: true, // Requires authentication
    allowedRoles: ['USER', 'ADMIN'], // Both users and admins can access
    redirectUnauthenticated: '/login', // Redirect unauthenticated users to login
  },
  '/admin': {
    requiresAuth: true, // Requires authentication
    allowedRoles: ['ADMIN'], // Only admins can access
    redirectUnauthorized: '/', // Redirect non-admin users to homepage
    redirectUnauthenticated: '/login', // Redirect unauthenticated users to login
  }
};

// Helper function to check access control based on route configuration
function checkAccess(req, config) {
  const { pathname } = req.nextUrl;
  const isAuthenticated = req.auth !== null;
  const userRole = req.auth?.user?.role;

  // Redirect authenticated users away from /login
  if (config.redirectIfAuthenticated && isAuthenticated) {
    return NextResponse.redirect(new URL(config.redirectIfAuthenticated, req.url));
  }

  // Redirect unauthenticated users from protected routes
  if (config.requiresAuth && !isAuthenticated) {

    return NextResponse.redirect(new URL(config.redirectUnauthenticated, req.url));
  }

  // Redirect unauthorized users based on role
  if (config.allowedRoles && !config.allowedRoles.includes(userRole)) {
    console.log("v",config.allowedRoles, userRole)

    return NextResponse.redirect(new URL(config.redirectUnauthorized, req.url));
  }

  // Proceed to the requested page if all checks pass
  return NextResponse.next();
}

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Find the corresponding route configuration
  for (const [routePattern, config] of Object.entries(routeConfig)) {
    if (pathname.startsWith(routePattern)) {
      return checkAccess(req, config);
    }
  }

  // Allow access if no matching route is found in the config
  return NextResponse.next();
});

export const config = {
  // Apply this middleware to the necessary routes
  matcher: ['/admin/:path*', '/gallery/:path*', '/login'], // Adjust the paths based on your routes
};
