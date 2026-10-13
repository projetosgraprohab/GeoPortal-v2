/**
 * Utility to resolve and fetch static assets in a manner that works seamlessly across all environments:
 * 1. AI Studio Dev Server (root / or Express dev server)
 * 2. GitHub Pages repository subdirectory (e.g. https://<org>.github.io/<repo>/)
 * 3. GitHub Pages custom domains (e.g. https://geoportal.graprohab.sp.gov.br/)
 */

export function resolvePublicAssetUrl(path: string): string {
  if (!path) return '';
  if (
    path.startsWith('http://') || 
    path.startsWith('https://') || 
    path.startsWith('//') || 
    path.startsWith('blob:') || 
    path.startsWith('data:')
  ) {
    return path;
  }

  // Strip leading slashes and dot-slashes to get clean relative path (e.g. "data/sp_municipios_ibge.geojson")
  const cleanPath = path.replace(/^\.?\//, '');

  if (typeof window !== 'undefined' && window.location) {
    // 1. If Vite configured a non-root BASE_URL
    const envBase = (import.meta as any).env?.BASE_URL;
    if (envBase && envBase !== './' && envBase !== '.' && envBase !== '/') {
      const normalizedBase = envBase.endsWith('/') ? envBase : `${envBase}/`;
      const origin = window.location.origin;
      return `${origin}${normalizedBase.startsWith('/') ? '' : '/'}${normalizedBase}${cleanPath}`;
    }

    // 2. Extract pathname folder from window.location
    let pathname = window.location.pathname;
    if (pathname.endsWith('.html')) {
      pathname = pathname.substring(0, pathname.lastIndexOf('/') + 1);
    } else if (!pathname.endsWith('/')) {
      pathname = pathname + '/';
    }

    return `${window.location.origin}${pathname}${cleanPath}`;
  }

  return `./${cleanPath}`;
}

/**
 * Resilient JSON/GeoJSON fetcher for static public files.
 * Tries multiple relative/absolute candidate paths and ensures the returned response
 * is actually JSON (and not a fallback 404 HTML page returned by GitHub Pages SPA redirect).
 */
export async function fetchPublicJson<T = any>(path: string): Promise<T> {
  const clean = path.replace(/^\.?\//, '');
  const candidateUrls: string[] = [];

  const resolved = resolvePublicAssetUrl(path);
  if (resolved) candidateUrls.push(resolved);

  const dotSlash = `./${clean}`;
  if (!candidateUrls.includes(dotSlash)) candidateUrls.push(dotSlash);

  const slash = `/${clean}`;
  if (!candidateUrls.includes(slash)) candidateUrls.push(slash);

  let lastError: Error | null = null;

  for (const url of candidateUrls) {
    try {
      const res = await fetch(url, {
        headers: { Accept: 'application/json, application/vnd.geo+json' }
      });
      if (!res.ok) continue;

      const text = await res.text();
      // If server returned an HTML page (e.g., GitHub Pages 404.html), skip to next candidate
      if (!text || text.trim().startsWith('<')) {
        continue;
      }

      return JSON.parse(text) as T;
    } catch (e: any) {
      lastError = e;
    }
  }

  throw lastError || new Error(`Não foi possível carregar os dados geoespaciais de "${path}". Verifique a conexão.`);
}
