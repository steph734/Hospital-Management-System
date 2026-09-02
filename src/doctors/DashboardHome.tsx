import { useState } from 'react'
import { Icon, type IconName } from './icons'
import type { Account } from '../auth'

const now = new Date()
const dateLabel = now.toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
})
const greeting =
  now.getHours() < 12
    ? 'Good morning'
    : now.getHours() < 18
      ? 'Good afternoon'
      : 'Good evening'

/** Last name without the "Dr." honorific, for the greeting line. */
function surname(account: Account): string {
  const clean = (account.name ?? account.email).replace(/^dr\.?\s+/i, '').trim()
  const parts = clean.split(/\s+/)
  return parts[parts.length - 1] || clean
}

type Stat = { icon: IconName; tone: string; value: string; label: string }
type QueueStatus = 'completed' | 'ready' | 'waiting'
type QueueRow = {
  time: string
  initials: string
  avatar: string
  name: string
  reason: string
  tag: string
  tagTone: string
  status: QueueStatus
}
type Quick = { icon: IconName; label: string }
type Segment = { label: string; value: number; color: string }
type Agenda = { time: string; title: string; detail: string }
type Result = {
  initials: string
  avatar: string
  patient: string
  test: string
  icon: IconName
  note: string
  flag: 'flagged' | 'normal'
}
type Message = { initials: string; avatar: string; from: string; when: string; text: string; unread: boolean }

const stats: Stat[] = [
  { icon: 'users', tone: 'is-green', value: '8', label: 'Patients today' },
  { icon: 'clock', tone: 'is-amber', value: '2', label: 'Waiting now' },
  { icon: 'flask', tone: 'is-blue', value: '3', label: 'Results ready' },
  { icon: 'chat', tone: 'is-red', value: '5', label: 'Unread messages' },
]

const queue: QueueRow[] = [
  {
    time: '9:00 AM',
    initials: 'MC',
    avatar: 'is-orange',
    name: 'Maria Cruz',
    reason: 'Blood pressure follow-up',
    tag: 'Follow-up',
    tagTone: 'is-info',
    status: 'completed',
  },
  {
    time: '9:30 AM',
    initials: 'JL',
    avatar: 'is-green',
    name: 'Jonathan Lim',
    reason: 'Chest pain evaluation',
    tag: 'Urgent',
    tagTone: 'is-warn',
    status: 'ready',
  },
  {
    time: '10:00 AM',
    initials: 'SR',
    avatar: 'is-blue',
    name: 'Sofia Reyes',
    reason: 'First-time cardiology consult',
    tag: 'New patient',
    tagTone: 'is-info',
    status: 'waiting',
  },
  {
    time: '10:30 AM',
    initials: 'EG',
    avatar: 'is-purple',
    name: 'Edwin Garcia',
    reason: 'Post-op cardiac review',
    tag: 'Follow-up',
    tagTone: 'is-info',
    status: 'waiting',
  },
  {
    time: '11:00 AM',
    initials: 'TN',
    avatar: 'is-amber',
    name: 'Teresa Navarro',
    reason: 'Annual cardiac screening',
    tag: 'New patient',
    tagTone: 'is-info',
    status: 'waiting',
  },
]

const quickActions: Quick[] = [
  { icon: 'pill', label: 'Write prescription' },
  { icon: 'flask', label: 'Order lab test' },
  { icon: 'users', label: 'Search patient' },
  { icon: 'note', label: 'New consultation note' },
]

const visitData = [
  { day: 'Mon', followUp: 9, newPatient: 3 },
  { day: 'Tue', followUp: 7, newPatient: 2 },
  { day: 'Wed', followUp: 11, newPatient: 2 },
  { day: 'Thu', followUp: 8, newPatient: 3 },
  { day: 'Fri', followUp: 5, newPatient: 2 },
  { day: 'Sat', followUp: 2, newPatient: 1 },
  { day: 'Sun', followUp: 0, newPatient: 0 },
]
const visitMax = 14

