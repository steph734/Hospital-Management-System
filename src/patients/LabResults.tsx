import { useState } from 'react'
import { Icon } from './icons'

type Flag = 'high' | 'low'

type LabTest = {
  name: string
  result: string
  range: string
  flag?: Flag
}

type Panel = {
  id: string
  name: string
  lab: string
  date: string
  orderedBy: string
  tests: LabTest[]
}

const PANELS: Panel[] = [
  {
    id: 'p1',
    name: 'Complete blood count (CBC)',
    lab: 'Lumina Diagnostic Lab',
    date: 'Aug 29, 2026',
    orderedBy: 'Dr. Rafael Domingo',
    tests: [
      {
        name: 'White blood cells',
        result: '11.8 ×10⁹/L',
        range: '4.5 – 11.0 ×10⁹/L',
        flag: 'high',
      },
      {
        name: 'Red blood cells',
        result: '4.7 ×10¹²/L',
        range: '4.2 – 5.4 ×10¹²/L',
      },
      { name: 'Hemoglobin', result: '13.9 g/dL', range: '12.0 – 15.5 g/dL' },
      { name: 'Hematocrit', result: '41%', range: '36 – 46%' },
      {
        name: 'Platelets',
        result: '398 ×10⁹/L',
        range: '150 – 350 ×10⁹/L',
        flag: 'high',
      },
    ],
  },
  {
    id: 'p2',
    name: 'Comprehensive metabolic panel',
    lab: 'Lumina Diagnostic Lab',
    date: 'Aug 29, 2026',
    orderedBy: 'Dr. Rafael Domingo',
    tests: [
      { name: 'Glucose (fasting)', result: '96 mg/dL', range: '70 – 99 mg/dL' },
      { name: 'Sodium', result: '139 mmol/L', range: '135 – 145 mmol/L' },
      { name: 'Potassium', result: '4.2 mmol/L', range: '3.5 – 5.1 mmol/L' },
      { name: 'Creatinine', result: '0.9 mg/dL', range: '0.6 – 1.1 mg/dL' },
      { name: 'Calcium', result: '9.4 mg/dL', range: '8.6 – 10.2 mg/dL' },
    ],
  },
  {
    id: 'p3',
    name: 'Lipid panel',
    lab: 'Lumina Diagnostic Lab',
    date: 'Jun 14, 2026',
    orderedBy: 'Dr. Rafael Domingo',
    tests: [
      {
        name: 'Total cholesterol',
        result: '228 mg/dL',
        range: '< 200 mg/dL',
        flag: 'high',
      },
      { name: 'HDL cholesterol', result: '58 mg/dL', range: '> 40 mg/dL' },
      { name: 'LDL cholesterol', result: '128 mg/dL', range: '< 130 mg/dL' },
      { name: 'Triglycerides', result: '140 mg/dL', range: '< 150 mg/dL' },
    ],
  },
  {
    id: 'p4',
    name: 'HbA1c (glycated hemoglobin)',
    lab: 'Lumina Diagnostic Lab',
    date: 'Jun 14, 2026',
    orderedBy: 'Dr. Rafael Domingo',
    tests: [
      {
        name: 'HbA1c',
        result: '6.4%',
        range: '< 7.0% (managed target)',
      },
      {
        name: 'Estimated avg. glucose',
        result: '137 mg/dL',
        range: '< 154 mg/dL',
      },
    ],
  },
  {
    id: 'p5',
    name: 'Thyroid panel (TSH)',
    lab: 'Lumina Diagnostic Lab',
    date: 'May 2, 2026',
    orderedBy: 'Dr. Elena Vasquez',
    tests: [
      { name: 'TSH', result: '2.1 mIU/L', range: '0.4 – 4.0 mIU/L' },
      { name: 'Free T4', result: '1.2 ng/dL', range: '0.8 – 1.8 ng/dL' },
    ],
  },
  {
    id: 'p6',
    name: 'Vitamin D, 25-hydroxy',
    lab: 'Lumina Diagnostic Lab',
    date: 'May 2, 2026',
    orderedBy: 'Dr. Elena Vasquez',
    tests: [
      { name: '25-hydroxyvitamin D', result: '34 ng/mL', range: '30 – 100 ng/mL' },
    ],
  },
  {
    id: 'p7',
    name: 'Urinalysis',
    lab: 'Lumina Diagnostic Lab',
    date: 'Mar 12, 2026',
    orderedBy: 'Dr. Rafael Domingo',
    tests: [
      { name: 'Specific gravity', result: '1.018', range: '1.005 – 1.030' },
      { name: 'pH', result: '6.0', range: '4.5 – 8.0' },
      { name: 'Protein', result: 'Negative', range: 'Negative' },
      { name: 'Glucose', result: 'Negative', range: 'Negative' },
    ],
  },
]

type Trend = {
  label: string
  value: string
  warn?: boolean
  bars: number[]
}

const TRENDS: Trend[] = [
  { label: 'HbA1c', value: '6.4%', bars: [40, 52, 46, 64] },
  {
    label: 'Total cholesterol',
    value: '228 mg/dL',
    warn: true,
    bars: [48, 44, 58, 72],
  },
  { label: 'Fasting glucose', value: '96 mg/dL', bars: [58, 50, 44, 46] },
]

