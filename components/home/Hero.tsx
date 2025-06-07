import Link from 'next/link';
import { Button } from '../ui/button';
import HeroCarousel from './HeroCarousel';

function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center ">
      <div className="flex flex-col md:items-start text-center md:text-left">
        <h1 className="max-w-2xl font-bold text-5xl tracking-tight sm:text-6xl">
          Welcome to MythGuard!
        </h1>
        <p className="mt-8 max-w-xll text-lg text-muted-foreground">
          The legends are real. And they’re on your side.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-10">
          <Link href="/programs">View our Programs</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  );
}
export default Hero;
