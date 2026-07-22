interface PageHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
}

export function PageHeader({ badge, title, subtitle }: PageHeaderProps) {
  return (
    <header className="border-b border-border bg-surface pt-32 pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        {badge && (
          <span className="section-badge mb-4">
            {badge}
          </span>
        )}
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}
