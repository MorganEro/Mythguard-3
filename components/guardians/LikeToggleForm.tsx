'use client';

import { useGuardianLike } from '@/lib/queries/guardian';
import { LikeSubmitButton } from '../form/Button';
import { useState } from 'react';

type LikeToggleFormProps = {
  guardianId: string;
  likeId: string | null;
};

function LikeToggleForm({
  guardianId,
  likeId: initialLikeId,
}: LikeToggleFormProps) {
  const [currentLikeId, setCurrentLikeId] = useState(initialLikeId);
  const isLiked = !!currentLikeId;

  const { mutate, isLoading } = useGuardianLike({
    guardianId,
    likeId: currentLikeId,
    onSuccess: setCurrentLikeId
  });

  const handleClick = () => {
    mutate();
  };

  return (
    <div onClick={handleClick}>
      <LikeSubmitButton isLiked={isLiked} isLoading={isLoading} />
    </div>
  );
}

export default LikeToggleForm;
