import { FaHeart } from 'react-icons/fa';
import { Button } from '../ui/button';

function FavoriteToggleButton({ productId }: { productId: string }) {
  return (
    <Button
      size="icon"
      variant="outline"
      className="p-2 cursor-pointer"
      onClick={() => {
        // Logic to toggle favorite status
        console.log(`Toggling favorite for product ID: ${productId}`);
      }}>
      <FaHeart />
    </Button>
  );
}
export default FavoriteToggleButton;
