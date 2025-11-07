export { auth as middleware } from "@/auth"

export const config = {
  matcher: ["/profile-setup/:path*", "/select-role/:path*"],
  runtime:'nodejs'
};