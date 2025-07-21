import transportation from '@/public/images/transportation.webp';
import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
import SectionTitle from '../global/sections/SectionTitle';

function FreeTransportation() {
  return (
    <section className="mt-12">
      <SectionTitle text="Free Transportation" />
      <Card className="mt-12 rounded-md py-0">
        <CardContent className="p-2">
          <div className="relative w-full aspect-[4/5] md:aspect-[3/2]">
            <Image
              src={transportation}
              alt="Free Transportation"
              fill
              className="object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white rounded-md p-4 text-center">
              <h2 className="text-2xl lg:text-4xl font-bold">
                Free Guardian Transportation
              </h2>
              <p className="text-sm mt-2 max-w-md lg:text-base">
                Enjoy complimentary transit with select guardian contracts.
                Available at all MythGuard headquarters.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
export default FreeTransportation;