const caseMix: Segment[] = [
  { label: 'Hypertension', value: 45, color: '#1f7a56' },
  { label: 'Arrhythmia', value: 25, color: '#e0622c' },
  { label: 'Post-op review', value: 15, color: '#2f6f9e' },
  { label: 'Other', value: 15, color: '#c7d6cf' },
]

const agenda: Agenda[] = [
  {
    time: '2:00 PM',
    title: 'Ward rounds — Cardiology unit',
    detail: 'Floor 4, Beds 401–412',
  },
  {
    time: '3:30 PM',
    title: 'Marco Villanueva',
    detail: 'Follow-up · Arrhythmia monitoring',
  },
  {
    time: '4:15 PM',
    title: 'Department meeting',
    detail: 'Cardiology staff · Conference room B',
  },
]

const bpReadings = [
  { date: 'Jul 20', sys: 132 },
  { date: 'Jul 27', sys: 128 },
  { date: 'Aug 3', sys: 130 },
  { date: 'Aug 10', sys: 124 },
  { date: 'Aug 18', sys: 126 },
  { date: 'Aug 29', sys: 118 },
]

const results: Result[] = [
  {
    initials: 'MC',
    avatar: 'is-orange',
    patient: 'Maria Cruz',
    test: 'Lipid panel',
    icon: 'flask',
    note: 'Total cholesterol elevated',
    flag: 'flagged',
  },
  {
    initials: 'JL',
    avatar: 'is-green',
    patient: 'Jonathan Lim',
    test: 'Chest X-ray',
    icon: 'image',
    note: 'No abnormalities found',
    flag: 'normal',
  },
  {
    initials: 'EG',
    avatar: 'is-purple',
    patient: 'Edwin Garcia',
    test: 'CBC',
    icon: 'flask',
    note: 'Within normal range',
    flag: 'normal',
  },
]

const messages: Message[] = [
  {
    initials: 'NA',
    avatar: 'is-blue',
    from: 'Nurse Alonzo',
    when: '10m ago',
    text: "Bed 406 patient's oxygen sat dropped to 91%, please advise",
    unread: true,
  },
  {
    initials: 'MC',
    avatar: 'is-orange',
    from: 'Maria Cruz',
    when: '1h ago',
    text: 'Is it okay to take the medication with food?',
    unread: true,
  },
  {
    initials: 'PL',
    avatar: 'is-gray',
    from: 'Pharmacy — Lumina',
    when: 'Yesterday',
    text: 'Prescription for E. Garcia has been dispensed',
    unread: false,
  },
]

const STATUS_LABEL: Record<QueueStatus, string> = {
  completed: 'Completed',
  ready: 'Ready',
  waiting: 'Waiting',
}

type QueueTab = 'today' | 'tomorrow' | 'week'

/** Build the SVG stroke-dashoffset segments for the case-mix donut. */
function donutSegments(segments: Segment[]) {
  const radius = 42
  const circumference = 2 * Math.PI * radius
  let offset = 0
  return segments.map((s) => {
    const length = (s.value / 100) * circumference
    const seg = { ...s, radius, circumference, length, offset }
    offset += length
    return seg
  })
}

