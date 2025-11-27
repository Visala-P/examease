const BASE = import.meta.env.VITE_API_URL || '';

// Student register: form-data
export async function registerStudent(fullName: string, email: string, password: string) {
  const form = new FormData();
  form.append('fullName', fullName);
  form.append('email', email);
  form.append('password', password);

  const res = await fetch(`${BASE}/api/student/register`, {
    method: 'POST',
    body: form,
  });
  if (!res.ok) throw new Error(`Register failed: ${res.status}`);
  return res.json();
}

// Student login: JSON
export async function loginStudent(email: string, password: string) {
  const res = await fetch(`${BASE}/api/student/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  return res.json(); // { token, user }
}

// Exams: public
export async function getExams() {
  const res = await fetch(`${BASE}/api/exams`);
  if (!res.ok) throw new Error(`Get exams failed: ${res.status}`);
  return res.json();
}

// Helper to attach Bearer token
export function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` } as const;
}

// Profile
export async function getMyProfile(token: string) {
  const res = await fetch(`${BASE}/api/student/me`, {
    headers: { ...authHeaders(token) },
  });
  if (!res.ok) throw new Error(`Get profile failed: ${res.status}`);
  return res.json();
}

export async function updateMyProfile(token: string, data: { name?: string; email?: string; password?: string }) {
  const res = await fetch(`${BASE}/api/student/me`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Update profile failed: ${res.status}`);
  return res.json();
}
