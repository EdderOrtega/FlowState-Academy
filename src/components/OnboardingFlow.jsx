import { useState } from 'react';
import { Globe, Server, Smartphone, Brain, ArrowRight, Zap, Check, Star } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

// ── Stack Data ────────────────────────────────────────────────────────────────
const STACKS = [
  {
    id: 'frontend',
    label: 'Frontend Web',
    icon: Globe,
    description: 'React, TypeScript, CSS avanzado y experiencias de usuario de alto impacto.',
    tags: ['React', 'TypeScript', 'CSS'],
    recommended: true,
    color: 'purple',
    iconColor: 'text-neon-purple-light',
    iconBg: 'bg-neon-purple/15',
    iconBorder: 'border-neon-purple/30',
  },
  {
    id: 'backend',
    label: 'Backend & APIs',
    icon: Server,
    description: 'Node.js, bases de datos, REST y GraphQL para sistemas robustos y escalables.',
    tags: ['Node.js', 'PostgreSQL', 'REST'],
    recommended: false,
    color: 'cyan',
    iconColor: 'text-neon-cyan-light',
    iconBg: 'bg-neon-cyan/10',
    iconBorder: 'border-neon-cyan/20',
  },
  {
    id: 'mobile',
    label: 'Mobile',
    icon: Smartphone,
    description: 'React Native y Expo para apps nativas de iOS y Android desde cero.',
    tags: ['React Native', 'Expo', 'iOS/Android'],
    recommended: false,
    color: 'amber',
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10',
    iconBorder: 'border-amber-500/20',
  },
  {
    id: 'ai',
    label: 'Inteligencia Artificial',
    icon: Brain,
    description: 'Python, ML, LLMs y la construcción de productos inteligentes con IA.',
    tags: ['Python', 'PyTorch', 'LLMs'],
    recommended: false,
    color: 'emerald',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    iconBorder: 'border-emerald-500/20',
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function OnboardingFlow({ userId, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  async function handleContinue() {
    if (!selected) return;
    setSaving(true);
    setError(null);

    try {
      // Use upsert so it works whether the profile row exists or not
      if (supabase) {
        const { error: dbError } = await supabase
          .from('profiles')
          .upsert(
            { id: userId, selected_stack: selected, onboarding_completed: true },
            { onConflict: 'id' }
          );

        if (dbError) {
          console.warn('[OnboardingFlow] upsert error:', dbError.message);
          // Don't block the user — call onComplete anyway
        }
      }
      // Always proceed to the app, even if DB write failed
      await onComplete(selected);
    } catch (err) {
      console.error('[OnboardingFlow] Unexpected error:', err);
      // Last resort: try to continue anyway
      try { await onComplete(selected); } catch (_) {
        setError('Error al guardar. Recarga la página e inténtalo de nuevo.');
        setSaving(false);
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center overflow-auto">
      {/* ── Background Orbs ── */}
      <div className="orb w-[600px] h-[600px] bg-neon-purple/20 top-[-15%] left-[-10%]" style={{ animationDelay: '0s' }} />
      <div className="orb w-[500px] h-[500px] bg-neon-cyan/10 bottom-[-10%] right-[-8%]" style={{ animationDelay: '4s' }} />
      <div className="orb w-[300px] h-[300px] bg-neon-purple/10 bottom-[10%] left-[25%]" style={{ animationDelay: '8s' }} />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-5xl px-6 py-16 flex flex-col items-center">

        {/* ── Logo accent ── */}
        <div className="animate-onboarding-fade-in flex items-center gap-2 mb-10">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
            <Zap size={14} className="text-white" />
          </div>
          <span className="font-mono text-xs text-text-muted uppercase tracking-widest">FlowState Academy</span>
        </div>

        {/* ── Headline ── */}
        <div className="text-center mb-4 animate-onboarding-slide-up" style={{ animationDelay: '0.05s' }}>
          <p className="section-subtitle mb-4">// paso_01 — selección de camino</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none">
            Elige tu{' '}
            <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
              Camino
            </span>
          </h1>
          <p className="text-text-secondary mt-5 max-w-lg mx-auto text-sm sm:text-base">
            Cada camino está diseñado para llevarte de cero a profesional. Puedes cambiar esto después.
          </p>
        </div>

        {/* ── Stack Grid ── */}
        <div
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12 animate-onboarding-slide-up"
          style={{ animationDelay: '0.15s' }}
        >
          {STACKS.map((stack, idx) => {
            const Icon = stack.icon;
            const isSelected = selected === stack.id;

            if (stack.recommended) {
              // ── Recommended (Frontend) — neon purple glow card ──
              return (
                <button
                  key={stack.id}
                  id={`stack-${stack.id}`}
                  onClick={() => setSelected(stack.id)}
                  className="relative text-left p-7 rounded-2xl cursor-pointer transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-neon-purple group"
                  style={{
                    background: isSelected
                      ? 'rgba(139, 92, 246, 0.18)'
                      : 'rgba(139, 92, 246, 0.10)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: isSelected
                      ? '1.5px solid rgba(167, 139, 250, 0.9)'
                      : '1.5px solid rgba(139, 92, 246, 0.55)',
                    boxShadow: isSelected
                      ? '0 0 32px rgba(139,92,246,0.4), 0 0 80px rgba(139,92,246,0.15), inset 0 0 30px rgba(139,92,246,0.05)'
                      : '0 0 18px rgba(139,92,246,0.2), 0 0 40px rgba(139,92,246,0.08)',
                  }}
                >
                  {/* Neon glow pulse overlay */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none animate-onboarding-glow"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, transparent 60%)',
                    }}
                  />

                  {/* "Recomendado" badge */}
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan text-white font-semibold text-[0.65rem] tracking-wider uppercase shadow-[0_0_16px_rgba(139,92,246,0.6)]">
                    <Star size={9} />
                    Recomendado
                  </span>

                  {/* Check indicator */}
                  {isSelected && (
                    <span className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-neon-purple flex items-center justify-center">
                      <Check size={11} className="text-white" />
                    </span>
                  )}

                  {/* Icon */}
                  <div className="mb-4 w-12 h-12 rounded-xl bg-neon-purple/15 border border-neon-purple/30 flex items-center justify-center group-hover:bg-neon-purple/25 transition-colors">
                    <Icon size={22} className="text-neon-purple-light" />
                  </div>

                  <h3 className="font-bold text-text-primary text-base mb-1.5">{stack.label}</h3>
                  <p className="text-[0.78rem] text-text-secondary leading-relaxed mb-4">{stack.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {stack.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </button>
              );
            }

            // ── Other stacks — glassmorphism, slightly dimmed ──
            return (
              <button
                key={stack.id}
                id={`stack-${stack.id}`}
                onClick={() => setSelected(stack.id)}
                className="relative text-left p-7 rounded-2xl cursor-pointer transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-neon-purple group"
                style={{
                  background: isSelected
                    ? 'rgba(30, 27, 46, 0.75)'
                    : 'rgba(15, 12, 20, 0.50)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: isSelected
                    ? '1px solid rgba(139, 92, 246, 0.55)'
                    : '1px solid rgba(46, 43, 63, 0.55)',
                  opacity: isSelected ? 1 : selected && selected !== stack.id ? 0.55 : 0.75,
                  boxShadow: isSelected ? '0 0 20px rgba(139,92,246,0.15)' : 'none',
                }}
              >
                {/* Check indicator */}
                {isSelected && (
                  <span className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-neon-purple flex items-center justify-center">
                    <Check size={11} className="text-white" />
                  </span>
                )}

                {/* Icon */}
                <div className={`mb-4 w-12 h-12 rounded-xl ${stack.iconBg} border ${stack.iconBorder} flex items-center justify-center transition-all group-hover:opacity-100`}>
                  <Icon size={22} className={stack.iconColor} />
                </div>

                <h3 className="font-bold text-text-primary text-base mb-1.5">{stack.label}</h3>
                <p className="text-[0.78rem] text-text-secondary leading-relaxed mb-4">{stack.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {stack.tags.map(tag => (
                    <span
                      key={tag}
                      className="font-mono text-[0.67rem] px-2 py-0.5 rounded bg-void/60 text-text-muted border border-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Error message ── */}
        {error && (
          <p className="mt-6 text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-lg animate-onboarding-fade-in">
            {error}
          </p>
        )}

        {/* ── CTA ── */}
        <div
          className="mt-10 flex flex-col items-center gap-3 animate-onboarding-slide-up"
          style={{ animationDelay: '0.25s' }}
        >
          <button
            id="onboarding-continue-btn"
            onClick={handleContinue}
            disabled={!selected || saving}
            className="btn-glow flex items-center gap-2 text-base disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Zap size={18} />
                Comenzar mi camino
                <ArrowRight size={18} />
              </>
            )}
          </button>

          {!selected && (
            <p className="text-text-muted text-xs font-mono animate-onboarding-fade-in">
              Selecciona un stack para continuar
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
