import { NextResponse } from 'next/server'

export async function GET() {
  /**
   * Google OAuth placeholder
   * This route should NOT auto-login or auto-redirect
   * until real Google OAuth is implemented
   */

  return NextResponse.json(
    {
      success: false,
      message: 'Google OAuth is not enabled yet',
    },
    { status: 501 }
  )
}
