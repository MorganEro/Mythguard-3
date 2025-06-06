import hero1 from '@/public/images/hero1.webp';
import hero2 from '@/public/images/hero2.png';
import hero3 from '@/public/images/hero3.png';
import hero4 from '@/public/images/hero4.png';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';

const carouselImages = [hero1, hero2, hero3, hero4];

function HeroCarousel() {
  return (
    <div>
      <Carousel
        opts={{
          loop: true,
        }}>
        <CarouselContent>
          {carouselImages.map((image, index) => {
            return (
              <CarouselItem key={index}>
                <Card className="p-2">
                  <CardContent className="p-2">
                    <Image
                      src={image}
                      alt="hero"
                      className="w-full h-[24rem] rounded-md object-cover"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselDots />
      </Carousel>
    </div>
  );
}
export default HeroCarousel;
