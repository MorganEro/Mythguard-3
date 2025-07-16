'use client';

import { CardSignInButton } from '../form/Button';
import LikeToggleForm from './LikeToggleForm';
import { useUser } from '@clerk/nextjs';
import { Spinner } from '../ui/spinner';
import { useGuardianLikeQuery } from '@/lib/queries/guardian';

type LikeToggleButtonProps = {
  guardianId: string;
};

export default function LikeToggleButton({ guardianId }: LikeToggleButtonProps) {
  const { user, isLoaded } = useUser();
  const { data: likeId, isLoading } = useGuardianLikeQuery({
    guardianId,
    enabled: !!user,
  });

  if (!isLoaded || isLoading) {
    return (
      <div className="flex justify-center p-2">
        <Spinner />
      </div>
    );
  }

  if (!user) return <CardSignInButton />;

  return (
    <LikeToggleForm
      guardianId={guardianId}
      likeId={likeId ?? null}
    />
  );
}
