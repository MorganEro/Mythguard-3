import { fetchLikeId } from '@/actions/guardian/guardian-server-actions';
import { CardSignInButton } from '../form/Button';
import LikeToggleForm from './LikeToggleForm';
import { auth } from '@clerk/nextjs/server';

async function LikeToggleButton({
  guardianId,
  guardianName,
}: {
  guardianId: string;
  guardianName: string;
}) {
  const { userId } = await auth();
  if (!userId) return <CardSignInButton />;
  const likeId = await fetchLikeId({ guardianId }) as string;

  return (
    <LikeToggleForm
      guardianId={guardianId}
      likeId={likeId}
      guardianName={guardianName}
    />
  );
}

export default LikeToggleButton;
