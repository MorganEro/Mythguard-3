'use client'

import Link from 'next/link';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import LikeToggleButton from './LikeToggleButton';
import { useGuardiansQuery } from '@/lib/queries/guardian';
import ThreeColumnGrid from '../global/grids/ThreeColumnGrid';

function GuardiansGrid() {
  const { data: guardians } = useGuardiansQuery();
  return (
    <ThreeColumnGrid>
      {guardians?.map(guardian => {
        const { name, image } = guardian;
        const guardianId = guardian.id;

        return (
          <article
            key={guardianId}
            className="group relative">
            <Link href={`/guardians/${guardianId}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
                <CardContent className="px-4">
                  <div className="relative aspect-[4/5] w-full rounded overflow-hidden">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                      priority
                      className="rounded w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      objectPosition="top"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h2 className="text-xl  capitalize font-bold tracking-wider text-primary">{name}</h2>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute top-7 right-7 z-5">
              <LikeToggleButton
                guardianId={guardianId}
              />
            </div>
          </article>
        );
      })}
    </ThreeColumnGrid>
  );
}
export default GuardiansGrid;
