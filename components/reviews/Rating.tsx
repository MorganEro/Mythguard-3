import { RiShieldStarFill } from "react-icons/ri";
import { IoShieldSharp } from "react-icons/io5";


function Rating({rating}: {rating: number}) {
    const starts = Array.from({length: 5} , (_, i) => i + 1 <= rating);
    return (
        <div className="flex gap-x-1 items-center">
            {starts.map((isFilled, index) => {
                return isFilled ? (
                    <RiShieldStarFill className="w-4 h-4 text-yellow-300" key={index} />
                ) : (
                    <IoShieldSharp className="w-4 h-4 text-gray-200" key={index} />
                );
            })}
        </div>
    );
}

export default Rating;