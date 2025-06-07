'use client';
import { SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import { toast } from 'sonner';
import { GrLogout } from 'react-icons/gr';
function SignOutLink() {
  const handleLogOut = () => {
    toast('You have successfully logged out', {
      style: {
        backgroundColor: 'white',
        color: '#24313e',
        border: '1px solid #e2e8f0',
      },
    });
  };

  return (
    <SignOutButton>
      <Link
        href="/"
        className="w-full grid grid-cols-6 gap-6 items-center capitalize "
        onClick={handleLogOut}>
        <GrLogout className="w-6 h-6 col-span-1 text-inherit" />
        <span className="col-span-5">Log Out</span>
      </Link>
    </SignOutButton>
  );
}
export default SignOutLink;
