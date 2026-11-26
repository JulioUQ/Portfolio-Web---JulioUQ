import type { APIRoute, GetStaticPaths } from 'astro';
import { buildKnowledge } from '../../lib/knowledge';
import { languages, type Lang } from '../../i18n/routes';

/** /knowledge/es.json y /knowledge/en.json: contenido publicado que la API del chat recupera antes de responder. */
export const getStaticPaths: GetStaticPaths = () => languages.map((lang) => ({ params: { lang } }));

export const GET: APIRoute = ({ params }) => {
  const lang = params.lang as Lang;
  const chunks = buildKnowledge(lang);
  return new Response(JSON.stringify({ lang, generatedAt: new Date().toISOString(), chunks }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
