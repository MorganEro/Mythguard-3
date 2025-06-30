import LocationContainer from '@/components/locations/LocationContainer';
import { use } from 'react';

function LocationsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = use(props.searchParams);
  const { search = '' } = searchParams;

  return <LocationContainer search={search} />;
}
export default LocationsPage;
