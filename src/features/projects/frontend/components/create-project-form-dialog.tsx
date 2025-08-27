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
import { appQueryClient } from '@/libs/frontend/query-client';
import { projectsHttpClient } from '@/modules/projects/frontend/projects-http-client';
import {
  CreateProjectRequestBody,
  createProjectRequestBodySchema,
} from '@/modules/projects/projects-types';

export function CreateProjectFormDialog() {
  const form = useForm<CreateProjectRequestBody>({
    resolver: zodResolver(createProjectRequestBodySchema),
    defaultValues: {
      displayName: '',
      description: '',
    },
  });

  const { mutate } = useMutation({
    mutationFn: (data: CreateProjectRequestBody) => {
      console.log(data);
      return projectsHttpClient.post('', { json: data });
    },
    onSuccess: () => {
      appQueryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const handleSubmit = (data: CreateProjectRequestBody) => {
    mutate(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-full w-full rounded-xl" variant="secondary">
          <IconPlus /> New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <DialogHeader>
              <DialogTitle>New Project</DialogTitle>
              <DialogDescription>
                Create a new project here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Public visible name" {...field} />
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
                      <Input placeholder="Describe your project" {...field} />
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
