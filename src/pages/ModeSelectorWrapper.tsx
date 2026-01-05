// ModeSelectorWrapper.tsx
import { ModeSelector } from '@/components/chat/ModeSelector';
import { useNavigate } from 'react-router-dom';

export function ModeSelectorWrapper() {
  const navigate = useNavigate();
  
  const handleSelectMode = (mode: string) => {
    navigate(`/chat/interface?mode=${mode}`);
  };

  return <ModeSelector onSelectMode={handleSelectMode} />;
}