import { PageHeader } from '@/components/shared/page-header';
import { BookText } from 'lucide-react';

export default function StoriesPage() {
  return (
    <div>
      <PageHeader
        title="Bilingual Short Stories"
        description="Enjoy a new story each week, read aloud in both English and Persian."
        icon={BookText}
      />
      {/* Placeholder for Stories UI */}
      <div className="text-center p-8 border-2 border-dashed rounded-lg">
        <h2 className="text-xl font-semibold">Story Component</h2>
        <p className="text-muted-foreground">This feature is under construction.</p>
      </div>
    </div>
  );
}
