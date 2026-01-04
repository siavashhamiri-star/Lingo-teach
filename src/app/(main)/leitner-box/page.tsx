
import { PageHeader } from '@/components/shared/page-header';
import { Package } from 'lucide-react';

export default function LeitnerBoxPage() {
  return (
    <div>
      <PageHeader
        title="Leitner Box"
        description="Master vocabulary and concepts with spaced repetition."
        icon={Package}
      />
      {/* Placeholder for Leitner Box UI */}
      <div className="text-center p-8 border-2 border-dashed rounded-lg">
        <h2 className="text-xl font-semibold">Leitner Box Component</h2>
        <p className="text-muted-foreground">This feature is under construction.</p>
      </div>
    </div>
  );
}
