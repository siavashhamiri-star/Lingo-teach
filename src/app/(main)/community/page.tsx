import { PageHeader } from '@/components/shared/page-header';
import { Users } from 'lucide-react';

export default function CommunityPage() {
  return (
    <div>
      <PageHeader
        title="Community Hub"
        description="Connect with learners and practice in language exchange rooms."
        icon={Users}
      />
      {/* Placeholder for Community UI */}
      <div className="text-center p-8 border-2 border-dashed rounded-lg">
        <h2 className="text-xl font-semibold">Community Component</h2>
        <p className="text-muted-foreground">This feature is under construction.</p>
      </div>
    </div>
  );
}
