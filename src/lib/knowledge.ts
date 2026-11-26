/**
 * Base de conocimiento del chat. Se genera al construir la web a partir de los mismos módulos
 * de contenido que pintan las páginas (portada, catálogo, casos, trayectoria), así que el chat
 * solo puede citar lo que está publicado. Cada fragmento lleva la URL de la sección que lo respalda.
 */
import type { Lang } from '../i18n/routes';
import { routeFor } from '../i18n/routes';
import { site } from '../content/site';
import { projects, areaLabels } from '../content/projects';
import { cases } from '../content/cases';
import type { Block, CaseContent } from '../content/cases/types';
import { backgroundPage, milestones, kindLabels } from '../content/background';
import { fleetChart } from '../content/fleet-chart';

export interface Chunk {
  id: string;
  title: string;
  url: string;
  text: string;
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function blockText(block: Block, c: CaseContent): string {
  switch (block.type) {
    case 'p':
      return stripHtml(block.html);
    case 'list':
      return block.items.map((i) => `- ${stripHtml(i)}`).join('\n');
    case 'steps':
      return block.items.map((i, n) => `${n + 1}. ${i.title}: ${stripHtml(i.html)}`).join('\n');
    case 'table':
      return [block.caption, block.head.join(' | '), ...block.rows.map((r) => r.join(' | '))].join('\n');
    case 'code':
      return `${block.caption}: ${block.lines.join(' ')}`;
    case 'figure': {
      const f = c.figures[block.key];
      return f ? `${stripHtml(f.caption)} ${stripHtml(f.credit)}` : '';
    }
    case 'diagram':
      return c.diagram ? `${c.diagram.title}. ${c.diagram.intro} ${c.diagram.note} ${c.diagram.source}` : '';
    case 'roles':
      return [
        `${c.roles.collective.heading}: ${c.roles.collective.items.map(stripHtml).join(' ')}`,
        `${c.roles.individual.heading}: ${c.roles.individual.items.map(stripHtml).join(' ')}`,
      ].join('\n');
    case 'actions':
      return block.items.map((a) => [a.label, a.note].filter(Boolean).join(': ')).join('\n');
    default:
      return '';
  }
}

export function buildKnowledge(lang: Lang): Chunk[] {
  const out: Chunk[] = [];
  const t = site[lang];
  const home = routeFor('home', lang);

  out.push({
    id: 'home-hero',
    title: t.meta.title,
    url: home,
    text: `Julio Úbeda Quesada. ${t.hero.title}. ${t.hero.subtitle}`,
  });
  out.push({
    id: 'home-background',
    title: t.background.heading,
    url: `${home}#${t.ids.background}`,
    text: [
      t.background.intro,
      ...t.background.areas.map((a) => `${a.title}: ${a.items.map((i) => `${i.period} ${stripHtml(i.text)}`).join(' ')}`),
      `${t.background.education.heading}: ${t.background.education.items.join('; ')}`,
    ].join('\n'),
  });
  out.push({
    id: 'home-publications',
    title: t.publications.heading,
    url: `${home}#${t.ids.publications}`,
    text: [
      ...t.publications.articles.map((a) => `${a.role}: ${stripHtml(a.citation)} ${a.href}`),
      `${t.publications.talksHeading}: ${t.publications.talks.join('; ')}`,
    ].join('\n'),
  });
  out.push({
    id: 'home-contact',
    title: t.contact.heading,
    url: `${home}#${t.ids.contact}`,
    text: `${t.contact.text} GitHub: https://github.com/JulioUQ · LinkedIn: https://www.linkedin.com/in/juliouq/`,
  });

  for (const p of projects) {
    const x = p.text[lang];
    out.push({
      id: `project-${p.id}`,
      title: x.title,
      url: routeFor(p.route, lang),
      text: [
        x.context,
        x.summary,
        x.problem,
        x.role,
        `${lang === 'es' ? 'Herramientas' : 'Tools'}: ${p.tools.join(', ')}`,
        `${lang === 'es' ? 'Áreas' : 'Areas'}: ${p.areas.map((a) => areaLabels[lang][a]).join(', ')}`,
      ].join('\n'),
    });
  }

  for (const [key, byLang] of Object.entries(cases)) {
    const c = byLang[lang];
    const url = routeFor(key as keyof typeof cases, lang);
    out.push({
      id: `case-${key}-lead`,
      title: c.title,
      url,
      text: [
        c.kicker,
        `${c.lead.summaryLabel}: ${c.lead.summary}`,
        `${c.lead.roleLabel}: ${c.lead.role}`,
        ...c.facts.items.map((f) => `${f.label}: ${stripHtml(f.html)}`),
      ].join('\n'),
    });
    for (const s of c.sections) {
      const text = s.blocks.map((b) => blockText(b, c)).filter(Boolean).join('\n');
      if (s.blocks.some((b) => b.type === 'component' && b.name === 'fleetChart')) {
        out.push({
          id: `case-${key}-${s.id}-chart`,
          title: `${c.title} · ${fleetChart[lang].heading}`,
          url: `${url}#${s.id}`,
          text: fleetChart[lang].howTo.items.map(stripHtml).join('\n'),
        });
      }
      if (text) out.push({ id: `case-${key}-${s.id}`, title: `${c.title} · ${s.heading}`, url: `${url}#${s.id}`, text });
    }
    if (c.related) {
      out.push({
        id: `case-${key}-related`,
        title: `${c.title} · ${c.related.heading}`,
        url: `${url}#${c.related.id}`,
        text: stripHtml(c.related.html),
      });
    }
  }

  const b = backgroundPage[lang];
  const bg = routeFor('background', lang);
  out.push({ id: 'bg-intro', title: b.title, url: bg, text: b.intro });
  for (const s of b.stages) {
    out.push({
      id: `bg-stage-${s.id}`,
      title: `${s.kicker} · ${s.title}`,
      url: `${bg}#${s.id}`,
      text: `${s.period}. ${s.paragraphs.map(stripHtml).join(' ')}`,
    });
  }
  for (const m of milestones) {
    const x = m.text[lang];
    out.push({
      id: `bg-milestone-${m.id}`,
      title: `${x.title} (${x.period})`,
      url: bg,
      text: `${kindLabels[lang][m.kind]}. ${x.place}. ${x.period}. ${x.points.join(' ')}${
        x.related ? ` ${b.timeline.relatedLabel}: ${x.related.map((r) => r.label).join(', ')}` : ''
      }`,
    });
  }
  const e = b.education;
  for (const g of [e.degrees, e.programs, e.certifications]) {
    out.push({
      id: `bg-edu-${g.heading}`,
      title: `${e.heading} · ${g.heading}`,
      url: `${bg}#h-education`,
      text: g.items
        .map((i) => `${i.title} (${i.org}${i.period ? `, ${i.period}` : ''})${i.related ? `: ${i.related.map((r) => r.label).join(', ')}` : ''}`)
        .join('\n'),
    });
  }
  out.push({ id: 'bg-languages', title: `${e.heading} · ${e.languages.heading}`, url: `${bg}#h-education`, text: e.languages.items.join('; ') });

  return out;
}
