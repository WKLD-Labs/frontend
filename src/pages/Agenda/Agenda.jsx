import { useState, useEffect } from "react";
import ScheduleCalendar from "./components/ScheduleCalendar"
import { PopUpDialog, PopUpActions, PopUpContents, PopUpHeader } from "../../components/PopUpDialog";

function NewActivityDialog({ showDialog, setShowDialog, onSubmit }) {
    const [formData, setFormData] = useState([{name: "", start_date: null, end_date: null, description: ""}]);

    function handleChange(e){
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    function closeDialog(e){
        setShowDialog(e);
        setFormData({name: "", start_date: null, end_date: null, description: ""});
    }

    return (
        <PopUpDialog open={showDialog} onChange={closeDialog}>
            <PopUpHeader text="New Event" />
            <PopUpContents>
                <div className="flex flex-col md:flex-row gap-4 items-center overflow-x-hidden">
                    <form className="flex flex-col gap-2 flex-1">
                        <table className="w-full border-separate border-spacing-x-2 border-spacing-y-2">
                            <tbody>
                                <tr>
                                    <td className="w-32">Event Name</td>
                                    <td><input className="aseinput w-full" type="text" name="name" value={formData.name} onChange={handleChange}/></td>
                                </tr>
                                <tr>
                                    <td className="w-32">Start Time</td>
                                    <td><input className="aseinput" type="datetime-local" name="start_date" value={formData.start_date} onChange={handleChange}/></td>
                                </tr>
                                <tr>
                                    <td className="w-32">End Time</td>
                                    <td><input className="aseinput" type="datetime-local" name="end_date" value={formData.end_date} onChange={handleChange} /></td>
                                </tr>
                                <tr>
                                    <td className="w-32 relative"><div class="top-0 absolute">Description</div></td>
                                    <td><textarea className="aseinput w-full h-32" name="description" value={formData.description} onChange={handleChange}></textarea></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>

            </PopUpContents>
            <PopUpActions>
                <button className="py-1 px-4 rounded-full bg-aseorange text-white" onClick={() => {onSubmit(formData); closeDialog(false) }}>Save</button>
                <button className="py-1 px-4 rounded-full bg-aseorange text-white" onClick={() => closeDialog(false)}>Close</button>
            </PopUpActions>
        </PopUpDialog>
    )
}

export default function Agenda() {
    const [date, setDate] = useState(new Date());
    const [showDialog, setShowDialog] = useState(false);
    const bearertoken = sessionStorage.getItem("token");
    const apiurl = "http://localhost:5500/api/agenda"

    async function handleCreate(data){
       const headers =  {
        'Authorization' : 'Bearer ' + bearertoken,
        'Content-Type' : 'application/x-www-form-urlencoded'
       }
       console.log(headers)
       const response = await fetch(apiurl, {method: 'POST', headers, body: new URLSearchParams(data)});
       if (response.status >= 400){
        const res = await response.json();
        alert("Error: " + res.error);
        return;
       }
       // updateAgenda();
       return response;
    }


    return (
        <div class="mt-16 px-16 min-h-full">
            <div class="flex flex-row">
                <h1 class="text-5xl mb-2 static w-3 flex-1">Agenda</h1>
                <button onClick={() => setShowDialog(true)} className="bg bg-white border-asegreydark border p-2 rounded-2xl w-32 h-fit text-lg">New Event</button>
                <NewActivityDialog showDialog={showDialog} setShowDialog={setShowDialog} onSubmit={handleCreate}/>
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

