import {
  Globe,
  Server,
  Smartphone,
  Brain,
  Cloud,
  ChevronRight,
} from 'lucide-react';

const stacks = [
  {
    title: 'Frontend Web',
    icon: Globe,
    color: 'neon-cyan',
    description: 'React, Next.js, Vue y más',
    levels: [
      { name: 'Explorador', tag: 'L1' },
      { name: 'Constructor', tag: 'L2' },
      { name: 'Arquitecto', tag: 'L3' },
    ],
  },
  {
    title: 'Backend & APIs',
    icon: Server,
    color: 'neon-purple',
    description: 'Node, .NET, Django y más',
    levels: [
      { name: 'Explorador', tag: 'L1' },
      { name: 'Constructor', tag: 'L2' },
      { name: 'Arquitecto', tag: 'L3' },
    ],
  },
  {
    title: 'Mobile Dev',
    icon: Smartphone,
    color: 'neon-cyan',
    description: 'React Native, Flutter, Swift',
    levels: [
      { name: 'Explorador', tag: 'L1' },
      { name: 'Constructor', tag: 'L2' },
      { name: 'Arquitecto', tag: 'L3' },
    ],
  },
  {
    title: 'IA & Agentes',
    icon: Brain,
    color: 'neon-purple',
    description: 'LLMs, RAG, Agentes Autónomos',
    levels: [
      { name: 'Explorador', tag: 'L1' },
      { name: 'Constructor', tag: 'L2' },
      { name: 'Arquitecto', tag: 'L3' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    color: 'neon-cyan',
    description: 'AWS, Docker, Kubernetes, CI/CD',
    levels: [
      { name: 'Explorador', tag: 'L1' },
      { name: 'Constructor', tag: 'L2' },
      { name: 'Arquitecto', tag: 'L3' },
    ],
  },
];

const levelStyles = ['level-1', 'level-2', 'level-3'];

export default function Atlas() {
  return (
    <section id="atlas" className="relative py-28 md:py-40 px-6 overflow-hidden">
      {/* Acento de fondo */}
      <div className="orb w-[600px] h-[600px] bg-neon-purple/10 top-[10%] right-[-15%]" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Encabezado de sección */}
        <div className="text-center mb-20">
          <p className="section-subtitle mb-3">// elige_tu_camino</p>
          <h2 className="section-title">
            El <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">Atlas</span> — Elige tu Stack
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl mx-auto">
            Escoge una especialización, sube de nivel con proyectos estructurados y desbloquea nuevos retos.
          </p>
        </div>

        {/* Grid de Stacks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stacks.map((stack) => {
            const Icon = stack.icon;
            return (
              <div key={stack.title} className="glass-card p-7 md:p-8 group cursor-pointer">
                {/* Encabezado de tarjeta */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`p-3 rounded-xl bg-${stack.color}/10 border border-${stack.color}/20`}>
                    <Icon size={24} className={`text-${stack.color}`} />
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-text-muted group-hover:text-neon-purple group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>

                {/* Título y descripción */}
                <h3 className="text-lg font-bold text-text-primary mb-1">{stack.title}</h3>
                <p className="text-sm text-text-muted font-mono mb-6">{stack.description}</p>

                {/* Niveles de Progresión */}
                <div className="space-y-3">
                  {stack.levels.map((level, i) => (
                    <div
                      key={level.tag}
                      className="flex items-center gap-3 p-3 rounded-lg bg-void/40 border border-border/50 hover:border-neon-purple/30 transition-colors"
                    >
                      <span className={`level-badge ${levelStyles[i]}`}>{level.tag}</span>
                      <span className="text-sm text-text-secondary">{level.name}</span>
                      <div className="ml-auto flex gap-1">
                        {[...Array(3)].map((_, dot) => (
                          <span
                            key={dot}
                            className={`w-1.5 h-1.5 rounded-full ${
                              dot <= i ? 'bg-neon-purple' : 'bg-border'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
