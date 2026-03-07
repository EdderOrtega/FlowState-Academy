import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Zap, Code2, Globe, Server, Smartphone, Brain,
  BookOpen, Users, Trophy, ArrowRight, ChevronRight,
  Star, TrendingUp, Play, Clock,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

// ── Static data ────────────────────────────────────────────────────────────────
const QUICK_ACTIONS = [
  {
    id: 'lessons',
    icon: BookOpen,
    label: 'Mis Lecciones',
    description: 'Continúa tu camino de aprendizaje',
    color: 'purple',
    iconColor: 'text-neon-purple-light',
    iconBg: 'bg-neon-purple/10',
    iconBorder: 'border-neon-purple/20',
    glowColor: 'rgba(139,92,246,0.15)',
    href: '/lessons',
  },
  {
    id: 'leaderboard',
    icon: Trophy,
    label: 'Leaderboard',
    description: 'Mira tu posición vs la comunidad',
    color: 'amber',
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10',
    iconBorder: 'border-amber-500/20',
    glowColor: 'rgba(245,158,11,0.12)',
    href: '/leaderboard',
  },
  {
    id: 'arena',
    icon: Users,
    label: 'Arena',
    description: 'Únete a proyectos colaborativos',
    color: 'cyan',
    iconColor: 'text-neon-cyan-light',
    iconBg: 'bg-neon-cyan/10',
    iconBorder: 'border-neon-cyan/20',
    glowColor: 'rgba(6,182,212,0.12)',
    href: '/#arena',
  },
  {
    id: 'docs',
    icon: Code2,
    label: 'Docs',
    description: 'Referencia técnica y guías del protocolo',
    color: 'emerald',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    iconBorder: 'border-emerald-500/20',
    glowColor: 'rgba(52,211,153,0.12)',
    href: '/docs',
  },
];

const STACK_ICONS = {
  frontend: Globe,
  backend: Server,
  mobile: Smartphone,
  ai: Brain,
};

