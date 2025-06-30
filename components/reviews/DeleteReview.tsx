import { deleteReviewAction } from "@/actions/review/review-server-actions";
import FormContainer from "../form/FormContainer";
import { IconButton } from "../form/Button";

function DeleteReview({ reviewId }: { reviewId: string }) {
    const deleteReview = deleteReviewAction.bind(null, {reviewId});
    return (
        <FormContainer action={deleteReview}>
            <IconButton actionType="delete" />
        </FormContainer>
    );
}

export default DeleteReview;