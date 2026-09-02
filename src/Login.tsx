import { useState, type FormEvent } from 'react'
import LuminaLogo from './components/LuminaLogo'
import HealthcareTeam from './components/HealthcareTeam'
import PasswordField from './components/PasswordField'
import { ACCOUNTS, verifyCredentials } from './auth'
import './Login.css'

type Fields = {
  email: string
  password: string
  confirmPassword: string
}

type LoginProps = {
  /** Switch to the sign-up view. */
  onSwitch?: () => void
  /** Called after the form passes validation. */
  onSuccess?: () => void
}

const EMPTY: Fields = { email: '', password: '', confirmPassword: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Login({ onSwitch, onSuccess }: LoginProps) {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Partial<Fields>>({})
  const [formError, setFormError] = useState<string | null>(null)

  function update(key: keyof Fields, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
    setFormError(null)
  }

  function validate(values: Fields): Partial<Fields> {
    const next: Partial<Fields> = {}
    if (!values.email.trim()) next.email = 'Please enter your email.'
    else if (!EMAIL_RE.test(values.email.trim()))
      next.email = 'Please enter a valid email address.'

    if (!values.password) next.password = 'Please enter a password.'

    if (!values.confirmPassword)
      next.confirmPassword = 'Please confirm your password.'
    else if (values.confirmPassword !== values.password)
      next.confirmPassword = 'Passwords do not match.'

    return next
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const found = validate(fields)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    if (ACCOUNTS.length === 0) {
      setFormError(
        'No accounts are configured. Add VITE_AUTH_USERS to my-app/.env and restart the dev server.',
      )
      return
    }

    const account = verifyCredentials(fields.email, fields.password)
    if (!account) {
      setFormError('Incorrect email or password.')
      return
    }

    setFormError(null)
    console.log('Signed in as', account.name ?? account.email)
    onSuccess?.()
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <aside className="login-art">
          <HealthcareTeam />
        </aside>

        <section className="login-form-panel">
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <LuminaLogo size={150} />

            <h1>Welcome Back</h1>
            <p className="login-subtitle">
              Please enter your details to continue
            </p>

            <label className="login-field">
              <span>Email</span>
              <input
                type="email"
                autoComplete="email"
                placeholder="you@lumina.health"
                value={fields.email}
                onChange={(e) => update('email', e.target.value)}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && <em className="login-error">{errors.email}</em>}
            </label>

            <PasswordField
              label="Password"
              placeholder="Your password"
              autoComplete="current-password"
              value={fields.password}
              onChange={(value) => update('password', value)}
              error={errors.password}
            />

            <PasswordField
              label="Confirm Password"
              placeholder="Re-enter your password"
              autoComplete="current-password"
              value={fields.confirmPassword}
              onChange={(value) => update('confirmPassword', value)}
              error={errors.confirmPassword}
            />

            {formError && (
              <p className="login-error login-form-error" role="alert">
                {formError}
              </p>
            )}

            <button type="submit" className="login-button">
              LOGIN
            </button>

            <p className="login-switch">
              Don't have an account?{' '}
              <button type="button" className="login-link" onClick={onSwitch}>
                Sign up
              </button>
            </p>
          </form>
        </section>
      </div>
    </div>
  )
}

export default Login
