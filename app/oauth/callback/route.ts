import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const token = searchParams.get('token')
  const role = searchParams.get('role') || 'customer'

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  if (!token) {
    return NextResponse.redirect(`${baseUrl}/auth/login`)
  }

  return NextResponse.redirect(`${baseUrl}/${role}/dashboard`)
}
