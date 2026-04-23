import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ComposedChart, RadialBarChart, RadialBar, LabelList
} from 'recharts';
import {
  TrendingUp, TrendingDown, Download, Filter, ChevronRight, Search,
  LayoutGrid, Layers, Target, Eye, MapPin, Play, Users, MousePointer,
  Sparkles, ArrowUpRight, ArrowDownRight, Info, Store, Hash,
  ChevronDown, ChevronUp, MoreHorizontal, Calendar, Home
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  DESIGN TOKENS                                                             */
/* -------------------------------------------------------------------------- */

const T = {
  // Brand
  blue: '#0197D9', pink: '#F28CB4',
  b50:'#E6F6FD', b100:'#B8E5F7', b200:'#7FD1F0', b300:'#3FB8E6',
  b400:'#0197D9', b500:'#0179AD', b600:'#015A81', b700:'#013C56', b800:'#001E2B',
  p50:'#FDEDF4', p100:'#FAD3E3', p200:'#F7B8D2', p300:'#F4A0C3',
  p400:'#F28CB4', p500:'#D96B97', p600:'#B0497A', p700:'#7E2D57',
  // Neutrals
  n0:'#FFFFFF', n25:'#FBFAFA', n50:'#F5F4F4', n100:'#ECEAEA',
  n200:'#D9D6D6', n300:'#B8B3B3', n400:'#8F8A8A', n500:'#6B6666',
  n600:'#4D4848', n700:'#2E2A2A', n900:'#141212',
  // Semantic
  success:'#2BA875', successBg:'#E4F5ED',
  warning:'#E89827', warningBg:'#FCF1DF',
  danger:'#D64545',  dangerBg:'#FBE6E6',
  // Charts
  c1:'#0197D9', c2:'#F28CB4', c3:'#6B4EA8', c4:'#E89827',
  c5:'#2BA875', c6:'#0179AD', c7:'#D96B97', c8:'#8F8A8A',
  // Shadows
  shadowSm:'0 1px 2px rgba(1, 121, 173, 0.06)',
  shadowMd:'0 4px 12px rgba(1, 121, 173, 0.08), 0 1px 2px rgba(1, 121, 173, 0.04)',
  shadowLg:'0 12px 32px rgba(1, 121, 173, 0.10), 0 2px 6px rgba(1, 121, 173, 0.06)',
  // Easing
  easeOut:'cubic-bezier(0.22, 1, 0.36, 1)',
  easeSpring:'cubic-bezier(0.34, 1.56, 0.64, 1)',
  // Fonts
  fontDisplay:"'Poppins', 'Montserrat', system-ui, sans-serif",
  fontBody:"'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  fontMono:"'JetBrains Mono', 'SF Mono', Consolas, monospace",
};

/* -------------------------------------------------------------------------- */
/*  DATA                                                                      */
/* -------------------------------------------------------------------------- */

const CAMPAIGNS = [
  {
    id: 'greek',
    name: 'greek',
    theme: 'Greek Froyo',
    dateRange: 'Jun 1 – Sep 20, 2025',
    budget: 10000,
    spend: 11581.06,
    clicks: 51266,
    impressions: 6033138,
    ctr: 0.00850,
    cpc: 0.22589,
    reach: 624358,
    storeVisits: 1145.29,
    directions: 5655,
    otherEngagements: 12751,
    videoViews: 4603906,
    topDriver: 'TikTok',
    bestCtrChannel: 'Google',
    topKeyword: 'frozen yogurt near me',
    topKeywordClicks: 638,
    topCreative: "TikTok 'We popped into Yogen Fruz…' — 4,134 clicks / 664k views",
    insight: 'Best at efficient traffic scale via TikTok Youth ($0.09 CPC) plus strong Google search intent (8.01% Froyo ad-group CTR and 9.87% top-search-ad CTR).',
    budgetStatus: 'over',
    channels: {
      Google:      { spend: 1958.13, clicks: 6553,  impressions: 167637,  ctr: 0.0391, cpc: 0.30, reach: null },
      Meta:        { spend: 2217.26, clicks: 15187, impressions: 508646,  ctr: 0.0299, cpc: 0.15, reach: 299936 },
      TikTok:      { spend: 4914.00, clicks: 27989, impressions: 4644947, ctr: 0.0060, cpc: 0.18, reach: 624358, videoViews: 4603906 },
      GroundTruth: { spend: 2491.67, clicks: 1537,  impressions: 711908,  ctr: 0.00216, cpc: 1.62, reach: 227235 },
    },
  },
  {
    id: 'matcha',
    name: 'matcha',
    theme: 'Matcha',
    dateRange: 'Sep 22 – Nov 22, 2025',
    budget: 8000,
    spend: 9229.70,
    clicks: 37400,
    impressions: 3092059,
    ctr: 0.01210,
    cpc: 0.24678,
    reach: 468179,
    storeVisits: 1129.67,
    directions: 3638,
    otherEngagements: 14138,
    videoViews: 2034940,
    topDriver: 'TikTok',
    bestCtrChannel: 'Meta',
    topKeyword: 'yogen fruz',
    topKeywordClicks: 934,
    topCreative: "Google Search 'Try Our New Premium Matcha' — 2,208 clicks / 6.42% CTR",
    insight: "Strong blend of branded search demand and efficient paid social: Meta CTR exceeded 4% at a $0.12 CPC while search intent remained highly relevant around brand and 'near me' queries.",
    budgetStatus: 'over',
    channels: {
      Google:      { spend: 3196.90, clicks: 8798,  impressions: 303131,  ctr: 0.0290, cpc: 0.36, reach: null },
      Meta:        { spend: 1575.73, clicks: 13322, impressions: 320178,  ctr: 0.0416, cpc: 0.12, reach: 153801 },
      TikTok:      { spend: 3070.00, clicks: 13748, impressions: 2121983, ctr: 0.0065, cpc: 0.22, reach: 468179, videoViews: 2034940 },
      GroundTruth: { spend: 1387.07, clicks: 1532,  impressions: 346767,  ctr: 0.00442, cpc: 0.91, reach: 116388 },
    },
  },
  {
    id: 'wicked',
    name: 'wicked',
    theme: 'Wicked limited-time',
    dateRange: 'Nov 22 – Dec 31, 2025',
    budget: 8000,
    spend: 7919.07,
    clicks: 40555,
    impressions: 2920926,
    ctr: 0.01388,
    cpc: 0.19527,
    reach: 502071,
    storeVisits: 938.41,
    directions: 2362,
    otherEngagements: 10951,
    videoViews: 2300904,
    topDriver: 'Meta',
    bestCtrChannel: 'Meta',
    topKeyword: 'yogen fruz',
    topKeywordClicks: 577,
    topCreative: "Meta 'Ad7 Video — Wicked — Visit Store' — 2,660 clicks / 10.99% CTR",
    insight: 'Most balanced full-funnel mix: Google local conversions, standout Meta click efficiency, TikTok video scale, and measurable GroundTruth visits all contributed within roughly the planned budget envelope.',
    budgetStatus: 'under',
    channels: {
      Google:      { spend: 2995.29, clicks: 6473,  impressions: 184637,  ctr: 0.0351, cpc: 0.46, reach: null },
      Meta:        { spend: 1554.78, clicks: 19616, impressions: 333300,  ctr: 0.0589, cpc: 0.08, reach: 158507 },
      TikTok:      { spend: 3040.00, clicks: 14038, impressions: 2369819, ctr: 0.0059, cpc: 0.22, reach: 502071, videoViews: 2300904 },
      GroundTruth: { spend: 329,     clicks: 428,   impressions: 33170,   ctr: 0.01290, cpc: 0.77, reach: 20577 },
    },
  },
  {
    id: 'protein',
    name: 'protein',
    theme: 'Protein Refuel',
    dateRange: 'Feb 7 – Apr 15, 2026',
    budget: 8000,
    spend: 10429.09,
    clicks: 72146,
    impressions: 6803268,
    ctr: 0.01060,
    cpc: 0.1446,
    reach: 884361,
    storeVisits: 1614.66,
    directions: 5348,
    otherEngagements: 20056,
    videoViews: 4665110,
    topDriver: 'TikTok',
    bestCtrChannel: 'Google',
    topKeyword: 'frozen yogurt near me',
    topKeywordClicks: 1573,
    topCreative: "Google Search 'Add a Protein Scoop' — 4,566 clicks / 7.03% CTR",
    insight: 'Largest overall click volume in the file. Google Search and TikTok both scaled efficiently, but budget governance should be revisited because measured spend ran above the briefed amount.',
    budgetStatus: 'over',
    channels: {
      Google:      { spend: 4106.67, clicks: 16843, impressions: 371783,  ctr: 0.0453, cpc: 0.24, reach: null },
      Meta:        { spend: 2009.27, clicks: 26040, impressions: 1655548, ctr: 0.0157, cpc: 0.08, reach: 466027 },
      TikTok:      { spend: 4313.15, clicks: 29263, impressions: 4775937, ctr: 0.0061, cpc: 0.15, reach: 884361, videoViews: 4665110 },
      GroundTruth: { spend: 0,       clicks: 0,     impressions: 0,       ctr: 0,      cpc: 0,    reach: 0,      partial: true },
    },
  },

];

// Google local conversions
const CONVERSIONS = {
  greek:   { storeVisits: 1145.29, directions: 5655, menuViews: 1291, otherEng: 12751, websiteVisits: 861, clicksToCall: 188, orders: 75,  calls: 32 },
  matcha:  { storeVisits: 1129.67, directions: 3638, menuViews: 1301, otherEng: 14138, websiteVisits: 665, clicksToCall: 126, orders: 116, calls: 26 },
  protein: { storeVisits: 1614.66, directions: 5348, menuViews: 1457, otherEng: 20056, websiteVisits: 844, clicksToCall: 198, orders: 157, calls: 22 },
  wicked:  { storeVisits: 938.41,  directions: 2362, menuViews: 764,  otherEng: 10951, websiteVisits: 426, clicksToCall: 79,  orders: 78,  calls: 23 },
};

// Top search keywords (top 6 per campaign)
const KEYWORDS = {
  greek: [
    { kw: 'frozen yogurt near me', clicks: 638 },
    { kw: 'yogen fruz', clicks: 625 },
    { kw: 'yogen früz near me', clicks: 277 },
    { kw: 'frozen yogurt', clicks: 157 },
    { kw: 'yogen fruz near me', clicks: 130 },
    { kw: 'yogen fruz ice cream', clicks: 105 },
  ],
  matcha: [
    { kw: 'yogen fruz', clicks: 934 },
    { kw: 'frozen yogurt near me', clicks: 687 },
    { kw: 'yogen früz near me', clicks: 431 },
    { kw: 'ice cream near me', clicks: 211 },
    { kw: 'frozen yogurt shop near me', clicks: 147 },
    { kw: 'frozen yogurt', clicks: 143 },
  ],
  protein: [
    { kw: 'frozen yogurt near me', clicks: 1573 },
    { kw: 'yogen fruz', clicks: 1103 },
    { kw: 'yogen früz near me', clicks: 733 },
    { kw: 'frozen yogurt', clicks: 706 },
    { kw: 'froyo near me', clicks: 615 },
    { kw: 'frozen yogurt shop near me', clicks: 471 },
  ],
  wicked: [
    { kw: 'yogen fruz', clicks: 577 },
    { kw: 'frozen yogurt near me', clicks: 488 },
    { kw: 'yogen früz near me', clicks: 350 },
    { kw: 'frozen yogurt shop near me', clicks: 198 },
    { kw: 'ice cream near me', clicks: 166 },
    { kw: 'frozen yogurt', clicks: 142 },
  ],
};

// Top creatives (top 5 per campaign)
const CREATIVES = {
  greek: [
    { ch: 'TikTok',  title: 'We popped into Yogen Fruz for a quick treat…', clicks: 4134, ctr: 0.0062, views: 664181 },
    { ch: 'TikTok',  title: 'New obsession unlocked — Greek Froyo', clicks: 3361, ctr: 0.0081, views: 411844 },
    { ch: 'Meta',    title: 'Ad10 — Partner 2 Copy', clicks: 3174, ctr: 0.0385, views: null },
    { ch: 'TikTok',  title: 'New Greek Froyo at Yogen Fruz!', clicks: 2605, ctr: 0.0063, views: 410663 },
    { ch: 'Google',  title: 'Try Our New Greek Froyo', clicks: 1735, ctr: 0.0987, views: null },
  ],
  matcha: [
    { ch: 'Google',  title: 'Try Our New Premium Matcha (order online)', clicks: 2208, ctr: 0.0642, views: null },
    { ch: 'Google',  title: 'Try Our New Premium Matcha (find store)', clicks: 1768, ctr: 0.1177, views: null },
    { ch: 'Meta',    title: 'Ad6 — Find a Store — Copy', clicks: 1101, ctr: 0.0459, views: null },
    { ch: 'Meta',    title: 'PistachioPicks Ad', clicks: 1085, ctr: 0.0376, views: null },
    { ch: 'TikTok',  title: 'Matcha + mochi = the ultimate froyo duo', clicks: 980, ctr: 0.0072, views: 135378 },
  ],
  protein: [
    { ch: 'Meta',    title: 'Ad1 — Find a Store', clicks: 6938, ctr: 0.0089, views: null },
    { ch: 'Meta',    title: 'Ad1 — Find a Store', clicks: 4546, ctr: 0.0310, views: null },
    { ch: 'Google',  title: 'Add a Protein Scoop (order online)', clicks: 4566, ctr: 0.0703, views: null },
    { ch: 'Google',  title: 'Add a Protein Scoop (find store)', clicks: 4280, ctr: 0.0886, views: null },
    { ch: 'TikTok',  title: 'Protein Refuel. Anytime. Any Cup.', clicks: 4347, ctr: 0.0123, views: 325430 },
  ],
  wicked: [
    { ch: 'Meta',    title: 'Ad7 Video — Wicked — Visit Store', clicks: 2660, ctr: 0.1099, views: null },
    { ch: 'Meta',    title: 'Ad8 — Wicked Musical Tie-in', clicks: 2411, ctr: 0.0894, views: null },
    { ch: 'TikTok',  title: 'Wicked/Oz creative', clicks: 1720, ctr: 0.0048, views: 359007 },
    { ch: 'Google',  title: 'Wicked search creative', clicks: 541, ctr: 0.0269, views: null },
    { ch: 'GroundTruth', title: 'Wicked GT snapshot', clicks: 425, ctr: 0.0134, views: null },
  ],
};

// TikTok audience segments — per-campaign clicks/reach/cpc
// Note: Protein audience-level spend is truncated in the source PDF; CPC preserved where available.
const AUDIENCES = {
  Youth: {
    greek:   { clicks: 16081, reach: 204983, imp: 2297603, cpc: 0.09, spend: 1514 },
    matcha:  { clicks: 5464,  reach: 118977, imp: 723019,  cpc: 0.10, spend: 535.64 },
    protein: { clicks: 13811, reach: 110850, imp: 1708429, cpc: 0.08, spend: null },
    wicked:  { clicks: 5452,  reach: 81917,  imp: 656640,  cpc: 0.09, spend: 493.76 },
  },
  Foodie: {
    greek:   { clicks: 3848, reach: 229383, imp: 736909,  cpc: 0.29, spend: 1109.5 },
    matcha:  { clicks: 1717, reach: 122240, imp: 269622,  cpc: 0.29, spend: 505.69 },
    protein: { clicks: 5562, reach: 413847, imp: 1073463, cpc: 0.19, spend: null },
    wicked:  { clicks: 1751, reach: 195731, imp: 382470,  cpc: 0.28, spend: 488.89 },
  },
  Wellness: {
    greek:   { clicks: 2185, reach: 201246, imp: 483086,  cpc: 0.27, spend: 584.8 },
    matcha:  { clicks: 1604, reach: 108380, imp: 283063,  cpc: 0.31, spend: 503.08 },
    protein: { clicks: 5450, reach: 400079, imp: 1057275, cpc: 0.20, spend: null },
    wicked:  { clicks: 1724, reach: 93529,  imp: 298870,  cpc: 0.30, spend: 519.27 },
  },
  Parents: {
    greek:   { clicks: 2144, reach: 137681, imp: 424642, cpc: 0.28, spend: 590.1 },
    matcha:  { clicks: 1663, reach: 103053, imp: 286523, cpc: 0.30, spend: 502.06 },
    protein: { clicks: 4440, reach: 285461, imp: 936770, cpc: 0.25, spend: null },
    wicked:  { clicks: 1652, reach: 78421,  imp: 290960, cpc: 0.31, spend: 515.42 },
  },
  'Women Wellness': {
    greek:   { clicks: 2572, reach: 164662, imp: 549073, cpc: 0.27, spend: 706.2 },
    matcha:  { clicks: 1694, reach: 119267, imp: 279005, cpc: 0.31, spend: 525.06 },
    protein: null,
    wicked:  null,
  },
  'Women Wellness · Gen Z': {
    greek:   { clicks: 589,  reach: 31802,  imp: 79403,  cpc: 0.35, spend: 206.2 },
    matcha:  { clicks: 1606, reach: 107608, imp: 280751, cpc: 0.31, spend: 498.47 },
    protein: null,
    wicked:  { clicks: 1739, reach: 145130, imp: 381872, cpc: 0.30, spend: 524.13 },
  },
};

// Channel-level aggregate stats across all 4 campaigns
const CHANNEL_AGG = (() => {
  const names = ['Google', 'Meta', 'TikTok', 'GroundTruth'];
  return names.map(ch => {
    const rows = CAMPAIGNS.map(c => c.channels[ch]);
    const spend = rows.reduce((a, r) => a + (r.spend || 0), 0);
    const clicks = rows.reduce((a, r) => a + (r.clicks || 0), 0);
    const imp = rows.reduce((a, r) => a + (r.impressions || 0), 0);
    const reach = rows.reduce((a, r) => a + (r.reach || 0), 0);
    return {
      name: ch,
      spend, clicks, impressions: imp, reach,
      ctr: imp > 0 ? clicks / imp : 0,
      cpc: clicks > 0 ? spend / clicks : 0,
      campaigns: rows.filter(r => (r.clicks || 0) > 0).length,
    };
  });
})();

/* -------------------------------------------------------------------------- */
/*  UTILITIES                                                                 */
/* -------------------------------------------------------------------------- */

const fmtNum = (n, d = 0) => {
  if (n === null || n === undefined) return '—';
  if (Math.abs(n) >= 1_000_000) return (n / 1_000_000).toFixed(2).replace(/\.?0+$/, '') + 'M';
  if (Math.abs(n) >= 1_000) return (n / 1_000).toFixed(n >= 10_000 ? 1 : 1).replace(/\.0$/, '') + 'k';
  return n.toLocaleString('en-US', { maximumFractionDigits: d });
};
const fmtInt = (n) => n === null || n === undefined ? '—' : Math.round(n).toLocaleString('en-US');
const fmtMoney = (n, compact = false) => {
  if (n === null || n === undefined) return '—';
  if (compact && n >= 1000) return '$' + (n / 1000).toFixed(n >= 10_000 ? 1 : 2) + 'k';
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};
const fmtPct = (n, d = 2) => n === null || n === undefined ? '—' : (n * 100).toFixed(d) + '%';
const fmtCpc = (n) => n === null || n === undefined ? '—' : '$' + n.toFixed(2);

// Count-up hook
function useCountUp(target, duration = 800, trigger = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const from = 0;
    const to = target;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, trigger]);
  return val;
}

