import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';

async function LocationThumbnailCard({
  id,
  name,
  image,
}: {
  id: string;
  name: string;
  image: string;
}) {
  return (
    <Link href={`/locations/${id}`}>
      <Card className="w-55 h-55 flex flex-col shadow-md gap-2">
        <CardHeader className="text-center flex-shrink-0 text-primary font-medium">
          <CardTitle>
            <h4 className="truncate text-sm font-semibold tracking-wide">
              {name}
            </h4>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center px-4">
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transform transition-transform duration-500 hover:scale-105 rounded"
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
export default LocationThumbnailCard;
