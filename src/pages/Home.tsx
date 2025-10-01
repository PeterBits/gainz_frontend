import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dumbbell } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        <div className="flex justify-center">
          <div className="bg-primary text-primary-foreground p-6 rounded-2xl shadow-lg">
            <Dumbbell className="w-20 h-20" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-slate-100">
            Gainz
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Track your fitness journey
          </p>
        </div>

        <Button
          onClick={() => navigate('/login')}
          size="lg"
          className="text-lg px-8 py-6"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
