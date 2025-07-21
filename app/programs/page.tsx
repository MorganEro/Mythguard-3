import { fetchAllPrograms } from '@/actions/program/program-server-actions';
import OneColumnGrid from '@/components/global/grids/OneColumnGrid';
import ItemsCount from '@/components/global/ItemsCount';
import Section from '@/components/global/sections/Section';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

async function ProgramsPage() {
  const programs = await fetchAllPrograms();
  const totalPrograms = programs.length;

  return (
    <Section title="Programs">
      <ItemsCount count={totalPrograms} text="Program" />
      <div>
        {totalPrograms === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no programs matched your search...
          </h5>
        ) : (
          <OneColumnGrid>
            {programs.map(program => {
              const { name, image, description } = program;
              const programId = program.id;

              return (
                <article
                  key={programId}
                  className="group">
                  <Link href={`/programs/${programId}`}>
                    <Card className="transform group-hover:shadow-xl transition-shadow duration-500 max-w-[50rem] py-0">
                      <CardContent className="p-4 gap-y-4 flex flex-col md:flex-row">
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
          </OneColumnGrid>
        )}
      </div>
    </Section>
  );
}
export default ProgramsPage;
