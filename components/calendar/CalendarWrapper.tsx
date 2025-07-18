import { auth } from "@clerk/nextjs/server";
import { fetchAllEvents } from "@/actions/event/event-server-actions";
import { fetchAllUsersContracts } from "@/actions/contract/contract-server-actions";
import Calendar from "./Calendar";
import { Contract, Event } from "@prisma/client";

export type CalendarItem = {
    type: 'event' | 'contract';
    id: string;
    name: string;
    date: Date;
}

async function CalendarWrapper() {
    const {userId} = await auth();
    if (!userId) {
        return null;
    }

    const events = await fetchAllEvents();
    const contracts = await fetchAllUsersContracts({userId});

    // Handle error responses
    if ('message' in events || 'message' in contracts) {
        return null;
    }

    const calendarItems: CalendarItem[] = [
        ...events.map((event: Event) => ({
            type: 'event' as const,
            id: event.id,
            name: event.name,
            date: event.eventDate
        })),
        ...contracts.map((contract: Contract) => ({
            type: 'contract' as const,
            id: contract.id,
            name: contract.name,
            date: contract.startDate
        }))
    ];

    return (
        <Calendar items={calendarItems} />
    )
}

export default CalendarWrapper
