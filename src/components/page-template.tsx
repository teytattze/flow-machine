import { SiteHeader } from "@/components/site-header";
import { PropsWithChildren } from "react";

type PageTemplateProps = PropsWithChildren<{ title: string }>;

export function PageTemplate({ children, title }: PageTemplateProps) {
  return (
    <>
      <SiteHeader title={title} />
      <div className="flex flex-1 flex-col p-4">{children}</div>
    </>
  );
}
