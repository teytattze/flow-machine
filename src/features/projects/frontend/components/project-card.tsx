import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Project } from '@/modules/projects/projects-types';

type BaseProjectCardProps = {
  type: 'default' | 'skeleton';
  project?: Project | undefined;
};
type DefaultProjectCardProps = BaseProjectCardProps & {
  type: 'default';
  project: Project;
};
type SkeletonProjectCardProps = BaseProjectCardProps & {
  type: 'skeleton';
  project?: undefined;
};

type ProjectCardProps = DefaultProjectCardProps | SkeletonProjectCardProps;

export function ProjectCard({ type, project }: ProjectCardProps) {
  switch (type) {
    case 'skeleton':
      return <SkeletonProjectCard />;
    case 'default':
      return <DefaultProjectCard type="default" project={project} />;
  }
}

function DefaultProjectCard({ project }: DefaultProjectCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.displayName}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2">
        <Button asChild className="w-full">
          <Link href={`/dashboard/docs?projectId=${project.id}`}>Docs</Link>
        </Button>
        <Button asChild className="w-full" variant="secondary">
          <Link href={`/dashboard/tickets?projectId=${project.id}`}>
            Tickets
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function SkeletonProjectCard() {
  return <Skeleton />;
}
