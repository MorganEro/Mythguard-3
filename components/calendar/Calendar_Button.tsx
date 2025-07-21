import { FaCalendarAlt } from "react-icons/fa"
import { Button } from "../ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import CalendarWrapper from "./CalendarWrapper"

function CalendarButton() {


    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="rounded p-1 fixed right-4 bottom-4 z-10">
                    <FaCalendarAlt />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <CalendarWrapper />
            </PopoverContent>
        </Popover>
    )
}
export default CalendarButton