import { PageTemplate } from '@/components/page-template';
import { ProjectPage } from '@/features/projects/frontend/components/project-page';

export default function Page() {
  return (
    <PageTemplate title="Projects">
      <ProjectPage />
    </PageTemplate>
  );
}
