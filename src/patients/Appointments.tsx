import { useMemo, useState } from 'react'
import { Icon } from './icons'

type Status = 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled'
type Group = 'upcoming' | 'past' | 'cancelled'
type Tone = 'green' | 'orange' | 'blue' | 'gray'

type Appt = {
  id: string
  date: Date
  initials: string
  tone: Tone
  title: string
  subtitle: string
  time: string
  mode: 'Video visit' | 'In-person'
  status: Status
  group: Group
}

const APPTS: Appt[] = [
  {
    id: 'a1',
    date: new Date(2026, 8, 4),
    initials: 'RD',
    tone: 'green',
    title: 'Dr. Rafael Domingo',
    subtitle: 'Cardiology · Lumina Medical Center',
    time: '10:30 AM',
    mode: 'Video visit',
    status: 'Confirmed',
    group: 'upcoming',
  },
  {
    id: 'a2',
    date: new Date(2026, 8, 12),
    initials: 'EV',
    tone: 'orange',
    title: 'Dr. Elena Vasquez',
    subtitle: 'Dermatology · Lumina Medical Center',
    time: '2:00 PM',
    mode: 'In-person',
    status: 'Pending',
    group: 'upcoming',
  },
  {
    id: 'a3',
    date: new Date(2026, 9, 1),
    initials: 'RD',
    tone: 'green',
    title: 'Annual physical exam',
    subtitle: 'Dr. Rafael Domingo · General checkup',
    time: '9:00 AM',
    mode: 'In-person',
    status: 'Confirmed',
    group: 'upcoming',
  },
  {
    id: 'p1',
    date: new Date(2026, 7, 18),
    initials: 'JM',
    tone: 'gray',
    title: 'Dr. Jonas Mendez',
    subtitle: 'General practice · Follow-up',
    time: '11:15 AM',
    mode: 'In-person',
    status: 'Completed',
    group: 'past',
  },
  {
    id: 'p2',
    date: new Date(2026, 6, 22),
    initials: 'EV',
    tone: 'orange',
    title: 'Dr. Elena Vasquez',
    subtitle: 'Dermatology · Skin screening',
    time: '3:30 PM',
    mode: 'In-person',
    status: 'Completed',
    group: 'past',
  },
  {
    id: 'p3',
    date: new Date(2026, 5, 30),
    initials: 'RD',
    tone: 'green',
    title: 'Dr. Rafael Domingo',
    subtitle: 'Cardiology · Stress test',
    time: '8:45 AM',
    mode: 'In-person',
    status: 'Completed',
    group: 'past',
  },
  {
    id: 'c1',
    date: new Date(2026, 7, 5),
    initials: 'NT',
    tone: 'blue',
    title: 'Dr. Noel Tan',
    subtitle: 'Endocrinology · Consultation',
    time: '1:00 PM',
    mode: 'Video visit',
    status: 'Cancelled',
    group: 'cancelled',
  },
]

const BOOK_DOCTORS: {
  initials: string
  tone: Tone
  name: string
  field: string
  when: string
}[] = [
  { initials: 'RD', tone: 'green', name: 'Dr. Rafael Domingo', field: 'Cardiology', when: 'Today' },
  { initials: 'EV', tone: 'orange', name: 'Dr. Elena Vasquez', field: 'Dermatology', when: 'Tomorrow' },
  { initials: 'NT', tone: 'blue', name: 'Dr. Noel Tan', field: 'Endocrinology', when: 'Sep 6' },
]

const PILL_CLASS: Record<Status, string> = {
  Confirmed: 'is-active',
  Pending: 'is-pending',
  Completed: 'is-done',
  Cancelled: 'is-cancelled',
}

const TABS: { key: Group; label: string }[] = [
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'past', label: 'Past' },
  { key: 'cancelled', label: 'Cancelled' },
]

function dayKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

