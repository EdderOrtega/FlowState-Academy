import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth.jsx';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import LeaderboardPage from './pages/LeaderboardPage';
import DocsPage from './pages/DocsPage';
import LessonPage from './pages/LessonPage';
import LessonsPage from './pages/LessonsPage';
import DashboardPage from './pages/DashboardPage';
import OnboardingFlow from './components/OnboardingFlow';

// ── Loading Spinner ────────────────────────────────────────────────────────────
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-void flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan animate-pulse" />
        <p className="font-mono text-xs text-text-muted animate-pulse">cargando...</p>
      </div>
    </div>
  );
}

// ── App Content ────────────────────────────────────────────────────────────────
function AppContent() {
  const { user, profile, loading, updateProfileLocally } = useAuth();

  // ① Auth is still resolving — show loader briefly
  if (loading) return <LoadingScreen />;

  // ② User is logged in
  if (user) {
    // Check missing profile OR explicitly check our optimistic localStorage flag
    const hasLocalFlag = localStorage.getItem('flowstate_onboarding_done') === 'true';
    const needsOnboarding = (!profile || !profile.onboarding_completed) && !hasLocalFlag;

    if (needsOnboarding) {
      return (
        <OnboardingFlow
          userId={user.id}
          onComplete={async (selectedStack) => {
            // Persist locally to survive F5 reloads while DB is disconnected
            localStorage.setItem('flowstate_onboarding_done', 'true');
            // Update react state
            updateProfileLocally({ onboarding_completed: true, selected_stack: selectedStack });
          }}
        />
      );
    }

    // ② b — Fully onboarded user — app shell with authenticated routes
    return (
      <Routes>
        {/* Immersive routes — no Navbar/Footer */}
        <Route path="/lesson" element={<LessonPage />} />
        <Route path="/lesson/:lessonId" element={<LessonPage />} />

        {/* Onboarding route (if user explicitly navigates there) */}
        <Route
          path="/onboarding"
          element={
            <OnboardingFlow
              userId={user.id}
              onComplete={async (selectedStack) => {
                updateProfileLocally({ onboarding_completed: true, selected_stack: selectedStack });
              }}
            />
          }
        />

        {/* Standard shell */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-void w-full overflow-x-clip">
              <Navbar />
              <main className="w-full">
                <Routes>
                  {/* Dashboard = home for logged-in users */}
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/leaderboard" element={<LeaderboardPage />} />
                  <Route path="/docs" element={<DocsPage />} />
                  <Route path="/lessons" element={<LessonsPage />} />
                  {/* Catch-all redirect to dashboard */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    );
  }

  // ③ Not logged in — public shell
  return (
    <div className="min-h-screen bg-void w-full overflow-x-clip">
      <Navbar />
      <main className="w-full">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/docs" element={<DocsPage />} />
          {/* Redirect everything else to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
