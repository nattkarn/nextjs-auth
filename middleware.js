import { getToken } from 'next-auth/jwt'
import { sendStatusCode } from 'next/dist/server/api-utils'
import { NextResponse } from 'next/server'


const protectedRoutes = ['/api/profile']



export async function middleware(request) {

  const user = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })
//   console.log('user: ',user)
  // Get the pathname of the request
  const { pathname } = request.nextUrl


  const isProtectedRoute = protectedRoutes.includes(pathname)
  if (isProtectedRoute && !user) {
    return NextResponse.json(
        { message: "Unauthorized" },
        { status: 400 }
      );
  }




  // If the pathname starts with /protected and the user is not an admin, redirect to the home page
  if (
    pathname.startsWith('/protected') &&
    (!user || user.role !== 'member')
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Continue with the request if the user is an admin or the route is not protected
  return NextResponse.next()
}