import { Separator } from "@/components/ui/separator";

function AboutPage() {
  return (
    <section>
      <h1 className="flex flex-wrap gap-1 sm:gap-x-2 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl">
        What is<span className="text-primary">MythGuard</span>?
      </h1>
      <p className="mt-4 tracking-wide leading-8 ">
        Founded over 30 years ago in Minneapolis, Minnesota, MythGuard is the
        world’s first — and only — official agency dedicated to integrating
        Mythical Guardians into human society. These extraordinary beings have
        long walked among us, hidden behind ancient veils of secrecy and
        illusion. While their origins remain a tightly kept secret, a select few
        have stepped forward, choosing to live and work openly alongside humans.
      </p>
      <Separator className="my-8"/>
      <h2 className="text-3xl font-bold tracking-wide">
        Our Mission
      </h2>
      <ul className="mt-4 list-decimal list-inside tracking-wide leading-8">
        <li>
          To protect and serve our human clients with unmatched strength,
          loyalty, and precision, and
        </li>
        <li>
          To support our Guardians in finding meaningful roles and respectful
          representation within the human world.
        </li>
      </ul>
      <Separator className="my-8"/>
      <h2 className="text-3xl font-bold tracking-wide">
        Who we are
      </h2>
      <p className="mt-2 tracking-wide leading-8">
        We’re more than just an agency — we’re a bridge between two
        civilizations.
      </p>
      <p className="mt-2 tracking-wide leading-8">
        Our team includes seasoned diplomats, mythos-specialists, security
        coordinators, and human integration advisors — all working together to
        ensure each Guardian is properly trained, supported, and matched with
        clients who value their unique abilities.
      </p>
      <p className="mt-2 tracking-wide leading-8">
        With a growing roster of Guardians, our Minneapolis headquarters serves
        as a hub for hiring, training, and even culture-sharing events —
        including our popular Guardian Nutrition Exhibitions where humans can
        sample otherworldly delicacies.
      </p>
      <Separator className="my-8"/>
      <h2 className="text-3xl font-bold tracking-wide">
        Why choose MythGuard?
      </h2>
      <p className="mt-2 tracking-wide leading-8">
        Because this isn’t fantasy — it’s real. <br />
        And it’s spectacular. We combine advanced security training with ancient
        magic, mythical strength with modern professionalism
      </p>
      <p className="mt-2 tracking-wide leading-8">
        Every hire comes with a compatibility evaluation, background mythos
        screening, and a certified Guardian liaison. Whether you need executive
        protection, ceremonial presence, or disaster response support, we’ve got
        you covered.
      </p>
      <Separator className="my-8"/>
      <h2 className="text-3xl font-bold tracking-wide">
        Looking ahead
      </h2>
      <p className="mt-2 tracking-wide leading-8">
        While our roots are firmly planted in Minneapolis, expansion plans are
        underway. Our vision is to see MythGuard agencies around the world,
        fostering coexistence and creating new opportunities for both humans and
        mythical beings alike.
      </p>
      <p className="mt-2 tracking-wide leading-8">
        Want to learn more? <br />
        Come visit our HQ. You might catch a Dragon in the transit bay or sample
        some Velari moonfruit stew at the market. <br />
        But above all — you&#39;ll experience the future of integrated security.
      </p>
    </section>
  );
}
export default AboutPage;
