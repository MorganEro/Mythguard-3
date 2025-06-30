import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Guardian } from '@prisma/client';
import Image from 'next/image';
import LikeToggleButton from './LikeToggleButton';

function GuardiansList({ guardians }: { guardians: Guardian[] }) {
  return (
    <div className="mt-12 grid gap-8 justify-center">
      {guardians.map(guardian => {
        const { name, image, shortDescription } = guardian;
        const guardianId = guardian.id;

        return (
          <article
            key={guardianId}
            className="group relative">
            <Link href={`/guardians/${guardianId}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500 max-w-[50rem]">
                <CardContent className="p-8 gap-y-4 flex flex-col md:flex-row md:gap-x-4">
                  <div className="flex-shrink-0 w-full md:w-[10rem]"> 
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="rounded-md object-cover object-top"
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 10vw, 12vw"
                      priority
                    />
                  </div>
                  </div>
                  <div className="flex flex-col p-4 gap-y-2 md:gap-y-4 md:mt-4">
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
