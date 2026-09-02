export type Role = 'patient' | 'doctor'

export type Account = {
  email: string
  password: string
  name?: string
  /** Which dashboard to show after login. Defaults to 'patient' when omitted. */
  role?: Role
}

/**
 * Demo accounts pulled from `VITE_AUTH_USERS` in `.env`.
 *
 * NOTE: this is prototype-only. Vite inlines the value into the client bundle,
 * so these credentials are not secret. Replace with a real auth API for prod.
 */
function loadAccounts(): Account[] {
  const raw = import.meta.env.VITE_AUTH_USERS
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter(
        (a): a is Account =>
          a && typeof a.email === 'string' && typeof a.password === 'string',
      )
      .map((a) => ({ ...a, role: a.role === 'doctor' ? 'doctor' : 'patient' }))
  } catch {
    console.warn('[auth] VITE_AUTH_USERS is not valid JSON — ignoring it.')
    return []
  }
}

export const ACCOUNTS: Account[] = loadAccounts()

/** Returns the matching account, or null if the credentials are wrong. */
export function verifyCredentials(
  email: string,
  password: string,
): Account | null {
  const target = email.trim().toLowerCase()
  return (
    ACCOUNTS.find(
      (a) => a.email.toLowerCase() === target && a.password === password,
    ) ?? null
  )
}
