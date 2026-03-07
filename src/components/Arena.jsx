import { Users, GitBranch, Clock, Flame, ArrowUpRight } from 'lucide-react';

const proyectos = [
  {
    title: 'Sistema de Reservas SaaS',
    description: 'Plataforma de reservas full-stack con pagos Stripe, sincronización de calendario y panel de administración.',
    status: 'En Progreso',
    statusColor: 'neon-cyan',
    techStack: ['React', 'Node.js', '.NET Core', 'PostgreSQL'],
    wanted: [
      { role: '2 Devs React', level: 'L2' },
      { role: '1 Dev .NET Core', level: 'L3' },
      { role: '1 Ingeniero QA', level: 'L2' },
    ],
    members: 8,
    daysActive: 14,
    progress: 35,
  },
  {
    title: 'Revisor de Código con IA',
    description: 'Una herramienta inteligente de revisión de código impulsada por LLMs que brinda retroalimentación contextual en PRs.',
    status: 'Reclutando',
    statusColor: 'neon-purple',
    techStack: ['Python', 'FastAPI', 'LangChain', 'React'],
    wanted: [
      { role: '1 Ingeniero IA/ML', level: 'L3' },
      { role: '2 Devs Frontend', level: 'L2' },
      { role: '1 DevOps', level: 'L2' },
    ],
    members: 5,
    daysActive: 3,
    progress: 10,
  },
  {
    title: 'Plataforma de Chat en Tiempo Real',
    description: 'App de mensajería encriptada de extremo a extremo con videollamadas, compartir archivos y canales.',
    status: 'En Progreso',
    statusColor: 'neon-cyan',
    techStack: ['Next.js', 'WebSocket', 'Redis', 'Docker'],
    wanted: [
      { role: '1 Dev Mobile', level: 'L2' },
      { role: '1 Dev Backend', level: 'L3' },
    ],
    members: 12,
    daysActive: 28,
    progress: 62,
  },
];

export default function Arena() {
  return (
    <section id="arena" className="relative py-28 md:py-40 px-6 overflow-hidden">
      {/* Acento de fondo */}
      <div className="orb w-[500px] h-[500px] bg-neon-cyan/10 bottom-[5%] left-[-10%]" style={{ animationDelay: '4s' }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Encabezado de sección */}
        <div className="text-center mb-20">
          <p className="section-subtitle mb-3">// misiones_activas</p>
          <h2 className="section-title">
            La <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">Arena</span> — Proyectos Activos
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl mx-auto">
            Únete a un equipo, envía código real y construye tu portafolio con proyectos que importan.
          </p>
        </div>

        {/* Tarjetas de Proyectos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {proyectos.map((proyecto) => (
            <div key={proyecto.title} className="glass-card p-7 md:p-8 flex flex-col group">
              {/* Encabezado */}
              <div className="flex items-start justify-between mb-4">
                <div className={`tag tag-${proyecto.statusColor === 'neon-cyan' ? 'cyan' : ''}`}>
                  <span className="flex items-center gap-1.5">
                    <Flame size={12} />
                    {proyecto.status}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-text-muted text-xs font-mono">
                  <Clock size={12} />
                  {proyecto.daysActive}d
                </div>
              </div>

              {/* Título y Descripción */}
              <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-neon-purple-light transition-colors">
                {proyecto.title}
              </h3>
              <p className="text-sm text-text-secondary mb-5 leading-relaxed flex-grow">
                {proyecto.description}
              </p>

              {/* Stack Tecnológico */}
              <div className="flex flex-wrap gap-2 mb-6">
                {proyecto.techStack.map((tech) => (
                  <span key={tech} className="font-mono text-[0.7rem] px-2 py-1 rounded bg-void/60 text-text-muted border border-border/50">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Barra de Progreso */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-text-muted font-mono">Progreso</span>
                  <span className="text-xs text-text-muted font-mono">{proyecto.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-void/80 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan transition-all duration-700"
                    style={{ width: `${proyecto.progress}%` }}
                  />
                </div>
              </div>

              {/* Sección de Buscados */}
              <div className="mb-6">
                <p className="text-xs text-text-muted font-mono uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Users size={12} />
                  Se busca
                </p>
                <div className="space-y-2.5">
                  {proyecto.wanted.map((w) => (
                    <div key={w.role} className="flex items-center gap-2 text-sm">
                      <span className={`level-badge ${w.level === 'L3' ? 'level-3' : 'level-2'}`}>
                        {w.level}
                      </span>
                      <span className="text-text-secondary">{w.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pie de tarjeta */}
              <div className="flex items-center justify-between pt-5 mt-2 border-t border-border/50">
                <div className="flex items-center gap-1.5 text-text-muted text-xs font-mono">
                  <GitBranch size={14} />
                  {proyecto.members} miembros
                </div>
                <button className="flex items-center gap-1.5 text-sm font-semibold text-neon-purple-light hover:text-neon-cyan transition-colors cursor-pointer">
                  Unirse al Proyecto
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
