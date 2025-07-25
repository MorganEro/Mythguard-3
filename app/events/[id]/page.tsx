import { fetchSingleEventWithRelatedFields } from '@/actions/event/event-server-actions';
import EmptyList from '@/components/global/EmptyList';
import GuardianThumbnailCard from '@/components/guardians/GuardianThumbnailCard';
import LocationThumbnailCard from '@/components/locations/LocationThumbnailCard';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import Image from 'next/image';
import { formatDate } from '@/lib/format';
import Section from '@/components/global/sections/Section';
import SubSection from '@/components/global/sections/SubSection';

async function SingleEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await fetchSingleEventWithRelatedFields(id);
  const { name, image, description, eventDate } = event;

  const totalGuardians = event.guardians && event.guardians.length;

  return (
    <Section title={name}>
      <BreadCrumbs
        previousName="Events"
        previousLink="/events"
        currentName={name}
      />
      <div className="my-4 flex flex-col gap-y-2">
        <div className="flex items-center relative h-[300px]">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover rounded-md "
          />
        </div>
        <h1 className="mt-2 capitalize text-3xl font-bold"> {name}</h1>
        <p className="text-muted-foreground">
          Event Date:{' '}
          {formatDate(eventDate, true)}
        </p>
        <p className="leading-8">{description}</p>
      </div>
      <SubSection title="Related Location">
        <div className="mt-4 flex gap-4 h-65">
          {event.location ? (
            <LocationThumbnailCard
              id={event.location.id}
              name={event.location.name}
              image={event.location.image}
            />
          ) : (
            <EmptyList heading="No locations related to this event" />
          )}
        </div>
      </SubSection>

      <SubSection title={totalGuardians === 1 ? 'Related Guardian' : 'Related Guardians'}>
        <div className="mt-4 flex gap-4 overflow-x-scroll scrollbar-none h-65">
          {totalGuardians === 0 ? (
            <EmptyList heading="No Guardians Found" />
          ) : (
            event.guardians.map(guardian => (
              <GuardianThumbnailCard
                key={guardian.id}
                id={guardian.id}
                name={guardian.name}
                image={guardian.image}
              />
            ))
          )}
        </div>
      </SubSection>
    </Section>
  );
}
export default SingleEventPage;
