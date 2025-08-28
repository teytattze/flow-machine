import { PageTemplate } from '@/components/page-template';
import { DocsPage } from '@/features/docs/frontend/components/docs-page';

type PageProps = { params: { projectId: string } };

export default function Page({ params }: PageProps) {
  const { projectId } = params;

  return (
    <PageTemplate title="Docs">
      <DocsPage projectId={projectId} />
    </PageTemplate>
  );
}
