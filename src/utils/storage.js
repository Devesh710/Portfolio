import defaultProjects from '../assets/project';
import defaultSkills from '../assets/skills';

const TOKEN_KEY = 'portfolio_admin_token';
const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function getToken() {
  if (!canUseStorage()) return '';
  return window.localStorage.getItem(TOKEN_KEY) || '';
}

function setToken(token) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(TOKEN_KEY, token);
}

async function request(pathname, options = {}) {
  const response = await fetch(`${API_BASE}${pathname}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || 'Request failed');
  }

  return response.json();
}

export async function getStoredProjects() {
  try {
    return await request('/api/public/projects');
  } catch {
    return defaultProjects;
  }
}

export async function getStoredSkills() {
  try {
    return await request('/api/public/skills');
  } catch {
    return defaultSkills;
  }
}

export async function saveProjects(projects) {
  return request('/api/admin/projects', {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify(projects),
  });
}

export async function saveSkills(skills) {
  return request('/api/admin/skills', {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify(skills),
  });
}

export function isAdminAuthenticated() {
  return Boolean(getToken());
}

export async function verifyAdminSession() {
  const token = getToken();
  if (!token) return false;

  try {
    await request('/api/auth/verify', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch {
    return false;
  }
}

export async function loginAdmin(username, password) {
  try {
    const data = await request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    if (!data.token) return false;
    setToken(data.token);
    return true;
  } catch {
    return false;
  }
}

export async function logoutAdmin() {
  const token = getToken();
  if (!canUseStorage()) return;

  if (token) {
    try {
      await request('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // Ignore logout request failures and clear local token anyway.
    }
  }

  window.localStorage.removeItem(TOKEN_KEY);
}
