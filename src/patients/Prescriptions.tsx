import { useState } from 'react'
import { Icon } from './icons'

type Status = 'Active' | 'Refill soon' | 'Completed'
type Group = 'active' | 'completed'
type Tone = 'green' | 'red' | 'blue' | 'gray'

type Med = {
  id: string
  name: string
  instructions: string
  started: string
  schedule: string
  tone: Tone
  status: Status
  supply?: { remaining: number; total: number }
  prescriber: string
  refillNow: boolean
  group: Group
}

const MEDS: Med[] = [
  {
    id: 'm1',
    name: 'Losartan 50mg',
    instructions: '1 tablet, once daily — for blood pressure',
    started: 'Mar 12, 2026',
    schedule: 'Take in the morning',
    tone: 'green',
    status: 'Active',
    supply: { remaining: 24, total: 30 },
    prescriber: 'Dr. Rafael Domingo',
    refillNow: false,
    group: 'active',
  },
  {
    id: 'm2',
    name: 'Metformin 500mg',
    instructions: '2 tablets daily, with meals — for type 2 diabetes',
    started: 'Jun 14, 2026',
    schedule: 'Morning and evening',
    tone: 'red',
    status: 'Refill soon',
    supply: { remaining: 3, total: 30 },
    prescriber: 'Dr. Rafael Domingo',
    refillNow: true,
    group: 'active',
  },
  {
    id: 'm3',
    name: 'Atorvastatin 20mg',
    instructions: '1 tablet nightly — for cholesterol management',
    started: 'Jan 20, 2026',
    schedule: 'Take before bed',
    tone: 'blue',
    status: 'Active',
    supply: { remaining: 18, total: 30 },
    prescriber: 'Dr. Rafael Domingo',
    refillNow: false,
    group: 'active',
  },
  {
    id: 'm4',
    name: 'Amlodipine 5mg',
    instructions: '1 tablet, once daily — for blood pressure',
    started: 'Apr 2, 2026',
    schedule: 'Take in the morning',
    tone: 'green',
    status: 'Active',
    supply: { remaining: 12, total: 30 },
    prescriber: 'Dr. Rafael Domingo',
    refillNow: false,
    group: 'active',
  },
  {
    id: 'm5',
    name: 'Amoxicillin 250mg',
    instructions: '1 capsule 3x daily — completed course',
    started: 'May 2, 2026',
    schedule: 'Course finished',
    tone: 'gray',
    status: 'Completed',
    prescriber: 'Dr. Elena Vasquez',
    refillNow: false,
    group: 'completed',
  },
  {
    id: 'm6',
    name: 'Prednisone 10mg',
    instructions: 'Tapered dose over 6 days — completed course',
    started: 'Feb 8, 2026',
    schedule: 'Course finished',
    tone: 'gray',
    status: 'Completed',
    prescriber: 'Dr. Jonas Mendez',
    refillNow: false,
    group: 'completed',
  },
]

const REMINDERS: { time: string; name: string; note: string }[] = [
  { time: '8:00 AM', name: 'Losartan 50mg', note: '1 tablet with breakfast' },
  { time: '1:00 PM', name: 'Metformin 500mg', note: '1 tablet with lunch' },
  { time: '9:00 PM', name: 'Atorvastatin 20mg', note: '1 tablet before bed' },
]

const PILL_CLASS: Record<Status, string> = {
  Active: 'is-active',
  'Refill soon': 'is-warn',
  Completed: 'is-done',
}

const TABS: { key: Group | 'all'; label: string }[] = [
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
  { key: 'all', label: 'All' },
]

