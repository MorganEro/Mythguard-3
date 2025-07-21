import { fetchRating } from "@/actions/review/review-server-actions";
import { RiShieldStarFill } from "react-icons/ri";

async function GuardianRating({ guardianId, category }: { guardianId: string, category: 'guardian' }) {
  const { rating, count } = await fetchRating(guardianId, category);

  const countValue = `(${count} reviews)`;

  return (
    <div className='flex gap-1 items-center text-sm'>
      <RiShieldStarFill className="w-4 h-4 text-yellow-300" />
      <span>{rating}</span>
      <span className="text-gray-400">{countValue}</span>
    </div>
  );
}
export default GuardianRating;
