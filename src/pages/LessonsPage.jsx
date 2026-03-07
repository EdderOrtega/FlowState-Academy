import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Lock, Play, Circle, ChevronRight } from 'lucide-react';

/* ────────────────────────────────────────────
   Datos Temporales (Hardcoded)
   ──────────────────────────────────────────── */
const lessons = [
  { id: 'html-basics-01', title: 'La Anatomía de la Web', status: 'completed' },
  { id: 'html-media-02', title: 'Inyección de Medios', status: 'active' },
  { id: 'html-nav-03', title: 'El Multiverso: Rutas', status: 'locked' },
  { id: 'html-forms-04', title: 'Captura de Datos', status: 'locked' },
  { id: 'css-intro-05', title: 'Pintando el Chasis', status: 'locked' }
];

/* ────────────────────────────────────────────
   Componente Principal
   ──────────────────────────────────────────── */
export default function LessonsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-16 sm:py-24 relative overflow-hidden">
      
      {/* ── Orbs de Fondo ── */}
      <div className="orb w-[500px] h-[500px] bg-neon-purple/15 top-[-10%] left-[-15%]" style={{ animationDelay: '0s' }} />
      <div className="orb w-[400px] h-[400px] bg-neon-cyan/10 top-[20%] right-[-10%]" style={{ animationDelay: '4s' }} />

      <div className="max-w-3xl mx-auto relative z-10 w-full flex flex-col items-center">
        
        {/* ── Header Tipográfico ── */}
        <div className="text-center mb-16 animate-onboarding-slide-up">
          <p className="font-mono text-xs sm:text-sm text-neon-purple-light uppercase tracking-[0.2em] font-semibold mb-4">
            // NIVEL_01: EXPLORADOR FRONTEND
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-text-primary">
            Tu Mapa de{' '}
            <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
              Misiones
            </span>
          </h1>
          <p className="mt-5 text-sm sm:text-base text-text-secondary max-w-lg mx-auto leading-relaxed">
            Avanza paso a paso construyendo tu portafolio. Las misiones se desbloquean conforme dominas los fundamentos.
          </p>
        </div>

        {/* ── Timeline / Árbol de Habilidades ── */}
        <div className="w-full relative py-4 animate-onboarding-slide-up" style={{ animationDelay: '0.15s' }}>
          
          {/* Línea conectora central vertical */}
          <div className="absolute top-0 bottom-0 left-[23px] sm:left-12 w-0.5 bg-border/40" />

          <div className="space-y-8 lg:space-y-12 w-full">
            {lessons.map((lesson, index) => {
              const isCompleted = lesson.status === 'completed';
              const isActive = lesson.status === 'active';
              const isLocked = lesson.status === 'locked';

              return (
                <div key={lesson.id} className="relative flex items-stretch gap-6 sm:gap-10 w-full group">
                  
                  {/* Nodo / Conector (1 Left column) */}
                  <div className="relative flex items-center justify-center shrink-0 w-12 sm:w-24 mt-6">
                    {/* El punto */}
                    <div
                      className={`relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? 'bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 font-bold shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                          : isActive
                          ? 'bg-neon-purple/20 border-2 border-neon-purple text-neon-purple-light font-bold shadow-[0_0_20px_rgba(139,92,246,0.6)] scale-110'
                          : 'bg-void border-2 border-border text-border grayscale scale-90'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 size={24} className="drop-shadow-md" />
                      ) : isActive ? (
                        <Circle size={18} className="fill-neon-purple-light animate-pulse drop-shadow-md" />
                      ) : (
                        <Lock size={20} />
                      )}
                    </div>
                  </div>

                  {/* Tarjeta de Lección (Right column) */}
                  <div className="flex-1 w-full flex items-center">
                    <div
                      className={`relative w-full rounded-2xl transition-all duration-300 overflow-hidden ${
                        isCompleted
                          ? 'bg-surface/40 backdrop-blur-md border border-emerald-500/30'
                          : isActive
                          ? 'bg-surface/60 backdrop-blur-xl border border-neon-purple shadow-[0_0_25px_rgba(139,92,246,0.2)]'
                          : 'bg-void/40 backdrop-blur-sm border border-border/50 opacity-40 grayscale'
                      }`}
                      style={{
                        transform: isActive ? 'scale(1.02)' : 'none',
                      }}
                    >
                      {/* Resplandor interno de la tarjeta activa */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-transparent pointer-events-none" />
                      )}

                      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between p-6 sm:p-8 gap-5 z-10">
                        
                        {/* Texto de la tarjeta */}
                        <div className="flex-1">
                          <p
                            className={`text-xs font-mono uppercase tracking-widest font-semibold mb-2 ${
                              isCompleted ? 'text-emerald-400/80' : isActive ? 'text-neon-purple-light' : 'text-text-muted'
                            }`}
                          >
                            Misión 0{index + 1}
                          </p>
                          <h3
                            className={`text-xl sm:text-2xl font-bold tracking-tight mb-2 ${
                              isLocked ? 'text-text-muted' : 'text-text-primary'
                            }`}
                          >
                            {lesson.title}
                          </h3>
                          <p className="text-sm text-text-secondary leading-relaxed">
                            {isCompleted && 'Entregado con excelencia. Puedes revisitar tu solución.'}
                            {isActive && 'Esta es tu directiva actual. Demuestra lo que has aprendido en el laboratorio.'}
                            {isLocked && 'Clasificado. Requiere completar la misión anterior.'}
                          </p>
                        </div>

                        {/* Botón / Estado de la tarjeta */}
                        <div className="shrink-0 flex items-center mt-2 sm:mt-0">
                          {isCompleted && (
                            <button
                              onClick={() => navigate(`/lesson/${lesson.id}`)}
                              className="px-5 py-2.5 rounded-xl border border-emerald-500/50 text-emerald-400 text-sm font-semibold hover:bg-emerald-500/10 cursor-pointer flex items-center gap-2 transition-all"
                            >
                              Repasar
                              <ChevronRight size={16} />
                            </button>
                          )}
                          
                          {isActive && (
                            <button
                              onClick={() => navigate(`/lesson/${lesson.id}`)}
                              className="px-6 py-3 rounded-xl bg-neon-purple hover:bg-neon-purple-light text-white text-sm font-bold shadow-[0_0_20px_rgba(139,92,246,0.4)] cursor-pointer flex items-center gap-2 group transition-all"
                            >
                              Continuar Misión
                              <Play size={16} className="fill-white group-hover:scale-110 transition-transform" />
                            </button>
                          )}

                          {isLocked && (
                            <div className="px-5 py-2.5 rounded-xl border border-transparent bg-border/20 text-text-muted text-sm font-semibold flex items-center gap-2 cursor-not-allowed">
                              <Lock size={16} />
                              Bloqueado
                            </div>
                          )}
                        </div>
                        
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
