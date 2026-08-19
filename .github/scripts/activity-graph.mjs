// Gera o SVG de atividade do perfil a partir do contribution calendar do GitHub.
// Sem dependencias: Node 18+ (fetch nativo).
//
//   GH_TOKEN=... LOGIN=danilofranco1990 node activity-graph.mjs
//   CONTRIB_JSON=contrib.json node activity-graph.mjs   (modo offline, para testar)

import { writeFileSync, readFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const OUT_DIR = process.env.OUT_DIR ?? 'assets'
const LOGIN = process.env.LOGIN ?? 'danilofranco1990'

const QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}`

async function loadCalendar() {
  if (process.env.CONTRIB_JSON) {
    const raw = JSON.parse(readFileSync(process.env.CONTRIB_JSON, 'utf8').replace(/^﻿/, ''))
    return raw.data.user.contributionsCollection.contributionCalendar
  }
  const token = process.env.GH_TOKEN
  if (!token) throw new Error('GH_TOKEN nao definido')

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      authorization: `bearer ${token}`,
      'content-type': 'application/json',
      'user-agent': 'activity-graph',
    },
    body: JSON.stringify({ query: QUERY, variables: { login: LOGIN } }),
  })
  if (!res.ok) throw new Error(`GitHub API respondeu ${res.status}: ${await res.text()}`)

  const body = await res.json()
  if (body.errors) throw new Error(`GraphQL: ${JSON.stringify(body.errors)}`)
  return body.data.user.contributionsCollection.contributionCalendar
}

// --- estatisticas -----------------------------------------------------------

function analyse(calendar) {
  const days = calendar.weeks.flatMap((w) => w.contributionDays)
  const max = Math.max(...days.map((d) => d.contributionCount), 1)

  // Sequencia atual: conta de tras pra frente. Um dia zerado no fim (hoje ainda
  // sem commit) nao quebra a sequencia; dois zerados quebram.
  let current = 0
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].contributionCount > 0) current++
    else if (i === days.length - 1) continue
    else break
  }

  let longest = 0
  let run = 0
  for (const d of days) {
    run = d.contributionCount > 0 ? run + 1 : 0
    if (run > longest) longest = run
  }

  const byMonth = new Map()
  for (const d of days) {
    const key = d.date.slice(0, 7)
    byMonth.set(key, (byMonth.get(key) ?? 0) + d.contributionCount)
  }
  let busiest = { key: null, total: 0 }
  for (const [key, total] of byMonth) if (total > busiest.total) busiest = { key, total }

  const weekTotals = calendar.weeks.map((w) =>
    w.contributionDays.reduce((sum, d) => sum + d.contributionCount, 0),
  )

  return { total: calendar.totalContributions, days, max, current, longest, busiest, weekTotals }
}

// --- tema e idioma ----------------------------------------------------------

const THEMES = {
  dark: {
    bgFrom: '#0D1117', bgTo: '#161B22', border: '#21262D',
    strong: '#F0F6FC', muted: '#8B949E', faint: '#6E7681',
    accent: '#58A6FF', rule: '#21262D',
    scale: ['#161B22', '#0E3B2E', '#17663F', '#3D9140', '#6DB33F'],
    cellStroke: '#FFFFFF', cellStrokeOpacity: 0.04,
    sparkFrom: 0.30, sparkTo: 0,
  },
  light: {
    bgFrom: '#FFFFFF', bgTo: '#F0F3F6', border: '#D8DEE4',
    strong: '#0D1117', muted: '#57606A', faint: '#6E7781',
    accent: '#0969DA', rule: '#D8DEE4',
    scale: ['#EBEDF0', '#CFE8B4', '#A3D07C', '#7FBF4D', '#5A9E32'],
    cellStroke: '#1B1F24', cellStrokeOpacity: 0.06,
    sparkFrom: 0.22, sparkTo: 0,
  },
}

const LOCALES = {
  en: {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    caption: 'contributions in the last year',
    less: 'Less', more: 'More',
    current: 'Current streak', longest: 'Longest streak', busiest: 'Busiest month',
    days: (n) => `${n} ${n === 1 ? 'day' : 'days'}`,
    rhythm: 'weekly rhythm',
    number: (n) => n.toLocaleString('en-US'),
  },
  pt: {
    months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    caption: 'contribuições no último ano',
    less: 'Menos', more: 'Mais',
    current: 'Sequência atual', longest: 'Maior sequência', busiest: 'Mês mais ativo',
    days: (n) => `${n} ${n === 1 ? 'dia' : 'dias'}`,
    rhythm: 'ritmo semanal',
    number: (n) => n.toLocaleString('pt-BR'),
  },
}

// --- geometria --------------------------------------------------------------

const W = 1000
const H = 360
const PAD = 48
const CELL = 13
const GAP = 4
const PITCH = CELL + GAP
const GRID_Y = 120
const GRID_BOTTOM = GRID_Y + 7 * PITCH - GAP // 235
const RHYTHM_Y = 264
const SPARK_Y = 274
const SPARK_H = 46
const FOOTER_Y = 344

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function level(count, max) {
  if (count === 0) return 0
  const ratio = count / max
  if (ratio <= 0.25) return 1
  if (ratio <= 0.5) return 2
  if (ratio <= 0.75) return 3
  return 4
}

function heatmap(calendar, stats, t) {
  const out = []
  calendar.weeks.forEach((week, x) => {
    week.contributionDays.forEach((day) => {
      const y = new Date(`${day.date}T00:00:00Z`).getUTCDay()
      const fill = t.scale[level(day.contributionCount, stats.max)]
      out.push(
        `<rect x="${PAD + x * PITCH}" y="${GRID_Y + y * PITCH}" width="${CELL}" height="${CELL}" rx="2.5" fill="${fill}" stroke="${t.cellStroke}" stroke-opacity="${t.cellStrokeOpacity}"/>`,
      )
    })
  })
  return out.join('\n    ')
}

function monthLabels(calendar, l, t) {
  const out = []
  let last = null
  calendar.weeks.forEach((week, x) => {
    const first = week.contributionDays[0]
    if (!first) return
    const month = first.date.slice(5, 7)
    // Pula o rotulo se a semana mal encostou no mes novo, senao o primeiro
    // rotulo cola no anterior.
    if (month !== last && x < calendar.weeks.length - 2) {
      if (last !== null || x === 0) {
        out.push(
          `<text x="${PAD + x * PITCH}" y="${GRID_Y - 14}" class="mo" fill="${t.faint}">${l.months[Number(month) - 1]}</text>`,
        )
      }
      last = month
    }
  })
  return out.join('\n    ')
}

function sparkline(stats, t) {
  const totals = stats.weekTotals
  const max = Math.max(...totals, 1)
  const width = totals.length * PITCH - GAP
  const step = width / (totals.length - 1)
  const yOf = (v) => SPARK_Y + SPARK_H - (v / max) * SPARK_H

  const pts = totals.map((v, i) => [PAD + i * step, yOf(v)])

  // Curva suave: cada segmento vira uma cubica com controles horizontais.
  let line = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1]
    const [x1, y1] = pts[i]
    const cx = (x0 + x1) / 2
    line += ` C ${cx.toFixed(1)} ${y0.toFixed(1)}, ${cx.toFixed(1)} ${y1.toFixed(1)}, ${x1.toFixed(1)} ${y1.toFixed(1)}`
  }
  const area = `${line} L ${(PAD + width).toFixed(1)} ${SPARK_Y + SPARK_H} L ${PAD} ${SPARK_Y + SPARK_H} Z`

  return `<path d="${area}" fill="url(#spark)"/>
    <path d="${line}" fill="none" stroke="${t.accent}" stroke-width="1.8" stroke-linecap="round"/>`
}

function legend(t, l) {
  const size = 11
  const gap = 3
  const pitch = size + gap
  // Ancora pela direita: "More" encosta na margem, os swatches ficam a esquerda
  // dele com folga, e "Less" a esquerda dos swatches.
  const moreX = W - PAD
  const swatchRight = moreX - 36
  const swatchStart = swatchRight - ((t.scale.length - 1) * pitch + size)
  const swatches = t.scale
    .map((fill, i) => `<rect x="${swatchStart + i * pitch}" y="52" width="${size}" height="${size}" rx="2.5" fill="${fill}" stroke="${t.cellStroke}" stroke-opacity="${t.cellStrokeOpacity}"/>`)
    .join('\n    ')
  return `<text x="${swatchStart - 8}" y="61.5" class="lg" text-anchor="end" fill="${t.faint}">${esc(l.less)}</text>
    ${swatches}
    <text x="${moreX}" y="61.5" class="lg" text-anchor="end" fill="${t.faint}">${esc(l.more)}</text>`
}

function footer(stats, l, t) {
  const [year, month] = stats.busiest.key.split('-')
  const items = [
    `${l.current}  ${l.days(stats.current)}`,
    `${l.longest}  ${l.days(stats.longest)}`,
    `${l.busiest}  ${l.months[Number(month) - 1]} ${year}  ·  ${l.number(stats.busiest.total)}`,
  ]
  // Distribui os tres blocos no eixo, ancorados a esquerda.
  const span = (W - PAD * 2) / 3
  return items
    .map((text, i) => {
      const [label, ...rest] = text.split('  ')
      const value = rest.join('  ')
      return `<text x="${PAD + i * span}" y="${FOOTER_Y}" class="ft">
      <tspan fill="${t.faint}">${esc(label)}</tspan><tspan fill="${t.strong}" dx="8" font-weight="600">${esc(value)}</tspan>
    </text>`
    })
    .join('\n    ')
}

function render(calendar, stats, themeName, localeName) {
  const t = THEMES[themeName]
  const l = LOCALES[localeName]

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(l.number(stats.total))} ${esc(l.caption)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${t.bgFrom}"/>
      <stop offset="100%" stop-color="${t.bgTo}"/>
    </linearGradient>
    <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${t.accent}" stop-opacity="${t.sparkFrom}"/>
      <stop offset="100%" stop-color="${t.accent}" stop-opacity="${t.sparkTo}"/>
    </linearGradient>
    <style>
      .big { font: 700 38px 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif; letter-spacing: 0.5px; }
      .cap { font: 400 13.5px 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif; letter-spacing: 0.4px; }
      .mo  { font: 500 11px 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif; letter-spacing: 0.6px; }
      .lg  { font: 400 10.5px 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif; }
      .ft  { font: 400 12px 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif; letter-spacing: 0.3px; }
      .rh  { font: 400 10.5px 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif; letter-spacing: 1.4px; }
    </style>
  </defs>

  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="16" fill="url(#bg)" stroke="${t.border}" stroke-width="1"/>

  <text x="${PAD}" y="62" class="big" fill="${t.strong}">${esc(l.number(stats.total))}</text>
  <text x="${PAD}" y="84" class="cap" fill="${t.muted}">${esc(l.caption)}</text>
  ${legend(t, l)}

  <g>
    ${monthLabels(calendar, l, t)}
  </g>
  <g>
    ${heatmap(calendar, stats, t)}
  </g>

  <text x="${PAD}" y="${RHYTHM_Y}" class="rh" fill="${t.faint}">${esc(l.rhythm.toUpperCase())}</text>
  ${sparkline(stats, t)}
  <line x1="${PAD}" y1="${SPARK_Y + SPARK_H + 0.5}" x2="${W - PAD}" y2="${SPARK_Y + SPARK_H + 0.5}" stroke="${t.rule}" stroke-width="1"/>

  ${footer(stats, l, t)}
</svg>
`
}

// --- main -------------------------------------------------------------------

const calendar = await loadCalendar()
const stats = analyse(calendar)

for (const theme of ['dark', 'light']) {
  for (const locale of ['en', 'pt']) {
    const file = resolve(OUT_DIR, `activity-${locale}-${theme}.svg`)
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, render(calendar, stats, theme, locale))
    console.log(`escrito ${file}`)
  }
}
console.log(
  `total ${stats.total} · max/dia ${stats.max} · sequencia ${stats.current} · maior ${stats.longest} · mes ${stats.busiest.key} (${stats.busiest.total})`,
)
