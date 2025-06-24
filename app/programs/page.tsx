import ProgramsContainer from '@/components/programs/programsContainer';
import { use } from 'react';

function ProgramsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = use(props.searchParams);
  const { search = '' } = searchParams;

  return (
    <ProgramsContainer
    search={search}
    />
  );
}
export default ProgramsPage;
