import { useState, useEffect } from 'react';
import {
  Globe, Server, Smartphone, Brain,
  Zap, ChevronRight, Sparkles, Terminal,
  Loader2, Check, Rocket
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const stacks = [
  {
    id: 'frontend',
    title: 'Frontend Web',
    subtitle: 'React · Next.js · TailwindCSS',
    description: 'Domina la creación de interfaces modernas, responsivas y con animaciones que enamoran.',
    icon: Globe,
    recommended: true,
    color: 'neon-purple',
    gradient: 'from-neon-purple to-neon-cyan',
    techs: ['React 19', 'Next.js 15', 'TailwindCSS v4', 'TypeScript'],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    subtitle: 'Node.js · .NET · PostgreSQL',
    description: 'Construye servidores robustos, APIs REST/GraphQL y domina las bases de datos.',
    icon: Server,
    recommended: false,
    color: 'neon-cyan',
    gradient: 'from-neon-cyan to-blue-500',
    techs: ['Node.js', '.NET Core', 'PostgreSQL', 'Redis'],
  },
  {
    id: 'mobile',
    title: 'Mobile Apps',
    subtitle: 'React Native · Expo',
    description: 'Crea apps nativas para iOS y Android con un solo codebase en JavaScript.',
    icon: Smartphone,
    recommended: false,
    color: 'neon-cyan',
    gradient: 'from-emerald-500 to-neon-cyan',
    techs: ['React Native', 'Expo', 'TypeScript', 'Native APIs'],
  },
  {
    id: 'ai',
    title: 'IA & Agentes',
    subtitle: 'Python · LangChain · OpenAI',
    description: 'Construye agentes inteligentes, pipelines de datos y modelos de machine learning.',
    icon: Brain,
    recommended: false,
    color: 'neon-cyan',
    gradient: 'from-amber-500 to-orange-500',
    techs: ['Python', 'LangChain', 'OpenAI API', 'RAG'],
  },
];

// Loading phase messages
const loadingPhases = [
  { text: 'Inicializando workspace...', icon: Terminal },
  { text: 'Configurando tu stack...', icon: Sparkles },
  { text: 'Preparando tu primer proyecto...', icon: Rocket },
  { text: '¡Listo para el FlowState!', icon: Check },
];

export default function OnboardingFlow({ onComplete, userId }) {
  const [selectedStack, setSelectedStack] = useState(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);

  // Fade in on mount
  useEffect(() => {
    requestAnimationFrame(() => setFadeIn(true));
  }, []);

  // Progress through loading phases
  useEffect(() => {
    if (!isInitializing) return;

    if (loadingPhase < loadingPhases.length - 1) {
      const timer = setTimeout(() => {
        setLoadingPhase((prev) => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      // Final phase — complete after a short delay
      const timer = setTimeout(() => {
        handleFinish();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isInitializing, loadingPhase]);

  const handleSelectStack = async (stack) => {
    setSelectedStack(stack.id);
    setIsInitializing(true);
    setLoadingPhase(0);

    // Persist the selected stack to Supabase
    if (supabase && userId) {
      try {
        await supabase
          .from('profiles')
          .update({
            active_stack: stack.title,
            onboarding_completed: true,
          })
          .eq('id', userId);
      } catch (err) {
        console.error('[Onboarding] Failed to save stack:', err);
      }
    }
  };

  const handleFinish = () => {
    if (onComplete) onComplete();
  };

  // ── Initializing Screen ──
  if (isInitializing) {
    const phase = loadingPhases[loadingPhase];
    const PhaseIcon = phase.icon;
    const progress = ((loadingPhase + 1) / loadingPhases.length) * 100;
    const isComplete = loadingPhase === loadingPhases.length - 1;

    return (
      <div className="fixed inset-0 z-[200] bg-zinc-950 flex items-center justify-center">
        {/* Background orbs */}
        <div className="orb w-[600px] h-[600px] bg-neon-purple/15 top-[-20%] left-[-10%]" style={{ animationDelay: '0s' }} />
        <div className="orb w-[400px] h-[400px] bg-neon-cyan/10 bottom-[-10%] right-[-5%]" style={{ animationDelay: '3s' }} />

        <div className="relative z-10 text-center max-w-md px-6 animate-onboarding-fade-in">
          {/* Icon */}
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8 transition-all duration-500 ${
            isComplete
              ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30'
              : 'bg-gradient-to-br from-neon-purple/20 to-neon-cyan/10 border border-neon-purple/25'
          }`}>
            {isComplete ? (
              <Check size={36} className="text-green-400" />
            ) : (
              <PhaseIcon size={36} className="text-neon-purple-light animate-pulse" />
            )}
          </div>

          {/* Phase text */}
          <p className="text-xl font-bold text-text-primary mb-2 animate-onboarding-slide-up" key={loadingPhase}>
            {phase.text}
          </p>
          <p className="text-sm text-text-muted font-mono mb-8">
            {selectedStack && stacks.find((s) => s.id === selectedStack)?.title}
          </p>

          {/* Progress bar */}
          <div className="w-full max-w-xs mx-auto">
            <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-text-muted font-mono mt-3">
              {loadingPhase + 1} / {loadingPhases.length}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Stack Selection Screen ──
  return (
    <div className={`fixed inset-0 z-[200] bg-zinc-950 overflow-y-auto transition-opacity duration-700 ${
      fadeIn ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Background orbs */}
      <div className="orb w-[600px] h-[600px] bg-neon-purple/12 top-[-15%] right-[-10%]" style={{ animationDelay: '0s' }} />
      <div className="orb w-[400px] h-[400px] bg-neon-cyan/8 bottom-[5%] left-[-8%]" style={{ animationDelay: '4s' }} />
      <div className="orb w-[300px] h-[300px] bg-neon-purple/10 top-[40%] left-[60%]" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-16">
        {/* Header */}
        <div className="text-center mb-14 max-w-2xl animate-onboarding-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-purple/10 border border-neon-purple/20 mb-6">
            <Zap size={14} className="text-neon-purple-light" />
            <span className="text-xs font-mono text-neon-purple-light uppercase tracking-wider">
              Paso 1 de 1
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary mb-4 tracking-tight">
            Elige tu{' '}
            <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
              Camino
            </span>
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed">
            Selecciona el stack con el que quieres empezar. Podrás explorar los demás después.
          </p>
        </div>

        {/* Stack Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl w-full">
          {stacks.map((stack, index) => {
            const Icon = stack.icon;
            const isRecommended = stack.recommended;

            return (
              <button
                key={stack.id}
                onClick={() => handleSelectStack(stack)}
                className="text-left group relative cursor-pointer"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                {/* Recommended glow ring */}
                {isRecommended && (
                  <div
                    className="absolute -inset-px rounded-2xl pointer-events-none animate-onboarding-glow"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139,92,246,0.6) 0%, rgba(6,182,212,0.3) 50%, rgba(139,92,246,0.6) 100%)',
                      filter: 'blur(2px)',
                    }}
                  />
                )}

                <div
                  className={`relative rounded-2xl p-7 transition-all duration-300 overflow-hidden ${
                    isRecommended
                      ? 'bg-zinc-950 border-2 border-neon-purple/40 hover:border-neon-purple/70 shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:shadow-[0_0_50px_rgba(139,92,246,0.25)]'
                      : 'bg-zinc-950/80 border border-border/40 hover:border-border/80 opacity-75 hover:opacity-100'
                  }`}
                >
                  {/* Recommended badge */}
                  {isRecommended && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neon-purple/15 border border-neon-purple/30 text-[0.65rem] font-mono font-semibold text-neon-purple-light uppercase tracking-wide">
                        <Sparkles size={10} />
                        Recomendado
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 border ${
                    isRecommended
                      ? 'bg-gradient-to-br from-neon-purple/20 to-neon-cyan/10 border-neon-purple/25'
                      : 'bg-surface/50 border-border/30'
                  }`}>
                    <Icon size={24} className={isRecommended ? 'text-neon-purple-light' : 'text-text-muted'} />
                  </div>

                  {/* Title + subtitle */}
                  <h3 className={`text-lg font-bold mb-1 ${
                    isRecommended ? 'text-text-primary' : 'text-text-secondary'
                  }`}>
                    {stack.title}
                  </h3>
                  <p className={`text-xs font-mono mb-3 ${
                    isRecommended ? 'text-neon-purple-light/70' : 'text-text-muted'
                  }`}>
                    {stack.subtitle}
                  </p>

                  {/* Description */}
                  <p className={`text-sm leading-relaxed mb-5 ${
                    isRecommended ? 'text-text-secondary' : 'text-text-muted'
                  }`}>
                    {stack.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {stack.techs.map((tech) => (
                      <span
                        key={tech}
                        className={`font-mono text-[0.65rem] px-2 py-0.5 rounded border ${
                          isRecommended
                            ? 'bg-neon-purple/8 border-neon-purple/15 text-neon-purple-light/80'
                            : 'bg-void/60 border-border/30 text-text-muted'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className={`flex items-center gap-2 text-sm font-semibold ${
                    isRecommended
                      ? 'text-neon-purple-light group-hover:text-neon-cyan-light'
                      : 'text-text-muted group-hover:text-text-secondary'
                  } transition-colors`}>
                    {isRecommended ? 'Empezar aquí' : 'Seleccionar'}
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Hover gradient overlay for recommended */}
                  {isRecommended && (
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(139,92,246,0.05) 0%, transparent 40%, transparent 60%, rgba(6,182,212,0.05) 100%)',
                      }}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer hint */}
        <p className="text-xs text-text-muted font-mono mt-10 text-center animate-onboarding-slide-up" style={{ animationDelay: '800ms' }}>
          No te preocupes — puedes cambiar de stack en cualquier momento desde tu perfil.
        </p>
      </div>
    </div>
  );
}
