import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  Server,
  Smartphone,
  Brain,
  Cloud,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Code2,
  Database,
  Shield,
  Layers,
  GitFork,
  CheckCircle2,
} from 'lucide-react';

const stacks = [
  { id: 'frontend', title: 'Frontend Web', icon: Globe },
  { id: 'backend', title: 'Backend & APIs', icon: Server },
  { id: 'mobile', title: 'Mobile Dev', icon: Smartphone },
  { id: 'ai', title: 'IA & Agentes', icon: Brain },
  { id: 'cloud', title: 'Cloud & DevOps', icon: Cloud },
];

const niveles = [
  {
    tag: 'L1',
    title: 'Explorador',
    tagClass: 'level-1',
    icon: BookOpen,
    description: 'Fundamentos sólidos. Construye tu base con las herramientas esenciales.',
    temas: [
      'Fundamentos de C# — Tipos, OOP, LINQ, Async/Await',
      'Bases de Datos Relacionales — Diseño de tablas, relaciones, normalización',
      'SQL Básico — SELECT, INSERT, UPDATE, DELETE, JOINs',
      'Control de Versiones — Git, ramas, commits, pull requests',
      'HTTP Básico — Verbos, códigos de estado, headers',
    ],
    proyecto: 'API de Lista de Tareas con CRUD completo y SQLite',
    duracion: '4 semanas',
  },
  {
    tag: 'L2',
    title: 'Constructor',
    tagClass: 'level-2',
    icon: Code2,
    description: 'Construye APIs reales y despliega a producción. El nivel donde empiezas a enviar código.',
    temas: [
      'APIs RESTful con ASP.NET Core — Controladores, Routing, Model Binding',
      'Entity Framework Core — Migraciones, Relaciones, Queries LINQ',
      'Autenticación JWT — Tokens, Refresh Tokens, Roles & Claims',
      'Validación & Manejo de Errores — FluentValidation, Middleware',
      'Testing — xUnit, Mocking, Integration Tests',
      'Docker Básico — Contenedores, Dockerfile, Docker Compose',
    ],
    proyecto: 'API de E-commerce con autenticación, carrito y pagos',
    duracion: '6 semanas',
  },
  {
    tag: 'L3',
    title: 'Arquitecto',
    tagClass: 'level-3',
    icon: Layers,
    description: 'Diseña sistemas escalables. Lidera revisiones de código y mentora a los demás.',
    temas: [
      'Clean Architecture — Capas, Inversión de Dependencias, CQRS',
      'Microservicios — Comunicación entre servicios, API Gateway, Event Bus',
      'Stored Procedures & SQL Avanzado — Optimización, Índices, Transacciones',
      'Despliegues Avanzados — CI/CD, Kubernetes, Health Checks',
      'Patrones de Diseño — Repository, Unit of Work, Mediator, Strategy',
      'Seguridad Avanzada — OAuth 2.0, OpenID Connect, Rate Limiting',
    ],
    proyecto: 'Sistema de Microservicios con API Gateway y mensajería asíncrona',
    duracion: '8 semanas',
  },
];

