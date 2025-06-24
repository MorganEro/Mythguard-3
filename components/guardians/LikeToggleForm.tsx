'use client';

import { usePathname } from 'next/navigation';
import FormContainer from '../form/FormContainer';
import { LikeSubmitButton } from '../form/Button';
import { toggleLikeAction } from '@/actions/guardian/guardian-server-actions';

type LikeToggleFormProps = {
  guardianId: string;
  likeId: string | null;
  guardianName: string;
};

function LikeToggleForm({
  guardianId,
  likeId,
  guardianName,
}: LikeToggleFormProps) {
  const pathname = usePathname();
  const toggleAction = toggleLikeAction.bind(null, {
    guardianId,
    likeId,
    guardianName,
    pathname,
  });
  return (
    <FormContainer action={toggleAction}>
      <LikeSubmitButton isLiked={!!likeId} />
    </FormContainer>
  );
}
export default LikeToggleForm;
