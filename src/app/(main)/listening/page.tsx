import { PageHeader } from '@/components/shared/page-header';
import { Ear } from 'lucide-react';

export default function ListeningPage() {
  return (
    <div>
      <PageHeader
        title="Weekly Listening"
        description="Improve your comprehension by listening to articles, speeches, and news."
        icon={Ear}
      />
      {/* Placeholder for Listening UI */}
      <div className="text-center p-8 border-2 border-dashed rounded-lg">
        <h2 className="text-xl font-semibold">Listening Component</h2>
        <p className="text-muted-foreground">This feature is under construction.</p>
      </div>
    </div>
  );
}
