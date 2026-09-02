type LuminaLogoProps = {
  /** Overall width in px. Height scales with the artwork. */
  size?: number
  /** Hide the wordmark and show only the burst mark. */
  markOnly?: boolean
}

/**
 * Recreation of the Lumina Health Partners identity: a warm radial
 * petal-burst mark over the "LUMINA / HEALTH PARTNERS" wordmark and tagline.
 */
function LuminaLogo({ size = 190, markOnly = false }: LuminaLogoProps) {
  const width = size
  const height = markOnly ? size : size * 1.15

  return (
    <svg
      className="lumina-logo"
      width={width}
      height={height}
      viewBox={markOnly ? '0 0 120 120' : '0 0 120 138'}
      role="img"
      aria-label="Lumina Health Partners"
    >
      <defs>
        <linearGradient id="lumina-petal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f6a821" />
          <stop offset="55%" stopColor="#ef6c25" />
          <stop offset="100%" stopColor="#d5382c" />
        </linearGradient>
      </defs>

      {/* Petal burst */}
      <g transform="translate(60 52)">
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={i} transform={`rotate(${i * 45})`}>
            <path
              d="M0 -44 C 11 -30 13 -13 0 2 C -13 -13 -11 -30 0 -44 Z"
              fill="url(#lumina-petal)"
            />
            <circle cx="0" cy="-26" r="3.4" fill="#fff" opacity="0.85" />
          </g>
        ))}
        <circle r="7" fill="#d5382c" />
      </g>

      {!markOnly && (
        <g textAnchor="middle" fontFamily="'Segoe UI', system-ui, sans-serif">
          <text
            x="60"
            y="112"
            fontSize="20"
            fontWeight="700"
            letterSpacing="1.5"
            fill="#c53a2b"
          >
            LUMINA
          </text>
          <text
            x="60"
            y="126"
            fontSize="10.5"
            fontWeight="600"
            letterSpacing="3"
            fill="#3f3a38"
          >
            HEALTH PARTNERS
          </text>
          <text
            x="60"
            y="136"
            fontSize="5.4"
            fontWeight="600"
            letterSpacing="1.1"
            fill="#8a8380"
          >
            INNOVATING HEALTH, PARTNERING LIVES.
          </text>
        </g>
      )}
    </svg>
  )
}

export default LuminaLogo
