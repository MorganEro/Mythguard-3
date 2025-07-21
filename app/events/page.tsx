import { fetchAllEvents } from '@/actions/event/event-server-actions';
import EmptyList from '@/components/global/EmptyList';
import TwoColumnGrid from '@/components/global/grids/TwoColumnGrid';
import ItemsCount from '@/components/global/ItemsCount';
import Section from '@/components/global/sections/Section';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/format';
import Image from 'next/image';
import Link from 'next/link';

async function EventsPage() {
  const events = await fetchAllEvents();
  const totalEvents = events.length;

  return (
    <Section title="Events">
      {totalEvents === 0 ? (
        <EmptyList heading="There are currently no events" />
      ) : (
        <>
          <ItemsCount count={totalEvents} text="Event" />
          <TwoColumnGrid>

            {events.map(event => {
              const { name, image, shortDescription, eventDate } = event;
              const eventId = event.id;

              return (
                <article
                  key={eventId}
                  className="group">
                  <Link href={`/events/${eventId}`}>
                    <Card className="transform group-hover:shadow-xl transition-shadow duration-500 h-full pb-2 md:pb-0">
                      <CardContent className="p-4 gap-4 flex flex-col md:flex-row items-center h-full">
                        <div className="relative w-full md:w-1/2 h-48 md:h-full mx-auto md:mx-0 overflow-hidden rounded shrink-0">
                          <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover"
                            priority
                          />
                        </div>
                        <div className="flex flex-col md:gap-y-4 flex-grow">
                          <h2 className="text-xl font-semibold capitalize text-primary">
                            {name}
                          </h2>
                          <p className="mt-2">{shortDescription}</p>
                          <p className="text-muted-foreground mt-1">
                            {formatDate(eventDate)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </article>
              );
            })}
          </TwoColumnGrid>
        </>
      )}
    </Section>
  );
}
export default EventsPage;
