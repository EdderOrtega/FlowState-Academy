import { Map, Users, GitPullRequest, ArrowRight } from 'lucide-react';

const pasos = [
  {
    number: '01',
    icon: Map,
    title: 'Elige tu Stack',
    description: 'Escoge entre Frontend, Backend, Mobile, IA o Cloud. Cada stack tiene un camino estructurado de Explorador a Arquitecto.',
  },
  {
    number: '02',
    icon: Users,
    title: 'Únete a un Equipo',
    description: 'Entra al Discord y encuentra tu equipo en La Arena. Colabora con devs de tu nivel — o aprende de los que están arriba.',
  },
  {
    number: '03',
    icon: GitPullRequest,
    title: 'Envía PRs',
    description: 'Escribe código, recibe revisiones de Arquitectos L3 y haz merge a producción. Repos reales. Deploys reales. Experiencia real.',
  },
];

export default function Protocol() {
  return (
    <section id="protocolo" className="relative py-28 md:py-40 px-6 overflow-hidden">
      {/* Acento de fondo */}
      <div className="orb w-[400px] h-[400px] bg-neon-cyan/8 top-[20%] left-[-10%]" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Encabezado de sección */}
        <div className="text-center mb-20">
          <p className="section-subtitle mb-3">// cómo_funciona</p>
          <h2 className="section-title">
            El{' '}
            <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
              Protocolo
            </span>{' '}
            — Cómo subes de nivel
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl mx-auto">
            Tres pasos. Sin relleno. Solo el camino de cero a ingeniero listo para producción.
          </p>
        </div>

        {/* Pasos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Línea conectora (escritorio) */}
          <div className="hidden md:block absolute top-1/2 left-[16%] right-[16%] h-px bg-gradient-to-r from-neon-purple/30 via-neon-cyan/30 to-neon-purple/30 -translate-y-1/2 z-0" />

          {pasos.map((paso, i) => {
            const Icon = paso.icon;
            return (
              <div key={paso.number} className="relative z-10 group">
                <div className="glass-card p-8 md:p-10 text-center h-full flex flex-col items-center">
                  {/* Número de paso */}
                  <span className="font-mono text-xs text-text-muted tracking-widest mb-4">
                    PASO {paso.number}
                  </span>

                  {/* Círculo de ícono */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-purple/15 to-neon-cyan/15 border border-neon-purple/20 flex items-center justify-center mb-5 group-hover:border-neon-purple/50 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all duration-300">
                    <Icon size={28} className="text-neon-purple-light" />
                  </div>

                  {/* Título */}
                  <h3 className="text-xl font-bold text-text-primary mb-3">{paso.title}</h3>

                  {/* Descripción */}
                  <p className="text-sm text-text-secondary leading-relaxed">{paso.description}</p>

                  {/* Indicador de flecha (móvil) */}
                  {i < pasos.length - 1 && (
                    <div className="md:hidden mt-6 flex justify-center">
                      <ArrowRight size={20} className="text-neon-purple/40 rotate-90" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
