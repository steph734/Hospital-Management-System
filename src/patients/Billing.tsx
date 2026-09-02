import { useState } from 'react'
import { Icon, type IconName } from './icons'

type Status = 'Due' | 'Overdue' | 'Insurance' | 'Paid'
type Group = 'due' | 'paid' | 'insurance'
type Tone = 'amber' | 'red' | 'blue' | 'green' | 'gray' | 'purple'

type Invoice = {
  id: string
  title: string
  provider: string
  date: string
  amount: number
  sub: string
  status: Status
  group: Group
  icon: IconName
  tone: Tone
}

const INVOICES: Invoice[] = [
  {
    id: 'INV-20860',
    title: 'Cardiology consultation',
    provider: 'Dr. Rafael Domingo',
    date: 'Aug 18, 2026',
    amount: 4500,
    sub: 'Due Sep 15',
    status: 'Due',
    group: 'due',
    icon: 'calendar',
    tone: 'amber',
  },
  {
    id: 'INV-20871',
    title: 'Lab panel — CBC + metabolic',
    provider: 'Lumina Diagnostic Lab',
    date: 'Aug 29, 2026',
    amount: 3200,
    sub: 'Was due Aug 30',
    status: 'Overdue',
    group: 'due',
    icon: 'flask',
    tone: 'red',
  },
  {
    id: 'INV-20744',
    title: 'Chest X-ray imaging',
    provider: 'Lumina Diagnostic Imaging',
    date: 'Jul 30, 2026',
    amount: 6500,
    sub: 'Insurance covered ₱5,200',
    status: 'Insurance',
    group: 'insurance',
    icon: 'image',
    tone: 'blue',
  },
  {
    id: 'INV-20812',
    title: 'Follow-up consultation',
    provider: 'Dr. Jonas Mendez',
    date: 'Aug 18, 2026',
    amount: 2500,
    sub: 'Paid Aug 18',
    status: 'Paid',
    group: 'paid',
    icon: 'check',
    tone: 'green',
  },
  {
    id: 'INV-20603',
    title: 'Prescription — Metformin refill',
    provider: 'Lumina Pharmacy',
    date: 'Jun 14, 2026',
    amount: 950,
    sub: 'Paid Jun 14',
    status: 'Paid',
    group: 'paid',
    icon: 'pill',
    tone: 'green',
  },
  {
    id: 'INV-20544',
    title: 'Dermatology consultation',
    provider: 'Dr. Elena Vasquez',
    date: 'Jun 2, 2026',
    amount: 3000,
    sub: 'Paid Jun 2',
    status: 'Paid',
    group: 'paid',
    icon: 'calendar',
    tone: 'green',
  },
  {
    id: 'INV-20489',
    title: 'Lipid panel',
    provider: 'Lumina Diagnostic Lab',
    date: 'May 20, 2026',
    amount: 1800,
    sub: 'Paid May 20',
    status: 'Paid',
    group: 'paid',
    icon: 'flask',
    tone: 'green',
  },
  {
    id: 'INV-20410',
    title: 'Annual physical exam',
    provider: 'Dr. Rafael Domingo',
    date: 'May 2, 2026',
    amount: 5200,
    sub: 'Paid May 2',
    status: 'Paid',
    group: 'paid',
    icon: 'file',
    tone: 'green',
  },
  {
    id: 'INV-20355',
    title: 'ECG — resting',
    provider: 'Lumina Cardiology',
    date: 'Apr 18, 2026',
    amount: 2200,
    sub: 'Paid Apr 18',
    status: 'Paid',
    group: 'paid',
    icon: 'chart',
    tone: 'green',
  },
  {
    id: 'INV-20298',
    title: 'Prescription — Losartan refill',
    provider: 'Lumina Pharmacy',
    date: 'Apr 2, 2026',
    amount: 780,
    sub: 'Paid Apr 2',
    status: 'Paid',
    group: 'paid',
    icon: 'pill',
    tone: 'green',
  },
  {
    id: 'INV-20241',
    title: 'Blood pressure follow-up',
    provider: 'Dr. Rafael Domingo',
    date: 'Mar 20, 2026',
    amount: 1500,
    sub: 'Paid Mar 20',
    status: 'Paid',
    group: 'paid',
    icon: 'calendar',
    tone: 'green',
  },
  {
    id: 'INV-20187',
    title: 'Urinalysis',
    provider: 'Lumina Diagnostic Lab',
    date: 'Mar 12, 2026',
    amount: 900,
    sub: 'Paid Mar 12',
    status: 'Paid',
    group: 'paid',
    icon: 'flask',
    tone: 'green',
  },
  {
    id: 'INV-20122',
    title: 'Vitamin D panel',
    provider: 'Lumina Diagnostic Lab',
    date: 'Feb 24, 2026',
    amount: 1600,
    sub: 'Paid Feb 24',
    status: 'Paid',
    group: 'paid',
    icon: 'flask',
    tone: 'green',
  },
  {
    id: 'INV-20067',
    title: 'General consultation',
    provider: 'Dr. Jonas Mendez',
    date: 'Feb 8, 2026',
    amount: 2400,
    sub: 'Paid Feb 8',
    status: 'Paid',
    group: 'paid',
    icon: 'calendar',
    tone: 'green',
  },
]

