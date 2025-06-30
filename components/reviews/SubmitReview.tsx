'use client';

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import FormContainer from "../form/FormContainer";
import { createReviewAction } from "@/actions/review/review-server-actions";
import RatingInput from "./RatingInput";
import TextAreaInput from "../form/TextAreaInput";
import { SubmitButton } from "../form/Button";
import { ReviewCategory } from "@/types/review";

function SubmitReview({categoryId, category,}: {categoryId: string, category: ReviewCategory}) {
    const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
    const {user} = useUser();
    return (
        <div>
            <Button
            size= 'lg'
            className='mb-5'
            onClick={() => setIsReviewFormVisible(prev => !prev)}
            disabled={!user}
            >
                Leave a Review
            </Button>
            {isReviewFormVisible && (
                <Card>
                    <CardContent>
                    <FormContainer action={createReviewAction} className="grid gap-4">
                        <input type="hidden" name="categoryId" value={categoryId} />
                        <input type="hidden" name="category" value={category} />
                        <input type="hidden" name={category + 'Id'} value={categoryId} />
                        <input type="hidden" name="authorName" value={user?.firstName || 'User'} />
                        <input type="hidden" name="authorImageUrl" value={user?.imageUrl} />
                        <RatingInput name="rating" />
                        <TextAreaInput name="comment" labelText="feedback" defaultValue="Excellent!!"/>
                        <SubmitButton className="justify-self-start" />
                    </FormContainer>
                    </CardContent>
                </Card>
                
            )}
        </div>
    );
}

export default SubmitReview;