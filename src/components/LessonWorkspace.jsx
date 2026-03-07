import { useState } from 'react';
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
  Play, BookOpen, ChevronLeft, CheckCircle2,
  Clock, Flame, GripVertical, Maximize2, Minimize2
} from 'lucide-react';

/* ────────────────────────────────────────────
   Custom Sandpack theme matching FlowState
   ──────────────────────────────────────────── */
const flowstateTheme = {
  colors: {
    surface1: '#0F0D1A',    // editor bg
    surface2: '#1A1726',    // toolbar bg
    surface3: '#231F33',    // active tab / input bg
    clickable: '#94A3B8',   // text-secondary
    base: '#F8FAFC',        // text-primary
    disabled: '#64748B',    // text-muted
    hover: '#A78BFA',       // neon-purple-light
    inputBackground: '#1E1B2E',
    accent: '#8B5CF6',      // neon-purple
    error: '#EF4444',
    errorSurface: '#2D1B1B',
  },
  syntax: {
    plain: '#F8FAFC',
    comment: { color: '#64748B', fontStyle: 'italic' },
    keyword: '#C084FC',     // purple-400
    tag: '#22D3EE',         // neon-cyan-light
    punctuation: '#94A3B8',
    definition: '#67E8F9',  // cyan-300
    property: '#A78BFA',    // neon-purple-light
    static: '#F472B6',      // pink-400
    string: '#34D399',      // emerald-400
  },
  font: {
    body: "'Inter', system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
    size: '13.5px',
    lineHeight: '1.6',
  },
};

/* ────────────────────────────────────────────
   Default lesson data (used as placeholder)
   ──────────────────────────────────────────── */
const defaultLesson = {
  title: 'Misión 01: Tu Primer Componente',
  module: 'Módulo 1 — Fundamentos de React',
  videoUrl: null, // placeholder
  estimatedTime: '15 min',
  xpReward: 50,
  content: [
    {
      type: 'heading',
      text: '🎯 Objetivo de la Misión',
    },
    {
      type: 'paragraph',
      text: 'Crea un componente React que muestre un botón estilizado con TailwindCSS. Este botón debe cambiar de color al pasar el mouse y mostrar un texto personalizado.',
    },
    {
      type: 'heading',
      text: '📋 Instrucciones',
    },
    {
      type: 'list',
      items: [
        'Crea un componente llamado <code>MiBoton</code>',
        'Usa clases de Tailwind para darle un fondo violeta y texto blanco',
        'Agrega un efecto hover que cambie el fondo a cyan',
        'Exporta el componente y úsalo en <code>App.jsx</code>',
      ],
    },
    {
      type: 'tip',
      text: '💡 Recuerda usar <code>className</code> en lugar de <code>class</code> en React JSX.',
    },
  ],
  startingCode: {
    '/App.js': `import MiBoton from './MiBoton';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <MiBoton texto="¡Haz click!" />
    </div>
  );
}`,
    '/MiBoton.js': `export default function MiBoton({ texto }) {
  return (
    <button className="px-6 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-cyan-500 transition-colors duration-300 shadow-lg hover:shadow-cyan-500/25">
      {texto}
    </button>
  );
}`,
  },
};

/* (ResizeHandle removed to inline as direct child) */

/* ────────────────────────────────────────────
   Lesson Content Renderer
   ──────────────────────────────────────────── */
