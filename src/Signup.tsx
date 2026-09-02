import { useState, type FormEvent } from 'react'
import LuminaLogo from './components/LuminaLogo'
import HealthcareTeam from './components/HealthcareTeam'
import PasswordField from './components/PasswordField'
import './Login.css'

type Fields = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

type SignupProps = {
  /** Switch back to the login view. */
  onSwitch?: () => void
}

const EMPTY: Fields = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
}
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Signup({ onSwitch }: SignupProps) {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Partial<Fields>>({})
  const [submitted, setSubmitted] = useState(false)

  function update(key: keyof Fields, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function validate(values: Fields): Partial<Fields> {
    const next: Partial<Fields> = {}
    if (!values.fullName.trim()) next.fullName = 'Please enter your full name.'

    if (!values.email.trim()) next.email = 'Please enter your email.'
    else if (!EMAIL_RE.test(values.email.trim()))
      next.email = 'Please enter a valid email address.'

    if (!values.password) next.password = 'Please enter a password.'
    else if (values.password.length < 8)
      next.password = 'Password must be at least 8 characters.'

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
    // TODO: hook up to auth / registration API
    console.log('Register:', {
      fullName: fields.fullName.trim(),
      email: fields.email.trim(),
    })
    setSubmitted(true)
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

            <h1>Create Your Account</h1>
            <p className="login-subtitle">
              Join Lumina Health Partners to get started
            </p>

            {submitted && (
              <p className="login-success" role="status">
                Account created. Check your email to verify your address.
              </p>
            )}

            <label className="login-field">
              <span>Full Name</span>
              <input
                type="text"
                autoComplete="name"
                placeholder="Jordan Rivera"
                value={fields.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                aria-invalid={Boolean(errors.fullName)}
              />
              {errors.fullName && (
                <em className="login-error">{errors.fullName}</em>
              )}
            </label>

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
              placeholder="At least 8 characters"
              value={fields.password}
              onChange={(value) => update('password', value)}
              error={errors.password}
            />

            <PasswordField
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={fields.confirmPassword}
              onChange={(value) => update('confirmPassword', value)}
              error={errors.confirmPassword}
            />

            <button type="submit" className="login-button">
              CREATE ACCOUNT
            </button>

            <p className="login-switch">
              Already have an account?{' '}
              <button type="button" className="login-link" onClick={onSwitch}>
                Log in
              </button>
            </p>
          </form>
        </section>
      </div>
    </div>
  )
}

export default Signup
