'use client';

import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/data-table';
import { CreateTicketFormDialog } from '@/features/tickets/frontend/components/create-ticket-form-dialog';
import { ticketsHttpClient } from '@/modules/tickets/frontend/tickets-http-client';
import { Ticket } from '@/modules/tickets/tickets-types';

type TicketsPageProps = { projectId: string };

export function TicketsPage({ projectId }: TicketsPageProps) {
  const { data: tickets = [] } = useQuery({
    queryKey: ['tickets'],
    queryFn: () =>
      ticketsHttpClient
        .get('', { searchParams: { projectId } })
        .json<Ticket[]>(),
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="ml-auto">
        <CreateTicketFormDialog projectId={projectId} />
      </div>
      <DataTable columns={columns} data={tickets} />
    </div>
  );
}

const columns: ColumnDef<Ticket>[] = [
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'status', header: 'Status' },
];
