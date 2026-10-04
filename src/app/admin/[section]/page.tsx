import SectionEditorClient from './SectionEditorClient';

export function generateStaticParams() {
  return [
    { section: 'organization' },
    { section: 'hero' },
    { section: 'news' },
    { section: 'events' },
    { section: 'specialists' },
    { section: 'documents' },
    { section: 'directions' },
    { section: 'partners' },
    { section: 'contacts' },
  ];
}

export default async function AdminSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const resolvedParams = await params;
  return <SectionEditorClient section={resolvedParams.section} />;
}
