import { useState } from 'react';
import { X, Github, Loader2, Zap } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function LoginModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleGitHubLogin = async () => {
    if (!supabase) {
      setError('Supabase no está configurado. Verifica las variables de entorno.');
      return;
    }
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    }
    // If successful, the browser redirects — no need to setLoading(false)
  };

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Iniciar sesión"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-md animate-modal-in">
        {/* Outer glow ring */}
        <div
          className="absolute -inset-px rounded-2xl opacity-60 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(139,92,246,0.5) 0%, rgba(6,182,212,0.3) 50%, rgba(139,92,246,0.5) 100%)',
            filter: 'blur(2px)',
          }}
        />

        {/* Card body */}
        <div className="relative rounded-2xl border border-neon-purple/25 bg-zinc-950 p-8 md:p-10 overflow-hidden">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-20 h-px bg-gradient-to-r from-neon-purple/60 to-transparent" />
          <div className="absolute top-0 left-0 w-px h-20 bg-gradient-to-b from-neon-purple/60 to-transparent" />
          <div className="absolute bottom-0 right-0 w-20 h-px bg-gradient-to-l from-neon-cyan/60 to-transparent" />
          <div className="absolute bottom-0 right-0 w-px h-20 bg-gradient-to-t from-neon-cyan/60 to-transparent" />

          {/* Background orb */}
          <div
            className="absolute top-[-30%] right-[-20%] w-[250px] h-[250px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-light/50 transition-all cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-neon-purple/20 to-neon-cyan/10 border border-neon-purple/25 mb-5">
              <Zap size={26} className="text-neon-purple-light" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Entra al{' '}
              <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
                FlowState
              </span>
            </h2>
            <p className="text-sm text-text-muted font-mono">
              // conecta tu GitHub y empieza a subir de nivel
            </p>
          </div>

          {/* GitHub Button */}
          <button
            onClick={handleGitHubLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-base
                       bg-white text-zinc-950 
                       hover:bg-zinc-100 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-300 cursor-pointer
                       border border-transparent hover:border-neon-purple/30"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Github size={20} />
            )}
            {loading ? 'Conectando...' : 'Continuar con GitHub'}
          </button>

          {/* Error message */}
          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-mono">
              {error}
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border/50" />
            <span className="text-xs text-text-muted font-mono">info</span>
            <div className="flex-1 h-px bg-border/50" />
          </div>

          {/* Info text */}
          <p className="text-xs text-text-muted text-center leading-relaxed">
            Usamos GitHub para verificar tu perfil de developer.
            <br />
            <span className="text-text-secondary">
              No publicamos nada en tu cuenta.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
