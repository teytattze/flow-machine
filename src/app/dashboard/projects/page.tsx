import { PageTemplate } from '@/components/page-template';
import { ProjectsPage } from '@/features/projects/frontend/components/projects-page';

export default function Page() {
  return (
    <PageTemplate title="Projects">
      <ProjectsPage />
    </PageTemplate>
  );
}
