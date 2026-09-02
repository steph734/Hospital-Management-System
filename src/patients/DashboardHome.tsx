import { Icon, type IconName } from './icons'

const now = new Date()
const dateLabel = now.toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
})
const greeting =
  now.getHours() < 12
    ? 'Good morning'
    : now.getHours() < 18
      ? 'Good afternoon'
      : 'Good evening'

type Visit = { month: string; day: string; title: string; detail: string }
type Vital = {
  label: string
  value: string
  unit: string
  note: string
  tone: 'ok' | 'warn'
}
type Rx = {
  name: string
  detail: string
  status: string
  tone: 'active' | 'warn' | 'done'
}
type Activity = { icon: IconName; title: string; detail: string }

const upcoming: Visit[] = [
  { month: 'SEP', day: '4', title: 'Dr. Rafael Domingo', detail: 'Cardiology · 10:30 AM' },
  { month: 'SEP', day: '12', title: 'Dr. Elena Vasquez', detail: 'Dermatology · 2:00 PM' },
  {
    month: 'OCT',
    day: '1',
    title: 'Annual physical exam',
    detail: 'Dr. Rafael Domingo · 9:00 AM',
  },
]

const quickActions: { label: string; icon: IconName }[] = [
  { label: 'Book appointment', icon: 'calendar' },
  { label: 'Refill prescription', icon: 'pill' },
  { label: 'View lab results', icon: 'file' },
  { label: 'Message doctor', icon: 'chat' },
]

const vitals: Vital[] = [
  {
    label: 'Blood pressure',
    value: '118',
    unit: '/76 mmHg',
    note: 'Within normal range',
    tone: 'ok',
  },
  { label: 'Heart rate', value: '72', unit: 'bpm', note: 'Steady', tone: 'ok' },
  {
    label: 'Weight',
    value: '64.2',
    unit: 'kg',
    note: '+0.8 kg since May',
    tone: 'warn',
  },
  {
    label: 'Blood sugar',
    value: '96',
    unit: 'mg/dL',
    note: 'Fasting, normal',
    tone: 'ok',
  },
]

const prescriptions: Rx[] = [
  {
    name: 'Losartan 50mg',
    detail: '1 tablet, once daily',
    status: 'Active',
    tone: 'active',
  },
  {
    name: 'Metformin 500mg',
    detail: '2 tablets daily · 3 left',
    status: 'Refill soon',
    tone: 'warn',
  },
  {
    name: 'Amoxicillin 250mg',
    detail: 'Completed course',
    status: 'Done',
    tone: 'done',
  },
]

const activity: Activity[] = [
  {
    icon: 'file',
    title: 'Lab results ready',
    detail: 'Complete blood count · Aug 29',
  },
  { icon: 'card', title: 'Invoice paid', detail: 'Consultation fee · $45.00' },
]

function DashboardHome() {
  return (
    <>
      <h1 className="pt-greeting">{greeting}, Maria</h1>
      <p className="pt-greeting-sub">
        Here's what's happening with your health today, {dateLabel}.
      </p>

      <div className="pt-columns">
        <div className="pt-col">
          <section className="pt-hero">
            <span className="pt-hero-tag">Next appointment</span>

            <div className="pt-hero-doc">
              <span className="pt-avatar pt-avatar-lg">DR</span>
              <div>
                <h3>Dr. Rafael Domingo</h3>
                <p>Cardiology · Lumina Medical Center</p>
              </div>
            </div>

            <div className="pt-hero-meta">
              <div>
                <Icon name="calendar" size={17} />
                <span className="pt-kv">
                  <small>Date</small>
                  <span>Thu, Sep 4</span>
                </span>
              </div>
              <div>
                <Icon name="clock" size={17} />
                <span className="pt-kv">
                  <small>Time</small>
                  <span>10:30 AM</span>
                </span>
              </div>
              <div>
                <Icon name="video" size={17} />
                <span className="pt-kv">
                  <small>Type</small>
                  <span>Video visit</span>
                </span>
              </div>
            </div>

            <div className="pt-hero-actions">
              <button className="pt-btn pt-btn-primary" type="button">
                Join video visit
              </button>
              <button className="pt-btn pt-btn-ghost" type="button">
                Reschedule
              </button>
            </div>
          </section>

          <div className="pt-quick">
            {quickActions.map((a) => (
              <button key={a.label} className="pt-quick-item" type="button">
                <span className="pt-quick-ico">
                  <Icon name={a.icon} size={20} />
                </span>
                <span>{a.label}</span>
              </button>
            ))}
          </div>

          <section className="pt-card">
            <div className="pt-card-head">
              <h2>Health overview</h2>
              <button className="pt-link" type="button">
                View history
              </button>
            </div>
            <div className="pt-vitals">
              {vitals.map((v) => (
                <div key={v.label} className="pt-vital">
                  <div className="pt-vital-label">{v.label}</div>
                  <div className="pt-vital-value">
                    {v.value}
                    <small>{v.unit}</small>
                  </div>
                  <div
                    className={`pt-vital-note${
                      v.tone === 'warn' ? ' is-warn' : ''
                    }`}
                  >
                    {v.note}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="pt-col">
          <section className="pt-card">
            <div className="pt-card-head">
              <h2>Upcoming visits</h2>
              <button className="pt-link" type="button">
                See all
              </button>
            </div>
            <div className="pt-list">
              {upcoming.map((u) => (
                <div key={u.title + u.day} className="pt-visit">
                  <div className="pt-date-chip">
                    <small>{u.month}</small>
                    <strong>{u.day}</strong>
                  </div>
                  <div className="pt-visit-info">
                    <h4>{u.title}</h4>
                    <p>{u.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="pt-card">
            <div className="pt-card-head">
              <h2>Prescriptions</h2>
              <button className="pt-link" type="button">
                Manage
              </button>
            </div>
            <div className="pt-list">
              {prescriptions.map((p) => (
                <div key={p.name} className="pt-rx">
                  <span className="pt-rx-ico">
                    <Icon name="heart" size={17} />
                  </span>
                  <div className="pt-rx-info">
                    <h4>{p.name}</h4>
                    <p>{p.detail}</p>
                  </div>
                  <span className={`pt-pill is-${p.tone}`}>{p.status}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="pt-card">
            <div className="pt-card-head">
              <h2>Recent activity</h2>
            </div>
            <div className="pt-list">
              {activity.map((a) => (
                <div key={a.title} className="pt-act">
                  <span className="pt-act-ico">
                    <Icon name={a.icon} size={17} />
                  </span>
                  <div>
                    <h4>{a.title}</h4>
                    <p>{a.detail}</p>
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
