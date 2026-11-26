import type { Target } from '../content/site';
import { routeFor, type Lang } from './routes';

export function hrefFor(target: Target, lang: Lang): string {
  if (target.kind === 'external') return target.href;
  const path = routeFor(target.route, lang);
  return target.hash ? `${path}#${target.hash}` : path;
}

export function isExternal(target: Target): boolean {
  return target.kind === 'external';
}
