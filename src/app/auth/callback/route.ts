import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const next = requestUrl.searchParams.get('next') ?? '/dashboard'

  console.log('Auth callback hit:', { 
    code: code ? 'present' : 'missing', 
    error,
    searchParams: requestUrl.searchParams.toString()
  })

  if (error) {
    console.log('OAuth error occurred:', error)
    return NextResponse.redirect(`${requestUrl.origin}/login?error=${error}`)
  }

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string) {
            cookieStore.delete(name)
          },
        },
      }
    )

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (!exchangeError) {
      return NextResponse.redirect(`${requestUrl.origin}${next}`)
    }

    console.log('Code exchange failed:', exchangeError)
    return NextResponse.redirect(`${requestUrl.origin}/login?error=auth_failed`)
  }

  console.log('No code provided, redirecting to home')
  return NextResponse.redirect(requestUrl.origin)
}