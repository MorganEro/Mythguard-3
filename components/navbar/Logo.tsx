import Link from 'next/link';
import orangeLogo from '@/public/images/orange-logo.svg';
import Image from 'next/image';

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center">
      <h3 className="text-xl font-extrabold ">
        <span>Myth</span>
        <Image
          src={orangeLogo}
          alt="MythGuard Logo"
          className="w-9 h-9 inline-block -mx-1"
          priority
          width={36}
          height={36}
        />
        <span>Guard</span>
      </h3>
    </Link>
  );
}
export default Logo;
