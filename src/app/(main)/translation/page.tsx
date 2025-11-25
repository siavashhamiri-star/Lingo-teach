import { PageHeader } from '@/components/shared/page-header';
import { Languages } from 'lucide-react';

export default function TranslationPage() {
  return (
    <div>
      <PageHeader
        title="Weekly Translation"
        description="Translate a text based on your language level."
        icon={Languages}
      />
      {/* Placeholder for Translation UI */}
      <div className="text-center p-8 border-2 border-dashed rounded-lg">
        <h2 className="text-xl font-semibold">Translation Component</h2>
        <p className="text-muted-foreground">This feature is under construction.</p>
      </div>
    </div>
  );
}
