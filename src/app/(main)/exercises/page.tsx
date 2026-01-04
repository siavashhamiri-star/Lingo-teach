
import { PageHeader } from '@/components/shared/page-header';
import { BookOpenCheck } from 'lucide-react';

export default function ExercisesPage() {
  return (
    <div>
      <PageHeader
        title="Interactive Exercises"
        description="Strengthen your grammar, vocabulary, and pronunciation."
        icon={BookOpenCheck}
      />
      {/* Placeholder for Exercises UI */}
      <div className="text-center p-8 border-2 border-dashed rounded-lg">
        <h2 className="text-xl font-semibold">Exercises Component</h2>
        <p className="text-muted-foreground">This feature is under construction.</p>
      </div>
    </div>
  );
}