const PILL_CLASS: Record<Status, string> = {
  Due: 'is-pending',
  Overdue: 'is-warn',
  Insurance: 'is-info',
  Paid: 'is-active',
}

type PayMethod = {
  brand: string
  isMc?: boolean
  last4: string
  expires: string
  isDefault?: boolean
}

const PAYMENT_METHODS: PayMethod[] = [
  { brand: 'VISA', last4: '4821', expires: '08/28', isDefault: true },
  { brand: 'MC', isMc: true, last4: '1190', expires: '03/27' },
]

const INSURANCE: { icon: IconName; lbl: string; val: string }[] = [
  { icon: 'shield', lbl: 'Provider', val: 'PhilHealth Plus' },
  { icon: 'card', lbl: 'Policy number', val: 'PH-4487213' },
  { icon: 'clock', lbl: 'Coverage', val: 'Active through Dec 2026' },
]

const SPEND: { m: string; v: number; active?: boolean }[] = [
  { m: 'Mar', v: 40 },
  { m: 'Apr', v: 54 },
  { m: 'May', v: 78 },
  { m: 'Jun', v: 60 },
  { m: 'Jul', v: 46 },
  { m: 'Aug', v: 88 },
  { m: 'Sep', v: 30, active: true },
]

const peso = (n: number) => `₱${n.toLocaleString('en-US')}.00`

const TABS: { key: 'all' | 'due' | 'paid'; label: string }[] = [
  { key: 'all', label: 'All invoices' },
  { key: 'due', label: 'Due' },
  { key: 'paid', label: 'Paid' },
]