function LessonContent({ content }) {
  return (
    <div className="space-y-4">
      {content.map((block, i) => {
        switch (block.type) {
          case 'heading':
            return (
              <h3 key={i} className="text-base font-bold text-text-primary mt-6 first:mt-0">
                {block.text}
              </h3>
            );
          case 'paragraph':
            return (
              <p
                key={i}
                className="text-sm text-text-secondary leading-relaxed"
                dangerouslySetInnerHTML={{ __html: block.text }}
              />
            );
          case 'list':
            return (
              <ul key={i} className="space-y-2 ml-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neon-purple shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            );
          case 'tip':
            return (
              <div
                key={i}
                className="p-4 rounded-xl bg-neon-purple/5 border border-neon-purple/15 text-sm text-text-secondary leading-relaxed"
                dangerouslySetInnerHTML={{ __html: block.text }}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

/* ────────────────────────────────────────────
   Main LessonWorkspace Component
   ──────────────────────────────────────────── */
export default function LessonWorkspace({ lesson = defaultLesson, onBack }) {
  const [theoryExpanded, setTheoryExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('instructions'); // 'instructions' | 'video'

  return (
    <div className="h-screen bg-void flex flex-col overflow-hidden">
      {/* ── Top Bar ── */}
      <header className="h-13 shrink-0 flex items-center justify-between px-4 border-b border-border/40 bg-void/90 backdrop-blur-md z-20">
        {/* Left: back + title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-sm text-text-muted hover:text-neon-purple-light transition-colors shrink-0"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline font-mono text-xs">Syllabus</span>
          </button>

          <div className="w-px h-5 bg-border/40" />

          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-mono text-neon-purple-light shrink-0">{lesson.module}</span>
            <span className="text-text-muted hidden md:inline">·</span>
            <span className="text-sm font-semibold text-text-primary truncate hidden md:inline">{lesson.title}</span>
          </div>
        </div>

        {/* Right: meta info */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-1.5 text-text-muted text-xs font-mono">
            <Clock size={12} />
            {lesson.estimatedTime}
          </div>
          <div className="flex items-center gap-1.5 text-neon-cyan-light text-xs font-mono">
            <Flame size={12} />
            +{lesson.xpReward} XP
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-neon-purple to-neon-cyan text-white text-xs font-bold hover:shadow-lg hover:shadow-neon-purple/20 transition-shadow">
            <CheckCircle2 size={12} />
            Completar
          </button>
        </div>
      </header>

      {/* ── Split Panels ── */}
      <PanelGroup id="lesson-group-v2" orientation="horizontal" className="flex-1 w-full">
        {/* ── LEFT PANEL: Theory & Video ── */}
        <Panel
          id="theory-panel-v2"
          defaultSize={50}
          minSize={30}
          className="flex flex-col bg-void min-w-0 overflow-hidden"
        >
          {/* Tab bar */}
          <div className="flex items-center border-b border-border/30 shrink-0">
            <button
              onClick={() => setActiveTab('instructions')}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'instructions'
                  ? 'text-neon-purple-light border-neon-purple'
                  : 'text-text-muted border-transparent hover:text-text-secondary'
              }`}
            >
              <BookOpen size={13} />
              Instrucciones
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'video'
                  ? 'text-neon-purple-light border-neon-purple'
                  : 'text-text-muted border-transparent hover:text-text-secondary'
              }`}
            >
              <Play size={13} />
              Video
            </button>

            {/* expand / collapse toggle */}
            <div className="ml-auto pr-3">
              <button
                onClick={() => setTheoryExpanded(!theoryExpanded)}
                className="p-1.5 rounded-md text-text-muted hover:text-neon-purple-light hover:bg-surface-light/30 transition-colors"
                title={theoryExpanded ? 'Minimizar' : 'Maximizar'}
              >
                {theoryExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
              </button>
            </div>
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {activeTab === 'video' ? (
              /* ── Video Tab ── */
              <div className="p-5">
                <div className="aspect-video rounded-xl overflow-hidden bg-surface border border-border/30 relative group">
                  {lesson.videoUrl ? (
                    <iframe
                      src={lesson.videoUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Lesson video"
                    />
                  ) : (
                    /* Placeholder */
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center">
                        <Play size={28} className="text-neon-purple-light ml-1" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-text-secondary">Video de la Lección</p>
                        <p className="text-xs text-text-muted font-mono mt-1">Próximamente</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* ── Instructions Tab ── */
              <div className="p-5 max-w-3xl mx-auto">
                {/* Lesson title card */}
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-neon-purple/8 to-transparent border border-neon-purple/12">
                  <h2 className="text-lg font-bold text-text-primary mb-1">
                    {lesson.title}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-text-muted font-mono">
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {lesson.estimatedTime}
                    </span>
                    <span className="flex items-center gap-1 text-neon-cyan-light">
                      <Flame size={11} /> +{lesson.xpReward} XP
                    </span>
                  </div>
                </div>

                {/* Lesson content blocks */}
                <LessonContent content={lesson.content} />
              </div>
            )}
          </div>
        </Panel>

        {/* ── Resize Handle ── */}
        <PanelResizeHandle
          className="group relative flex items-center justify-center w-3 hover:w-4 transition-all duration-200"
        >
          <div className="w-px h-full bg-border/50 group-hover:bg-neon-purple/60 transition-colors duration-200" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical size={12} className="text-neon-purple/60" />
          </div>
        </PanelResizeHandle>

        {/* ── RIGHT PANEL: Sandpack Code Editor + Preview ── */}
        <Panel
          id="code-panel-v2"
          defaultSize={50}
          minSize={30}
          maxSize={50}
          className="flex flex-col min-w-0 overflow-hidden"
        >
          <SandpackProvider
            template="react"
            theme={flowstateTheme}
            files={lesson.startingCode}
            options={{
              externalResources: [
                'https://cdn.tailwindcss.com',
              ],
              editorHeight: '100%',
            }}
          >
            <SandpackLayout
              style={{
                borderRadius: 0,
                border: 'none',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* ── Code Editor (top) ── */}
              <div className="flex-1 min-h-0 flex flex-col" style={{ flex: '1 1 55%' }}>
                <div className="flex items-center px-4 py-2 bg-[#0F0D1A] border-b border-border/20">
                  <span className="text-[0.65rem] font-mono text-text-muted uppercase tracking-wider">Editor</span>
                </div>
                <SandpackCodeEditor
                  showTabs
                  showLineNumbers
                  showInlineErrors
                  wrapContent
                  closableTabs={false}
                  style={{
                    flex: 1,
                    minHeight: 0,
                    overflow: 'auto',
                  }}
                />
              </div>

              {/* ── Separator ── */}
              <div className="h-px bg-border/30 shrink-0" />

              {/* ── Preview (bottom) ── */}
              <div className="flex flex-col" style={{ flex: '0 0 40%' }}>
                <div className="flex items-center justify-between px-4 py-2 bg-[#0F0D1A] border-b border-border/20">
                  <span className="text-[0.65rem] font-mono text-text-muted uppercase tracking-wider">Vista Previa</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500/70 animate-pulse" />
                    <span className="text-[0.6rem] font-mono text-text-muted">Live</span>
                  </div>
                </div>
                <SandpackPreview
                  showOpenInCodeSandbox={false}
                  showRefreshButton
                  style={{
                    flex: 1,
                    minHeight: 0,
                  }}
                />
              </div>
            </SandpackLayout>
          </SandpackProvider>
        </Panel>
      </PanelGroup>
    </div>
  );
}
