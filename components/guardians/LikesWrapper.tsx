'use client';

import EmptyList from "../global/EmptyList";
import ThreeColumnGrid from "../global/grids/ThreeColumnGrid";
import LoadingContainer from "../global/LoadingContainer";
import { useUserLikesQuery } from "@/lib/queries/guardian";
import GuardiansGridCard from "./GuardiansGridCard";




function LikesWrapper() {
    const { data: likes, isLoading } = useUserLikesQuery();

    if (isLoading) {
        return <LoadingContainer />;
    }
    
    return (
        <div>
            {likes?.length === 0 ? (
                <EmptyList heading="No likes yet" />
            ) : (
                <ThreeColumnGrid>
                    {likes?.map(like => {
                        const guardianId = like.guardian.id;
                    return <GuardiansGridCard
                        key={guardianId}
                        guardian={like.guardian}
                    />
                })}
                </ThreeColumnGrid>
            )}
        </div>
    );
}

export default LikesWrapper;
