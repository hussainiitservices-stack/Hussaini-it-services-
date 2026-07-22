import { JsonLd } from "@/components/seo/JsonLd";

interface PageSeoProps {
  schemas: Record<string, unknown> | Record<string, unknown>[];
}

export function PageSeo({ schemas }: PageSeoProps) {
  return <JsonLd data={schemas} />;
}
