import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
    title: string;
    description: string;
    icon: LucideIcon;
}

export function PageHeader({ title, description, icon: Icon }: PageHeaderProps) {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold font-headline tracking-tight">{title}</h1>
                    <p className="text-muted-foreground">{description}</p>
                </div>
            </div>
        </div>
    );
}
