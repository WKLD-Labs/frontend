import { useState, useEffect, useRef } from "react";
import ScheduleCalendar from "./components/ScheduleCalendar";
import { MdOutlineDelete, MdMoreVert, MdEdit } from "react-icons/md";
import { PopUpDialog, PopUpActions, PopUpContents, PopUpHeader } from "../../components/PopUpDialog";
import { Table, TableHeader, TableBody, TableRow, TableCol } from '../../components/Table';

function PopUpPrompt({setCaller}) {
    const [header, setHeader] = useState("");
    const [contents, setContents] = useState("");
    const [visible, setVisible] = useState(false);
    const [promise, setPromise] = useState(null);

    const caller = (header, contents) => {
        setHeader(header);
        setContents(contents);
        setVisible(true);
        return new Promise((resolve, reject) => {
            setPromise({resolve, reject});
        })
    }

    useEffect(() => setCaller(caller), []);

    return (
        <PopUpDialog open={visible} onChange={() => promise.resolve(false)}>
            <PopUpHeader text={header}/>
            <PopUpContents>
                {contents}
            </PopUpContents>
            <PopUpActions>
                <button className="py-1 px-4 rounded-full bg-aseorange text-white" onClick={() => {promise.resolve(true); setVisible(false)}}>Yes</button>
                <button className="py-1 px-4 rounded-full bg-aseorange text-white" onClick={() => {promise.resolve(false); setVisible(false)}}>No</button>
            </PopUpActions>
        </PopUpDialog>
    )
}

function PopUpAlert({setCaller}) {
    const [header, setHeader] = useState("");
    const [contents, setContents] = useState("");
    const [visible, setVisible] = useState(false);
    const [promise, setPromise] = useState(null);

    const caller = (header, contents) => {
        setHeader(header);
        setContents(contents);
        setVisible(true);
        return new Promise((resolve, reject) => {
            setPromise({resolve, reject});
        })
    }

    useEffect(() => setCaller(caller), []);

    return (
        <PopUpDialog open={visible} onChange={() => promise.resolve(false)}>
            <PopUpHeader text={header}/>
            <PopUpContents>
                {contents}
            </PopUpContents>
            <PopUpActions>
                <button className="py-1 px-4 rounded-full bg-aseorange text-white" onClick={() => {promise.resolve(); setVisible(false)}}>Ok</button>
            </PopUpActions>
        </PopUpDialog>
    )
}

function NewActivityDialog({showDialog, setShowDialog, editData, onSubmit, markedDates}) {
    const [formData, setFormData] = useState({name: "", start_date: "", end_date: ""});
    const [calendarDate, setCalendarDate] = useState(new Date());
    console.log(formData);
    if (editData) {
        markedDates = markedDates.filter((e) => e.start.getTime() != editData.start.getTime() && e.end.getTime() != editData.end.getTime());
    }
    markedDates = [...markedDates, 
        {
            start: new Date(formData.start_date),
            end: new Date(formData.end_date),
            state: "selected"
        }
    ];
    useEffect(() => {
        if (editData) {
            setFormData({id: editData.id, name: editData.name, start_date: editData.start.toISOString().slice(0, -1), end_date: editData.end.toISOString().slice(0, -1)});
            
        } else {
            setFormData({id: null, name: "", start_date: "", end_date: ""});
        }
    }, [editData])
    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    function closeDialog(e) {
        setShowDialog(e);
        setFormData({id: null, name: "", start: "", end: ""})
    }
    return (
        <PopUpDialog open={showDialog} onChange={closeDialog}>
            <PopUpHeader text={editData ? "Edit Schedule" : "New Schedule"}/>
            <PopUpContents>
                <div className="flex flex-col md:flex-row gap-4 items-center overflow-x-hidden">
                    <form className="flex flex-col gap-2 flex-1">
                        <table className="w-full border-separate border-spacing-x-2 border-spacing-y-2">
                            <tbody>
                                <tr>
                                    <td className="w-32">Meeting Name</td>
                                    <td><input className="aseinput w-full" type="text" name="name" value={formData.name} onChange={handleChange} /></td>
                                </tr>
                                <tr>
                                    <td className="w-32">Start Time</td>
                                    <td><input className="aseinput" type="datetime-local" name="start_date" value={formData.start_date} onChange={handleChange}/></td>
                                </tr>
                                <tr>    
                                    <td className="w-32">End Time</td>
                                    <td><input className="aseinput" type="datetime-local" name="end_date" value={formData.end_date}  onChange={handleChange}/></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    <div>
                        <ScheduleCalendar calendarDate={calendarDate} onCalendarDateUpdate={setCalendarDate} readOnly={true} markedDates={markedDates} />
                    </div>
                </div>
                
            </PopUpContents>
            <PopUpActions>
                <button className="py-1 px-4 rounded-full bg-aseorange text-white" onClick={() => {onSubmit(formData); closeDialog(false); }}>{editData ? "Update" : "Save"}</button>
                <button className="py-1 px-4 rounded-full bg-aseorange text-white" onClick={()=> {closeDialog(false)}}>Close</button>
            </PopUpActions>
        </PopUpDialog>
    )
}

