import { PageHeader } from '@/components/shared/page-header';
import { MicVocal } from 'lucide-react';

export default function AccentTrainingPage() {
  return (
    <div>
      <PageHeader
        title="AI Accent Training"
        description="Improve your pronunciation with real-time AI feedback."
        icon={MicVocal}
      />
      {/* Placeholder for Accent Training UI */}
      <div className="text-center p-8 border-2 border-dashed rounded-lg">
        <h2 className="text-xl font-semibold">Accent Training Component</h2>
        <p className="text-muted-foreground">This feature is under construction.</p>
      </div>
    </div>
  );
}
