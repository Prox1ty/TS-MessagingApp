import { useState } from 'react';
import { LuLogIn, LuHash, LuArrowRight, LuListCheck } from 'react-icons/lu';
import { useNavigate } from 'react-router';

export default function RoomPage() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [joinedRoom, setJoinedRoom] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const cleanId = roomId.trim();

    if (!cleanId) {
      setError('Please enter a valid Room ID');
      return;
    }

    setError('');
    setIsSubmitting(true);

    navigate(`/room/${encodeURIComponent(cleanId)}`);
  };

  if (joinedRoom) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center bg-slate-950 px-4 py-12 text-slate-100">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-md text-center transition-all animate-in fade-in zoom-in-95 duration-200">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
            <LuListCheck size={8}/>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Joined Room!</h2>
          <p className="mt-2 text-sm text-slate-400">
            Connected to room <span className="font-mono font-semibold text-emerald-400">#{joinedRoom}</span>
          </p>
          <button
            onClick={() => {
              setJoinedRoom('');
              setRoomId('');
            }}
            className="mt-6 w-full rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            Leave Room
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-slate-950 px-4 py-12 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background ambient gradient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[34rem] h-[34rem] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl transition-all">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-400 ring-1 ring-indigo-500/20">
              <LuLogIn size={6} />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Join a Room</h1>
            <p className="mt-1.5 text-sm text-slate-400">
              Enter the room ID below to connect with others.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="roomId" className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-2">
                Room ID
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                  <LuHash size={4} />
                </div>
                <input
                  id="roomId"
                  type="text"
                  value={roomId}
                  onChange={(e) => {
                    setRoomId(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="e.g. creative-flow-402"
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                  className={`w-full rounded-xl border bg-slate-950/60 py-3 pl-10 pr-4 font-mono text-sm text-white placeholder-slate-500 outline-none transition-all ${
                    error
                      ? 'border-rose-500/60 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                      : 'border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                  }`}
                />
              </div>
              {error && (
                <p className="mt-2 text-xs text-rose-400 transition-opacity">
                  {error}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 px-4 text-sm font-medium text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Connecting...
                </span>
              ) : (
                <>
                  <span>Join Room</span>
                  <span className="transition-transform group-hover:translate-x-0.5" ><LuArrowRight size={4} /></span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}