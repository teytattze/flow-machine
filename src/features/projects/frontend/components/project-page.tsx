'use client';

import { useQuery } from '@tanstack/react-query';
import { CreateProjectFormDialog } from '@/features/projects/frontend/components/create-project-form-dialog';
import { ProjectCard } from '@/features/projects/frontend/components/project-card';
import { projectsHttpClient } from '@/modules/projects/frontend/projects-http-client';
import { Project } from '@/modules/projects/projects-types';

export function ProjectPage() {
  const { data: projects = [], status } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectsHttpClient.get('').json<Project[]>(),
  });

  return (
    <div className="container grid auto-rows-[minmax(12.25rem,1fr)] grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {status === 'success'
        ? projects.map((project) => (
            <ProjectCard key={project.id} type="default" project={project} />
          ))
        : [1, 2, 3, 4, 5, 6, 7].map((i) => (
            <ProjectCard key={i} type="skeleton" />
          ))}
      <CreateProjectFormDialog />
    </div>
  );
}
