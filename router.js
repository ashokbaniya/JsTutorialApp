import { CURRICULUM } from './data/curriculum.js';



const CHAPTER_SLUGS = new Set(CURRICULUM.map((c) => c.slug));



export function parseRoute(pathname = window.location.pathname) {

  const parts = pathname.split('/').filter(Boolean); // e.g. ['javascript','closures']



  if (parts.length === 0) return { name: 'home' };

  if (parts[0] === 'about') return { name: 'about' };

  if (parts[0] === 'javascript' && parts[1] && CHAPTER_SLUGS.has(parts[1])) return { name: 'chapter', slug: parts[1] };

  if (parts[0] === 'javascript' && parts[1]) return { name: 'lesson', slug: parts[1] };

  if (parts[0] === 'javascript') return { name: 'home' };

  return { name: 'not-found' };

}



export function navigate(path) {

  if (path === window.location.pathname) return;

  window.history.pushState({}, '', path);

  window.dispatchEvent(new Event('routechange'));

}



export function onRouteChange(callback) {

  // Intercept clicks on same-origin, non-modified left-clicks on <a href="/...">

  // so normal navigation still works (view-source, right-click-open-in-new-tab,

  // crawlers following raw <a> hrefs) while in-app clicks become instant SPA nav.

  document.addEventListener('click', (e) => {

    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const link = e.target.closest('a');

    if (!link || link.target === '_blank' || link.hasAttribute('download')) return;

    const url = new URL(link.href, window.location.origin);

    if (url.origin !== window.location.origin) return;

    if (url.pathname === window.location.pathname && !url.hash) return;

    e.preventDefault();

    navigate(url.pathname);

  });



  window.addEventListener('popstate', callback);

  window.addEventListener('routechange', callback);

  window.addEventListener('DOMContentLoaded', callback);

} 