function Billing() {
  const [tab, setTab] = useState<'all' | 'due' | 'paid'>('all')

  const dueInvoices = INVOICES.filter((i) => i.group === 'due')
  const balanceDue = dueInvoices.reduce((sum, i) => sum + i.amount, 0)

  const rows =
    tab === 'all'
      ? INVOICES
      : tab === 'due'
        ? dueInvoices
        : INVOICES.filter((i) => i.group === 'paid')

  const stats = [
    { icon: 'check' as const, tone: 'green', value: '₱98,000', label: 'Paid this year' },
    { icon: 'clock' as const, tone: 'amber', value: 1, label: 'Due this week' },
    { icon: 'shield' as const, tone: 'blue', value: '80%', label: 'Avg. insurance coverage' },
    { icon: 'grid' as const, tone: 'gray', value: INVOICES.length, label: 'Total invoices' },
  ]

  return (
    <>
      <div className="pt-page-head">
        <div>
          <h1>Billing</h1>
          <p>Review invoices, manage payment methods, and check insurance coverage.</p>
        </div>
        <button className="pt-btn pt-btn-primary pt-btn-add" type="button">
          <Icon name="download" size={16} />
          Download statement
        </button>
      </div>

      <div className="pt-bill-hero">
        <div className="pt-bill-hero-main">
          <div className="pt-bill-hero-label">Total balance due</div>
          <div className="pt-bill-amt">
            {`₱${balanceDue.toLocaleString('en-US')}`}
            <small>.00</small>
          </div>
        </div>

        <div className="pt-bill-hero-div" />

        <div className="pt-bill-hero-item">
          <div className="k">Next due date</div>
          <div className="v">Sep 15, 2026</div>
        </div>

        <div className="pt-bill-hero-item">
          <div className="k">Open invoices</div>
          <div className="v">{dueInvoices.length}</div>
        </div>

        <div className="pt-bill-hero-spacer" />

        <button className="pt-btn pt-btn-primary" type="button">
          Pay now
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
                  {t.key === 'all' && (
                    <span className="pt-tab-count">{INVOICES.length}</span>
                  )}
                </button>
              ))}
            </div>

            <div className="pt-list">
              {rows.map((inv) => (
                <article key={inv.id} className="pt-inv">
                  <span className={`pt-inv-ico pt-tone-${inv.tone}`}>
                    <Icon name={inv.icon} size={18} />
                  </span>
                  <div className="pt-inv-info">
                    <h4>{inv.title}</h4>
                    <p>
                      {inv.provider} · {inv.date}
                    </p>
                    <p className="pt-inv-num">Invoice #{inv.id}</p>
                  </div>
                  <div className="pt-inv-amt">
                    <div className="amt">{peso(inv.amount)}</div>
                    <div className="sub">{inv.sub}</div>
                  </div>
                  <span className={`pt-pill ${PILL_CLASS[inv.status]}`}>
                    {inv.status}
                  </span>
                  <div className="pt-inv-actions">
                    <button
                      className="pt-row-btn"
                      type="button"
                      aria-label="View invoice"
                    >
                      <Icon name="eye" size={16} />
                    </button>
                    <button
                      className="pt-row-btn"
                      type="button"
                      aria-label="Download invoice"
                    >
                      <Icon name="download" size={16} />
                    </button>
                  </div>
                </article>
              ))}

              {rows.length === 0 && (
                <p className="pt-empty">No invoices in this category.</p>
              )}
            </div>
          </section>
        </div>

        <div className="pt-col">
          <section className="pt-card">
            <div className="pt-card-head">
              <h2>Payment methods</h2>
            </div>
            <div>
              {PAYMENT_METHODS.map((p) => (
                <div key={p.last4} className="pt-pay">
                  <span className={`pt-pay-brand${p.isMc ? ' is-mc' : ''}`}>
                    {p.brand}
                  </span>
                  <div className="pt-pay-info">
                    <h4>
                      {p.isMc ? 'Mastercard' : 'Visa'} •••• {p.last4}
                    </h4>
                    <p>Expires {p.expires}</p>
                  </div>
                  {p.isDefault && <span className="pt-pay-tag">Default</span>}
                </div>
              ))}
            </div>
            <button className="pt-add-btn" type="button">
              <Icon name="plus" size={15} />
              Add payment method
            </button>
          </section>

          <section className="pt-card">
            <div className="pt-card-head">
              <h2>Insurance</h2>
            </div>
            <div>
              {INSURANCE.map((row) => (
                <div key={row.lbl} className="pt-info-row">
                  <Icon name={row.icon} size={16} />
                  <div>
                    <div className="lbl">{row.lbl}</div>
                    <div className="val">{row.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="pt-card">
            <div className="pt-card-head">
              <h2>Spending this year</h2>
            </div>
            <div className="pt-spend-bars">
              {SPEND.map((s) => (
                <div key={s.m} className="pt-spend-col">
                  <span
                    className={`pt-spend-bar${s.active ? ' is-active' : ''}`}
                    style={{ height: `${s.v}%` }}
                  />
                  <small>{s.m}</small>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Billing
