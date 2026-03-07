import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.jsx';
import LoginModal from '../LoginModal';

export default function Navbar() {
  const location = useLocation();
  const { user, profile, loading, signOut } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const linkClass = (path) =>
    `hover:text-neon-purple transition-colors ${location.pathname === path ? 'text-neon-purple' : ''}`;

  // Build avatar URL — prefer profile avatar, fallback to GitHub metadata
  const avatarUrl =
    profile?.avatar_url ||
    user?.user_metadata?.avatar_url ||
    null;

  const displayName =
    profile?.username ||
    user?.user_metadata?.user_name ||
    user?.email?.split('@')[0] ||
    'Dev';

  const xp = profile?.xp ?? 0;

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-border/50 bg-void/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center font-bold text-sm text-white">
              FS
            </div>
            <span className="font-bold text-text-primary tracking-tight">FlowState</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-text-secondary">
            <Link to="/#atlas" className={linkClass('/#atlas')}>Atlas</Link>
            <Link to="/#arena" className={linkClass('/#arena')}>Arena</Link>
            <Link to="/leaderboard" className={linkClass('/leaderboard')}>Ranking</Link>
            <Link to="/docs" className={linkClass('/docs')}>Documentación</Link>
          </div>

          {/* Auth Section */}
          {loading ? (
            <div className="w-28 h-9 rounded-lg bg-surface/50 animate-pulse" />
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 px-3 py-1.5 rounded-xl border border-border/50 
                           hover:border-neon-purple/40 transition-all cursor-pointer bg-surface/30 hover:bg-surface/50"
              >
                {/* Avatar */}
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="w-7 h-7 rounded-full ring-2 ring-neon-purple/30"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center text-xs font-bold text-white">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}

                {/* XP Badge */}
                <div className="flex items-center gap-1">
                  <Zap size={14} className="text-neon-cyan-light" />
                  <span className="text-sm font-semibold text-text-primary font-mono">
                    {xp.toLocaleString()}
                  </span>
                  <span className="text-xs text-text-muted font-mono">XP</span>
                </div>

                <ChevronDown
                  size={14}
                  className={`text-text-muted transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown menu */}
              {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border/60 bg-zinc-950/95 backdrop-blur-xl shadow-2xl overflow-hidden animate-dropdown-in">
                  {/* User info header */}
                  <div className="px-4 py-3 border-b border-border/40">
                    <p className="text-sm font-semibold text-text-primary truncate">{displayName}</p>
                    <p className="text-xs text-text-muted font-mono truncate">{user.email}</p>
                  </div>

                  {/* Sign out */}
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      signOut();
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-text-secondary
                               hover:bg-surface/50 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <LogOut size={15} />
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="text-sm font-semibold px-4 py-2 rounded-lg border border-border hover:border-neon-purple hover:text-neon-purple-light transition-all cursor-pointer"
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
