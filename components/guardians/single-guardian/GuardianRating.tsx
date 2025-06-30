import { fetchRating } from "@/actions/review/review-server-actions";
import { RiShieldStarFill } from "react-icons/ri";

async function GuardianRating({ guardianId, category }: { guardianId: string, category: 'guardian' }) {
  const { rating, count } = await fetchRating(guardianId, category);

  const className = 'flex gap-1 items-center mt-1 mb-4 text-sm';
  const countValue = `(${count} reviews)`;

  return (
    <div className={className}>
      <RiShieldStarFill className="w-4 h-4 text-yellow-300" />
      <span>{rating}</span>
      <span className="text-gray-400">{countValue}</span>
    </div>
  );
}
export default GuardianRating;
