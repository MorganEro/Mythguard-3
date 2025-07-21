import { fetchUserLikes } from '@/actions/guardian/guardian-server-actions';
import Section from '@/components/global/sections/Section';
import GuardiansGridCard from '@/components/guardians/GuardiansGridCard';
import ThreeColumnGrid from '@/components/global/grids/ThreeColumnGrid';
import EmptyList from '@/components/global/EmptyList';


async function LikesPage() {
  const likes = await fetchUserLikes();

  if ('message' in likes) {
    return console.log(likes.message);
  }
 
  return (
    <Section title="Your Liked Guardians">

      <ThreeColumnGrid>
        {likes.length === 0 ? (
          <EmptyList heading="You have no likes yet." />
        ) : (
          likes.map(like => (
            <GuardiansGridCard  
            guardian={like.guardian}
            key={like.id}
          />
        ))
      )}
      </ThreeColumnGrid>
    </Section>
  );
}
export default LikesPage;