const STACK_LABELS = {
  frontend: 'Frontend Web',
  backend: 'Backend & APIs',
  mobile: 'Mobile',
  ai: 'Inteligencia Artificial',
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'Developer';

  const avatarUrl =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    null;

  const selectedStack = profile?.selected_stack || null;
  const StackIcon = selectedStack ? (STACK_ICONS[selectedStack] || Globe) : Zap;

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
  };

  return (
    <div className="min-h-screen bg-void relative overflow-x-hidden">
      {/* ── Background Orbs ── */}
      <div className="orb w-[500px] h-[500px] bg-neon-purple/15 top-[-10%] left-[-8%]" style={{ animationDelay: '0s' }} />
      <div className="orb w-[400px] h-[400px] bg-neon-cyan/8 bottom-[5%] right-[-5%]" style={{ animationDelay: '5s' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-24">

        {/* ── Top bar ── */}
        <div className="flex items-center justify-between mb-14 animate-onboarding-fade-in">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center shadow-[0_0_16px_rgba(139,92,246,0.4)]">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-text-primary text-lg tracking-tight">FlowState</span>
            <span className="font-mono text-xs text-text-muted">Academy</span>
          </div>

          {/* User + Sign Out */}
          <div className="flex items-center gap-3">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-8 h-8 rounded-full border border-neon-purple/30"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-neon-purple/20 border border-neon-purple/30 flex items-center justify-center">
                <span className="text-xs font-bold text-neon-purple-light">
                  {displayName[0]?.toUpperCase()}
                </span>
              </div>
            )}
            <span className="text-sm text-text-secondary hidden sm:block">{displayName}</span>
            <button
              id="dashboard-signout-btn"
              onClick={handleSignOut}
              disabled={signingOut}
              className="text-xs font-mono text-text-muted hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg border border-border/50 hover:border-red-500/30 disabled:opacity-50 cursor-pointer"
            >
              {signingOut ? 'Saliendo...' : 'Salir'}
            </button>
          </div>
        </div>

        {/* ── Welcome Header ── */}
        <div className="mb-12 animate-onboarding-slide-up" style={{ animationDelay: '0.05s' }}>
          <p className="section-subtitle mb-4">// bienvenido_de_vuelta</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none mb-4">
            Hola,{' '}
            <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
              {displayName}
            </span>
          </h1>
          <p className="text-text-secondary text-base max-w-lg">
            Tu camino de aprendizaje te espera. ¿Qué quieres construir hoy?
          </p>
        </div>

        {/* ── Stack Badge (if selected) ── */}
        {selectedStack && (
          <div
            className="inline-flex items-center gap-3 px-4 py-3 rounded-xl border mb-12 animate-onboarding-fade-in"
            style={{
              background: 'rgba(139,92,246,0.08)',
              borderColor: 'rgba(139,92,246,0.25)',
              animationDelay: '0.1s',
            }}
          >
            <div className="w-7 h-7 rounded-lg bg-neon-purple/15 border border-neon-purple/25 flex items-center justify-center">
              <StackIcon size={14} className="text-neon-purple-light" />
            </div>
            <div>
              <p className="text-xs font-mono text-text-muted">tu camino</p>
              <p className="text-sm font-semibold text-text-primary">{STACK_LABELS[selectedStack]}</p>
            </div>
            <div className="ml-2 w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
          </div>
        )}

        {/* ── Quick Actions Grid ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14 animate-onboarding-slide-up"
          style={{ animationDelay: '0.12s' }}
        >
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                id={`dashboard-action-${action.id}`}
                onClick={() => navigate(action.href)}
                className="glass-card p-7 text-left group cursor-pointer w-full"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`p-3 rounded-xl ${action.iconBg} border ${action.iconBorder}`}>
                    <Icon size={22} className={action.iconColor} />
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-text-muted group-hover:text-neon-purple group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>
                <h3 className="text-base font-bold text-text-primary mb-1">{action.label}</h3>
                <p className="text-sm text-text-muted">{action.description}</p>
              </button>
            );
          })}
        </div>

        {/* ── Start Lesson CTA ── */}
        <div
          className="relative p-8 md:p-10 rounded-2xl overflow-hidden animate-onboarding-slide-up"
          style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(6,182,212,0.06) 100%)',
            border: '1px solid rgba(139,92,246,0.2)',
            animationDelay: '0.2s',
          }}
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-20 h-px bg-gradient-to-r from-neon-purple/50 to-transparent" />
          <div className="absolute top-0 left-0 w-px h-20 bg-gradient-to-b from-neon-purple/50 to-transparent" />
          <div className="absolute bottom-0 right-0 w-20 h-px bg-gradient-to-l from-neon-cyan/40 to-transparent" />
          <div className="absolute bottom-0 right-0 w-px h-20 bg-gradient-to-t from-neon-cyan/40 to-transparent" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-purple/20 to-neon-cyan/10 border border-neon-purple/25 flex items-center justify-center flex-shrink-0">
                <Play size={20} className="text-neon-purple-light" />
              </div>
              <div>
                <h2 className="font-bold text-text-primary text-lg mb-0.5">Empieza tu primera lección</h2>
                <p className="text-sm text-text-secondary">
                  Aprende con proyectos reales, no con tutoriales aburridos.
                </p>
              </div>
            </div>
            <button
              id="dashboard-start-lesson-btn"
              onClick={() => navigate('/lesson')}
              className="btn-glow flex items-center gap-2 text-sm whitespace-nowrap"
            >
              <Zap size={16} />
              Ir a lección
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* ── No stack selected prompt ── */}
        {!selectedStack && (
          <div
            className="mt-6 p-5 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-center gap-4 animate-onboarding-fade-in"
            style={{ animationDelay: '0.25s' }}
          >
            <Star size={18} className="text-amber-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-text-primary">No has elegido un camino todavía</p>
              <p className="text-xs text-text-muted mt-0.5">Selecciona un stack para personalizar tu experiencia.</p>
            </div>
            <button
              onClick={() => navigate('/onboarding')}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap cursor-pointer"
            >
              Elegir ahora →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
