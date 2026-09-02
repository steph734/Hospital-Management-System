/**
 * Flat illustration of a small care team (nurse, doctor, physician) in front
 * of a soft blob, echoing the artwork in the login reference.
 */
function HealthcareTeam() {
  return (
    <svg
      className="healthcare-team"
      viewBox="0 0 440 380"
      role="img"
      aria-label="Illustration of a hospital care team"
    >
      {/* backdrop blob */}
      <path
        fill="#bfe1df"
        d="M92 84c46-52 132-70 198-44s96 84 84 148-64 118-140 126S94 300 66 236 46 136 92 84Z"
      />

      {/* floating accents */}
      <g fill="#8ec6c4">
        <circle cx="58" cy="150" r="6" />
        <circle cx="392" cy="96" r="7" />
        <circle cx="360" cy="286" r="5" />
      </g>
      <g stroke="#7bbfbd" strokeWidth="4" strokeLinecap="round">
        <path d="M62 96h18M71 87v18" />
        <path d="M386 210h16M394 202v16" />
      </g>
      <path
        d="M300 60h10v4h-10zM303 57h4v10h-4z"
        fill="#ffffff"
      />

      {/* ---- Nurse (left) ---- */}
      <g>
        <rect x="96" y="250" width="72" height="96" rx="20" fill="#2a9d8f" />
        <path d="M96 262c0-12 12-18 36-18s36 6 36 18v22H96Z" fill="#25867a" />
        <circle cx="132" cy="214" r="30" fill="#f1c9a5" />
        <path
          d="M104 210a28 28 0 0 1 56 0c0-6-4-30-28-30s-28 24-28 30Z"
          fill="#3f3733"
        />
        <rect x="118" y="216" width="28" height="16" rx="6" fill="#ffffff" />
        <path d="M118 220h-6M146 220h6" stroke="#ffffff" strokeWidth="4" />
        <circle cx="124" cy="226" r="2" fill="#c9c9c9" />
        <circle cx="140" cy="226" r="2" fill="#c9c9c9" />
        {/* raised arm / thumbs up */}
        <rect
          x="150"
          y="238"
          width="20"
          height="52"
          rx="10"
          fill="#f1c9a5"
          transform="rotate(28 160 264)"
        />
        <circle cx="180" cy="232" r="12" fill="#f1c9a5" />
      </g>

      {/* ---- Doctor (center) ---- */}
      <g>
        <rect x="188" y="222" width="84" height="124" rx="22" fill="#ffffff" />
        <path d="M188 236c0-12 14-20 42-20s42 8 42 20v20h-84Z" fill="#eef4f4" />
        <circle cx="230" cy="182" r="34" fill="#e7b18c" />
        <path
          d="M198 176a32 30 0 0 1 64 0c2-10-2-34-32-34s-34 24-32 34Z"
          fill="#2b2019"
        />
        {/* stethoscope */}
        <path
          d="M214 232c0 26 16 40 34 40s30-16 30-34"
          fill="none"
          stroke="#0f766e"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="278" cy="236" r="7" fill="#0f766e" />
        {/* arms */}
        <rect x="182" y="240" width="18" height="60" rx="9" fill="#e7b18c" />
        <rect x="262" y="240" width="18" height="60" rx="9" fill="#e7b18c" />
      </g>

      {/* ---- Physician with clipboard (right) ---- */}
      <g>
        <rect x="286" y="250" width="70" height="96" rx="20" fill="#2a9d8f" />
        <path d="M286 262c0-12 11-18 35-18s35 6 35 18v20h-70Z" fill="#25867a" />
        <circle cx="321" cy="216" r="28" fill="#f1c9a5" />
        <path
          d="M296 214c0-20 10-34 25-34s25 14 25 34c6-4 8-40-25-40s-31 36-25 40Z"
          fill="#d98b53"
        />
        {/* clipboard */}
        <rect x="300" y="286" width="40" height="52" rx="5" fill="#f4f1e8" />
        <rect x="314" y="282" width="12" height="8" rx="2" fill="#cbb98f" />
        <path
          d="M308 300h24M308 310h24M308 320h16"
          stroke="#c2bca8"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <rect x="278" y="248" width="18" height="52" rx="9" fill="#f1c9a5" />
      </g>

      {/* ground line */}
      <path
        d="M70 346h300"
        stroke="#8ec6c4"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default HealthcareTeam
