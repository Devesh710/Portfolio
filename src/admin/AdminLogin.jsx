import { useState } from 'react';
import { loginAdmin } from '../utils/storage';

export default function AdminLogin({ onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const ok = await loginAdmin(username.trim(), password);

    if (!ok) {
      setError('Invalid credentials. Try username: admin, password: admin123');
      setLoading(false);
      return;
    }

    setError('');
    setLoading(false);
    onSuccess();
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6">
      <section className="w-full rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Admin Login</h1>
        <p className="mt-2 text-sm text-gray-600">Sign in to manage skills and projects.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm text-gray-700">Username</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-md border px-3 py-2"
              placeholder="admin"
              autoComplete="username"
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border px-3 py-2"
              placeholder="admin123"
              autoComplete="current-password"
            />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={loading} className="w-full rounded-md bg-black px-4 py-2 text-white disabled:opacity-60">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </section>
    </main>
  );
}