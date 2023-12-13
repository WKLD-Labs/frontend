import { useState, useEffect } from "react";
import ScheduleCalendar from "./components/ScheduleCalendar"
import { PopUpDialog, PopUpActions, PopUpContents, PopUpHeader } from "../../components/PopUpDialog";

function NewActivityDialog({ showDialog, setShowDialog }) {
    return (
        <PopUpDialog open={showDialog} onChange={setShowDialog}>
            <PopUpHeader text="New Event" />
            <PopUpContents>
                <div className="flex flex-col md:flex-row gap-4 items-center overflow-x-hidden">
                    <form className="flex flex-col gap-2 flex-1">
                        <table className="w-full border-separate border-spacing-x-2 border-spacing-y-2">
                            <tbody>
                                <tr>
                                    <td className="w-32">Event Name</td>
                                    <td><input className="aseinput w-full" type="text" /></td>
                                </tr>
                                <tr>
                                    <td className="w-32">Start Time</td>
                                    <td><input className="aseinput" type="date" /></td>
                                </tr>
                                <tr>
                                    <td className="w-32"></td>
                                    <td><input className="aseinput" type="time" /></td>
                                </tr>
                                <tr>
                                    <td className="w-32">End Time</td>
                                    <td><input className="aseinput" type="date" /></td>
                                </tr>
                                <tr>
                                    <td className="w-32"></td>
                                    <td><input className="aseinput" type="time" /></td>
                                </tr>
                                <tr>
                                    <td className="w-32 relative"><div class="top-0 absolute">Description</div></td>
                                    <td><textarea className="aseinput w-full h-32"></textarea></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>

            </PopUpContents>
            <PopUpActions>
                <button className="py-1 px-4 rounded-full bg-aseorange text-white" onClick={() => { alert("Pura Puranya di save"); setShowDialog(false) }}>Save</button>
                <button className="py-1 px-4 rounded-full bg-aseorange text-white" onClick={() => setShowDialog(false)}>Close</button>
            </PopUpActions>
        </PopUpDialog>
    )
}

export default function Agenda() {
    const [date, setDate] = useState(new Date());
    const [showDialog, setShowDialog] = useState(false);

    return (
        <div class="mt-16 px-16 min-h-full">
            <div class="flex flex-row">
                <h1 class="text-5xl mb-2 static w-3 flex-1">Agenda</h1>
                <button onClick={() => setShowDialog(true)} className="bg bg-white border-asegreydark border p-2 rounded-2xl w-32 h-fit text-lg">New Event</button>
                <NewActivityDialog showDialog={showDialog} setShowDialog={setShowDialog} />
            </div>
            <br></br>
            <br></br>
            <div class="mb-10">
                <ScheduleCalendar currentDate={date} onDateUpdate={setDate} data={{
                    11: { 2: [{nama: "Labs recruitment", time: "08.00" }] ,5: [{nama: "Labs Meet", time: "14.00" }] }
                }} />
            </div>
        </div>
    )
}