function Appointments() {
  const [tab, setTab] = useState<Group>('upcoming')

  const counts = useMemo(
    () => ({
      upcoming: APPTS.filter((a) => a.group === 'upcoming').length,
      past: APPTS.filter((a) => a.group === 'past').length,
      cancelled: APPTS.filter((a) => a.group === 'cancelled').length,
      pending: APPTS.filter((a) => a.status === 'Pending').length,
    }),
    [],
  )

  const apptDays = useMemo(
    () => new Set(APPTS.map((a) => dayKey(a.date))),
    [],
  )

  const rows = APPTS.filter((a) => a.group === tab)

  const stats = [
    { icon: 'calendar' as const, tone: 'green', value: counts.upcoming, label: 'Upcoming' },
    { icon: 'clock' as const, tone: 'amber', value: counts.pending, label: 'Pending confirmation' },
    { icon: 'check' as const, tone: 'gray', value: 12, label: 'Completed visits' },
    { icon: 'x' as const, tone: 'red', value: counts.cancelled, label: 'Cancelled' },
  ]

  return (
    <>
      <div className="pt-page-head">
        <div>
          <h1>Appointments</h1>
          <p>Manage your upcoming, past, and cancelled visits.</p>
        </div>
        <button className="pt-btn pt-btn-primary pt-btn-add" type="button">
          <Icon name="plus" size={17} />
          Book new appointment
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
                  <span className="pt-tab-count">{counts[t.key]}</span>
                </button>
              ))}
            </div>

            <div className="pt-list">
              {rows.map((a) => (
                <div key={a.id} className="pt-appt">
                  <div className="pt-date-chip">
                    <small>
                      {a.date
                        .toLocaleDateString('en-US', { month: 'short' })
                        .toUpperCase()}
                    </small>
                    <strong>{a.date.getDate()}</strong>
                  </div>

                  <span className={`pt-avatar is-${a.tone}`}>{a.initials}</span>

                  <div className="pt-appt-info">
                    <h4>{a.title}</h4>
                    <p>{a.subtitle}</p>
                    <div className="pt-appt-meta">
                      <span>
                        <Icon name="clock" size={14} />
                        {a.time}
                      </span>
                      <span>
                        <Icon
                          name={a.mode === 'Video visit' ? 'video' : 'pin'}
                          size={14}
                        />
                        {a.mode}
                      </span>
                    </div>
                  </div>

                  <span className={`pt-pill ${PILL_CLASS[a.status]}`}>
                    {a.status}
                  </span>

                  <div className="pt-appt-actions">
                    {a.group === 'upcoming' ? (
                      <>
                        <button
                          className="pt-row-btn"
                          type="button"
                          aria-label="Message about this visit"
                        >
                          <Icon name="chat" size={15} />
                        </button>
                        <button
                          className="pt-row-btn"
                          type="button"
                          aria-label="Cancel this visit"
                        >
                          <Icon name="x" size={15} />
                        </button>
                      </>
                    ) : (
                      <button
                        className="pt-row-btn"
                        type="button"
                        aria-label="View visit details"
                      >
                        <Icon name="eye" size={15} />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {rows.length === 0 && (
                <p className="pt-empty">Nothing here yet.</p>
              )}
            </div>
          </section>
        </div>

        <div className="pt-col">
          <MiniCalendar apptDays={apptDays} />

          <section className="pt-card">
            <div className="pt-card-head">
              <h2>Book with a doctor</h2>
            </div>
            <div className="pt-list">
              {BOOK_DOCTORS.map((d) => (
                <div key={d.name} className="pt-doc">
                  <span className={`pt-avatar is-${d.tone}`}>{d.initials}</span>
                  <div className="pt-doc-info">
                    <h4>{d.name}</h4>
                    <p>{d.field}</p>
                  </div>
                  <span className="pt-doc-when">{d.when}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function MiniCalendar({ apptDays }: { apptDays: Set<string> }) {
  const realToday = new Date()
  const [cursor, setCursor] = useState(
    () => new Date(realToday.getFullYear(), realToday.getMonth(), 1),
  )

  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const monthLabel = cursor.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const prevMonthDays = new Date(year, month, 0).getDate()

  const cells: { day: number; muted: boolean; key: string }[] = []
  for (let i = firstWeekday - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, muted: true, key: `p${i}` })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, muted: false, key: `c${d}` })
  }
  let trailing = 1
  while (cells.length % 7 !== 0) {
    cells.push({ day: trailing, muted: true, key: `n${trailing}` })
    trailing++
  }

  const isToday = (day: number) =>
    realToday.getFullYear() === year &&
    realToday.getMonth() === month &&
    realToday.getDate() === day

  return (
    <section className="pt-card">
      <div className="pt-cal-head">
        <h3>{monthLabel}</h3>
        <div className="pt-cal-nav">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => setCursor(new Date(year, month - 1, 1))}
          >
            <Icon name="chevronLeft" size={16} />
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => setCursor(new Date(year, month + 1, 1))}
          >
            <Icon name="chevronRight" size={16} />
          </button>
        </div>
      </div>

      <div className="pt-cal-grid">
        {DOW.map((d, i) => (
          <div key={`dow${i}`} className="pt-cal-dow">
            {d}
          </div>
        ))}
        {cells.map((cell) => {
          const today = !cell.muted && isToday(cell.day)
          const dot =
            !cell.muted && apptDays.has(`${year}-${month}-${cell.day}`)
          return (
            <div
              key={cell.key}
              className={`pt-cal-cell${cell.muted ? ' is-muted' : ''}${
                today ? ' is-today' : ''
              }`}
            >
              {cell.day}
              {dot && <span className="pt-cal-dot" />}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Appointments
