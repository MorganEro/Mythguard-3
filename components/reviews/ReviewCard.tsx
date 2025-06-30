import Image from "next/image";
import { Card, CardHeader, CardContent } from "../ui/card";
import Rating from "./Rating";
import Comment from "./Comment";

type ReviewCardProps = {
    reviewInfo: {
        comment: string;
        rating: number;
        image: string;
        name: string;
    }
    children?: React.ReactNode;
}

function ReviewCard({ reviewInfo, children }: ReviewCardProps) {
    return (
        <Card className="relative">
            <CardHeader>
                <div className="flex items-center">
                    <Image
                        src={reviewInfo.image}
                        alt={reviewInfo.name}
                        width={48}
                        height={48}
                        className="rounded-full w-12 h-12 object-cover"
                    />
                    <div className="ml-4">
                        <h3 className="font-bold text-sm capitalize mb-1">{reviewInfo.name}</h3>
                        <Rating rating={reviewInfo.rating}/>
                    </div>
                </div>

            </CardHeader>
            <CardContent>
                <Comment comment={reviewInfo.comment}/>
            </CardContent>
            <div className="absolute top-3 right-3">
                {children}
            </div>
        </Card>
    );
}

export default ReviewCard;