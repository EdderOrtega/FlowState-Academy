import { Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Orbes animados de fondo */}
      <div className="orb w-[500px] h-[500px] bg-neon-purple/30 top-[-10%] left-[-5%]" style={{ animationDelay: '0s' }} />
      <div className="orb w-[400px] h-[400px] bg-neon-cyan/20 top-[20%] right-[-8%]" style={{ animationDelay: '3s' }} />
      <div className="orb w-[300px] h-[300px] bg-neon-purple/15 bottom-[5%] left-[30%]" style={{ animationDelay: '6s' }} />

      {/* Cuadrícula de fondo */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Indicador de estado */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-border bg-surface/50 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
          </span>
          <span className="font-mono text-xs text-text-secondary tracking-wider uppercase">Comunidad Activa — 247 devs en línea</span>
        </div>

        {/* Título */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.9] mb-8">
          <span className="block text-text-primary">FlowState</span>
          <span className="block bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-purple bg-clip-text text-transparent">
            Academy
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
          Construyendo el futuro, un commit a la vez. Deja la teoría aburrida atrás y construye{' '}
          <span className="text-neon-cyan font-medium">software del mundo real</span>.
        </p>

        {/* Botones CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="btn-glow flex items-center gap-2 text-base">
            <Zap size={18} />
            Entrar a la Zona
          </button>
          <Link to="/docs" className="btn-outline flex items-center gap-2 text-base no-underline">
            Explorar Stacks
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Métricas */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-6 md:gap-8">
          {[
            { value: 'Cohorte 01', subtitle: 'Inscripciones Abiertas' },
            { value: '5 Stacks Core', subtitle: 'De Cero a Arquitecto' },
            { value: '100% Código Real', subtitle: 'Sin teoría aburrida' },
          ].map((stat) => (
            <div key={stat.value} className="text-center px-7 py-4 rounded-xl border border-border/50 bg-surface/30 backdrop-blur-sm">
              <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-[0.7rem] text-text-muted font-mono uppercase tracking-wider mt-2">{stat.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Degradado inferior */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-void to-transparent" />
    </section>
  );
}
