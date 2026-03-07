import { useState, useEffect, useRef } from 'react';
import { Trophy, Medal, Award, TrendingUp, Star, Flame, Crown, Loader2, WifiOff } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const rankStyles = {
  1: 'border-yellow-500/40 shadow-[0_0_20px_rgba(234,179,8,0.1)]',
  2: 'border-gray-400/40 shadow-[0_0_20px_rgba(156,163,175,0.08)]',
  3: 'border-amber-700/40 shadow-[0_0_20px_rgba(180,83,9,0.08)]',
};

const rankIcons = {
  1: <Crown size={20} className="text-yellow-400" />,
  2: <Medal size={20} className="text-gray-400" />,
  3: <Award size={20} className="text-amber-600" />,
};

const avatarGradients = {
  1: 'from-yellow-500 to-amber-400',
  2: 'from-gray-400 to-gray-300',
  3: 'from-amber-700 to-amber-500',
};

// Map current_level value to display label + CSS class
// Handles: 1, 2, 3, 'L1', 'L2', 'L3', 'L1 Explorador', etc.
const levelMap = {
  1: { label: 'L1 Explorador', className: 'level-1' },
  2: { label: 'L2 Constructor', className: 'level-2' },
  3: { label: 'L3 Arquitecto', className: 'level-3' },
  'L1': { label: 'L1 Explorador', className: 'level-1' },
  'L2': { label: 'L2 Constructor', className: 'level-2' },
  'L3': { label: 'L3 Arquitecto', className: 'level-3' },
};

