import { Quote } from 'lucide-react';

export default function Manifesto() {
  return (
    <section id="manifiesto" className="relative py-28 md:py-40 px-6 overflow-hidden">
      {/* Acento de fondo */}
      <div className="orb w-[500px] h-[500px] bg-neon-purple/8 bottom-[10%] right-[-10%]" style={{ animationDelay: '5s' }} />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Tarjeta del Manifiesto */}
        <div className="relative p-10 md:p-14 rounded-2xl border border-neon-purple/20 bg-surface/30 backdrop-blur-xl overflow-hidden">
          {/* Efecto de brillo en borde */}
          <div className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none" style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, transparent 40%, transparent 60%, rgba(6,182,212,0.1) 100%)',
          }} />

          {/* Acentos en esquinas */}
          <div className="absolute top-0 left-0 w-24 h-px bg-gradient-to-r from-neon-purple/50 to-transparent" />
          <div className="absolute top-0 left-0 w-px h-24 bg-gradient-to-b from-neon-purple/50 to-transparent" />
          <div className="absolute bottom-0 right-0 w-24 h-px bg-gradient-to-l from-neon-cyan/50 to-transparent" />
          <div className="absolute bottom-0 right-0 w-px h-24 bg-gradient-to-t from-neon-cyan/50 to-transparent" />

          {/* Ícono de cita */}
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-purple/15 to-neon-cyan/15 border border-neon-purple/20 flex items-center justify-center">
              <Quote size={22} className="text-neon-purple-light" />
            </div>
          </div>

          {/* Texto de la cita */}
          <blockquote className="text-center">
            <p className="text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed tracking-tight text-text-primary">
              "No estamos aquí para solo pasar materias. Estamos aquí para{' '}
              <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
                dominar el stack moderno
              </span>
              , construir{' '}
              <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                software del mundo real
              </span>
              , y forjar la siguiente generación de ingenieros."
            </p>
          </blockquote>

          {/* Subtítulo */}
          <p className="text-center mt-6 font-mono text-xs text-text-muted uppercase tracking-[0.2em]">
            — El Manifiesto de FlowState
          </p>
        </div>
      </div>
    </section>
  );
}
