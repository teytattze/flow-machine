'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { IconPlus } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { appQueryClient } from '@/libs/frontend/query-client';
import { ticketsHttpClient } from '@/modules/tickets/frontend/tickets-http-client';
import {
  CreateTicketRequestBody,
  createTicketRequestBodySchema,
} from '@/modules/tickets/tickets-types';

export function CreateTicketFormDialog() {
  const form = useForm<CreateTicketRequestBody>({
    resolver: zodResolver(createTicketRequestBodySchema),
    defaultValues: {
      title: '',
      description: '',
      docs: [],
      project: { id: '' },
      status: 'TODO',
    },
  });

  const { mutate } = useMutation({
    mutationFn: (data: CreateTicketRequestBody) => {
      return ticketsHttpClient.post('', { json: data });
    },
    onSuccess: () => {
      appQueryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleSubmit = (data: CreateTicketRequestBody) => {
    mutate(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <IconPlus /> New Tickets
        </Button>
      </DialogTrigger>
      <DialogContent className="w-7xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <DialogHeader>
              <DialogTitle>New Ticket</DialogTitle>
              <DialogDescription>
                Create a new task here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
