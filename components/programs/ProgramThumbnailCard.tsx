import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';

async function ProgramThumbnailCard({
  id,
  name,
  image,
}: {
  id: string;
  name: string;
  image: string;
}) {
  return (
    <Link href={`/programs/${id}`}>
      <Card className="w-40 h-55 flex flex-col shadow-md gap-0">
        <CardHeader className="text-center flex-shrink-0 text-primary">
          <CardTitle>
            <h4 className="text-sm font-semibold tracking-wide">
              {name}
            </h4>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="relative h-3/4 w-3/4">
            <Image
              src={image}
              alt={name}
              fill
              className="object-contain transform transition-transform duration-500 hover:scale-105 rounded"
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
export default ProgramThumbnailCard;
