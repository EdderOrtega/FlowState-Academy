import {
  Group as PanelGroup,
  Panel,
  Separator as PanelResizeHandle,
} from 'react-resizable-panels';
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackLayout,
} from '@codesandbox/sandpack-react';
import {
  Play, BookOpen, ChevronLeft, GripVertical, CheckCircle2, Ticket
} from 'lucide-react';

/* ────────────────────────────────────────────
   Datos Estáticos (Misión)
   ──────────────────────────────────────────── */
const lessonData = {
  title: "La Anatomía de la Web",
  theory_script: "En la ingeniería civil, no pintas las paredes antes de poner las vigas de acero. En la web, el HTML es nuestro acero. El navegador necesita saber qué idioma hablas y dónde construir la cabeza (head) y el cuerpo (body) del sitio antes de aplicar el estilo o la interactividad.",
  collab_mission: "Ticket #01: Construye el cascarón semántico del Hero Section.",
  starting_code: "<div>\nHola Mundo\n</div>"
};

/* ────────────────────────────────────────────
   Componente Principal
   ──────────────────────────────────────────── */
export default function LessonWorkspace({ onBack }) {
  return (
    <div className="h-screen bg-zinc-950 flex flex-col overflow-hidden">
      
      {/* ── Navbar Superior ── */}
      <header className="h-14 shrink-0 flex items-center justify-between px-4 border-b border-border/40 bg-zinc-950/90 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-sm text-text-muted hover:text-neon-purple-light transition-colors cursor-pointer"
          >
            <ChevronLeft size={16} />
            <span className="font-mono text-xs">Atrás</span>
          </button>
          <div className="w-px h-5 bg-border/40" />
          <span className="text-sm font-semibold text-text-primary px-2 py-0.5 rounded bg-neon-purple/10 border border-neon-purple/20">
            {lessonData.title}
          </span>
        </div>
      </header>

      {/* ── Split Layout (40% Izquierda, 60% Derecha) ── */}
      <PanelGroup direction="horizontal" className="flex-1 w-full h-full">
        
        {/* ── PANEL IZQUIERDO: Teoría y Misión (40%) ── */}
        <Panel defaultSize={40} minSize={30} className="flex flex-col bg-zinc-950 border-r border-border/40 relative">
          
          {/* Orbs de fondo estéticos */}
          <div className="orb w-72 h-72 bg-neon-purple/10 top-0 left-[-10%] pointer-events-none" style={{ animationDelay: '0s' }} />

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8 relative z-10">
            
            {/* Reproductor de Video 16:9 Glassmorphism */}
            <div className="w-full aspect-video rounded-2xl mb-8 relative flex items-center justify-center overflow-hidden group cursor-pointer border border-neon-purple/20 bg-surface/30 backdrop-blur-md shadow-[0_4px_30px_rgba(139,92,246,0.1)] hover:border-neon-purple/40 transition-colors">
              {/* Degradado interno */}
              <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/5 to-neon-cyan/5 pointer-events-none" />
              
              <div className="w-16 h-16 rounded-full bg-void/60 backdrop-blur-xl border border-border/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-neon-purple/20 transition-all shadow-xl">
                <Play size={24} className="text-neon-purple-light ml-1" />
              </div>
            </div>

            {/* Teoría Tipográfica */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={18} className="text-neon-purple" />
                <h2 className="text-xl font-bold text-text-primary">Teoría Base</h2>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {lessonData.theory_script}
              </p>
            </div>

            {/* Cuadro del Ticket (Misión Colaborativa) */}
            <div className="relative p-6 rounded-2xl overflow-hidden glass-card">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-16 h-px bg-gradient-to-r from-neon-cyan/60 to-transparent" />
              <div className="absolute top-0 left-0 w-px h-16 bg-gradient-to-b from-neon-cyan/60 to-transparent" />
              
              <div className="flex gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-neon-cyan/20 border border-neon-cyan/30 flex items-center justify-center shrink-0">
                  <Ticket size={16} className="text-neon-cyan-light" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text-primary">Tu Ticket Asignado</h3>
                  <p className="text-xs text-neon-cyan-light font-mono mt-0.5">Misión Colaborativa</p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-void/50 rounded-lg border border-border/50 text-sm text-text-secondary font-mono leading-relaxed">
                {lessonData.collab_mission}
              </div>

              <button className="w-full mt-6 btn-outline flex items-center justify-center gap-2 text-sm !py-2.5 hover:border-neon-cyan hover:text-neon-cyan-light hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <CheckCircle2 size={16} />
                Marcar como Terminado
              </button>
            </div>

          </div>
        </Panel>

        {/* ── HANDLE (Separador Redimensionable) ── */}
        <PanelResizeHandle className="relative w-1 bg-border/40 hover:bg-neon-purple/50 active:bg-neon-purple transition-colors cursor-col-resize flex flex-col justify-center items-center z-10 group">
          <div className="h-8 flex flex-col gap-1 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-0.5 h-1 bg-white/50 rounded-full" />
            <div className="w-0.5 h-1 bg-white/50 rounded-full" />
            <div className="w-0.5 h-1 bg-white/50 rounded-full" />
          </div>
        </PanelResizeHandle>

        {/* ── PANEL DERECHO: Sandpack (60%) ── */}
        <Panel defaultSize={60} minSize={40} className="flex flex-col bg-[#151515] overflow-hidden">
          <SandpackProvider
            template="vanilla"
            theme="dark"
            files={{
              '/index.html': lessonData.starting_code,
            }}
            options={{
              editorHeight: '100%',
              autorun: true,
            }}
          >
            <SandpackLayout
              style={{
                borderRadius: 0,
                border: 'none',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Editor de Código */}
              <div style={{ flex: '1 1 50%', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, overflow: 'auto' }}>
                  <SandpackCodeEditor
                    showTabs={true}
                    showLineNumbers={true}
                    closableTabs={false}
                    style={{ height: '100%' }}
                  />
                </div>
              </div>

              {/* Divisor Visual de Sandpack */}
              <div className="h-1 bg-black shrink-0 border-y border-[#2d2d2d]" />

              {/* Navegador Integrado */}
              <div style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column' }}>
                <div className="flex items-center justify-between px-3 py-1.5 bg-[#f3f4f6] border-b border-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white border border-gray-300 shadow-sm text-[0.6rem] font-mono text-gray-500">
                      flowstate.dev/preview
                    </span>
                  </div>
                </div>
                <SandpackPreview
                  showOpenInCodeSandbox={false}
                  showRefreshButton={false}
                  style={{ flex: 1 }}
                />
              </div>

            </SandpackLayout>
          </SandpackProvider>
        </Panel>

      </PanelGroup>
    </div>
  );
}
