import { useNavigate } from 'react-router-dom';
import LessonWorkspace from '../components/LessonWorkspace';

/**
 * LessonPage — route wrapper for the split-screen lesson workspace.
 * This is a full-viewport page with NO Navbar or Footer (immersive mode).
 */
export default function LessonPage() {
  const navigate = useNavigate();

  return (
    <LessonWorkspace
      onBack={() => navigate(-1)}
    />
  );
}
