import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { fetchAllPrograms } from '@/actions/program/program-server-actions';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

async function ProgramsPage() {
  const programs = await fetchAllPrograms();
  const totalPrograms = programs.length;

  return (
    <>
      {/* HEADER */}
      <section>
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-lg">
            {totalPrograms} {totalPrograms === 1 ? 'Program' : 'Programs'}
          </h4>
        </div>
        <Separator className="mt-4" />
      </section>
      {/* PROGRAMS */}
      <div>
        {totalPrograms === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no programs matched your search...
          </h5>
        ) : (
          <div className="mt-12 grid gap-y-8 justify-center">
            {programs.map(program => {
              const { name, image, description } = program;
              const programId = program.id;

              return (
                <article
                  key={programId}
                  className="group">
                  <Link href={`/programs/${programId}`}>
                    <Card className="transform group-hover:shadow-xl transition-shadow duration-500 max-w-[50rem]">
                      <CardContent className="p-8 gap-y-4 flex flex-col md:flex-row">
                        <div className="relative w-32 h-32 md:w-50 md:h-50 mx-auto md:mx-0 overflow-hidden ">
                          <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-contain p-2"
                            priority
                          />
                        </div>
                        <div className="flex flex-col p-2 md:p-4 gap-y-2 md:gap-y-4 md:mt-4">
                          <h2 className="text-xl font-semibold capitalize text-primary text-center md:text-left">
                            {name}
                          </h2>
                          <p className="mt-2">{description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
export default ProgramsPage;
