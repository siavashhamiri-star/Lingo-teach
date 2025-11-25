import { PageHeader } from '@/components/shared/page-header';
import { BrainCircuit } from 'lucide-react';

export default function LearningPathPage() {
  return (
    <div>
      <PageHeader
        title="Personalized Learning Path"
        description="Your unique journey to fluency, crafted by AI."
        icon={BrainCircuit}
      />
      {/* Placeholder for Learning Path UI */}
      <div className="text-center p-8 border-2 border-dashed rounded-lg">
        <h2 className="text-xl font-semibold">Learning Path Component</h2>
        <p className="text-muted-foreground">This feature is under construction.</p>
      </div>
    </div>
  );
}