function DashboardHome({ account }: { account: Account }) {
  const [available, setAvailable] = useState(true)
  const [tab, setTab] = useState<QueueTab>('today')
  const [range, setRange] = useState<'week' | 'month'>('week')

  const bpMin = Math.min(...bpReadings.map((r) => r.sys)) - 6
  const bpMax = Math.max(...bpReadings.map((r) => r.sys)) + 6
  const points = bpReadings
    .map((r, i) => {
      const x = (i / (bpReadings.length - 1)) * 100
      const y = 100 - ((r.sys - bpMin) / (bpMax - bpMin)) * 100
      return `${x},${y}`
    })
    .join(' ')

  return (
    <>
      <div className="dr-page-head">
        <div>
          <h1 className="dr-greeting">
            {greeting}, Dr. {surname(account)}
            <span className="dr-role-badge">
              <Icon name="activity" size={13} />
              Internal Medicine – Cardiologist
            </span>
          </h1>
          <p className="dr-greeting-sub">
            You have 8 patients scheduled today, 2 waiting now. {dateLabel}.
          </p>
        </div>

        <button
          type="button"
          className={`dr-availability${available ? ' is-on' : ''}`}
          onClick={() => setAvailable((v) => !v)}
          aria-pressed={available}
        >
          <span className="dr-availability-dot" />
          {available ? 'Available for consults' : 'Unavailable'}
        </button>
      </div>

      <div className="dr-stats">
        {stats.map((s) => (
          <div key={s.label} className="dr-stat">
            <span className={`dr-stat-ico ${s.tone}`}>
              <Icon name={s.icon} size={20} />
            </span>
            <span>
              <span className="dr-stat-value">{s.value}</span>
              <span className="dr-stat-label">{s.label}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="dr-columns">
        <div className="dr-col">
          <section className="dr-card">
            <div className="dr-tabs">
              <button
                type="button"
                className={`dr-tab${tab === 'today' ? ' is-active' : ''}`}
                onClick={() => setTab('today')}
              >
                Today's queue
                <span className="dr-tab-count">8</span>
              </button>
              <button
                type="button"
                className={`dr-tab${tab === 'tomorrow' ? ' is-active' : ''}`}
                onClick={() => setTab('tomorrow')}
              >
                Tomorrow
              </button>
              <button
                type="button"
                className={`dr-tab${tab === 'week' ? ' is-active' : ''}`}
                onClick={() => setTab('week')}
              >
                This week
              </button>
            </div>

            {tab === 'today' ? (
              <div className="dr-queue">
                {queue.map((q) => (
                  <div key={q.name} className="dr-queue-row">
                    <span className="dr-queue-time">{q.time}</span>
                    <span className={`dr-avatar ${q.avatar}`}>{q.initials}</span>
                    <div className="dr-queue-info">
                      <h4>{q.name}</h4>
                      <p>{q.reason}</p>
                      <span className={`dr-pill ${q.tagTone}`}>{q.tag}</span>
                    </div>
                    <div className="dr-queue-actions">
                      <span className={`dr-pill is-${q.status}`}>
                        {STATUS_LABEL[q.status]}
                      </span>
                      {q.status === 'ready' && (
                        <button
                          className="dr-btn dr-btn-primary dr-btn-sm"
                          type="button"
                        >
                          Start visit
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="dr-empty">
                {tab === 'tomorrow'
                  ? 'Tomorrow’s schedule opens once today’s clinic is closed.'
                  : 'Weekly view is coming soon.'}
              </p>
            )}
          </section>

          <div className="dr-quick">
            {quickActions.map((a) => (
              <button key={a.label} className="dr-quick-item" type="button">
                <span className="dr-quick-ico">
                  <Icon name={a.icon} size={20} />
                </span>
                <span>{a.label}</span>
              </button>
            ))}
          </div>

          <section className="dr-card">
            <div className="dr-card-head">
              <h2>Patient visits this week</h2>
              <div className="dr-toggle">
                <button
                  type="button"
                  className={range === 'week' ? 'is-active' : ''}
                  onClick={() => setRange('week')}
                >
                  Week
                </button>
                <button
                  type="button"
                  className={range === 'month' ? 'is-active' : ''}
                  onClick={() => setRange('month')}
                >
                  Month
                </button>
              </div>
            </div>

            <div className="dr-bars">
              {visitData.map((d) => (
                <div key={d.day} className="dr-bar-col">
                  <div className="dr-bar-stack">
                    <span
                      className="dr-bar is-followup"
                      style={{ height: `${(d.followUp / visitMax) * 100}%` }}
                    />
                    <span
                      className="dr-bar is-new"
                      style={{ height: `${(d.newPatient / visitMax) * 100}%` }}
                    />
                  </div>
                  <small>{d.day}</small>
                </div>
              ))}
            </div>

            <div className="dr-legend">
              <span>
                <i className="dr-dot is-followup" />
                Follow-up / consult
              </span>
              <span>
                <i className="dr-dot is-new" />
                New patient
              </span>
            </div>
          </section>
        </div>

        <div className="dr-col">
          <section className="dr-card">
            <div className="dr-card-head">
              <h2>Case mix this month</h2>
            </div>
            <div className="dr-donut-wrap">
              <svg className="dr-donut" viewBox="0 0 100 100">
                <circle
                  className="dr-donut-track"
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  strokeWidth="12"
                />
                {donutSegments(caseMix).map((s) => (
                  <circle
                    key={s.label}
                    cx="50"
                    cy="50"
                    r={s.radius}
                    fill="none"
                    stroke={s.color}
                    strokeWidth="12"
                    strokeDasharray={`${s.length} ${s.circumference - s.length}`}
                    strokeDashoffset={-s.offset}
                    transform="rotate(-90 50 50)"
                  />
                ))}
              </svg>
              <div className="dr-donut-center">
                <strong>142</strong>
                <small>patients</small>
              </div>
            </div>
            <div className="dr-donut-legend">
              {caseMix.map((s) => (
                <div key={s.label}>
                  <span
                    className="dr-donut-dot"
                    style={{ background: s.color }}
                  />
                  <span className="dr-donut-label">{s.label}</span>
                  <span className="dr-donut-value">{s.value}%</span>
                </div>
              ))}
            </div>
          </section>

          <section className="dr-card">
            <div className="dr-card-head">
              <h2>Rest of today</h2>
              <button className="dr-link" type="button">
                Full schedule
              </button>
            </div>
            <div className="dr-agenda">
              {agenda.map((a) => (
                <div key={a.title} className="dr-agenda-row">
                  <span className="dr-agenda-time">{a.time}</span>
                  <div>
                    <h4>{a.title}</h4>
                    <p>{a.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="dr-card">
            <div className="dr-card-head">
              <h2>M. Cruz — blood pressure trend</h2>
            </div>
            <div className="dr-trend-top">
              <span className="dr-trend-lbl">Last 6 readings</span>
              <span className="dr-trend-val">118/76 mmHg</span>
            </div>
            <svg
              className="dr-line"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <polyline points={points} fill="none" strokeWidth="2.5" />
            </svg>
            <div className="dr-line-axis">
              {bpReadings
                .filter((_, i) => i % 2 === 0 || i === bpReadings.length - 1)
                .map((r) => (
                  <span key={r.date}>{r.date}</span>
                ))}
            </div>
          </section>

          <section className="dr-card">
            <div className="dr-card-head">
              <h2>Results to review</h2>
              <button className="dr-link" type="button">
                View all
              </button>
            </div>
            <div className="dr-list">
              {results.map((r) => (
                <div key={r.patient + r.test} className="dr-result">
                  <span className="dr-result-ico">
                    <Icon name={r.icon} size={17} />
                  </span>
                  <div className="dr-result-info">
                    <h4>
                      {r.patient} — {r.test}
                    </h4>
                    <p>{r.note}</p>
                  </div>
                  <span className={`dr-pill is-${r.flag}`}>
                    {r.flag === 'flagged' ? 'Flagged' : 'Normal'}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="dr-card">
            <div className="dr-card-head">
              <h2>Recent messages</h2>
              <button className="dr-link" type="button">
                Open inbox
              </button>
            </div>
            <div className="dr-list">
              {messages.map((m) => (
                <div key={m.from} className="dr-msg">
                  <span className={`dr-avatar ${m.avatar}`}>{m.initials}</span>
                  <div className="dr-msg-info">
                    <div className="dr-msg-top">
                      <h4>
                        {m.unread && <span className="dr-msg-dot" />}
                        {m.from}
                      </h4>
                      <span className="dr-msg-when">{m.when}</span>
                    </div>
                    <p>{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default DashboardHome
