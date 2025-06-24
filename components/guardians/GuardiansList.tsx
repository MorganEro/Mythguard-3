import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Guardian } from '@prisma/client';
import Image from 'next/image';
import LikeToggleButton from './LikeToggleButton';

function GuardiansList({ guardians }: { guardians: Guardian[] }) {
  return (
    <div className="mt-12 grid gap-y-8">
      {guardians.map(guardian => {
        const { name, image, shortDescription } = guardian;
        const guardianId = guardian.id;

        return (
          <article
            key={guardianId}
            className="group relative">
            <Link href={`/guardians/${guardianId}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
                <CardContent className="p-8 gap-y-4 grid md:grid-cols-3">
                  <div className="relative aspect-[4/5] w-full md:w-1/2 md:max-h-[25rem] overflow-hidden">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="rounded-md object-cover object-top"
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                      priority
                    />
                  </div>
                  <div className="flex flex-col p-4 md:col-span-2 gap-y-2 md:gap-y-4 md:mt-4">
                    <h2 className="text-xl font-semibold capitalize">{name}</h2>
                    <p className="text-muted-foreground mt-2">{shortDescription}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <div className="absolute bottom-8 right-8 z-5">
              <LikeToggleButton
                guardianId={guardianId}
                guardianName={name}
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}
export default GuardiansList;
