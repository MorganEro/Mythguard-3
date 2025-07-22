'use client';

import { useUserFavoritesQuery } from "@/lib/queries/product";
import EmptyList from "../global/EmptyList";
import ThreeColumnGrid from "../global/grids/ThreeColumnGrid";
import ProductGridCard from "./ProductGridCard";
import { formatCurrency } from "@/lib/format";
import LoadingContainer from "../global/LoadingContainer";




function FavoritesWrapper() {
    const { data: favorites, isLoading } = useUserFavoritesQuery();

    if (isLoading) {
        return <LoadingContainer />;
    }
    
    return (
        <div>
            {favorites?.length === 0 ? (
                <EmptyList heading="No favorites yet" />
            ) : (
                <ThreeColumnGrid>
                    {favorites?.map(favorite => {
                        const { name, price, image } = favorite.product;
                        const productId = favorite.product.id;
                        const dollarsAmount = formatCurrency(price);
                    return <ProductGridCard
                        key={favorite.id}
                        productId={productId}
                        name={name}
                        image={image}
                        dollarsAmount={dollarsAmount}
                    />
                })}
                </ThreeColumnGrid>
            )}
        </div>
    );
}

export default FavoritesWrapper;
