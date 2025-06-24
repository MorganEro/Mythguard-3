import GuardiansContainer from '@/components/guardians/GuardiansContainer';
import { use } from 'react';

function GuardiansPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = use(props.searchParams);
  const { layout = 'grid', search = '' } = searchParams;

  return (
    <GuardiansContainer
      layout={layout as 'grid' | 'list'}
      search={search}
    />
  );
}
export default GuardiansPage;
