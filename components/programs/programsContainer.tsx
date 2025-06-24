
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { fetchAllPrograms } from '@/actions/program/program-client-actions';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';

async function ProgramsContainer({
  search,
}: {
  search: string | string[];
}) {
  const programs = await fetchAllPrograms({ search: search as string });
  const totalPrograms = programs.length;
  const searchTerm = search ? `&search=${search}` : '';

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
      {/* GUARDIANS */}
      <div>
        {totalPrograms === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no programs matched your search...
          </h5>
        ) : (
          <div className="mt-12 grid gap-y-8">
          {programs.map(program => {
            const { name, image, description } = program;
            const programId = program.id;
    
            return (
              <article
                key={programId}
                className="group">
                <Link href={`/programs/${programId}`}>
                  <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
                    <CardContent className="p-8 gap-y-4 grid md:grid-cols-3">
                      <div className="relative w-32 h-32 mx-auto md:mx-0 overflow-hidden bg-secondary/10 rounded-full p-2 border-2 border-secondary/20">
                        <Image
                          src={image}
                          alt={name}
                          fill
                          className="object-contain p-2"
                          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                          priority
                        />
                      </div>
                      <div className="flex flex-col p-4 md:col-span-2 gap-y-2 md:gap-y-4 md:mt-4">
                        <h2 className="text-xl font-semibold capitalize">{name}</h2>
                        <p className="text-muted-foreground mt-2">{description}</p>
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
export default ProgramsContainer;
