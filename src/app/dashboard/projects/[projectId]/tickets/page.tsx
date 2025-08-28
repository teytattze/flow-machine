import { PageTemplate } from '@/components/page-template';
import { TicketsPage } from '@/features/tickets/frontend/components/tickets-page';

type PageProps = { params: { projectId: string } };

export default function Page({ params }: PageProps) {
  const { projectId } = params;

  return (
    <PageTemplate title="Tickets">
      <TicketsPage projectId={projectId} />
    </PageTemplate>
  );
}
