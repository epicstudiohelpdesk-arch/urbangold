const trimTrailingSlashes = (value) => value.replace(/\/+$/, '');
const API_BASE_CACHE_KEY = 'ug_api_base_url_v1';

function normalizeBaseUrl(rawValue) {
  const value = String(rawValue || '').trim();
  if (!value) return '';

  if (/^https?:\/\//i.test(value)) {
    return trimTrailingSlashes(value);
  }

  if (/^localhost(?::\d+)?$/i.test(value) || /^127\.0\.0\.1(?::\d+)?$/.test(value)) {
    return trimTrailingSlashes(`http://${value}`);
  }

  return trimTrailingSlashes(`https://${value.replace(/^\/+/, '')}`);
}

function addUniqueCandidate(list, value) {
  if (!value || typeof value !== 'string') return;
  const normalized = normalizeBaseUrl(value);
  if (!normalized) return;
  if (!list.includes(normalized)) {
    list.push(normalized);
  }
}

export function getApiBaseUrl() {
  if (typeof window !== 'undefined') {
    try {
      const cachedBaseUrl = window.localStorage.getItem(API_BASE_CACHE_KEY)?.trim();
      if (cachedBaseUrl) {
        const normalizedCachedBaseUrl = normalizeBaseUrl(cachedBaseUrl);
        if (normalizedCachedBaseUrl && normalizedCachedBaseUrl !== cachedBaseUrl) {
          window.localStorage.setItem(API_BASE_CACHE_KEY, normalizedCachedBaseUrl);
        }
        return normalizedCachedBaseUrl;
      }
    } catch (error) {
      // Ignore storage restrictions.
    }
  }

  const [firstCandidate = ''] = getApiBaseCandidates();
  return firstCandidate;
}

export function getApiBaseCandidates() {
  const configuredBaseUrl = process.env.REACT_APP_BACKEND_URL?.trim();
  const candidates = [];

  if (configuredBaseUrl) {
    addUniqueCandidate(candidates, configuredBaseUrl);
    addUniqueCandidate(candidates, `${configuredBaseUrl}/backend`);
  }

  if (typeof window !== 'undefined') {
    const { protocol, hostname, port, origin } = window.location;
    const isLocalHost = hostname === 'localhost' || hostname === '127.0.0.1';

    if (isLocalHost && port === '3000') {
      addUniqueCandidate(candidates, `${protocol}//${hostname}:8001`);
    }

    addUniqueCandidate(candidates, origin);
    addUniqueCandidate(candidates, `${origin}/backend`);
  }

  return candidates;
}

export function persistApiBaseUrl(baseUrl) {
  if (typeof window === 'undefined') return;

  try {
    if (baseUrl) {
      window.localStorage.setItem(API_BASE_CACHE_KEY, normalizeBaseUrl(baseUrl));
      return;
    }

    window.localStorage.removeItem(API_BASE_CACHE_KEY);
  } catch (error) {
    // Ignore storage restrictions.
  }
}

export function buildApiUrl(path, baseUrl = getApiBaseUrl()) {
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl);
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (!normalizedBaseUrl) {
    return normalizedPath;
  }

  // Guard against /api/api/... when REACT_APP_BACKEND_URL is configured with a trailing /api.
  if (
    normalizedBaseUrl.toLowerCase().endsWith('/api')
    && normalizedPath.toLowerCase().startsWith('/api/')
  ) {
    return `${normalizedBaseUrl}${normalizedPath.slice(4)}`;
  }

  return `${normalizedBaseUrl}${normalizedPath}`;
}
