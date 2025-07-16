import { auth } from '@clerk/nextjs/server';
import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
  const { userId } = await auth();
  const { reviewId } = await req.json();

  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await db.review.delete({
      where: { id: reviewId, clerkId: userId },
    });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    );
  }
}
