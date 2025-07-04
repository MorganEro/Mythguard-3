import db from '@/lib/db';


export const fetchAllProducts = ({ search = '' }: { search: string }) => {
    return db.product.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                {
                    company: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
            ],
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
};

