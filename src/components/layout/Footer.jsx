import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center font-bold text-[10px] text-white">
            FS
          </div>
          <span className="text-sm text-text-muted">© 2026 FlowState Academy. Envía código o muere.</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-text-muted font-mono">
          <a href="#" className="hover:text-neon-purple transition-colors">GitHub</a>
          <a href="#" className="hover:text-neon-purple transition-colors">Discord</a>
          <a href="#" className="hover:text-neon-purple transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
}
