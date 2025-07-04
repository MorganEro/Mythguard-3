'use client';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { LuUserRound } from 'react-icons/lu';

function UserIcon() {
  const { user } = useUser();
  const profileImage = user?.imageUrl;
  if (profileImage)
    return (
      <Image
        src={profileImage}
        alt="User Profile"
        className="w-6 h-6 bg-primary rounded-full object-cover"
        width={24}
        height={24}
        priority
        referrerPolicy="no-referrer"
      />
    );
  return <LuUserRound className="w-6 h-6 bg-primary rounded-full text-white" />;
}
export default UserIcon;
