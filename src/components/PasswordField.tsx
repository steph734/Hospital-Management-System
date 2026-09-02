import { useState } from 'react'

type PasswordFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  autoComplete?: string
  error?: string
}

function PasswordField({
  label,
  value,
  onChange,
  placeholder,
  autoComplete = 'new-password',
  error,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)

  return (
    <label className="login-field">
      <span>{label}</span>
      <div className="password-wrap">
        <input
          type={visible ? 'text' : 'password'}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
        />
        <button
          type="button"
          className="password-toggle"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      {error && <em className="login-error">{error}</em>}
    </label>
  )
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z"
      />
      <circle
        cx="12"
        cy="12"
        r="3.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3l18 18M10.6 6.2A9.8 9.8 0 0 1 12 6c7 0 10.5 6 10.5 6a17 17 0 0 1-3.5 4.2M6.3 7.8A17 17 0 0 0 1.5 12S5 18 12 18a9.9 9.9 0 0 0 4-.8M9.9 9.9a3 3 0 0 0 4.2 4.2"
      />
    </svg>
  )
}

export default PasswordField
