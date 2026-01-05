// ChatInterfaceWrapper.tsx
import { ChatInterface } from '@/components/chat/ChatInterface';
import { useNavigate, useLocation } from 'react-router-dom';

export function ChatInterfaceWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get('mode') || 'teaching_fr';

  const handleBack = () => {
    navigate('/chat/mode');
  };

  return <ChatInterface mode={mode} onBack={handleBack} />;
}