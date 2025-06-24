import { fetchUserLikes } from '@/actions/guardian/guardian-server-actions';
import SectionTitle from '@/components/global/SectionTitle';
import GuardiansGrid from '@/components/guardians/GuardiansGrid';

async function LikesPage() {
  const likes = await fetchUserLikes();
  if (!likes || likes.length === 0)
    return <SectionTitle text="You have no likes yet." />;
  return (
    <div>
      <SectionTitle text="Your Liked Guardians" />
      <GuardiansGrid guardians={likes.map(like => like.guardian)} />
    </div>
  );
}
export default LikesPage;
