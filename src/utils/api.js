const BASE_URL = import.meta.env.VITE_BACKEND_URL || `${window.location.origin.replace('3000', '8000')}`;

export async function apiGet(path, params) {
  const url = new URL(BASE_URL + path);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`GET ${path} failed`);
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(BASE_URL + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body || {})
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`POST ${path} failed: ${t}`);
  }
  return res.json();
}

export { BASE_URL };