export default function DocsPage() {
  const [stackActivo, setStackActivo] = useState('backend');
  const [nivelAbierto, setNivelAbierto] = useState('L1');

  return (
    <div className="pt-24 min-h-screen flex relative overflow-hidden">
      {/* Orbes de fondo */}
      <div className="orb w-[400px] h-[400px] bg-neon-purple/8 top-[30%] right-[-10%]" style={{ animationDelay: '1s' }} />

      {/* Sidebar Izquierdo */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-border/50 bg-void/50 backdrop-blur-sm pt-8 px-5 shrink-0 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
        <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-5 px-3">
          // stacks disponibles
        </p>
        <nav className="space-y-2">
          {stacks.map((stack) => {
            const Icon = stack.icon;
            const isActive = stackActivo === stack.id;
            return (
              <button
                key={stack.id}
                onClick={() => setStackActivo(stack.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-neon-purple/10 text-neon-purple-light border border-neon-purple/20'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface/50 border border-transparent'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-neon-purple' : 'text-text-muted'} />
                {stack.title}
                {isActive && <ChevronRight size={14} className="ml-auto text-neon-purple" />}
              </button>
            );
          })}
        </nav>

        {/* Info del Stack */}
        <div className="mt-10 p-5 rounded-xl border border-border/50 bg-surface/30">
          <div className="flex items-center gap-2 mb-2">
            <Database size={16} className="text-neon-cyan" />
            <span className="font-mono text-xs text-neon-cyan">stack_activo</span>
          </div>
          <p className="text-sm text-text-primary font-semibold">Backend & APIs</p>
          <p className="text-xs text-text-muted mt-1">3 niveles · 17 temas · 3 proyectos</p>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 px-8 lg:px-16 py-10 max-w-4xl mx-auto relative z-10">
        {/* Selector de stack para móvil */}
        <div className="lg:hidden mb-10">
          <select
            value={stackActivo}
            onChange={(e) => setStackActivo(e.target.value)}
            className="w-full p-3 rounded-xl bg-surface/50 border border-border text-text-primary font-medium text-sm cursor-pointer"
          >
            {stacks.map((s) => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
        </div>

        {/* Título */}
        <div className="mb-10">
          <p className="section-subtitle mb-3 !text-left">// hoja_de_ruta</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-text-primary mb-4 text-left">
            Hoja de Ruta de{' '}
            <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
              Backend & APIs
            </span>
          </h1>
          <p className="text-text-secondary leading-relaxed">
            Domina la persistencia de datos, APIs escalables y Clean Architecture.
          </p>
        </div>

        {/* Tags del Stack Tecnológico */}
        <div className="flex flex-wrap gap-3 mb-12">
          {['C#', 'ASP.NET Core', 'PostgreSQL', 'Docker'].map((tech) => (
            <span key={tech} className="tag">{tech}</span>
          ))}
        </div>

        {/* Niveles (Acordeón) */}
        <div className="space-y-6 mb-16">
          {niveles.map((nivel) => {
            const isOpen = nivelAbierto === nivel.tag;
            const NivelIcon = nivel.icon;

            return (
              <div key={nivel.tag} className={`glass-card overflow-hidden transition-all duration-300 ${isOpen ? 'border-neon-purple/30' : ''}`}>
                {/* Encabezado del acordeón */}
                <button
                  onClick={() => setNivelAbierto(isOpen ? null : nivel.tag)}
                  className="w-full flex items-center gap-4 p-5 md:p-6 text-left cursor-pointer"
                >
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-neon-purple/10 to-neon-cyan/10 border border-neon-purple/15 shrink-0">
                    <NivelIcon size={22} className="text-neon-purple-light" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`level-badge ${nivel.tagClass}`}>{nivel.tag}</span>
                      <h3 className="text-lg font-bold text-text-primary">{nivel.title}</h3>
                    </div>
                    <p className="text-sm text-text-secondary truncate">{nivel.description}</p>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-text-muted shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Contenido del acordeón */}
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 md:px-8 pb-8 border-t border-border/50 pt-6">
                    {/* Temas */}
                    <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <BookOpen size={12} />
                      Temas del nivel
                    </p>
                    <div className="space-y-3 mb-6">
                      {nivel.temas.map((tema, i) => (
                        <div key={i} className="flex items-start gap-3 p-3.5 rounded-lg bg-void/40 border border-border/30">
                          <CheckCircle2 size={16} className="text-neon-cyan mt-0.5 shrink-0" />
                          <span className="text-sm text-text-secondary">{tema}</span>
                        </div>
                      ))}
                    </div>

                    {/* Proyecto y Duración */}
                    <div className="flex flex-col sm:flex-row gap-5 p-5 rounded-xl bg-surface/30 border border-border/30">
                      <div className="flex-1">
                        <p className="font-mono text-xs text-neon-purple-light uppercase tracking-wider mb-1">Proyecto Final</p>
                        <p className="text-sm text-text-primary font-medium">{nivel.proyecto}</p>
                      </div>
                      <div className="sm:text-right">
                        <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-1">Duración</p>
                        <p className="text-sm text-text-primary font-medium">{nivel.duracion}</p>
                      </div>
                    </div>

                    {/* Botón Ver Retos (solo L1) */}
                    {nivel.tag === 'L1' && (
                      <button className="mt-5 btn-outline text-sm py-2.5 px-5 flex items-center gap-2">
                        <Shield size={14} />
                        Ver Retos
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tarjeta de Acción */}
        <div className="relative p-10 md:p-12 rounded-2xl border border-neon-cyan/20 bg-surface/30 backdrop-blur-xl overflow-hidden">
          {/* Acentos de esquina */}
          <div className="absolute top-0 left-0 w-20 h-px bg-gradient-to-r from-neon-cyan/50 to-transparent" />
          <div className="absolute top-0 left-0 w-px h-20 bg-gradient-to-b from-neon-cyan/50 to-transparent" />
          <div className="absolute bottom-0 right-0 w-20 h-px bg-gradient-to-l from-neon-purple/50 to-transparent" />
          <div className="absolute bottom-0 right-0 w-px h-20 bg-gradient-to-t from-neon-purple/50 to-transparent" />

          <h3 className="text-2xl font-bold text-text-primary mb-2">¿Listo para empezar?</h3>
          <p className="text-text-secondary mb-6">
            Haz fork del repo inicial de L1 y comienza tu camino de Explorador a Arquitecto.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan-light font-semibold text-sm hover:bg-neon-cyan/20 hover:border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all no-underline"
          >
            <GitFork size={18} />
            Fork del Repo Inicial L1 en GitHub
            <ExternalLink size={14} />
          </a>
        </div>
      </main>
    </div>
  );
}
