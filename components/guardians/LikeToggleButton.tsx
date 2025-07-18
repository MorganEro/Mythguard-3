'use client';

import { useGuardianLike, useGuardianLikeQuery } from '@/lib/queries/guardian';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { LikeSignInButton, LikeSubmitButton } from '../form/Button';
import { Spinner } from '../ui/spinner';

type LikeToggleButtonProps = {
  guardianId: string;
};

function LikeToggleButton({ guardianId }: LikeToggleButtonProps) {
  const { user } = useUser();
  const { data: initialLikeId, isLoading: isQueryLoading } = useGuardianLikeQuery({
    guardianId,
    enabled: !!user,
  });

  const [currentLikeId, setCurrentLikeId] = useState<string | null>(initialLikeId);
  const isLiked = !!currentLikeId;

  const { mutate, isLoading: isMutating } = useGuardianLike({
    guardianId,
    likeId: currentLikeId,
    onSuccess: setCurrentLikeId
  });

  if (isQueryLoading) {
    return (
      <div className="flex justify-center p-2">
        <Spinner />
      </div>
    );
  }

  if (!user) return <LikeSignInButton />;

  const handleClick = () => {
    mutate();
  };

  return (
    <div onClick={handleClick}>
      <LikeSubmitButton isLiked={isLiked} isLoading={isMutating} />
    </div>
  );
}

export default LikeToggleButton;
