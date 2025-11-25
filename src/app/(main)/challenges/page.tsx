import { PageHeader } from '@/components/shared/page-header';
import { Trophy } from 'lucide-react';

export default function ChallengesPage() {
  return (
    <div>
      <PageHeader
        title="Daily Challenges"
        description="Test your skills, compete with others, and win stars."
        icon={Trophy}
      />
      {/* Placeholder for Challenges UI */}
      <div className="text-center p-8 border-2 border-dashed rounded-lg">
        <h2 className="text-xl font-semibold">Challenges Component</h2>
        <p className="text-muted-foreground">This feature is under construction.</p>
      </div>
    </div>
  );
}
