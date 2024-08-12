import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextRequest,
  NextResponse,
  NextMiddleware,
} from "next/server";

const onlyAdmin = ["admin"];
const authPage = ["auth"];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname.split("/")[1];

    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      // kalau belum login redirect ke login dan callback url
      if (!token && !authPage.includes(pathname)) {
        const url = new URL("/auth/login", req.url);

        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      // kalau sudah login redirect ke home
      if (token) {
        if (authPage.includes(pathname)) {
          return NextResponse.redirect(new URL("/", req.url));
        }

        // kalau role bukan admin
        if (token.role !== "admin" && onlyAdmin.includes(pathname)) {
          return NextResponse.redirect(new URL("/", req.url));
        }
      }
    }

    return middleware(req, next);
  };
}
