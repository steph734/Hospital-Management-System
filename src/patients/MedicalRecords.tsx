import { useState } from 'react'
import { Icon, type IconName } from './icons'

type RecordType =
  | 'Lab result'
  | 'Visit note'
  | 'Imaging'
  | 'Diagnosis'
  | 'Prescription'

type TabKey = 'all' | 'notes' | 'labs' | 'imaging' | 'diagnoses'

type MedRecord = {
  id: string
  title: string
  desc: string
  type: RecordType
  date: string
  by: string
  downloadable: boolean
}

const TYPE_META: Record<
  RecordType,
  { icon: IconName; tone: string; tab: TabKey }
> = {
  'Lab result': { icon: 'droplet', tone: 'blue', tab: 'labs' },
  'Visit note': { icon: 'calendar', tone: 'amber', tab: 'notes' },
  Imaging: { icon: 'image', tone: 'purple', tab: 'imaging' },
  Diagnosis: { icon: 'alert', tone: 'red', tab: 'diagnoses' },
  Prescription: { icon: 'heart', tone: 'green', tab: 'all' },
}

const TABS: { key: TabKey; label: string }[] = [
  { key: 'all', label: 'All records' },
  { key: 'notes', label: 'Visit notes' },
  { key: 'labs', label: 'Lab results' },
  { key: 'imaging', label: 'Imaging' },
  { key: 'diagnoses', label: 'Diagnoses' },
]

const RECORDS: MedRecord[] = [
  {
    id: 'r1',
    title: 'Complete blood count (CBC)',
    desc: 'Routine bloodwork panel',
    type: 'Lab result',
    date: 'Aug 29, 2026',
    by: 'Ordered by Dr. Rafael Domingo',
    downloadable: true,
  },
  {
    id: 'r2',
    title: 'Follow-up consultation',
    desc: 'Blood pressure review and medication check',
    type: 'Visit note',
    date: 'Aug 18, 2026',
    by: 'Dr. Jonas Mendez · General practice',
    downloadable: true,
  },
  {
    id: 'r3',
    title: 'Chest X-ray',
    desc: 'Routine imaging, no abnormalities found',
    type: 'Imaging',
    date: 'Jul 30, 2026',
    by: 'Lumina Diagnostic Imaging',
    downloadable: true,
  },
  {
    id: 'r4',
    title: 'Type 2 diabetes — confirmed',
    desc: 'Diagnosed following elevated fasting glucose results',
    type: 'Diagnosis',
    date: 'Jun 14, 2026',
    by: 'Dr. Rafael Domingo',
    downloadable: true,
  },
  {
    id: 'r5',
    title: 'Metformin 500mg prescribed',
    desc: '2 tablets daily, with meals',
    type: 'Prescription',
    date: 'Jun 14, 2026',
    by: 'Dr. Rafael Domingo',
    downloadable: false,
  },
]

const SUMMARY: { k: string; v: string }[] = [
  { k: 'Blood type', v: 'O+' },
  { k: 'Height', v: '5\'4" (162 cm)' },
  { k: 'Weight', v: '64.2 kg' },
  { k: 'Primary physician', v: 'Dr. R. Domingo' },
]

const ALLERGIES = ['Penicillin', 'Shellfish']
const CONDITIONS = ['Type 2 diabetes', 'Hypertension']

const DOCUMENTS: { name: string; size: string }[] = [
  { name: 'CBC_results_Aug29.pdf', size: '240 KB' },
  { name: 'Chest_Xray_report.pdf', size: '1.1 MB' },
  { name: 'Visit_summary_Jun14.pdf', size: '180 KB' },
]

function MedicalRecords() {
  const [tab, setTab] = useState<TabKey>('all')

  const rows =
    tab === 'all'
      ? RECORDS
      : RECORDS.filter((r) => TYPE_META[r.type].tab === tab)

  return (
    <>
      <div className="pt-page-head">
        <div>
          <h1>Medical records</h1>
          <p>
            Your complete visit history, lab results, and clinical notes in one
            place.
          </p>
        </div>
        <div className="pt-head-actions">
          <button className="pt-btn pt-btn-outline pt-btn-add" type="button">
            <Icon name="download" size={16} />
            Export all
          </button>
          <button className="pt-btn pt-btn-primary pt-btn-add" type="button">
            <Icon name="chat" size={16} />
            Request records
          </button>
        </div>
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
                </button>
              ))}
            </div>

            <div className="pt-list">
              {rows.map((r) => {
                const meta = TYPE_META[r.type]
                return (
                  <article key={r.id} className="pt-rec">
                    <div className="pt-rec-main">
                      <span className={`pt-rec-ico pt-tone-${meta.tone}`}>
                        <Icon name={meta.icon} size={18} />
                      </span>
                      <div className="pt-rec-body">
                        <div className="pt-rec-top">
                          <div>
                            <h4>{r.title}</h4>
                            <p>{r.desc}</p>
                          </div>
                          <span className="pt-rec-date">{r.date}</span>
                        </div>

                        <span className={`pt-tag pt-tone-${meta.tone}`}>
                          {r.type}
                        </span>

                        <div className="pt-rec-foot">
                          <span className="pt-rec-by">
                            <Icon name="user" size={14} />
                            {r.by}
                          </span>
                          <div className="pt-rec-actions">
                            <button className="pt-text-btn" type="button">
                              <Icon name="eye" size={15} />
                              View
                            </button>
                            {r.downloadable && (
                              <button className="pt-text-btn" type="button">
                                <Icon name="download" size={15} />
                                Download
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}

              {rows.length === 0 && (
                <p className="pt-empty">No records in this category.</p>
              )}
            </div>
          </section>
        </div>

        <div className="pt-col">
          <section className="pt-card">
            <div className="pt-card-head">
              <h2>Patient summary</h2>
            </div>
            <div>
              {SUMMARY.map((s) => (
                <div key={s.k} className="pt-sum-row">
                  <span className="k">{s.k}</span>
                  <span className="v">{s.v}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="pt-card">
            <div className="pt-card-head">
              <h2>Allergies</h2>
            </div>
            <div className="pt-chips">
              {ALLERGIES.map((a) => (
                <span key={a} className="pt-chip is-red">
                  {a}
                </span>
              ))}
            </div>
          </section>

          <section className="pt-card">
            <div className="pt-card-head">
              <h2>Chronic conditions</h2>
            </div>
            <div className="pt-chips">
              {CONDITIONS.map((c) => (
                <span key={c} className="pt-chip is-amber">
                  {c}
                </span>
              ))}
            </div>
          </section>

          <section className="pt-card">
            <div className="pt-card-head">
              <h2>Recent documents</h2>
            </div>
            <div>
              {DOCUMENTS.map((d) => (
                <div key={d.name} className="pt-file">
                  <span className="pt-file-ico">
                    <Icon name="file" size={16} />
                  </span>
                  <div className="pt-file-info">
                    <h4>{d.name}</h4>
                    <p>{d.size}</p>
                  </div>
                  <button
                    className="pt-row-btn"
                    type="button"
                    aria-label={`Download ${d.name}`}
                  >
                    <Icon name="download" size={15} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default MedicalRecords
