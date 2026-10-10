import { useState } from 'react';
import { useNavigate } from 'react-router';
import { type formDataInterface } from './SignUpPage';
import { useUser } from '../context/userContext';

function SignInPage() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<formDataInterface>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const bodyPayload = new URLSearchParams(formData as never);

    try {
      const response = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        body: bodyPayload,
        credentials: 'include',
      });

      if (!response.ok) throw new Error(`Error signing up ${response.status}`);

      const result = await response.json();
      if (result.success) {
        const newRes = await fetch('http://localhost:8000/user/me', {
          credentials: 'include',
        });
        if (!newRes.ok) throw new Error('Error setting user object');
        const userObj = await newRes.json();
        setUser(userObj);
        console.log(userObj);
        navigate('/');
      }
    } catch (error) {
      console.error(`An error occured during registration ${error}`);
      setUser(null);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-slate-900 p-8 shadow-xl border border-slate-800">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-400">Please enter your details to sign in</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-slate-300">Email Address</label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="mt-1 block w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium uppercase tracking-wider text-slate-300">Password</label>
                <a href="#forgot" className="text-xs text-indigo-400 hover:text-indigo-300">
                  Forgot password?
                </a>
              </div>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="mt-1 block w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all"
          >
            Sign In
          </button>

          <p className="text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <a href="/signup" className="font-medium text-indigo-400 hover:text-indigo-300">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;