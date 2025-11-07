import { auth } from "@/auth"

export default auth

export const config = {
  matcher: ["/profile-setup/:path*", "/select-role/:path*"],
}