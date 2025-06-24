import { RiShieldStarFill } from "react-icons/ri";

function GuardianRating({ guardianId }: { guardianId: string }) {
  const rating = 4.5;
  const count = 25;

  const className = 'flex gap-1 items-center mt-1 mb-4 text-sm';
  const countValue = `(${count} reviews)`;

  console.log({ guardianId, rating, count });
  return (
    <div className={className}>
      <RiShieldStarFill className="w-4 h-4 text-yellow-300" />
      <span>{rating}</span>
      <span className="text-gray-400">{countValue}</span>
    </div>
  );
}
export default GuardianRating;
