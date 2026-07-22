interface PageHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
}

export function PageHeader({ badge, title, subtitle }: PageHeaderProps) {
  return (
    <header className="border-b border-border bg-surface pt-24 pb-10 sm:pt-28 sm:pb-14 md:pt-32 md:pb-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {badge && (
          <span className="section-badge mb-3 sm:mb-4">
            {badge}
          </span>
        )}
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-muted sm:mt-4 sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}
