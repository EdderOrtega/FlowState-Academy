import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth.jsx';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import LeaderboardPage from './pages/LeaderboardPage';
import DocsPage from './pages/DocsPage';
import LessonPage from './pages/LessonPage';
import OnboardingFlow from './components/OnboardingFlow';

function AppContent() {
  const { user, profile, loading, refreshProfile } = useAuth();

  // Show nothing while auth initializes
  if (loading) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-purple to-neon-cyan animate-pulse" />
      </div>
    );
  }

  // Logged-in user who hasn't completed onboarding
  const needsOnboarding = user && profile && !profile.onboarding_completed;

  if (needsOnboarding) {
    return (
      <OnboardingFlow
        userId={user.id}
        onComplete={async () => {
          await refreshProfile();
        }}
      />
    );
  }

  return (
    <Routes>
      {/* ── Immersive routes (no Navbar/Footer) ── */}
      <Route path="/lesson" element={<LessonPage />} />
      <Route path="/lesson/:lessonId" element={<LessonPage />} />

      {/* ── Standard shell routes ── */}
      <Route
        path="*"
        element={
          <div className="min-h-screen bg-void w-full overflow-x-clip">
            <Navbar />
            <main className="w-full">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/docs" element={<DocsPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
