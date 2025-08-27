import { PageTemplate } from '@/components/page-template';
import { TicketsPage } from '@/features/tickets/frontend/components/tickets-page';

export default function Page() {
  return (
    <PageTemplate title="Tickets">
      <TicketsPage />
    </PageTemplate>
  );
}
