'use client';

import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/data-table';
import { CreateDocFormDialog } from '@/features/docs/frontend/components/create-doc-form-dialog';
import { Doc } from '@/modules/docs/docs-types';
import { docsHttpClient } from '@/modules/docs/frontend/docs-http-client';

type DocsPageProps = { projectId: string };

export function DocsPage({ projectId }: DocsPageProps) {
  const { data: tickets = [] } = useQuery({
    queryKey: ['docs'],
    queryFn: () =>
      docsHttpClient.get('', { searchParams: { projectId } }).json<Doc[]>(),
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="ml-auto">
        <CreateDocFormDialog projectId={projectId} />
      </div>
      <DataTable columns={columns} data={tickets} />
    </div>
  );
}

const columns: ColumnDef<Doc>[] = [
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'kind', header: 'Kind' },
];