function Prescriptions() {
  const [tab, setTab] = useState<Group | 'all'>('active')

  const activeCount = MEDS.filter((m) => m.group === 'active').length
  const refillCount = MEDS.filter((m) => m.status === 'Refill soon').length

  const rows = tab === 'all' ? MEDS : MEDS.filter((m) => m.group === tab)

  const stats = [
    { icon: 'heart' as const, tone: 'green', value: activeCount, label: 'Active medications' },
    { icon: 'clock' as const, tone: 'red', value: refillCount, label: 'Refill needed' },
    { icon: 'chart' as const, tone: 'purple', value: 2, label: 'Pending pharmacy' },
    { icon: 'check' as const, tone: 'gray', value: 9, label: 'Completed courses' },
  ]

  return (
    <>
      <div className="pt-page-head">
        <div>
          <h1>Prescriptions</h1>
          <p>Track your medications, refills, and pharmacy details.</p>
        </div>
        <button className="pt-btn pt-btn-primary pt-btn-add" type="button">
          <Icon name="heart" size={16} />
          Request refill
        </button>
      </div>

      <div className="pt-stats">
        {stats.map((s) => (
          <div key={s.label} className="pt-stat">
            <span className={`pt-stat-ico is-${s.tone}`}>
              <Icon name={s.icon} size={18} />
            </span>
            <span>
              <span className="pt-stat-value">{s.value}</span>
              <span className="pt-stat-label">{s.label}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="pt-columns">
        <div className="pt-col">
          <section className="pt-card">
            <div className="pt-tabs">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  className={`pt-tab${tab === t.key ? ' is-active' : ''}`}
                  onClick={() => setTab(t.key)}
                >
                  {t.label}
                  {t.key === 'active' && (
                    <span className="pt-tab-count">{activeCount}</span>
                  )}
                </button>
              ))}
            </div>

            <div className="pt-list">
              {rows.map((m) => {
                const pct = m.supply
                  ? Math.round((m.supply.remaining / m.supply.total) * 100)
                  : 0
                const low = m.supply
                  ? m.supply.remaining / m.supply.total < 0.25
                  : false
                return (
                  <article key={m.id} className="pt-med-row">
                    <div className="pt-med-main">
                      <span className={`pt-med-ico pt-tone-${m.tone}`}>
                        <Icon name="heart" size={18} />
                      </span>
                      <div className="pt-med-body">
                        <div className="pt-med-head">
                          <div>
                            <h4>{m.name}</h4>
                            <p>{m.instructions}</p>
                          </div>
                          <span className={`pt-pill ${PILL_CLASS[m.status]}`}>
                            {m.status}
                          </span>
                        </div>

                        <div className="pt-med-meta">
                          <span>
                            <Icon name="calendar" size={14} />
                            Started {m.started}
                          </span>
                          <span>
                            <Icon name="clock" size={14} />
                            {m.schedule}
                          </span>
                        </div>

                        {m.supply && (
                          <div className="pt-supply">
                            <div className="pt-supply-head">
                              <span className="lbl">Supply remaining</span>
                              <span className="val">
                                {m.supply.remaining} of {m.supply.total} days
                              </span>
                            </div>
                            <div className="pt-bar">
                              <span
                                className={`pt-bar-fill${low ? ' is-low' : ''}`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        )}

                        <div className="pt-med-foot">
                          <span className="pt-med-by">
                            <Icon name="user" size={14} />
                            {m.prescriber}
                          </span>
                          <div className="pt-med-actions">
                            <button
                              className="pt-btn pt-btn-outline pt-btn-sm"
                              type="button"
                            >
                              Details
                            </button>
                            {m.refillNow && (
                              <button
                                className="pt-btn pt-btn-primary pt-btn-sm"
                                type="button"
                              >
                                Refill now
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        </div>

        <div className="pt-col">
          <section className="pt-card">
            <div className="pt-card-head">
              <h2>Preferred pharmacy</h2>
            </div>
            <div>
              <div className="pt-info-row">
                <Icon name="pin" size={16} />
                <div>
                  <div className="lbl">Location</div>
                  <div className="val">Lumina Pharmacy — Davao Branch</div>
                </div>
              </div>
              <div className="pt-info-row">
                <Icon name="phone" size={16} />
                <div>
                  <div className="lbl">Phone</div>
                  <div className="val">+63 82 555 0134</div>
                </div>
              </div>
              <div className="pt-info-row">
                <Icon name="clock" size={16} />
                <div>
                  <div className="lbl">Hours</div>
                  <div className="val">Mon–Sat, 8am – 8pm</div>
                </div>
              </div>
            </div>
          </section>

          <section className="pt-card">
            <div className="pt-card-head">
              <h2>Today's reminders</h2>
            </div>
            <div className="pt-list">
              {REMINDERS.map((r) => (
                <div key={r.time} className="pt-rem">
                  <span className="pt-rem-time">{r.time}</span>
                  <div className="pt-rem-info">
                    <h4>{r.name}</h4>
                    <p>{r.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="pt-notice">
            <Icon name="warning" size={18} />
            <div>
              <h4>Interaction notice</h4>
              <p>
                Metformin and Atorvastatin should be taken at least 2 hours
                apart. Ask your pharmacist if you have questions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Prescriptions
