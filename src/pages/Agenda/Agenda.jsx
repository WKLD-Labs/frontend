import { useState, useEffect } from "react";
import ScheduleCalendar from "./components/ScheduleCalendar"


export default function Agenda() {
    const [date, setDate] = useState(new Date());

    
    return (
        <div class="mt-16 px-16 min-h-full">
            <div class="flex flex-row">
                <h1 class="text-5xl mb-2 static w-3 flex-1">Agenda</h1>
                <button type="button" class="bg bg-white border-asegreydark border p-2 rounded-2xl w-32 h-fit text-lg">New Event</button>
            </div>
            <br></br>
            <br></br>
            <div class="flex flex-row items-center">
                {/*}<button type="button" class="bg bg-aseorange border-aseorange text-white border p-2 text-lg rounded-2xl px-4 w-32 h-fit">Prev</button>
                <h2 class="text-3xl text-center flex-1 ">June</h2>
                 <button type="button" class="bg bg-aseorange border-aseorange text-white border p-2 text-lg rounded-2xl px-4 w-32 h-fit">Next</button>{*/}
            </div>
            <div class="mb-4">
                <ScheduleCalendar currentDate={date} onDateUpdate={setDate} />
            </div>
        </div>
    )
}