const getLevel = (currentLevel) => {
  if (!currentLevel) return { label: 'L1 Explorador', className: 'level-1' };

  // Direct match in map
  if (levelMap[currentLevel]) return levelMap[currentLevel];

  // Try extracting the number from a string like "L1", "L2 Constructor", etc.
  const numMatch = String(currentLevel).match(/(\d)/);
  if (numMatch) {
    const num = parseInt(numMatch[1], 10);
    if (levelMap[num]) return levelMap[num];
  }

  return { label: String(currentLevel), className: 'level-1' };
};

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    // Prevent React StrictMode double-fetch
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchLeaders = async () => {
      if (!supabase) {
        setError('Supabase no está configurado.');
        setLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .order('xp_points', { ascending: false })
          .limit(10);

        if (fetchError) {
          console.error('[Leaderboard] Fetch error:', fetchError.message);
          setError(fetchError.message);
        } else {
          setLeaders(data || []);
        }
      } catch (err) {
        console.error('[Leaderboard] Unexpected error:', err);
        setError('Error inesperado al cargar datos.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, []);

  // Compute aggregate stats from fetched data
  const totalXP = leaders.reduce((sum, dev) => sum + (dev.xp_points || 0), 0);
  const topStreak = leaders.reduce((max, dev) => Math.max(max, dev.streak || 0), 0);
  const totalPRs = leaders.reduce((sum, dev) => sum + (dev.prs || 0), 0);
  const totalReviews = leaders.reduce((sum, dev) => sum + (dev.reviews || 0), 0);

  return (
    <div className="pt-28 pb-20 px-6 md:px-8 min-h-screen relative overflow-hidden">
      {/* Orbes de fondo */}
      <div className="orb w-[500px] h-[500px] bg-neon-purple/10 top-[5%] right-[-10%]" style={{ animationDelay: '0s' }} />
      <div className="orb w-[400px] h-[400px] bg-neon-cyan/8 bottom-[10%] left-[-8%]" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <p className="section-subtitle mb-3">// tabla_de_clasificación</p>
          <h1 className="section-title mb-4">
            El{' '}
            <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
              Ranking
            </span>
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Los mejores contribuidores forjando el futuro. Gana puntos haciendo merge de PRs, revisando código y completando tickets de Trello.
          </p>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {[
            { icon: TrendingUp, label: 'PRs Totales', value: loading ? '—' : totalPRs.toLocaleString() },
            { icon: Star, label: 'Revisiones', value: loading ? '—' : totalReviews.toLocaleString() },
            { icon: Flame, label: 'Racha más larga', value: loading ? '—' : `${topStreak} días` },
            { icon: Trophy, label: 'Total XP', value: loading ? '—' : totalXP.toLocaleString() },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="glass-card p-5 md:p-6 text-center">
                <Icon size={20} className="text-neon-purple-light mx-auto mb-3" />
                <p className={`text-xl font-bold text-text-primary ${loading ? 'animate-pulse' : ''}`}>{stat.value}</p>
                <p className="text-[0.65rem] text-text-muted font-mono uppercase tracking-wider mt-2">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Tabla de Ranking */}
        <div className="space-y-4">
          {/* Encabezado de tabla (escritorio) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 text-xs text-text-muted font-mono uppercase tracking-wider border-b border-border/30 mb-2">
            <div className="col-span-1">Pos.</div>
            <div className="col-span-3">Desarrollador</div>
            <div className="col-span-2">Nivel</div>
            <div className="col-span-2">Especialidad</div>
            <div className="col-span-1 text-center">PRs</div>
            <div className="col-span-1 text-center">Revisiones</div>
            <div className="col-span-2 text-right">Puntos XP</div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="glass-card p-5 md:p-6 md:grid md:grid-cols-12 md:gap-4 md:items-center flex flex-col gap-4"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="col-span-1">
                    <div className="w-6 h-6 rounded bg-surface-light/50 animate-pulse" />
                  </div>
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-surface-light/50 animate-pulse shrink-0" />
                    <div className="h-4 w-24 rounded bg-surface-light/50 animate-pulse" />
                  </div>
                  <div className="col-span-2">
                    <div className="h-5 w-20 rounded bg-surface-light/50 animate-pulse" />
                  </div>
                  <div className="col-span-2">
                    <div className="h-4 w-24 rounded bg-surface-light/50 animate-pulse" />
                  </div>
                  <div className="col-span-1 text-center">
                    <div className="h-4 w-8 rounded bg-surface-light/50 animate-pulse mx-auto" />
                  </div>
                  <div className="col-span-1 text-center">
                    <div className="h-4 w-8 rounded bg-surface-light/50 animate-pulse mx-auto" />
                  </div>
                  <div className="col-span-2 text-right">
                    <div className="h-5 w-20 rounded bg-surface-light/50 animate-pulse ml-auto" />
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-center gap-2 pt-4 text-text-muted text-sm font-mono">
                <Loader2 size={16} className="animate-spin text-neon-purple" />
                Cargando ranking...
              </div>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="glass-card p-10 text-center">
              <WifiOff size={32} className="text-text-muted mx-auto mb-4" />
              <p className="text-text-secondary mb-2">No se pudo cargar el ranking</p>
              <p className="text-sm text-text-muted font-mono">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && leaders.length === 0 && (
            <div className="glass-card p-10 text-center">
              <Trophy size={32} className="text-text-muted mx-auto mb-4" />
              <p className="text-text-secondary mb-2">El ranking está vacío</p>
              <p className="text-sm text-text-muted font-mono">Sé el primero en subir al leaderboard</p>
            </div>
          )}

          {/* Data Rows */}
          {!loading && !error && leaders.map((dev, index) => {
            const rank = index + 1;
            const level = getLevel(dev.current_level);
            const avatarInitial = (dev.username || dev.github_handle || '?').charAt(0).toUpperCase();
            const xp = dev.xp_points || 0;

            return (
              <div
                key={dev.id || dev.username || index}
                className={`glass-card p-5 md:p-6 md:grid md:grid-cols-12 md:gap-4 md:items-center flex flex-col gap-4 ${
                  rankStyles[rank] || ''
                }`}
              >
                {/* Posición */}
                <div className="col-span-1 flex items-center gap-2">
                  {rankIcons[rank] || (
                    <span className="text-lg font-bold text-text-muted font-mono w-5 text-center">{rank}</span>
                  )}
                  <span className="md:hidden text-text-muted text-xs font-mono">#{rank}</span>
                </div>

                {/* Desarrollador */}
                <div className="col-span-3 flex items-center gap-3">
                  {dev.avatar_url ? (
                    <img
                      src={dev.avatar_url}
                      alt={dev.username || dev.github_handle}
                      className={`w-10 h-10 rounded-xl border border-white/10 shrink-0 object-cover ${
                        rank <= 3 ? 'ring-2 ring-offset-1 ring-offset-void' : ''
                      } ${rank === 1 ? 'ring-yellow-500/40' : rank === 2 ? 'ring-gray-400/40' : rank === 3 ? 'ring-amber-700/40' : ''}`}
                    />
                  ) : (
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                      avatarGradients[rank] || 'from-neon-purple/30 to-neon-cyan/30'
                    } flex items-center justify-center font-bold text-sm text-white border border-white/10 shrink-0`}>
                      {avatarInitial}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-semibold text-text-primary">{dev.username || dev.github_handle || 'Anónimo'}</span>
                    {dev.github_handle && dev.username && (
                      <span className="text-xs text-text-muted font-mono">@{dev.github_handle}</span>
                    )}
                  </div>
                </div>

                {/* Nivel */}
                <div className="col-span-2">
                  <span className={`level-badge ${level.className}`}>{level.label}</span>
                </div>

                {/* Especialidad / Active Stack */}
                <div className="col-span-2">
                  <span className="font-mono text-xs text-text-secondary">{dev.active_stack || '—'}</span>
                </div>

                {/* PRs */}
                <div className="col-span-1 text-center">
                  <span className="text-sm text-text-secondary font-mono">{dev.prs ?? '—'}</span>
                  <span className="md:hidden text-xs text-text-muted ml-1">PRs</span>
                </div>

                {/* Revisiones */}
                <div className="col-span-1 text-center">
                  <span className="text-sm text-text-secondary font-mono">{dev.reviews ?? '—'}</span>
                  <span className="md:hidden text-xs text-text-muted ml-1">revisiones</span>
                </div>

                {/* XP */}
                <div className="col-span-2 text-right">
                  <span className="text-lg font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
                    {xp.toLocaleString()} XP
                  </span>
                  {(dev.streak || 0) > 0 && (
                    <div className="flex items-center justify-end gap-1 mt-0.5">
                      <Flame size={11} className="text-amber-500" />
                      <span className="text-[0.65rem] text-text-muted font-mono">{dev.streak} días racha</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