/* -------------------------------------------------------------------------- */
/*  BRAND MARK — stylized ü with smile                                        */
/* -------------------------------------------------------------------------- */

const UMark = ({ size = 28, color = T.blue, accent = T.pink }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* umlaut dots */}
    <circle cx="14" cy="6" r="2.2" fill={accent} />
    <circle cx="26" cy="6" r="2.2" fill={accent} />
    {/* u shape */}
    <path
      d="M10 12 V25 C10 30.5 14 34 20 34 C26 34 30 30.5 30 25 V12"
      stroke={color}
      strokeWidth="3.2"
      strokeLinecap="round"
      fill="none"
    />
    {/* tiny smile accent inside the u's bowl */}
    <path
      d="M15 26 Q20 29.5 25 26"
      stroke={accent}
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
      opacity="0.9"
    />
  </svg>
);

/* -------------------------------------------------------------------------- */
/*  SPARKLINE                                                                 */
/* -------------------------------------------------------------------------- */

const Sparkline = ({ data, color = T.blue, fill = true, height = 32 }) => {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 120;
  const h = height;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  });
  const path = `M ${pts.join(' L ')}`;
  const areaPath = `${path} L ${w},${h} L 0,${h} Z`;
  const gid = `sg-${color.replace('#', '')}-${data.join('_').slice(0, 20)}`;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={areaPath} fill={`url(#${gid})`} />}
      <path d={path} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((v, i) => {
        if (i !== data.length - 1) return null;
        const x = (i / (data.length - 1)) * w;
        const y = h - ((v - min) / range) * (h - 4) - 2;
        return <circle key={i} cx={x} cy={y} r="2.5" fill={color} />;
      })}
    </svg>
  );
};

/* -------------------------------------------------------------------------- */
/*  KPI CARD                                                                  */
/* -------------------------------------------------------------------------- */

const DeltaPill = ({ value, suffix = '%', inverse = false }) => {
  const positive = inverse ? value < 0 : value >= 0;
  const bg = positive ? T.successBg : T.dangerBg;
  const fg = positive ? T.success : T.danger;
  const Icon = positive ? ArrowUpRight : ArrowDownRight;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 2,
      background: bg, color: fg, padding: '3px 8px 3px 6px',
      borderRadius: 9999, fontSize: 11, fontWeight: 600,
      fontFamily: T.fontBody, letterSpacing: '-0.01em',
    }}>
      <Icon size={12} strokeWidth={2.25} />
      {Math.abs(value).toFixed(1)}{suffix}
    </span>
  );
};