const LAB_INFO: { icon: 'pin' | 'phone' | 'file'; lbl: string; val: string }[] = [
  { icon: 'pin', lbl: 'Facility', val: 'Lumina Diagnostic Lab' },
  { icon: 'phone', lbl: 'Contact', val: '+63 82 555 0187' },
  { icon: 'file', lbl: 'Results turnaround', val: 'Usually 24–48 hours' },
]

type TabKey = 'all' | 'attention' | 'normal'

const flaggedCount = (p: Panel) => p.tests.filter((t) => t.flag).length

const TABS: { key: TabKey; label: string }[] = [
  { key: 'all', label: 'All panels' },
  { key: 'attention', label: 'Needs attention' },
  { key: 'normal', label: 'Normal' },
]

function LabResults() {
  const [tab, setTab] = useState<TabKey>('all')
  const [open, setOpen] = useState<Record<string, boolean>>({ p1: true })

  const toggle = (id: string) =>
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }))

  const attentionCount = PANELS.filter((p) => flaggedCount(p) > 0).length
  const normalCount = PANELS.length - attentionCount

  const rows =
    tab === 'all'
      ? PANELS
      : tab === 'attention'
        ? PANELS.filter((p) => flaggedCount(p) > 0)
        : PANELS.filter((p) => flaggedCount(p) === 0)

  const stats = [
    {
      icon: 'flask' as const,
      tone: 'gray',
      value: PANELS.length,
      label: 'Total panels',
    },
    {
      icon: 'check' as const,
      tone: 'green',
      value: normalCount,
      label: 'Within normal range',
    },
    {
      icon: 'alert' as const,
      tone: 'amber',
      value: attentionCount,
      label: 'Needs attention',
    },
    {
      icon: 'clock' as const,
      tone: 'gray',
      value: 'Aug 29',
      label: 'Most recent',
    },
  ]

  return (
    <>
      <div className="pt-page-head">
        <div>
          <h1>Lab results</h1>
          <p>Review test panels, trends, and flagged values from your visits.</p>
        </div>
        <button className="pt-btn pt-btn-outline pt-btn-add" type="button">
          <Icon name="download" size={16} />
          Export results
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
                    <span className="pt-tab-count">{PANELS.length}</span>
                  )}
                </button>
              ))}
            </div>

            <div className="pt-list">
              {rows.map((p) => {
                const flags = flaggedCount(p)
                const isOpen = !!open[p.id]
                return (
                  <article key={p.id} className="pt-lab">
                    <button
                      type="button"
                      className="pt-lab-head"
                      onClick={() => toggle(p.id)}
                      aria-expanded={isOpen}
                    >
                      <span className="pt-lab-ico pt-tone-blue">
                        <Icon name="flask" size={18} />
                      </span>
                      <span className="pt-lab-title">
                        <h4>{p.name}</h4>
                        <p>{p.lab}</p>
                      </span>
                      <span className="pt-lab-date">{p.date}</span>
                      <span
                        className={`pt-pill ${flags > 0 ? 'is-warn' : 'is-active'}`}
                      >
                        {flags > 0 ? `${flags} flagged` : 'Normal'}
                      </span>
                      <span
                        className={`pt-lab-caret${isOpen ? ' is-open' : ''}`}
                      >
                        <Icon name="chevronDown" size={18} />
                      </span>
                    </button>

                    {isOpen && (
                      <div className="pt-lab-body">
                        <table className="pt-lab-table">
                          <thead>
                            <tr>
                              <th>Test</th>
                              <th>Result</th>
                              <th>Reference range</th>
                            </tr>
                          </thead>
                          <tbody>
                            {p.tests.map((t) => (
                              <tr key={t.name}>
                                <td>{t.name}</td>
                                <td>
                                  {t.result}
                                  {t.flag && (
                                    <span className={`pt-flag is-${t.flag}`}>
                                      {t.flag === 'high' ? 'High' : 'Low'}
                                    </span>
                                  )}
                                </td>
                                <td>{t.range}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <div className="pt-lab-foot">
                          <span className="pt-lab-by">
                            <Icon name="user" size={14} />
                            Ordered by {p.orderedBy}
                          </span>
                          <button className="pt-text-btn" type="button">
                            <Icon name="download" size={15} />
                            Download PDF
                          </button>
                        </div>
                      </div>
                    )}
                  </article>
                )
              })}

              {rows.length === 0 && (
                <p className="pt-empty">No panels in this category.</p>
              )}
            </div>
          </section>
        </div>

        <div className="pt-col">
          <section className="pt-card">
            <div className="pt-card-head">
              <h2>Trends</h2>
            </div>
            <div>
              {TRENDS.map((tr) => (
                <div key={tr.label} className="pt-trend">
                  <div className="pt-trend-head">
                    <span className="lbl">{tr.label}</span>
                    <span
                      className={`pt-trend-val${tr.warn ? ' is-warn' : ''}`}
                    >
                      {tr.value}
                    </span>
                  </div>
                  <div className="pt-trend-bars">
                    {tr.bars.map((h, i) => {
                      const last = i === tr.bars.length - 1
                      return (
                        <span
                          key={i}
                          className={`pt-trend-bar${
                            last ? (tr.warn ? ' is-warn' : ' is-active') : ''
                          }`}
                          style={{ height: `${h}%` }}
                        />
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="pt-card">
            <div className="pt-card-head">
              <h2>Lab information</h2>
            </div>
            <div>
              {LAB_INFO.map((row) => (
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
        </div>
      </div>
    </>
  )
}

export default LabResults
