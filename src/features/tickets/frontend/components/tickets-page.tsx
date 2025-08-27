'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CreateTicketFormDialog } from '@/features/tickets/frontend/components/create-ticket-form-dialog';
import { Ticket } from '@/modules/tickets/tickets-types';

const data = [
  {
    id: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    removedAt: null,
    title: 'Ticket 1',
    description: 'Description 1',
    status: 'TODO',
    project: { id: 'project1' },
    docs: [],
  },
  {
    id: '2',
    createdAt: new Date(),
    updatedAt: new Date(),
    removedAt: null,
    title: 'Ticket 1',
    description: 'Description 1',
    status: 'TODO',
    project: { id: 'project1' },
    docs: [],
  },
  {
    id: '3',
    createdAt: new Date(),
    updatedAt: new Date(),
    removedAt: null,
    title: 'Ticket 1',
    description: 'Description 1',
    status: 'TODO',
    project: { id: 'project1' },
    docs: [],
  },
  {
    id: '4',
    createdAt: new Date(),
    updatedAt: new Date(),
    removedAt: null,
    title: 'Ticket 1',
    description: 'Description 1',
    status: 'TODO',
    project: { id: 'project1' },
    docs: [],
  },
  {
    id: '5',
    createdAt: new Date(),
    updatedAt: new Date(),
    removedAt: null,
    title: 'Ticket 1',
    description: 'Description 1',
    status: 'TODO',
    project: { id: 'project1' },
    docs: [],
  },
] as const satisfies Ticket[];

const columns: ColumnDef<Ticket>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'status', header: 'Status' },
];

export function TicketsPage() {
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col gap-4">
      <section className="flex justify-between">
        <Input className="w-full max-w-sm" placeholder="Search..." />
        <CreateTicketFormDialog />
      </section>
      <section className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