const KPICard = ({ label, value, prefix = '', suffix = '', delta, deltaInverse, sparkData, sparkColor, context, hero, icon: Icon, isPct, compactBudget }) => {
  const animated = useCountUp(typeof value === 'number' ? value : 0, 820, value);
  const display = typeof value === 'number'
    ? (isPct ? (animated * 100).toFixed(2) + '%'
      : compactBudget ? fmtMoney(animated, true)
      : prefix + Math.round(animated).toLocaleString() + suffix)
    : value;

  return (
    <div style={{
      background: hero ? T.b50 : T.n0,
      border: `1px solid ${hero ? T.b100 : T.n100}`,
      borderRadius: 16,
      padding: '20px 22px',
      boxShadow: T.shadowSm,
      display: 'flex', flexDirection: 'column',
      gap: 10,
      transition: `transform ${T.easeOut} 200ms, box-shadow ${T.easeOut} 200ms`,
      cursor: 'default',
      position: 'relative',
      overflow: 'hidden',
      minHeight: 168,
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = T.shadowMd; e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = T.shadowSm; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          fontFamily: T.fontBody, fontSize: 13, fontWeight: 500,
          color: T.n500, letterSpacing: '-0.005em',
        }}>{label}</div>
        {Icon && (
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: hero ? T.b100 : T.n50,
            color: hero ? T.b600 : T.n500,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={15} strokeWidth={1.75} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
        <div style={{
          fontFamily: T.fontDisplay,
          fontSize: hero ? 40 : 32,
          lineHeight: '1',
          fontWeight: 700,
          color: hero ? T.b600 : T.n700,
          letterSpacing: '-0.02em',
          fontVariantNumeric: 'tabular-nums',
        }}>{display}</div>
        {delta !== undefined && delta !== null && <DeltaPill value={delta} inverse={deltaInverse} />}
      </div>

      {sparkData && (
        <div style={{ marginTop: 2, marginBottom: 2 }}>
          <Sparkline data={sparkData} color={sparkColor || (hero ? T.blue : T.blue)} />
        </div>
      )}

      <div style={{
        fontFamily: T.fontBody, fontSize: 11, color: T.n400,
        letterSpacing: '-0.005em', lineHeight: 1.4, marginTop: 'auto',
      }}>{context}</div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  CHART PANEL                                                               */
/* -------------------------------------------------------------------------- */

const Panel = ({ title, subtitle, rightSlot, children, pad = 24, style = {}, minH }) => (
  <div style={{
    background: T.n0, border: `1px solid ${T.n100}`,
    borderRadius: 16, boxShadow: T.shadowSm,
    padding: pad, display: 'flex', flexDirection: 'column', gap: 14,
    minHeight: minH, ...style,
  }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
      <div>
        <div style={{
          fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 600,
          color: T.n700, letterSpacing: '-0.015em',
        }}>{title}</div>
        {subtitle && (
          <div style={{
            fontFamily: T.fontBody, fontSize: 12, color: T.n500,
            marginTop: 3, letterSpacing: '-0.005em',
          }}>{subtitle}</div>
        )}
      </div>
      {rightSlot}
    </div>
    {children}
  </div>
);

/* -------------------------------------------------------------------------- */
/*  CUSTOM TOOLTIP                                                            */
/* -------------------------------------------------------------------------- */

const ChartTip = ({ active, payload, label, valueFormatter = (v) => v, labelFormatter }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{
      background: 'rgba(20, 18, 18, 0.92)',
      color: T.n0, padding: '10px 14px', borderRadius: 10,
      boxShadow: T.shadowLg,
      fontFamily: T.fontBody, fontSize: 12,
      minWidth: 150,
      backdropFilter: 'blur(6px)',
    }}>
      <div style={{ color: T.n100, marginBottom: 6, fontWeight: 500, fontSize: 11 }}>
        {labelFormatter ? labelFormatter(label) : label}
      </div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginTop: i === 0 ? 0 : 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color || p.fill || p.stroke, display: 'inline-block' }} />
            <span style={{ color: T.n100 }}>{p.name}</span>
          </div>
          <span style={{ fontFamily: T.fontMono, color: T.n0, fontWeight: 500 }}>
            {valueFormatter(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  MAIN DASHBOARD                                                            */
/* -------------------------------------------------------------------------- */

export default function Dashboard() {
  const [activeId, setActiveId] = useState('all');
  const [tableSort, setTableSort] = useState({ col: 'spend', dir: 'desc' });
  const [timeRange, setTimeRange] = useState('all-campaigns');
  const [activeNav, setActiveNav] = useState('overview');

  const isAll = activeId === 'all';
  const active = isAll ? null : CAMPAIGNS.find(c => c.id === activeId);

  // Aggregate when "all"
  const agg = useMemo(() => {
    if (active) return active;
    const sum = (k) => CAMPAIGNS.reduce((a, c) => a + (c[k] || 0), 0);
    const max = (k) => Math.max(...CAMPAIGNS.map(c => c[k] || 0));
    return {
      name: 'all campaigns',
      theme: '4-campaign portfolio',
      dateRange: 'Jun 1, 2025 – Apr 15, 2026',
      budget: sum('budget'),
      spend: sum('spend'),
      clicks: sum('clicks'),
      impressions: sum('impressions'),
      ctr: sum('clicks') / sum('impressions'),
      cpc: sum('spend') / sum('clicks'),
      reach: max('reach'), // non-additive, use max
      storeVisits: sum('storeVisits'),
      directions: sum('directions'),
      otherEngagements: sum('otherEngagements'),
      videoViews: sum('videoViews'),
    };
  }, [activeId]);

  // Spark data derived from the 4 campaigns
  const spendSeries = CAMPAIGNS.map(c => c.spend);
  const clicksSeries = CAMPAIGNS.map(c => c.clicks);
  const impSeries = CAMPAIGNS.map(c => c.impressions);
  const ctrSeries = CAMPAIGNS.map(c => c.ctr * 100);
  const storeSeries = CAMPAIGNS.map(c => c.storeVisits);

  const budgetUsedPct = (agg.spend / agg.budget) * 100;
  const budgetDelta = ((agg.spend - agg.budget) / agg.budget) * 100;

  // Channel spend stacked bar
  const channelSpendData = CAMPAIGNS.map(c => ({
    name: c.name,
    theme: c.theme,
    Google: c.channels.Google.spend,
    Meta: c.channels.Meta.spend,
    TikTok: c.channels.TikTok.spend,
    GroundTruth: c.channels.GroundTruth.spend,
  }));

  // Click share donut (across all or single)
  const clickShareData = useMemo(() => {
    const src = active ? [active] : CAMPAIGNS;
    const tot = { Google: 0, Meta: 0, TikTok: 0, GroundTruth: 0 };
    src.forEach(c => {
      tot.Google += c.channels.Google.clicks;
      tot.Meta += c.channels.Meta.clicks;
      tot.TikTok += c.channels.TikTok.clicks;
      tot.GroundTruth += c.channels.GroundTruth.clicks;
    });
    return Object.entries(tot)
      .filter(([, v]) => v > 0)
      .map(([k, v]) => ({ name: k, value: v }));
  }, [activeId]);

  const totalClickShare = clickShareData.reduce((a, b) => a + b.value, 0);

  // CTR comparison bar
  const ctrCompareData = CAMPAIGNS.map(c => ({
    name: c.name,
    ctr: c.ctr * 100,
    active: c.id === activeId,
  }));

  // CPC by channel per campaign — grouped
  const cpcData = CAMPAIGNS.map(c => ({
    name: c.name,
    Google: c.channels.Google.cpc,
    Meta: c.channels.Meta.cpc,
    TikTok: c.channels.TikTok.cpc,
  }));

  // Sort table
  const sortedCampaigns = useMemo(() => {
    const list = [...CAMPAIGNS];
    list.sort((a, b) => {
      const av = a[tableSort.col] || 0;
      const bv = b[tableSort.col] || 0;
      if (tableSort.dir === 'asc') return av - bv;
      return bv - av;
    });
    return list;
  }, [tableSort]);

  const handleSort = (col) => {
    setTableSort(prev => prev.col === col
      ? { col, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
      : { col, dir: 'desc' });
  };

  const SortHeader = ({ col, children, align = 'left' }) => (
    <th
      onClick={() => handleSort(col)}
      style={{
        padding: '12px 14px', textAlign: align, cursor: 'pointer',
        fontFamily: T.fontBody, fontSize: 12, fontWeight: 500,
        color: T.n600, userSelect: 'none',
        borderBottom: `1px solid ${T.n100}`, background: T.n50,
        transition: `color ${T.easeOut} 120ms`,
      }}
      onMouseEnter={e => e.currentTarget.style.color = T.b500}
      onMouseLeave={e => e.currentTarget.style.color = T.n600}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        {children}
        {tableSort.col === col ? (
          tableSort.dir === 'asc'
            ? <ChevronUp size={13} color={T.blue} strokeWidth={2.25} />
            : <ChevronDown size={13} color={T.blue} strokeWidth={2.25} />
        ) : null}
      </span>
    </th>
  );

  const Td = ({ children, mono = false, align = 'left', color = T.n600 }) => (
    <td style={{
      padding: '14px 14px', borderBottom: `1px solid ${T.n100}`,
      fontFamily: mono ? T.fontMono : T.fontBody,
      fontSize: 13, color, textAlign: align,
      letterSpacing: mono ? 0 : '-0.005em',
      fontVariantNumeric: mono ? 'tabular-nums' : 'normal',
    }}>{children}</td>
  );

  /* ---------- Render ---------- */

  const activeConv = active ? CONVERSIONS[active.id] : {
    storeVisits: CAMPAIGNS.reduce((a, c) => a + CONVERSIONS[c.id].storeVisits, 0),
    directions: CAMPAIGNS.reduce((a, c) => a + CONVERSIONS[c.id].directions, 0),
    menuViews: CAMPAIGNS.reduce((a, c) => a + CONVERSIONS[c.id].menuViews, 0),
    otherEng: CAMPAIGNS.reduce((a, c) => a + CONVERSIONS[c.id].otherEng, 0),
    websiteVisits: CAMPAIGNS.reduce((a, c) => a + CONVERSIONS[c.id].websiteVisits, 0),
    clicksToCall: CAMPAIGNS.reduce((a, c) => a + CONVERSIONS[c.id].clicksToCall, 0),
    orders: CAMPAIGNS.reduce((a, c) => a + CONVERSIONS[c.id].orders, 0),
    calls: CAMPAIGNS.reduce((a, c) => a + CONVERSIONS[c.id].calls, 0),
  };

  const activeKeywords = active ? KEYWORDS[active.id] : (() => {
    const m = new Map();
    CAMPAIGNS.forEach(c => KEYWORDS[c.id].forEach(k => {
      m.set(k.kw, (m.get(k.kw) || 0) + k.clicks);
    }));
    return [...m.entries()].map(([kw, clicks]) => ({ kw, clicks }))
      .sort((a, b) => b.clicks - a.clicks).slice(0, 6);
  })();

  const activeCreatives = active ? CREATIVES[active.id]
    : CAMPAIGNS.flatMap(c => CREATIVES[c.id].slice(0, 2))
        .sort((a, b) => b.clicks - a.clicks).slice(0, 5);

  return (
    <div style={{
      minHeight: '100vh',
      background: T.n25,
      fontFamily: T.fontBody,
      color: T.n600,
      letterSpacing: '-0.005em',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 10px; height: 10px; }
        ::-webkit-scrollbar-track { background: ${T.n50}; }
        ::-webkit-scrollbar-thumb { background: ${T.n200}; border-radius: 5px; border: 2px solid ${T.n50}; }
        ::-webkit-scrollbar-thumb:hover { background: ${T.n300}; }
        @keyframes yf-fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .yf-stagger > * {
          animation: yf-fade-up 520ms ${T.easeOut} both;
        }
        .yf-stagger > *:nth-child(1) { animation-delay: 0ms; }
        .yf-stagger > *:nth-child(2) { animation-delay: 60ms; }
        .yf-stagger > *:nth-child(3) { animation-delay: 120ms; }
        .yf-stagger > *:nth-child(4) { animation-delay: 180ms; }
        .yf-stagger > *:nth-child(5) { animation-delay: 240ms; }
        @keyframes yf-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        .yf-breathe { animation: yf-breathe 3s ease-in-out infinite; transform-origin: center; }
        @media (prefers-reduced-motion: reduce) {
          .yf-stagger > * { animation: none; }
          .yf-breathe { animation: none; }
        }
      `}</style>

      <div style={{ display: 'flex', minHeight: '100vh' }}>

        {/* -------- Sidebar -------- */}
        <aside style={{
          width: 72, background: T.n0,
          borderRight: `1px solid ${T.n100}`,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center',
          padding: '20px 0',
          position: 'sticky', top: 0, height: '100vh',
          flexShrink: 0,
          gap: 4,
        }}>
          <div style={{ marginBottom: 20 }} className="yf-breathe">
            <UMark size={34} />
          </div>
          {[
            { id: 'overview', Icon: Home, label: 'overview' },
            { id: 'campaigns', Icon: LayoutGrid, label: 'campaigns' },
            { id: 'channels', Icon: Layers, label: 'channels' },
            { id: 'audiences', Icon: Users, label: 'audiences' },
            { id: 'stores', Icon: Store, label: 'stores' },
          ].map(({ id, Icon, label }) => {
            const act = id === activeNav;
            return (
              <button
                key={id}
                onClick={() => setActiveNav(id)}
                title={label}
                style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: act ? T.b50 : 'transparent',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: act ? T.b600 : T.n500,
                  position: 'relative',
                  transition: `all ${T.easeOut} 180ms`,
                }}
                onMouseEnter={e => { if (!act) { e.currentTarget.style.background = T.n50; e.currentTarget.style.color = T.n700; } }}
                onMouseLeave={e => { if (!act) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = T.n500; } }}
              >
                {act && (
                  <span style={{
                    position: 'absolute', left: -14, top: 10, bottom: 10, width: 3,
                    background: T.blue, borderRadius: 2,
                  }} />
                )}
                <Icon size={20} strokeWidth={1.75} />
              </button>
            );
          })}
        </aside>

        {/* -------- Main content -------- */}
        <main style={{
          flex: 1, padding: '28px 36px 48px',
          maxWidth: 1440, margin: '0 auto', width: '100%',
          minWidth: 0,
        }}>

          {/* Top bar */}
          <header style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 28, gap: 16, flexWrap: 'wrap',
          }}>
            <div>
              <div style={{
                fontFamily: T.fontBody, fontSize: 12, color: T.n500,
                fontWeight: 500, marginBottom: 4,
              }}>
                {(() => {
                  const subs = {
                    overview: `performance marketing · ${agg.dateRange}`,
                    campaigns: `4-campaign portfolio · ${agg.dateRange}`,
                    channels: 'platform performance · google · meta · tiktok · groundtruth',
                    audiences: 'tiktok audience segments · where scale comes from',
                    stores: 'google local conversions · drive-to-store performance',
                  };
                  return subs[activeNav] || subs.overview;
                })()}
              </div>
              <h1 style={{
                margin: 0, fontFamily: T.fontDisplay, fontSize: 32,
                fontWeight: 700, color: T.n700, letterSpacing: '-0.025em',
                lineHeight: 1.1,
              }}>
                {active ? `${active.name} campaign` : activeNav}
              </h1>
            </div>

            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: T.n0, border: `1px solid ${T.n200}`,
                padding: '8px 14px', borderRadius: 9999,
                fontSize: 13, color: T.n600, fontWeight: 500,
                cursor: 'pointer',
              }}>
                <Calendar size={15} strokeWidth={1.75} />
                <span>all campaigns</span>
                <ChevronDown size={14} strokeWidth={2} />
              </div>
              <button style={{
                background: T.blue, color: T.n0, border: 'none',
                padding: '10px 20px', borderRadius: 9999,
                fontFamily: T.fontBody, fontSize: 13, fontWeight: 500,
                letterSpacing: '-0.005em',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                boxShadow: T.shadowSm,
                transition: `all ${T.easeOut} 180ms`,
              }}
                onMouseEnter={e => { e.currentTarget.style.background = T.b500; e.currentTarget.style.boxShadow = T.shadowMd; }}
                onMouseLeave={e => { e.currentTarget.style.background = T.blue; e.currentTarget.style.boxShadow = T.shadowSm; }}
              >
                <Download size={15} strokeWidth={2} />
                export csv
              </button>
            </div>
          </header>

          {/* Campaign filter chips */}
          <div style={{
            display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center'
          }}>
            <span style={{ fontSize: 12, color: T.n500, marginRight: 4, fontWeight: 500 }}>
              filter by campaign:
            </span>
            {[{ id: 'all', name: 'all campaigns' }, ...CAMPAIGNS].map(c => {
              const act = activeId === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 9999,
                    border: act ? `1px solid ${T.p300}` : `1px solid ${T.n100}`,
                    background: act ? T.p50 : T.n0,
                    color: act ? T.p600 : T.n600,
                    fontFamily: T.fontBody, fontSize: 13,
                    fontWeight: act ? 600 : 500, cursor: 'pointer',
                    letterSpacing: '-0.005em',
                    transition: `all ${T.easeOut} 160ms`,
                  }}
                  onMouseEnter={e => { if (!act) { e.currentTarget.style.background = T.n50; e.currentTarget.style.borderColor = T.n200; } }}
                  onMouseLeave={e => { if (!act) { e.currentTarget.style.background = T.n0; e.currentTarget.style.borderColor = T.n100; } }}
                >
                  {c.name}
                </button>
              );
            })}
          </div>

          {/* ================= VIEW ROUTER ================= */}

          {activeNav === 'overview' && (<>

          {/* HERO KPIs */}
          <div className="yf-stagger" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 18, marginBottom: 20,
          }}>
            <KPICard
              hero
              label="measured spend"
              value={agg.spend}
              compactBudget
              delta={budgetDelta}
              deltaInverse
              sparkData={spendSeries}
              sparkColor={T.blue}
              icon={Target}
              context={`${fmtMoney(agg.budget, true)} briefed · ${budgetUsedPct.toFixed(1)}% used`}
            />
            <KPICard
              label="measured clicks"
              value={agg.clicks}
              sparkData={clicksSeries}
              sparkColor={T.blue}
              icon={MousePointer}
              context={`blended cpc ${fmtCpc(agg.cpc)} · across 4 channels`}
            />
            <KPICard
              label="impressions"
              value={agg.impressions}
              sparkData={impSeries}
              sparkColor={T.c3}
              icon={Eye}
              context={`reach ${fmtNum(agg.reach)} max single-channel`}
            />
            <KPICard
              label="blended ctr"
              value={agg.ctr}
              isPct
              sparkData={ctrSeries}
              sparkColor={T.c4}
              icon={Sparkles}
              context={active ? `best channel: ${active.bestCtrChannel}` : 'wicked leads at 1.39%'}
            />
            <KPICard
              label="google store visits"
              value={agg.storeVisits}
              sparkData={storeSeries}
              sparkColor={T.success}
              icon={Store}
              context={`${fmtInt(activeConv.directions)} directions · ${fmtInt(activeConv.orders)} orders`}
            />
          </div>

          {/* Executive insight strip (single-campaign mode) */}
          {active && (
            <div style={{
              background: T.n0, border: `1px solid ${T.n100}`,
              borderRadius: 16, padding: '18px 22px', marginBottom: 20,
              display: 'flex', alignItems: 'flex-start', gap: 14,
              boxShadow: T.shadowSm,
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                background: T.p50, color: T.p600,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Sparkles size={17} strokeWidth={1.75} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: T.fontBody, fontSize: 12, color: T.n500,
                  fontWeight: 500, marginBottom: 2,
                }}>executive insight</div>
                <div style={{
                  fontFamily: T.fontBody, fontSize: 14, color: T.n700,
                  lineHeight: 1.55, letterSpacing: '-0.01em',
                }}>{active.insight}</div>
              </div>
              {active.budgetStatus === 'over' && (
                <div style={{
                  padding: '5px 11px', borderRadius: 9999,
                  background: T.warningBg, color: T.warning,
                  fontSize: 11, fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0,
                }}>
                  <Info size={12} strokeWidth={2.25} />
                  over budget
                </div>
              )}
            </div>
          )}

          {/* PRIMARY CHART — Channel spend stacked */}
          <Panel
            title="channel spend by campaign"
            subtitle="stacked by platform · measured spend from detailed reports"
            minH={340}
            style={{ marginBottom: 20 }}
            rightSlot={
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                {[
                  { k: 'Google', c: T.c1 },
                  { k: 'Meta', c: T.c2 },
                  { k: 'TikTok', c: T.c3 },
                  { k: 'GroundTruth', c: T.c4 },
                ].map(l => (
                  <div key={l.k} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: l.c }} />
                    <span style={{ fontSize: 12, color: T.n600, fontFamily: T.fontBody }}>{l.k}</span>
                  </div>
                ))}
              </div>
            }
          >
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={channelSpendData} margin={{ top: 10, right: 8, left: -6, bottom: 6 }}>
                <CartesianGrid stroke={T.n100} strokeDasharray="0" horizontal vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: T.n500, fontSize: 12, fontFamily: T.fontBody }}
                  axisLine={{ stroke: T.n100 }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: T.n500, fontSize: 11, fontFamily: T.fontMono }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => '$' + (v >= 1000 ? (v / 1000) + 'k' : v)}
                />
                <Tooltip
                  cursor={{ fill: T.b50, opacity: 0.55 }}
                  content={<ChartTip valueFormatter={(v) => fmtMoney(v)} />}
                />
                <Bar dataKey="Google" stackId="s" fill={T.c1} />
                <Bar dataKey="Meta" stackId="s" fill={T.c2} />
                <Bar dataKey="TikTok" stackId="s" fill={T.c3} />
                <Bar dataKey="GroundTruth" stackId="s" fill={T.c4} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Panel>

          {/* SECONDARY GRID — 2x2 */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 18, marginBottom: 20,
          }}>
            {/* CTR Compare */}
            <Panel title="blended ctr by campaign" subtitle="higher = better · limited-time creatives outperform">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={ctrCompareData} layout="vertical" margin={{ top: 4, right: 28, left: 8, bottom: 4 }}>
                  <CartesianGrid stroke={T.n100} horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fill: T.n500, fontSize: 11, fontFamily: T.fontMono }}
                    axisLine={false} tickLine={false}
                    tickFormatter={(v) => v.toFixed(2) + '%'}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fill: T.n600, fontSize: 13, fontFamily: T.fontBody }}
                    axisLine={false} tickLine={false}
                    width={70}
                  />
                  <Tooltip
                    cursor={{ fill: T.b50, opacity: 0.55 }}
                    content={<ChartTip valueFormatter={(v) => v.toFixed(2) + '%'} />}
                  />
                  <Bar dataKey="ctr" radius={[0, 8, 8, 0]}>
                    {ctrCompareData.map((entry, i) => (
                      <Cell key={i} fill={entry.active || isAll ? T.blue : T.n200} />
                    ))}
                    <LabelList dataKey="ctr" position="right"
                      formatter={(v) => v.toFixed(2) + '%'}
                      style={{ fill: T.n700, fontFamily: T.fontMono, fontSize: 11, fontWeight: 500 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Panel>

            {/* Click share donut */}
            <Panel title="click share by channel" subtitle={active ? `${active.name} only` : 'all campaigns combined'}>
              <div style={{ display: 'flex', alignItems: 'center', height: 240, gap: 20 }}>
                <div style={{ flex: '0 0 200px', height: 240, position: 'relative' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={clickShareData}
                        innerRadius={60}
                        outerRadius={90}
                        dataKey="value"
                        stroke="none"
                        paddingAngle={2}
                      >
                        {clickShareData.map((_, i) => (
                          <Cell key={i} fill={[T.c1, T.c2, T.c3, T.c4][i]} />
                        ))}
                      </Pie>
                      <Tooltip content={<ChartTip valueFormatter={(v) => fmtInt(v) + ' clicks'} />} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    pointerEvents: 'none',
                  }}>
                    <div style={{
                      fontFamily: T.fontDisplay, fontSize: 24,
                      fontWeight: 700, color: T.n700, letterSpacing: '-0.02em',
                    }}>{fmtNum(totalClickShare)}</div>
                    <div style={{ fontSize: 11, color: T.n500, marginTop: 2 }}>total clicks</div>
                  </div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {clickShareData.map((d, i) => {
                    const pct = (d.value / totalClickShare) * 100;
                    return (
                      <div key={d.name} style={{
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between', gap: 10,
                        padding: '6px 2px',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{
                            width: 10, height: 10, borderRadius: 3,
                            background: [T.c1, T.c2, T.c3, T.c4][i],
                          }} />
                          <span style={{ fontSize: 13, color: T.n600, fontFamily: T.fontBody }}>{d.name}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 13, color: T.n700, fontFamily: T.fontMono, fontWeight: 500 }}>
                            {pct.toFixed(1)}%
                          </span>
                          <span style={{ fontSize: 11, color: T.n400, fontFamily: T.fontMono }}>
                            {fmtNum(d.value)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Panel>

            {/* Reach comparison */}
            <Panel title="max single-channel reach" subtitle="tiktok drove top reach in 4/4 campaigns">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={CAMPAIGNS.map(c => ({ name: c.name, reach: c.reach, videoViews: c.videoViews }))}
                  margin={{ top: 10, right: 8, left: -6, bottom: 4 }}>
                  <CartesianGrid stroke={T.n100} horizontal vertical={false} />
                  <XAxis dataKey="name"
                    tick={{ fill: T.n500, fontSize: 12, fontFamily: T.fontBody }}
                    axisLine={{ stroke: T.n100 }} tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: T.n500, fontSize: 11, fontFamily: T.fontMono }}
                    axisLine={false} tickLine={false}
                    tickFormatter={(v) => v >= 1_000_000 ? (v / 1_000_000).toFixed(1) + 'M' : (v / 1_000) + 'k'}
                  />
                  <Tooltip
                    cursor={{ fill: T.b50, opacity: 0.55 }}
                    content={<ChartTip valueFormatter={(v) => fmtInt(v)} />}
                  />
                  <Bar dataKey="reach" name="Reach" fill={T.c1} radius={[8, 8, 0, 0]} />
                  <Bar dataKey="videoViews" name="TikTok video views" fill={T.p400} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Panel>

            {/* CPC grouped */}
            <Panel title="cost per click by channel" subtitle="meta + tiktok drive lowest cpc; google commands premium intent">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={cpcData} margin={{ top: 10, right: 8, left: -12, bottom: 4 }}>
                  <CartesianGrid stroke={T.n100} horizontal vertical={false} />
                  <XAxis dataKey="name"
                    tick={{ fill: T.n500, fontSize: 12, fontFamily: T.fontBody }}
                    axisLine={{ stroke: T.n100 }} tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: T.n500, fontSize: 11, fontFamily: T.fontMono }}
                    axisLine={false} tickLine={false}
                    tickFormatter={(v) => '$' + v.toFixed(2)}
                  />
                  <Tooltip
                    cursor={{ fill: T.b50, opacity: 0.55 }}
                    content={<ChartTip valueFormatter={(v) => '$' + v.toFixed(2)} />}
                  />
                  <Bar dataKey="Google" fill={T.c1} radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Meta" fill={T.c2} radius={[6, 6, 0, 0]} />
                  <Bar dataKey="TikTok" fill={T.c3} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Panel>
          </div>

          {/* CAMPAIGN TABLE */}
          <Panel
            title="campaign performance detail"
            subtitle="click column headers to sort · reach is non-additive (max single-channel)"
            style={{ marginBottom: 20 }}
            pad={0}
          >
            <div style={{ overflowX: 'auto', padding: '0 4px 4px' }}>
              <table style={{
                width: '100%', borderCollapse: 'separate', borderSpacing: 0,
                fontFamily: T.fontBody,
              }}>
                <thead>
                  <tr>
                    <SortHeader col="name">Campaign</SortHeader>
                    <SortHeader col="budget" align="right">Budget</SortHeader>
                    <SortHeader col="spend" align="right">Spend</SortHeader>
                    <SortHeader col="clicks" align="right">Clicks</SortHeader>
                    <SortHeader col="impressions" align="right">Impressions</SortHeader>
                    <SortHeader col="ctr" align="right">CTR</SortHeader>
                    <SortHeader col="cpc" align="right">CPC</SortHeader>
                    <SortHeader col="reach" align="right">Max reach</SortHeader>
                    <SortHeader col="storeVisits" align="right">Store visits</SortHeader>
                  </tr>
                </thead>
                <tbody>
                  {sortedCampaigns.map((c, i) => {
                    const over = c.budgetStatus === 'over';
                    const budgetPct = (c.spend / c.budget) * 100;
                    return (
                      <tr
                        key={c.id}
                        onClick={() => setActiveId(c.id)}
                        style={{
                          cursor: 'pointer',
                          background: activeId === c.id ? T.b50 : 'transparent',
                          transition: `background ${T.easeOut} 140ms`,
                        }}
                        onMouseEnter={e => { if (activeId !== c.id) e.currentTarget.style.background = T.n50; }}
                        onMouseLeave={e => { if (activeId !== c.id) e.currentTarget.style.background = 'transparent'; }}
                      >
                        <Td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <span style={{
                              fontWeight: 600, color: T.n700, fontSize: 14, letterSpacing: '-0.01em'
                            }}>{c.name}</span>
                            <span style={{ fontSize: 11, color: T.n400 }}>{c.theme} · {c.dateRange}</span>
                          </div>
                        </Td>
                        <Td mono align="right">{fmtMoney(c.budget)}</Td>
                        <Td mono align="right" color={T.n700}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
                            <span>{fmtMoney(c.spend)}</span>
                            <span style={{
                              fontSize: 10, padding: '2px 6px', borderRadius: 9999,
                              background: over ? T.warningBg : T.successBg,
                              color: over ? T.warning : T.success,
                              fontWeight: 600, fontFamily: T.fontBody,
                            }}>
                              {budgetPct.toFixed(0)}%
                            </span>
                          </div>
                        </Td>
                        <Td mono align="right" color={T.n700}>{fmtInt(c.clicks)}</Td>
                        <Td mono align="right">{fmtInt(c.impressions)}</Td>
                        <Td mono align="right" color={T.n700}>{fmtPct(c.ctr)}</Td>
                        <Td mono align="right">{fmtCpc(c.cpc)}</Td>
                        <Td mono align="right">{fmtInt(c.reach)}</Td>
                        <Td mono align="right" color={T.n700}>{fmtInt(c.storeVisits)}</Td>
                      </tr>
                    );
                  })}
                  {/* Totals row */}
                  <tr style={{ background: T.n50 }}>
                    <Td color={T.n700}>
                      <span style={{ fontWeight: 600, letterSpacing: '-0.01em' }}>total · 4 campaigns</span>
                    </Td>
                    <Td mono align="right" color={T.n700}>{fmtMoney(34000)}</Td>
                    <Td mono align="right" color={T.n700}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
                        <span style={{ fontWeight: 600 }}>{fmtMoney(39158.92)}</span>
                        <span style={{
                          fontSize: 10, padding: '2px 6px', borderRadius: 9999,
                          background: T.warningBg, color: T.warning, fontWeight: 600, fontFamily: T.fontBody,
                        }}>115%</span>
                      </div>
                    </Td>
                    <Td mono align="right" color={T.n700}>{fmtInt(201367)}</Td>
                    <Td mono align="right" color={T.n700}>{fmtInt(18849391)}</Td>
                    <Td mono align="right" color={T.n700}>{fmtPct(201367 / 18849391)}</Td>
                    <Td mono align="right" color={T.n700}>{fmtCpc(39158.92 / 201367)}</Td>
                    <Td mono align="right" color={T.n400}>
                      <span style={{ fontSize: 11 }}>non-additive</span>
                    </Td>
                    <Td mono align="right" color={T.n700}>{fmtInt(4828)}</Td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Panel>

          {/* BOTTOM GRID — Keywords + Creatives */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.3fr',
            gap: 18, marginBottom: 20,
          }}>
            {/* Keywords */}
            <Panel
              title="top search keywords"
              subtitle={active ? `${active.name} · top 6 by clicks` : 'across all campaigns · top 6 by clicks'}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {activeKeywords.map((k, i) => {
                  const maxC = Math.max(...activeKeywords.map(x => x.clicks));
                  const w = (k.clicks / maxC) * 100;
                  return (
                    <div key={k.kw} style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '8px 0',
                    }}>
                      <div style={{
                        fontFamily: T.fontMono, fontSize: 11, color: T.n400,
                        width: 20, flexShrink: 0,
                      }}>{i + 1}.</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: 13, color: T.n700, fontWeight: 500,
                          marginBottom: 4, letterSpacing: '-0.005em',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>{k.kw}</div>
                        <div style={{
                          height: 4, background: T.n100, borderRadius: 2,
                          overflow: 'hidden', position: 'relative',
                        }}>
                          <div style={{
                            position: 'absolute', left: 0, top: 0, bottom: 0,
                            width: w + '%', background: T.blue, borderRadius: 2,
                            transition: `width ${T.easeOut} 520ms`,
                          }} />
                        </div>
                      </div>
                      <div style={{
                        fontFamily: T.fontMono, fontSize: 13, color: T.n700,
                        fontWeight: 500, minWidth: 52, textAlign: 'right',
                      }}>{fmtInt(k.clicks)}</div>
                    </div>
                  );
                })}
              </div>
            </Panel>

            {/* Top creatives */}
            <Panel
              title="top creatives"
              subtitle={active ? `${active.name} · top 5 by clicks` : 'portfolio leaders · top 5 by clicks'}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {activeCreatives.map((cr, i) => {
                  const chColor = { Google: T.c1, Meta: T.c2, TikTok: T.c3, GroundTruth: T.c4 }[cr.ch];
                  return (
                    <div key={i} style={{
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr auto',
                      gap: 12, padding: '10px 12px',
                      background: T.n25, borderRadius: 12,
                      border: `1px solid ${T.n100}`,
                      alignItems: 'center',
                    }}>
                      <div style={{
                        padding: '4px 10px', borderRadius: 9999,
                        background: T.n0, border: `1px solid ${T.n100}`,
                        fontSize: 11, fontWeight: 600, color: chColor,
                        display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0,
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: chColor }} />
                        {cr.ch}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{
                          fontSize: 13, color: T.n700, fontWeight: 500,
                          letterSpacing: '-0.005em',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>{cr.title}</div>
                        <div style={{
                          fontSize: 11, color: T.n400, marginTop: 2,
                          fontFamily: T.fontMono,
                        }}>
                          ctr {fmtPct(cr.ctr, 2)}
                          {cr.views && <> · {fmtNum(cr.views)} views</>}
                        </div>
                      </div>
                      <div style={{
                        fontFamily: T.fontMono, fontSize: 14, color: T.n700,
                        fontWeight: 600, textAlign: 'right',
                      }}>{fmtInt(cr.clicks)}<span style={{ fontSize: 10, color: T.n400, marginLeft: 3 }}>clk</span></div>
                    </div>
                  );
                })}
              </div>
            </Panel>
          </div>

          {/* LOCAL CONVERSIONS */}
          <Panel
            title="google local conversion funnel"
            subtitle={active ? `${active.name} · local actions from google ads` : 'combined across 4 campaigns'}
            style={{ marginBottom: 20 }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 12,
            }}>
              {[
                { label: 'other engagements', val: activeConv.otherEng, Icon: Hash, c: T.c1 },
                { label: 'directions', val: activeConv.directions, Icon: MapPin, c: T.c2 },
                { label: 'menu views', val: activeConv.menuViews, Icon: Eye, c: T.c3 },
                { label: 'store visits', val: Math.round(activeConv.storeVisits), Icon: Store, c: T.success },
                { label: 'website visits', val: activeConv.websiteVisits, Icon: LayoutGrid, c: T.c6 },
                { label: 'orders', val: activeConv.orders, Icon: Target, c: T.c4 },
                { label: 'clicks to call', val: activeConv.clicksToCall, Icon: MousePointer, c: T.c7 },
                { label: 'calls from ads', val: activeConv.calls, Icon: Users, c: T.c3 },
              ].map(s => (
                <div key={s.label} style={{
                  background: T.n25, border: `1px solid ${T.n100}`,
                  borderRadius: 12, padding: '14px 16px',
                  display: 'flex', flexDirection: 'column', gap: 8,
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <div style={{ fontSize: 11, color: T.n500, fontWeight: 500 }}>{s.label}</div>
                    <div style={{
                      width: 22, height: 22, borderRadius: 6,
                      background: s.c + '1F', color: s.c,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <s.Icon size={12} strokeWidth={1.75} />
                    </div>
                  </div>
                  <div style={{
                    fontFamily: T.fontDisplay, fontSize: 22,
                    fontWeight: 700, color: T.n700,
                    letterSpacing: '-0.02em',
                    fontVariantNumeric: 'tabular-nums',
                  }}>{fmtInt(s.val)}</div>
                </div>
              ))}
            </div>
          </Panel>

          </>)}
          {/* ================= END OVERVIEW VIEW ================= */}


          {/* ================= CAMPAIGNS VIEW ================= */}
          {activeNav === 'campaigns' && (<>

          {/* Executive insight strip (if campaign selected) */}
          {active && (
            <div style={{
              background: T.n0, border: `1px solid ${T.n100}`,
              borderRadius: 16, padding: '18px 22px', marginBottom: 20,
              display: 'flex', alignItems: 'flex-start', gap: 14,
              boxShadow: T.shadowSm,
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                background: T.p50, color: T.p600,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Sparkles size={17} strokeWidth={1.75} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: T.n500, fontWeight: 500, marginBottom: 2 }}>executive insight</div>
                <div style={{ fontSize: 14, color: T.n700, lineHeight: 1.55, letterSpacing: '-0.01em' }}>{active.insight}</div>
              </div>
              {active.budgetStatus === 'over' && (
                <div style={{
                  padding: '5px 11px', borderRadius: 9999,
                  background: T.warningBg, color: T.warning,
                  fontSize: 11, fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0,
                }}>
                  <Info size={12} strokeWidth={2.25} />
                  over budget
                </div>
              )}
            </div>
          )}

          {/* 4 Campaign cards */}
          <div className="yf-stagger" style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 18, marginBottom: 20,
          }}>
            {CAMPAIGNS.map(c => {
              const isSelected = activeId === c.id;
              const over = c.budgetStatus === 'over';
              const budgetPct = (c.spend / c.budget) * 100;
              const channelSpend = [
                { name: 'Google', val: c.channels.Google.spend, color: T.c1 },
                { name: 'Meta',   val: c.channels.Meta.spend,   color: T.c2 },
                { name: 'TikTok', val: c.channels.TikTok.spend, color: T.c3 },
                { name: 'GT',     val: c.channels.GroundTruth.spend, color: T.c4 },
              ].filter(x => x.val > 0);
              return (
                <div
                  key={c.id}
                  onClick={() => setActiveId(isSelected ? 'all' : c.id)}
                  style={{
                    background: T.n0,
                    border: isSelected ? `1.5px solid ${T.b300}` : `1px solid ${T.n100}`,
                    borderRadius: 16, padding: 22,
                    boxShadow: isSelected ? T.shadowMd : T.shadowSm,
                    cursor: 'pointer',
                    transition: `all ${T.easeOut} 200ms`,
                    display: 'flex', flexDirection: 'column', gap: 16,
                    position: 'relative',
                  }}
                  onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.boxShadow = T.shadowMd; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                  onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.boxShadow = T.shadowSm; e.currentTarget.style.transform = 'translateY(0)'; } }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <div>
                      <div style={{
                        fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 700,
                        color: T.n700, letterSpacing: '-0.02em', textTransform: 'lowercase',
                      }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: T.n500, marginTop: 3 }}>
                        {c.theme} · {c.dateRange}
                      </div>
                    </div>
                    {over ? (
                      <span style={{
                        padding: '4px 10px', borderRadius: 9999,
                        background: T.warningBg, color: T.warning,
                        fontSize: 11, fontWeight: 600, flexShrink: 0,
                      }}>over budget</span>
                    ) : (
                      <span style={{
                        padding: '4px 10px', borderRadius: 9999,
                        background: T.successBg, color: T.success,
                        fontSize: 11, fontWeight: 600, flexShrink: 0,
                      }}>on plan</span>
                    )}
                  </div>

                  {/* Budget progress bar */}
                  <div>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      fontSize: 11, color: T.n500, marginBottom: 6,
                    }}>
                      <span>spend vs budget · {budgetPct.toFixed(0)}% used</span>
                      <span style={{ fontFamily: T.fontMono, color: T.n700, fontWeight: 500 }}>
                        {fmtMoney(c.spend)} / {fmtMoney(c.budget)}
                      </span>
                    </div>
                    <div style={{
                      height: 6, background: T.n100, borderRadius: 3,
                      position: 'relative', overflow: 'visible',
                    }}>
                      <div style={{
                        position: 'absolute', left: 0, top: 0, bottom: 0,
                        width: Math.min(100, budgetPct) + '%',
                        background: over ? T.warning : T.blue,
                        borderRadius: budgetPct > 100 ? '3px 0 0 3px' : 3,
                      }} />
                      {budgetPct > 100 && (
                        <div style={{
                          position: 'absolute', left: '100%', top: -1, bottom: -1,
                          width: Math.min(20, budgetPct - 100) + '%',
                          background: T.danger,
                          borderRadius: '0 3px 3px 0',
                        }} />
                      )}
                    </div>
                  </div>

                  {/* 4 mini stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                    {[
                      { label: 'clicks', val: fmtNum(c.clicks) },
                      { label: 'ctr', val: fmtPct(c.ctr, 2) },
                      { label: 'max reach', val: fmtNum(c.reach) },
                      { label: 'store visits', val: fmtInt(c.storeVisits) },
                    ].map(s => (
                      <div key={s.label} style={{
                        padding: '10px 12px', background: T.n25,
                        borderRadius: 10, border: `1px solid ${T.n100}`,
                      }}>
                        <div style={{ fontSize: 10, color: T.n500, fontWeight: 500, marginBottom: 3 }}>{s.label}</div>
                        <div style={{
                          fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 700,
                          color: T.n700, letterSpacing: '-0.015em',
                          fontVariantNumeric: 'tabular-nums',
                        }}>{s.val}</div>
                      </div>
                    ))}
                  </div>

                  {/* Channel spend segments */}
                  <div>
                    <div style={{ fontSize: 11, color: T.n500, fontWeight: 500, marginBottom: 6 }}>
                      channel spend allocation
                    </div>
                    <div style={{
                      display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden',
                      background: T.n100,
                    }}>
                      {channelSpend.map(ch => (
                        <div key={ch.name} style={{
                          width: (ch.val / c.spend * 100) + '%',
                          background: ch.color,
                          transition: `width ${T.easeOut} 400ms`,
                        }} title={`${ch.name}: ${fmtMoney(ch.val)}`} />
                      ))}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 8 }}>
                      {channelSpend.map(ch => (
                        <div key={ch.name} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: T.n500 }}>
                          <span style={{ width: 7, height: 7, borderRadius: 2, background: ch.color }} />
                          {ch.name} <span style={{ color: T.n700, fontFamily: T.fontMono, marginLeft: 2 }}>
                            {((ch.val / c.spend) * 100).toFixed(0)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tag row + insight */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    <span style={{ padding: '4px 10px', borderRadius: 9999, background: T.b50, color: T.b600, fontSize: 11, fontWeight: 600 }}>
                      top driver · {c.topDriver}
                    </span>
                    <span style={{ padding: '4px 10px', borderRadius: 9999, background: T.n50, color: T.n600, fontSize: 11, fontWeight: 500 }}>
                      best ctr · {c.bestCtrChannel}
                    </span>
                  </div>

                  <div style={{
                    fontSize: 12, color: T.n600, lineHeight: 1.5,
                    letterSpacing: '-0.005em', paddingTop: 4,
                    borderTop: `1px solid ${T.n100}`,
                  }}>
                    {c.insight}
                  </div>
                </div>
              );
            })}
          </div>

          </>)}
          {/* ================= END CAMPAIGNS VIEW ================= */}


          {/* ================= CHANNELS VIEW ================= */}
          {activeNav === 'channels' && (<>

          {/* Channel KPI row */}
          <div className="yf-stagger" style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 18, marginBottom: 20,
          }}>
            {CHANNEL_AGG.map((ch, i) => {
              const pctOfClicks = (ch.clicks / 201367) * 100;
              const chColor = [T.c1, T.c2, T.c3, T.c4][i];
              const isLive = ch.clicks > 0;
              return (
                <div key={ch.name} style={{
                  background: T.n0, border: `1px solid ${T.n100}`,
                  borderRadius: 16, padding: '20px 22px',
                  boxShadow: T.shadowSm, minHeight: 200,
                  display: 'flex', flexDirection: 'column', gap: 12,
                  opacity: isLive ? 1 : 0.7,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 10, height: 10, borderRadius: 3, background: chColor }} />
                      <span style={{
                        fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 600,
                        color: T.n700, letterSpacing: '-0.01em',
                      }}>{ch.name}</span>
                    </div>
                    <span style={{
                      fontSize: 10, color: T.n400, fontFamily: T.fontMono,
                    }}>{ch.campaigns}/4 campaigns</span>
                  </div>

                  <div>
                    <div style={{ fontSize: 11, color: T.n500, fontWeight: 500, marginBottom: 2 }}>clicks</div>
                    <div style={{
                      fontFamily: T.fontDisplay, fontSize: 28, fontWeight: 700,
                      color: T.n700, letterSpacing: '-0.02em',
                      fontVariantNumeric: 'tabular-nums',
                    }}>{fmtNum(ch.clicks)}</div>
                    <div style={{ fontSize: 11, color: T.n400, marginTop: 2 }}>
                      {pctOfClicks.toFixed(1)}% of total clicks
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 'auto' }}>
                    <div>
                      <div style={{ fontSize: 10, color: T.n500 }}>spend</div>
                      <div style={{ fontFamily: T.fontMono, fontSize: 14, color: T.n700, fontWeight: 500 }}>{fmtMoney(ch.spend)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: T.n500 }}>cpc</div>
                      <div style={{ fontFamily: T.fontMono, fontSize: 14, color: T.n700, fontWeight: 500 }}>{fmtCpc(ch.cpc)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: T.n500 }}>ctr</div>
                      <div style={{ fontFamily: T.fontMono, fontSize: 14, color: T.n700, fontWeight: 500 }}>{fmtPct(ch.ctr)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: T.n500 }}>impressions</div>
                      <div style={{ fontFamily: T.fontMono, fontSize: 14, color: T.n700, fontWeight: 500 }}>{fmtNum(ch.impressions)}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Channel spend stacked (reuse) */}
          <Panel
            title="channel spend by campaign"
            subtitle="stacked bars · reveals where each campaign's money went"
            minH={340}
            style={{ marginBottom: 20 }}
            rightSlot={
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                {[{ k: 'Google', c: T.c1 }, { k: 'Meta', c: T.c2 }, { k: 'TikTok', c: T.c3 }, { k: 'GroundTruth', c: T.c4 }].map(l => (
                  <div key={l.k} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: l.c }} />
                    <span style={{ fontSize: 12, color: T.n600 }}>{l.k}</span>
                  </div>
                ))}
              </div>
            }
          >
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={channelSpendData} margin={{ top: 10, right: 8, left: -6, bottom: 6 }}>
                <CartesianGrid stroke={T.n100} horizontal vertical={false} />
                <XAxis dataKey="name" tick={{ fill: T.n500, fontSize: 12, fontFamily: T.fontBody }} axisLine={{ stroke: T.n100 }} tickLine={false} />
                <YAxis tick={{ fill: T.n500, fontSize: 11, fontFamily: T.fontMono }} axisLine={false} tickLine={false}
                  tickFormatter={(v) => '$' + (v >= 1000 ? (v / 1000) + 'k' : v)} />
                <Tooltip cursor={{ fill: T.b50, opacity: 0.55 }} content={<ChartTip valueFormatter={(v) => fmtMoney(v)} />} />
                <Bar dataKey="Google" stackId="s" fill={T.c1} />
                <Bar dataKey="Meta" stackId="s" fill={T.c2} />
                <Bar dataKey="TikTok" stackId="s" fill={T.c3} />
                <Bar dataKey="GroundTruth" stackId="s" fill={T.c4} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Panel>

          {/* Two-panel row: CTR by channel + CPC grouped */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18, marginBottom: 20 }}>
            <Panel title="ctr by channel" subtitle="google leads intent-driven click-through">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={CHANNEL_AGG.map(ch => ({ name: ch.name, ctr: ch.ctr * 100 }))}
                  layout="vertical" margin={{ top: 4, right: 32, left: 14, bottom: 4 }}>
                  <CartesianGrid stroke={T.n100} horizontal={false} />
                  <XAxis type="number" tick={{ fill: T.n500, fontSize: 11, fontFamily: T.fontMono }}
                    axisLine={false} tickLine={false} tickFormatter={(v) => v.toFixed(1) + '%'} />
                  <YAxis type="category" dataKey="name"
                    tick={{ fill: T.n600, fontSize: 13, fontFamily: T.fontBody }}
                    axisLine={false} tickLine={false} width={90} />
                  <Tooltip cursor={{ fill: T.b50, opacity: 0.55 }}
                    content={<ChartTip valueFormatter={(v) => v.toFixed(2) + '%'} />} />
                  <Bar dataKey="ctr" radius={[0, 8, 8, 0]}>
                    {CHANNEL_AGG.map((_, i) => <Cell key={i} fill={[T.c1, T.c2, T.c3, T.c4][i]} />)}
                    <LabelList dataKey="ctr" position="right"
                      formatter={(v) => v.toFixed(2) + '%'}
                      style={{ fill: T.n700, fontFamily: T.fontMono, fontSize: 11, fontWeight: 500 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Panel>

            <Panel title="cost per click by campaign × channel" subtitle="meta + tiktok scale cheapest; google commands premium">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={cpcData} margin={{ top: 10, right: 8, left: -12, bottom: 4 }}>
                  <CartesianGrid stroke={T.n100} horizontal vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: T.n500, fontSize: 12 }} axisLine={{ stroke: T.n100 }} tickLine={false} />
                  <YAxis tick={{ fill: T.n500, fontSize: 11, fontFamily: T.fontMono }} axisLine={false} tickLine={false}
                    tickFormatter={(v) => '$' + v.toFixed(2)} />
                  <Tooltip cursor={{ fill: T.b50, opacity: 0.55 }}
                    content={<ChartTip valueFormatter={(v) => '$' + v.toFixed(2)} />} />
                  <Bar dataKey="Google" fill={T.c1} radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Meta" fill={T.c2} radius={[6, 6, 0, 0]} />
                  <Bar dataKey="TikTok" fill={T.c3} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Panel>
          </div>

          {/* Channel × campaign matrix table */}
          <Panel
            title="channel × campaign matrix"
            subtitle="clicks delivered per channel, per campaign · row totals in right column"
            pad={0}
            style={{ marginBottom: 20 }}
          >
            <div style={{ overflowX: 'auto', padding: '0 4px 4px' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr>
                    <th style={{ padding: '12px 14px', textAlign: 'left', fontSize: 12, fontWeight: 500, color: T.n600, background: T.n50, borderBottom: `1px solid ${T.n100}` }}>Channel</th>
                    {CAMPAIGNS.map(c => (
                      <th key={c.id} style={{ padding: '12px 14px', textAlign: 'right', fontSize: 12, fontWeight: 500, color: T.n600, background: T.n50, borderBottom: `1px solid ${T.n100}` }}>{c.name}</th>
                    ))}
                    <th style={{ padding: '12px 14px', textAlign: 'right', fontSize: 12, fontWeight: 600, color: T.n700, background: T.n50, borderBottom: `1px solid ${T.n100}` }}>total</th>
                  </tr>
                </thead>
                <tbody>
                  {['Google', 'Meta', 'TikTok', 'GroundTruth'].map((chName, chIdx) => {
                    const rowTotal = CAMPAIGNS.reduce((a, c) => a + c.channels[chName].clicks, 0);
                    const maxClicks = Math.max(...CAMPAIGNS.flatMap(c => ['Google', 'Meta', 'TikTok', 'GroundTruth'].map(n => c.channels[n].clicks)));
                    return (
                      <tr key={chName}>
                        <td style={{ padding: '14px', borderBottom: `1px solid ${T.n100}`, fontSize: 13 }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ width: 8, height: 8, borderRadius: 2, background: [T.c1, T.c2, T.c3, T.c4][chIdx] }} />
                            <span style={{ color: T.n700, fontWeight: 500 }}>{chName}</span>
                          </span>
                        </td>
                        {CAMPAIGNS.map(c => {
                          const v = c.channels[chName].clicks;
                          const intensity = maxClicks > 0 ? v / maxClicks : 0;
                          return (
                            <td key={c.id} style={{
                              padding: '14px', borderBottom: `1px solid ${T.n100}`,
                              fontFamily: T.fontMono, fontSize: 13, textAlign: 'right',
                              color: v > 0 ? T.n700 : T.n300,
                              background: v > 0 ? `rgba(1, 151, 217, ${intensity * 0.14})` : 'transparent',
                            }}>{v > 0 ? fmtInt(v) : '—'}</td>
                          );
                        })}
                        <td style={{
                          padding: '14px', borderBottom: `1px solid ${T.n100}`,
                          fontFamily: T.fontMono, fontSize: 13, textAlign: 'right',
                          color: T.n700, fontWeight: 600,
                        }}>{fmtInt(rowTotal)}</td>
                      </tr>
                    );
                  })}
                  <tr style={{ background: T.n50 }}>
                    <td style={{ padding: '14px', fontSize: 13, fontWeight: 600, color: T.n700 }}>campaign total</td>
                    {CAMPAIGNS.map(c => (
                      <td key={c.id} style={{ padding: '14px', fontFamily: T.fontMono, fontSize: 13, textAlign: 'right', color: T.n700, fontWeight: 600 }}>
                        {fmtInt(c.clicks)}
                      </td>
                    ))}
                    <td style={{ padding: '14px', fontFamily: T.fontMono, fontSize: 13, textAlign: 'right', color: T.n700, fontWeight: 700 }}>
                      {fmtInt(201367)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Panel>

          </>)}
          {/* ================= END CHANNELS VIEW ================= */}


          {/* ================= AUDIENCES VIEW ================= */}
          {activeNav === 'audiences' && (<>

          {(() => {
            // Aggregate audience data
            const audienceRows = Object.entries(AUDIENCES).map(([name, byCampaign]) => {
              const campaignClicks = {};
              let totalClicks = 0, totalReach = 0, totalImpr = 0, totalSpend = 0, campaignsCovered = 0;
              CAMPAIGNS.forEach(c => {
                const d = byCampaign[c.id];
                if (d) {
                  campaignClicks[c.id] = d.clicks;
                  totalClicks += d.clicks;
                  totalReach += d.reach;
                  totalImpr += d.imp;
                  if (d.spend) totalSpend += d.spend;
                  campaignsCovered++;
                } else {
                  campaignClicks[c.id] = 0;
                }
              });
              return {
                name,
                totalClicks, totalReach, totalImpr, totalSpend,
                campaignsCovered,
                ctr: totalImpr > 0 ? totalClicks / totalImpr : 0,
                cpc: totalSpend > 0 && totalClicks > 0 ? totalSpend / totalClicks : null,
                ...campaignClicks,
              };
            }).sort((a, b) => b.totalClicks - a.totalClicks);

            const youthRow = audienceRows.find(r => r.name === 'Youth');
            const totalAudClicks = audienceRows.reduce((a, r) => a + r.totalClicks, 0);

            return (
              <>
                {/* Hero row */}
                <div className="yf-stagger" style={{
                  display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 18, marginBottom: 20,
                }}>
                  <KPICard
                    hero
                    label="top audience"
                    value={"youth"}
                    icon={Users}
                    context={`${fmtInt(youthRow.totalClicks)} clicks · all 4 campaigns · avg cpc $0.09`}
                  />
                  <KPICard
                    label="tiktok audience clicks"
                    value={totalAudClicks}
                    icon={MousePointer}
                    context={`${fmtInt(youthRow.totalClicks)} from youth · ${((youthRow.totalClicks / totalAudClicks) * 100).toFixed(0)}% of total`}
                  />
                  <KPICard
                    label="audience segments"
                    value={audienceRows.length}
                    icon={Layers}
                    context="active across the portfolio"
                  />
                  <KPICard
                    label="cheapest segment"
                    value={"youth"}
                    icon={Target}
                    context="$0.08–$0.10 cpc · leads efficiency in every campaign"
                  />
                </div>

                {/* Insight strip */}
                <div style={{
                  background: T.b50, border: `1px solid ${T.b100}`,
                  borderRadius: 16, padding: '18px 22px', marginBottom: 20,
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                    background: T.b100, color: T.b600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Sparkles size={17} strokeWidth={1.75} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: T.b600, fontWeight: 500, marginBottom: 2 }}>audience insight</div>
                    <div style={{ fontSize: 14, color: T.n700, lineHeight: 1.55, letterSpacing: '-0.01em' }}>
                      youth audience drove the most clicks at the lowest cpc in <strong>all 4 campaigns</strong>. it's the single most repeatable unlock in tiktok's inventory — foodie and wellness fill out reach, but youth is the efficiency engine.
                    </div>
                  </div>
                </div>

                {/* Audience clicks comparison */}
                <Panel
                  title="clicks by audience segment"
                  subtitle="stacked by campaign · shows where each audience scales"
                  style={{ marginBottom: 20 }}
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={audienceRows} layout="vertical" margin={{ top: 10, right: 30, left: 80, bottom: 10 }}>
                      <CartesianGrid stroke={T.n100} horizontal={false} />
                      <XAxis type="number" tick={{ fill: T.n500, fontSize: 11, fontFamily: T.fontMono }}
                        axisLine={false} tickLine={false} tickFormatter={(v) => fmtNum(v)} />
                      <YAxis type="category" dataKey="name"
                        tick={{ fill: T.n600, fontSize: 12, fontFamily: T.fontBody }}
                        axisLine={false} tickLine={false} width={140} />
                      <Tooltip cursor={{ fill: T.b50, opacity: 0.55 }}
                        content={<ChartTip valueFormatter={(v) => fmtInt(v) + ' clicks'} />} />
                      <Bar dataKey="greek" name="greek" stackId="a" fill={T.c1} />
                      <Bar dataKey="matcha" name="matcha" stackId="a" fill={T.c2} />
                      <Bar dataKey="protein" name="protein" stackId="a" fill={T.c3} />
                      <Bar dataKey="wicked" name="wicked" stackId="a" fill={T.c4} radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 6 }}>
                    {CAMPAIGNS.map((c, i) => (
                      <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 10, height: 10, borderRadius: 2, background: [T.c1, T.c2, T.c3, T.c4][i] }} />
                        <span style={{ fontSize: 12, color: T.n600 }}>{c.name}</span>
                      </div>
                    ))}
                  </div>
                </Panel>

                {/* Audience × campaign matrix */}
                <Panel
                  title="audience × campaign matrix"
                  subtitle="tiktok audience performance by campaign · shaded by clicks"
                  pad={0}
                  style={{ marginBottom: 20 }}
                >
                  <div style={{ overflowX: 'auto', padding: '0 4px 4px' }}>
                    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                      <thead>
                        <tr>
                          <th style={{ padding: '12px 14px', textAlign: 'left', fontSize: 12, fontWeight: 500, color: T.n600, background: T.n50, borderBottom: `1px solid ${T.n100}` }}>Audience</th>
                          {CAMPAIGNS.map(c => (
                            <th key={c.id} style={{ padding: '12px 14px', textAlign: 'right', fontSize: 12, fontWeight: 500, color: T.n600, background: T.n50, borderBottom: `1px solid ${T.n100}` }}>{c.name}</th>
                          ))}
                          <th style={{ padding: '12px 14px', textAlign: 'right', fontSize: 12, fontWeight: 500, color: T.n600, background: T.n50, borderBottom: `1px solid ${T.n100}` }}>Total clicks</th>
                          <th style={{ padding: '12px 14px', textAlign: 'right', fontSize: 12, fontWeight: 500, color: T.n600, background: T.n50, borderBottom: `1px solid ${T.n100}` }}>Reach</th>
                        </tr>
                      </thead>
                      <tbody>
                        {audienceRows.map((row, i) => {
                          const maxCell = Math.max(...audienceRows.flatMap(r => CAMPAIGNS.map(c => r[c.id] || 0)));
                          return (
                            <tr key={row.name}>
                              <td style={{ padding: '14px', borderBottom: `1px solid ${T.n100}`, fontSize: 13, color: T.n700, fontWeight: 500 }}>
                                {row.name}
                                {i === 0 && <span style={{ marginLeft: 8, padding: '2px 8px', borderRadius: 9999, background: T.p50, color: T.p600, fontSize: 10, fontWeight: 600 }}>scale driver</span>}
                              </td>
                              {CAMPAIGNS.map(c => {
                                const v = row[c.id] || 0;
                                const intensity = maxCell > 0 ? v / maxCell : 0;
                                return (
                                  <td key={c.id} style={{
                                    padding: '14px', borderBottom: `1px solid ${T.n100}`,
                                    fontFamily: T.fontMono, fontSize: 13, textAlign: 'right',
                                    color: v > 0 ? T.n700 : T.n300,
                                    background: v > 0 ? `rgba(1, 151, 217, ${intensity * 0.18})` : 'transparent',
                                  }}>{v > 0 ? fmtInt(v) : '—'}</td>
                                );
                              })}
                              <td style={{ padding: '14px', borderBottom: `1px solid ${T.n100}`, fontFamily: T.fontMono, fontSize: 13, textAlign: 'right', color: T.n700, fontWeight: 600 }}>
                                {fmtInt(row.totalClicks)}
                              </td>
                              <td style={{ padding: '14px', borderBottom: `1px solid ${T.n100}`, fontFamily: T.fontMono, fontSize: 13, textAlign: 'right', color: T.n600 }}>
                                {fmtNum(row.totalReach)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Panel>
              </>
            );
          })()}

          </>)}
          {/* ================= END AUDIENCES VIEW ================= */}


          {/* ================= STORES VIEW ================= */}
          {activeNav === 'stores' && (<>

          {/* Hero stores KPI row */}
          <div className="yf-stagger" style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 18, marginBottom: 20,
          }}>
            <KPICard
              hero
              label="store visits (google)"
              value={Math.round(activeConv.storeVisits)}
              sparkData={storeSeries}
              sparkColor={T.success}
              icon={Store}
              context={active ? `${active.name} campaign` : 'across 4 campaigns · 1,300+ locations'}
            />
            <KPICard
              label="directions requests"
              value={activeConv.directions}
              sparkData={CAMPAIGNS.map(c => CONVERSIONS[c.id].directions)}
              sparkColor={T.blue}
              icon={MapPin}
              context="get-directions tap → walk-in intent"
            />
            <KPICard
              label="online orders"
              value={activeConv.orders}
              sparkData={CAMPAIGNS.map(c => CONVERSIONS[c.id].orders)}
              sparkColor={T.c4}
              icon={Target}
              context="order-online conversions from search"
            />
            <KPICard
              label="calls + inquiries"
              value={activeConv.clicksToCall + activeConv.calls}
              sparkData={CAMPAIGNS.map(c => CONVERSIONS[c.id].clicksToCall + CONVERSIONS[c.id].calls)}
              sparkColor={T.pink}
              icon={MousePointer}
              context={`${fmtInt(activeConv.clicksToCall)} clicks to call · ${fmtInt(activeConv.calls)} direct calls`}
            />
          </div>

          {/* Per-campaign store metrics table */}
          <Panel
            title="store drive-to-store results per campaign"
            subtitle="google local action outputs · sorted by store visits"
            pad={0}
            style={{ marginBottom: 20 }}
          >
            <div style={{ overflowX: 'auto', padding: '0 4px 4px' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr>
                    <th style={{ padding: '12px 14px', textAlign: 'left', fontSize: 12, fontWeight: 500, color: T.n600, background: T.n50, borderBottom: `1px solid ${T.n100}` }}>Campaign</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right', fontSize: 12, fontWeight: 500, color: T.n600, background: T.n50, borderBottom: `1px solid ${T.n100}` }}>Store visits</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right', fontSize: 12, fontWeight: 500, color: T.n600, background: T.n50, borderBottom: `1px solid ${T.n100}` }}>Directions</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right', fontSize: 12, fontWeight: 500, color: T.n600, background: T.n50, borderBottom: `1px solid ${T.n100}` }}>Menu views</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right', fontSize: 12, fontWeight: 500, color: T.n600, background: T.n50, borderBottom: `1px solid ${T.n100}` }}>Orders</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right', fontSize: 12, fontWeight: 500, color: T.n600, background: T.n50, borderBottom: `1px solid ${T.n100}` }}>Calls</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right', fontSize: 12, fontWeight: 500, color: T.n600, background: T.n50, borderBottom: `1px solid ${T.n100}` }}>Other engagements</th>
                  </tr>
                </thead>
                <tbody>
                  {[...CAMPAIGNS].sort((a, b) => CONVERSIONS[b.id].storeVisits - CONVERSIONS[a.id].storeVisits).map(c => {
                    const conv = CONVERSIONS[c.id];
                    const maxStore = Math.max(...CAMPAIGNS.map(x => CONVERSIONS[x.id].storeVisits));
                    return (
                      <tr key={c.id}
                        onClick={() => setActiveId(c.id)}
                        style={{
                          cursor: 'pointer',
                          background: activeId === c.id ? T.b50 : 'transparent',
                          transition: `background ${T.easeOut} 140ms`,
                        }}>
                        <td style={{ padding: '14px', borderBottom: `1px solid ${T.n100}`, fontSize: 13 }}>
                          <div style={{ fontWeight: 600, color: T.n700 }}>{c.name}</div>
                          <div style={{ fontSize: 11, color: T.n400, marginTop: 2 }}>{c.dateRange}</div>
                        </td>
                        <td style={{ padding: '14px', borderBottom: `1px solid ${T.n100}`, fontFamily: T.fontMono, fontSize: 14, textAlign: 'right', color: T.n700, fontWeight: 600 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
                            <div style={{ width: 60, height: 4, background: T.n100, borderRadius: 2, position: 'relative', overflow: 'hidden' }}>
                              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: (conv.storeVisits / maxStore * 100) + '%', background: T.success }} />
                            </div>
                            {fmtInt(conv.storeVisits)}
                          </div>
                        </td>
                        <td style={{ padding: '14px', borderBottom: `1px solid ${T.n100}`, fontFamily: T.fontMono, fontSize: 13, textAlign: 'right', color: T.n600 }}>{fmtInt(conv.directions)}</td>
                        <td style={{ padding: '14px', borderBottom: `1px solid ${T.n100}`, fontFamily: T.fontMono, fontSize: 13, textAlign: 'right', color: T.n600 }}>{fmtInt(conv.menuViews)}</td>
                        <td style={{ padding: '14px', borderBottom: `1px solid ${T.n100}`, fontFamily: T.fontMono, fontSize: 13, textAlign: 'right', color: T.n600 }}>{fmtInt(conv.orders)}</td>
                        <td style={{ padding: '14px', borderBottom: `1px solid ${T.n100}`, fontFamily: T.fontMono, fontSize: 13, textAlign: 'right', color: T.n600 }}>{fmtInt(conv.calls + conv.clicksToCall)}</td>
                        <td style={{ padding: '14px', borderBottom: `1px solid ${T.n100}`, fontFamily: T.fontMono, fontSize: 13, textAlign: 'right', color: T.n600 }}>{fmtInt(conv.otherEng)}</td>
                      </tr>
                    );
                  })}
                  <tr style={{ background: T.n50 }}>
                    <td style={{ padding: '14px', fontSize: 13, fontWeight: 600, color: T.n700 }}>total</td>
                    <td style={{ padding: '14px', fontFamily: T.fontMono, fontSize: 14, textAlign: 'right', color: T.n700, fontWeight: 700 }}>
                      {fmtInt(CAMPAIGNS.reduce((a, c) => a + CONVERSIONS[c.id].storeVisits, 0))}
                    </td>
                    <td style={{ padding: '14px', fontFamily: T.fontMono, fontSize: 13, textAlign: 'right', color: T.n700, fontWeight: 600 }}>
                      {fmtInt(CAMPAIGNS.reduce((a, c) => a + CONVERSIONS[c.id].directions, 0))}
                    </td>
                    <td style={{ padding: '14px', fontFamily: T.fontMono, fontSize: 13, textAlign: 'right', color: T.n700, fontWeight: 600 }}>
                      {fmtInt(CAMPAIGNS.reduce((a, c) => a + CONVERSIONS[c.id].menuViews, 0))}
                    </td>
                    <td style={{ padding: '14px', fontFamily: T.fontMono, fontSize: 13, textAlign: 'right', color: T.n700, fontWeight: 600 }}>
                      {fmtInt(CAMPAIGNS.reduce((a, c) => a + CONVERSIONS[c.id].orders, 0))}
                    </td>
                    <td style={{ padding: '14px', fontFamily: T.fontMono, fontSize: 13, textAlign: 'right', color: T.n700, fontWeight: 600 }}>
                      {fmtInt(CAMPAIGNS.reduce((a, c) => a + CONVERSIONS[c.id].calls + CONVERSIONS[c.id].clicksToCall, 0))}
                    </td>
                    <td style={{ padding: '14px', fontFamily: T.fontMono, fontSize: 13, textAlign: 'right', color: T.n700, fontWeight: 600 }}>
                      {fmtInt(CAMPAIGNS.reduce((a, c) => a + CONVERSIONS[c.id].otherEng, 0))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Panel>

          {/* Conversion funnel reused, expanded */}
          <Panel
            title="local conversion breakdown"
            subtitle={active ? `${active.name} campaign · 8 local action types` : 'combined · 8 local action types from google ads'}
            style={{ marginBottom: 20 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {[
                { label: 'other engagements', val: activeConv.otherEng, Icon: Hash, c: T.c1 },
                { label: 'directions', val: activeConv.directions, Icon: MapPin, c: T.c2 },
                { label: 'menu views', val: activeConv.menuViews, Icon: Eye, c: T.c3 },
                { label: 'store visits', val: Math.round(activeConv.storeVisits), Icon: Store, c: T.success },
                { label: 'website visits', val: activeConv.websiteVisits, Icon: LayoutGrid, c: T.c6 },
                { label: 'orders', val: activeConv.orders, Icon: Target, c: T.c4 },
                { label: 'clicks to call', val: activeConv.clicksToCall, Icon: MousePointer, c: T.c7 },
                { label: 'calls from ads', val: activeConv.calls, Icon: Users, c: T.c3 },
              ].map(s => (
                <div key={s.label} style={{
                  background: T.n25, border: `1px solid ${T.n100}`,
                  borderRadius: 12, padding: '14px 16px',
                  display: 'flex', flexDirection: 'column', gap: 8,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: 11, color: T.n500, fontWeight: 500 }}>{s.label}</div>
                    <div style={{
                      width: 22, height: 22, borderRadius: 6,
                      background: s.c + '1F', color: s.c,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <s.Icon size={12} strokeWidth={1.75} />
                    </div>
                  </div>
                  <div style={{
                    fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 700,
                    color: T.n700, letterSpacing: '-0.02em',
                    fontVariantNumeric: 'tabular-nums',
                  }}>{fmtInt(s.val)}</div>
                </div>
              ))}
            </div>
          </Panel>

          </>)}
          {/* ================= END STORES VIEW ================= */}


          {/* FOOTER */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 4px 4px',
            flexWrap: 'wrap', gap: 12,
          }}>
            <div style={{
              fontSize: 11, color: T.n400, fontFamily: T.fontBody,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: T.success, display: 'inline-block',
                }} />
                last refreshed · just now
              </span>
              <span>·</span>
              <span>sources: dashthis + campaign detail reports</span>
              <span>·</span>
              <span>roas pending revenue input</span>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <button style={{
                background: 'transparent', border: 'none', color: T.n500,
                fontSize: 12, cursor: 'pointer', fontFamily: T.fontBody,
                padding: '6px 10px', borderRadius: 6,
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <Info size={12} strokeWidth={1.75} />
                data coverage notes
              </button>
              <div style={{ fontSize: 11, color: T.n300, fontFamily: T.fontBody }}>
                crafted with <span style={{ color: T.pink }}>♥</span> by lumin8
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
