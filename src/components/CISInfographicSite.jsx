import React from "react";
import {
  BarChart3,
  BookOpen,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  Handshake,
  HeartHandshake,
  Mail,
  MapPin,
  Megaphone,
  MessageSquarePlus,
  Network,
  Shield,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const navItems = [
  { href: "#findings", label: "Findings" },
  { href: "#safety", label: "Safety" },
  { href: "#institutions", label: "Institutions" },
  { href: "#path-forward", label: "Path forward" },
  { href: "#action", label: "Take action" },
];

const heroStats = [
  { value: "1,400+", label: "community respondents", tone: "blue" },
  { value: "92.5%", label: "feel more concerned and less safe", tone: "coral" },
  { value: "90.2%", label: "say the community was not well prepared", tone: "gold" },
  { value: "8+", label: "major centres represented across Canada", tone: "green" },
];

const pillars = [
  {
    title: "Clarity",
    copy: "A national snapshot of Jewish life in Canada, grounded in community input rather than assumptions.",
    icon: BarChart3,
  },
  {
    title: "Community impact",
    copy: "A stronger pipeline of advocates, leaders, volunteers, institutions, and grassroots groups ready to act.",
    icon: Users,
  },
  {
    title: "Accountability",
    copy: "Year-over-year tracking of priorities, resources, satisfaction, and visible outcomes.",
    icon: Target,
  },
];

const cities = [
  "Toronto",
  "Montreal",
  "Vancouver",
  "Winnipeg",
  "Calgary",
  "Ottawa",
  "London",
  "Halifax",
];

const demographics = [
  { label: "Female respondents", value: "67.2%" },
  { label: "Male respondents", value: "31.3%" },
  { label: "University education", value: "40.4%" },
  { label: "Master’s degree", value: "23.5%" },
];

const priorities = [
  ["Safety", "The highest-ranked need across the community."],
  ["Antisemitism", "A visible, lived concern shaping Jewish life."],
  ["Youth engagement", "Future resilience depends on younger community members."],
  ["Community mobilization", "People want faster, broader, more coordinated action."],
  ["Training & education", "Practical tools, readiness, and empowerment."],
  ["Advocacy & lobbying", "Focused influence with policy makers and institutions."],
  ["PR / communications", "Clearer public messaging and stronger visibility."],
  ["Policy & research", "Evidence to guide smarter long-term strategy."],
];

const safetyStats = [
  {
    label: "Community was well prepared for antisemitic threats",
    value: 90.2,
    response: "disagree",
    caption: "Only 3.6% agreed the community was well prepared.",
  },
  {
    label: "I feel more concerned and less safe as a Jew in Canada",
    value: 92.5,
    response: "agree",
    caption: "A near-consensus signal of heightened vulnerability after October 7.",
  },
];

const themes = [
  "fear",
  "harassment",
  "vandalism",
  "protests",
  "isolation",
  "workplace discomfort",
  "synagogue security",
  "online antisemitism",
  "mental health",
  "identity visibility",
  "community protection",
  "lost trust",
];

const identityPressures = [
  {
    label: "Can show Jewish identity in public without fear",
    primary: 63,
    secondary: 18.8,
    primaryLabel: "disagree",
    secondaryLabel: "agree",
    tone: "coral",
  },
  {
    label: "Jewish symbols are likely to be targeted for vandalism",
    primary: 84.6,
    secondary: 5.4,
    primaryLabel: "agree",
    secondaryLabel: "disagree",
    tone: "blue",
  },
  {
    label: "Recognizably Jewish people and institutions need enhanced security",
    primary: 93.6,
    secondary: 1.5,
    primaryLabel: "agree",
    secondaryLabel: "disagree",
    tone: "blue",
  },
  {
    label: "Security must immediately improve in Jewish community settings",
    primary: 89.6,
    secondary: 3.3,
    primaryLabel: "agree",
    secondaryLabel: "disagree",
    tone: "gold",
  },
];

const organizations = [
  { name: "B’nai Brith Canada", unsatisfied: 17.4, neutral: 16.2, satisfied: 60.4, unknown: 6 },
  {
    name: "Friends of Simon Wiesenthal Center",
    unsatisfied: 20,
    neutral: 23.8,
    satisfied: 43.2,
    unknown: 13,
  },
  {
    name: "The Abraham Global Peace Initiative",
    unsatisfied: 16.2,
    neutral: 24.4,
    satisfied: 28.8,
    unknown: 30.6,
  },
  {
    name: "Jewish Security Network",
    unsatisfied: 21.6,
    neutral: 21,
    satisfied: 30.6,
    unknown: 26.8,
  },
  { name: "CJPAC", unsatisfied: 24.6, neutral: 25.8, satisfied: 31, unknown: 18.6 },
  { name: "CIJA", unsatisfied: 32.8, neutral: 17.4, satisfied: 43, unknown: 6.8 },
  { name: "UJA Federation", unsatisfied: 35.8, neutral: 18.8, satisfied: 38.8, unknown: 6.6 },
];

const comparisonScores = [
  ["Policy & legislation", 29.7, 70.3],
  ["Media coverage", 41, 59],
  ["Community safety", 47.5, 52.5],
  ["Education-system support", 52.6, 47.4],
  ["Community mobilization", 57.1, 42.9],
  ["Supportive public opinion", 58.9, 41.1],
  ["Unity & belonging", 67.3, 32.7],
];

const pathForward = [
  [
    "Measure annually",
    "Repeat the Community Impact Study and track year-over-year change.",
    BarChart3,
  ],
  [
    "Coordinate the ecosystem",
    "Clarify roles across legacy institutions, grassroots groups, donors, and volunteers.",
    Network,
  ],
  [
    "Fund visible impact",
    "Support initiatives that can show outcomes, not only activity.",
    HeartHandshake,
  ],
  [
    "Strengthen safety",
    "Expand training, readiness, community security, and protective infrastructure.",
    Shield,
  ],
  [
    "Mobilize advocates",
    "Build a broader pipeline of trained community responders and leaders.",
    Megaphone,
  ],
  [
    "Improve transparency",
    "Report resources, priorities, and outcomes in clearer public language.",
    FileText,
  ],
];

const lojCards = [
  {
    title: "Protect",
    copy: "Modern, lawful, scalable safety and preparedness frameworks.",
    detail: "Community Safety Council of Canada",
    icon: Shield,
  },
  {
    title: "Empower",
    copy: "Training and resilience education for community members.",
    detail: "1,600+ Magen Academy graduates",
    icon: Sparkles,
  },
  {
    title: "Amplify",
    copy: "Coordinated advocacy, communications, and grassroots support.",
    detail: "Bubble Zone protections in 5 cities",
    icon: Megaphone,
  },
];

const ctas = [
  {
    label: "Sign up for next year’s study",
    icon: Users,
    href: "mailto:hello@lionsofjudah.org?subject=Community%20Impact%20Study%20signup",
  },
  {
    label: "Submit questions for next year",
    icon: MessageSquarePlus,
    href: "mailto:hello@lionsofjudah.org?subject=Questions%20for%20the%20next%20Community%20Impact%20Study",
  },
  {
    label: "Support or collaborate",
    icon: Handshake,
    href: "mailto:hello@lionsofjudah.org?subject=Community%20Impact%20Report%20collaboration",
  },
  {
    label: "Read the methodology",
    icon: BookOpen,
    href: "https://lionsofjudah.org/research-statement-methods",
  },
];

function SectionHeader({ eyebrow, title, copy, id }) {
  return (
    <div className="cis-section-header" id={id}>
      <p className="cis-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}

function StatCard({ stat }) {
  return (
    <div className={`cis-stat-card cis-stat-${stat.tone}`}>
      <strong>{stat.value}</strong>
      <span>{stat.label}</span>
    </div>
  );
}

function MetricBar({ value, label, response, caption }) {
  return (
    <article className="cis-metric-bar">
      <div>
        <h3>{label}</h3>
        <p>{caption}</p>
      </div>
      <div className="cis-bar-shell" aria-label={`${value}% ${response}`}>
        <span style={{ width: `${value}%` }} />
        <strong>
          {value}% {response}
        </strong>
      </div>
    </article>
  );
}

function IdentityGauge({ item }) {
  return (
    <article className="cis-gauge-card">
      <div className="cis-gauge-heading">
        <h3>{item.label}</h3>
        <strong>{item.primary}%</strong>
      </div>
      <div className={`cis-gauge cis-gauge-${item.tone}`}>
        <span style={{ width: `${item.primary}%` }} />
      </div>
      <p>
        <strong>{item.primary}%</strong> {item.primaryLabel}; <strong>{item.secondary}%</strong>{" "}
        {item.secondaryLabel}.
      </p>
    </article>
  );
}

function OrganizationBar({ org }) {
  return (
    <article className="cis-org-row">
      <div className="cis-org-title">
        <h3>{org.name}</h3>
        <p>
          {org.satisfied}% satisfied · {org.unsatisfied}% not satisfied
        </p>
      </div>
      <div className="cis-stacked-bar" aria-label={`${org.name} satisfaction distribution`}>
        <span className="cis-unsatisfied" style={{ width: `${org.unsatisfied}%` }} />
        <span className="cis-neutral" style={{ width: `${org.neutral}%` }} />
        <span className="cis-satisfied" style={{ width: `${org.satisfied}%` }} />
        <span className="cis-unknown" style={{ width: `${org.unknown}%` }} />
      </div>
    </article>
  );
}

function ComparisonBar({ row }) {
  const [label, grassroots, legacy] = row;

  return (
    <article className="cis-comparison-row">
      <h3>{label}</h3>
      <div className="cis-comparison-bar">
        <span className="cis-grassroots" style={{ width: `${grassroots}%` }}>
          {grassroots}%
        </span>
        <span className="cis-legacy" style={{ width: `${legacy}%` }}>
          {legacy}%
        </span>
      </div>
    </article>
  );
}

function CanadaMap() {
  return (
    <div className="cis-map-card" aria-label="Canada participation map">
      <div className="cis-map-outline">CANADA</div>
      <div className="cis-map-pin cis-pin-vancouver">
        <MapPin size={16} />
        Vancouver
      </div>
      <div className="cis-map-pin cis-pin-calgary">
        <MapPin size={16} />
        Calgary
      </div>
      <div className="cis-map-pin cis-pin-winnipeg">
        <MapPin size={16} />
        Winnipeg
      </div>
      <div className="cis-map-pin cis-pin-toronto">
        <MapPin size={16} />
        Toronto
      </div>
      <div className="cis-map-pin cis-pin-ottawa">
        <MapPin size={16} />
        Ottawa
      </div>
      <div className="cis-map-pin cis-pin-montreal">
        <MapPin size={16} />
        Montreal
      </div>
      <div className="cis-map-pin cis-pin-halifax">
        <MapPin size={16} />
        Halifax
      </div>
    </div>
  );
}

export default function CISInfographicSite() {
  return (
    <main className="cis-site">
      <header className="cis-nav">
        <a href="#top" className="cis-brand" aria-label="Community Impact Report home">
          <span>LOJ</span>
          Community Impact Report
        </a>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <section className="cis-hero" id="top">
        <div className="cis-hero-grid">
          <div className="cis-hero-copy">
            <p className="cis-eyebrow">CIS-2025-26 Executive Report</p>
            <h1>Community Impact Report 2025-26</h1>
            <p className="cis-hero-slogan">What Gets Measured… Gets Improved.</p>
            <p className="cis-hero-intro">
              A national snapshot of Jewish Canadians’ safety, priorities, institutional trust, and
              community resilience after October 7.
            </p>
            <div className="cis-hero-actions">
              <a href="#findings" className="cis-button cis-button-primary">
                Explore findings <ChevronRight size={18} />
              </a>
              <a href="#action" className="cis-button cis-button-secondary">
                Take action <ExternalLink size={17} />
              </a>
            </div>
          </div>
          <div className="cis-hero-panel">
            <p>Produced by Lions of Judah</p>
            <strong>Protect. Empower. Amplify.</strong>
            <span>
              Independent community study conducted August–October 2025 with Logos Insights.
            </span>
          </div>
        </div>
        <div className="cis-stat-grid">
          {heroStats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </section>

      <section className="cis-section cis-intro">
        <SectionHeader
          eyebrow="Why this matters"
          title="From anecdotes to evidence, from concern to coordinated action."
          copy="The report frames this moment as a crossroads for Jewish Canada: heightened antisemitism, strained institutional capacity, and a community asking for clearer priorities, visible results, and shared accountability."
          id="findings"
        />
        <div className="cis-card-grid cis-three">
          {pillars.map(({ title, copy, icon: Icon }) => (
            <article className="cis-icon-card" key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cis-section cis-audience">
        <SectionHeader
          eyebrow="Who was heard"
          title="A broad grassroots consultation across major Jewish centres."
          copy="Respondents came from major Canadian communities and smaller centres, creating a community-driven view of priorities, sentiment, and lived experience."
        />
        <div className="cis-map-grid">
          <CanadaMap />
          <div className="cis-audience-panel">
            <h3>Major cities represented</h3>
            <div className="cis-chip-grid">
              {cities.map((city) => (
                <span key={city}>{city}</span>
              ))}
            </div>
            <div className="cis-demo-grid">
              {demographics.map((demo) => (
                <div key={demo.label}>
                  <strong>{demo.value}</strong>
                  <span>{demo.label}</span>
                </div>
              ))}
            </div>
            <p className="cis-note">
              The site presents these results as an aggregated community consultation, not a census
              of all Jewish Canadians.
            </p>
          </div>
        </div>
      </section>

      <section className="cis-section cis-priorities">
        <SectionHeader
          eyebrow="Community agenda"
          title="The clearest priority is safety."
          copy="Respondents ranked immediate safety and antisemitism ahead of broader advocacy, communications, and research needs."
        />
        <div className="cis-priority-list">
          {priorities.map(([title, copy], index) => (
            <article key={title} className="cis-priority-item">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cis-section cis-safety" id="safety">
        <SectionHeader
          eyebrow="Lived experience"
          title="The safety signal is stark."
          copy="The strongest findings show a community that feels less safe and underprepared for the threats it has faced."
        />
        <div className="cis-metric-grid">
          {safetyStats.map((stat) => (
            <MetricBar key={stat.label} {...stat} />
          ))}
        </div>
        <div className="cis-theme-cloud" aria-label="Themes from open-ended antisemitism responses">
          {themes.map((theme, index) => (
            <span key={theme} className={`cis-theme-${(index % 4) + 1}`}>
              {theme}
            </span>
          ))}
        </div>
      </section>

      <section className="cis-section cis-identity">
        <SectionHeader
          eyebrow="Jewish identity in public"
          title="Threat perception is changing everyday visibility."
          copy="The report points to pressure on symbols, institutions, recognizably Jewish individuals, and ordinary expressions of Jewish identity."
        />
        <div className="cis-gauge-grid">
          {identityPressures.map((item) => (
            <IdentityGauge item={item} key={item.label} />
          ))}
        </div>
      </section>

      <section className="cis-section cis-institutions" id="institutions">
        <SectionHeader
          eyebrow="Institutional satisfaction"
          title="Confidence is mixed, and visibility gaps matter."
          copy="The data compares community-reported satisfaction with named organizations. This should be read as perception data, not an institutional audit."
        />
        <div className="cis-legend">
          <span>
            <i className="cis-unsatisfied" /> Not satisfied
          </span>
          <span>
            <i className="cis-neutral" /> Indifferent
          </span>
          <span>
            <i className="cis-satisfied" /> Satisfied
          </span>
          <span>
            <i className="cis-unknown" /> Don’t know
          </span>
        </div>
        <div className="cis-org-list">
          {organizations.map((org) => (
            <OrganizationBar org={org} key={org.name} />
          ))}
        </div>
        <p className="cis-callout">
          B’nai Brith Canada shows the highest satisfaction in this dataset, while UJA Federation
          shows the highest dissatisfaction. High “don’t know” levels for some organizations also
          suggest a communications and visibility challenge.
        </p>
      </section>

      <section className="cis-section cis-comparison">
        <SectionHeader
          eyebrow="Grassroots vs. legacy"
          title="The opportunity is complementary strength, not a zero-sum fight."
          copy="Weighted scores show legacy organizations perceived as stronger in formal policy and media work, while grassroots efforts are perceived as stronger in mobilization, public opinion, unity, and belonging."
        />
        <div className="cis-comparison-legend">
          <span className="cis-grassroots-label">Grassroots perceived stronger</span>
          <span className="cis-legacy-label">Legacy perceived stronger</span>
        </div>
        <div className="cis-comparison-list">
          {comparisonScores.map((row) => (
            <ComparisonBar row={row} key={row[0]} />
          ))}
        </div>
        <div className="cis-strength-grid">
          <article>
            <h3>Legacy strengths</h3>
            <p>Policy, legislation, media coverage, formal advocacy infrastructure.</p>
          </article>
          <article>
            <h3>Grassroots strengths</h3>
            <p>Mobilization, belonging, public energy, community responsiveness.</p>
          </article>
          <article>
            <h3>Shared mandate</h3>
            <p>Safety, education, transparency, coordination, and measurable outcomes.</p>
          </article>
        </div>
      </section>

      <section className="cis-section cis-path" id="path-forward">
        <SectionHeader
          eyebrow="Path forward"
          title="Turn the findings into measurable community action."
          copy="The report’s constructive message is to build up: identify strengths, close gaps, coordinate resources, and track improvement over time."
        />
        <div className="cis-card-grid cis-three">
          {pathForward.map(([title, copy, Icon]) => (
            <article className="cis-action-card" key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cis-section cis-loj">
        <SectionHeader
          eyebrow="Introducing Lions of Judah"
          title="A community think tank with teeth."
          copy="LOJ positions itself as a solutions accelerator for a safer, stronger, more coordinated Jewish Canada."
        />
        <div className="cis-card-grid cis-three">
          {lojCards.map(({ title, copy, detail, icon: Icon }) => (
            <article className="cis-loj-card" key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{copy}</p>
              <strong>{detail}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="cis-section cis-cta" id="action">
        <div>
          <p className="cis-eyebrow">Calls to action</p>
          <h2>Help shape the next year of community impact.</h2>
          <p>
            Join the next study, submit questions, collaborate, or read the methodology behind the
            Community Impact Study.
          </p>
        </div>
        <div className="cis-cta-grid">
          {ctas.map(({ label, icon: Icon, href }) => (
            <a
              href={href}
              key={label}
              className="cis-cta-card"
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
            >
              <Icon />
              <span>{label}</span>
              <ChevronRight size={18} />
            </a>
          ))}
          <a
            href="mailto:hello@lionsofjudah.org?subject=Community%20Impact%20Report%202025-26"
            className="cis-cta-card"
          >
            <Download />
            <span>Request the full report</span>
            <ChevronRight size={18} />
          </a>
        </div>
      </section>

      <footer className="cis-footer">
        <div>
          <strong>Community Impact Report 2025-26</strong>
          <p>
            Findings are based on aggregated community responses, public information, and
            supplementary qualitative insights. No individual-level data is disclosed.
          </p>
        </div>
        <div>
          <a
            href="https://lionsofjudah.org/research-statement-methods"
            target="_blank"
            rel="noreferrer"
          >
            Research methods
          </a>
          <a href="mailto:hello@lionsofjudah.org">
            <Mail size={16} /> hello@lionsofjudah.org
          </a>
        </div>
      </footer>
    </main>
  );
}
