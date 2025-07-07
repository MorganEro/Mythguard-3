import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { fetchAllEvents } from '@/actions/event/event-server-actions';
import SectionTitle from '@/components/global/SectionTitle';

async function EventsPage() {
  const events = await fetchAllEvents();
  const totalEvents = events.length;

  return (
    <>
      {/* HEADER */}
      <section>
        <SectionTitle text="Events" />
      </section>
      {/* EVENTS */}
      <div>
        {totalEvents === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no events matched your search...
          </h5>
        ) : (
          <>
            <div className="flex items-center justify-between mt-8">
              <h4 className="font-medium text-lg">
                There are {totalEvents} upcoming {totalEvents === 1 ? 'Event' : 'Events'}
              </h4>
            </div>
            <div className="mt-12 grid lg:grid-cols-2 gap-8">

              {events.map(event => {
                const { name, image, shortDescription, eventDate } = event;
                const eventId = event.id;

                return (
                  <article
                    key={eventId}
                    className="group">
                    <Link href={`/events/${eventId}`}>
                      <Card className="transform group-hover:shadow-xl transition-shadow duration-500 h-full">
                        <CardContent className="p-8 gap-y-4 flex flex-col md:flex-row items-center h-full">
                          <div className="relative w-full md:w-1/2 h-48 md:h-full mx-auto md:mx-0 overflow-hidden rounded shrink-0">
                            <Image
                              src={image}
                              alt={name}
                              fill
                              className="object-cover"
                              priority
                            />
                          </div>
                          <div className="flex flex-col p-4 gap-y-2 md:gap-y-4 flex-grow">
                            <h2 className="text-xl font-semibold capitalize text-primary">
                              {name}
                            </h2>
                            <p className="mt-2">{shortDescription}</p>
                            <p className="text-muted-foreground mt-1">
                              {eventDate.toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default EventsPage;
