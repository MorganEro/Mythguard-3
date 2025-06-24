import { FaStar } from 'react-icons/fa';

function ProductRating({ productId }: { productId: string }) {
  const rating = 4.5;
  const count = 25;

  const className = 'flex gap-1 items-center mt-1 mb-4 text-sm';
  const countValue = `(${count} reviews)`;

  console.log({ productId, rating, count });
  return (
    <div className={className}>
      <FaStar className="w-3 h-3 text-yellow-300" />
      <span>{rating}</span>
      <span className="text-gray-400">{countValue}</span>
    </div>
  );
}
export default ProductRating;