export default function JadwalRuangan() {
    const bearertoken = sessionStorage.getItem("token");
    const apiurl = "http://localhost:5500/api/roomschedule";
    const [calendarDate, setCalendarDate] = useState(new Date());
    const [scheduleData, setScheduleData] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const aPrompt = useRef(null);
    const aAlert = useRef(null);
    console.log(scheduleData)
    async function handleSubmit(data) {
        const headers = {
            'Authorization': 'Bearer ' + bearertoken,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        let response;
        if (data.id) {  
            response = await fetch(apiurl + "/" + data.id, {method: 'PUT', headers, body: new URLSearchParams(data)});
        } else {
            response = await fetch(apiurl, {method: 'POST', headers, body: new URLSearchParams(data)});
        }
        if (response.status >= 400) {
            const res = await response.json();
            aAlert.current("Error", res.error);
            return;
        }
        updateScheduleData();
        return response;
    }

    async function handleDelete(id) {
        const headers = {
            'Authorization': 'Bearer ' + bearertoken
        }
        if (await aPrompt.current("Delete Schedule", "Are you sure you want to delete this schedule?") == false) return;
        const response = await fetch(apiurl + "/" + id, {method: 'DELETE', headers});
        updateScheduleData()
    }

    async function getSchedule(month, year) {
        // GET $apiurl?month=$month&year=$year with bearer token, return json
        let response;
        const headers = {
            'Authorization': 'Bearer ' + bearertoken
        }
        if (month && year) {
            response = await fetch(apiurl + "?month=" + month + "&year=" + year, {headers});
        } else {
            response = await fetch(apiurl, {headers});
        }
        let data = await response.json();
        console.log("got:", data);
        data = data.map((e) => {
            return {
                id: e.id,
                name: e.name,
                start: new Date(e.start_date),
                end: new Date(e.end_date)
            }
        })
        console.log("loaded:", data);
        return data;
    }
    async function updateScheduleData() {
        const data = await getSchedule(calendarDate.getMonth() + 1, calendarDate.getFullYear());
        setScheduleData(data);
    }
    useEffect(() => {
        updateScheduleData();
    }, [calendarDate])
    const formatDate = (date) => {
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return date.toLocaleDateString('id-ID', options);
    }
    // console.log(date)
    return (
      <div className="p-16 flex flex-col gap-4 flex-1">
        <h1 className="text-3xl font-semibold max-sm:text-center">Schedule</h1>
        <div className="flex flex-col-reverse max-lg:items-center lg:flex-row">
            <div className="flex-1">
            <Table>
                <TableHeader>
                    <TableCol>Name</TableCol>
                    <TableCol>Start</TableCol>
                    <TableCol>End</TableCol>
                    <TableCol></TableCol>
                </TableHeader>
                <TableBody>
                    {scheduleData.map((data) => (
                        <TableRow>
                            <TableCol>{data.name}</TableCol>
                            <TableCol>{formatDate(data.start)}</TableCol>
                            <TableCol>{formatDate(data.end)}</TableCol>
                            <TableCol>
                                <span className="ml-auto w-fit flex flex-row gap-2">
                                    <button onClick={()=>handleDelete(data.id)}>
                                        <MdOutlineDelete size={24} />
                                    </button>
                                    <button onClick={()=>{setSelectedData(data); setShowDialog(true)}}>
                                        <MdEdit size={24} />
                                    </button>   
                                    
                                </span>
                            </TableCol>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {
                scheduleData.length == 0 && <div className="text-center">No Schedule</div>
            }
            </div>
            <div className="flex flex-col gap-4 ">
                <ScheduleCalendar readOnly={true} calendarDate={calendarDate} onCalendarDateUpdate={setCalendarDate} markedDates={scheduleData.map(e=>{
                    return {
                        start: e.start,
                        end: e.end,
                        state: "occupied"
                    }
                })} />
                <button onClick={()=>{setSelectedData(null); setShowDialog(true)}} className="self-center lg:self-end rounded-xl w-48 h-8 bg-white text-black border border-asegrey">New Schedule</button>
                <NewActivityDialog showDialog={showDialog} setShowDialog={setShowDialog} editData={selectedData} onSubmit={handleSubmit} markedDates={scheduleData.map(e=>{
                    return {
                        start: e.start,
                        end: e.end,
                        state: "occupied"
                    }
                })}/>
            </div>
          
        </div>
        <PopUpPrompt setCaller={v=>{aPrompt.current = v}} />
        <PopUpAlert setCaller={v=>{aAlert.current = v}} />
      </div>
    );
}