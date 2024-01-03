import { useState, useEffect } from "react";
import { MdOutlineDelete, MdLink } from "react-icons/md";
import { PopUpDialog, PopUpHeader, PopUpContents, PopUpActions } from "../../components/PopUpDialog";
import { Table, TableHeader, TableBody, TableRow, TableCol } from '../../components/Table';

function NewPertemuanDialog({showDialog, setShowDialog, onSubmit}) {
    const [formData, setFormData] = useState([{meetingname: "", speaker: "", datetime: null, meetinglink: "", description: ""}]);

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    function closeDialog(e) {
        setShowDialog(e);
        setFormData({ meetingname: "", speaker: "", datetime: null, meetinglink: "", description: ""})
    }

    return (
        <div>
            <PopUpDialog open={showDialog} onChange={closeDialog}>
                <PopUpHeader text="New Meeting"/>
                <PopUpContents>
                    <div className="flex flex-row gap-4 items-center">
                    <form className="flex flex-col gap-2 flex-1">
                        <table className="w-full border-separate border-spacing-x-2 border-spacing-y-2">
                            <tbody>
                                <tr>
                                    <td className="w-32">Meeting Name</td>
                                    <td><input className="aseinput w-full" type="text" name="meetingname" value={formData.meetingname} onChange={handleChange}/></td>
                                </tr>
                                <tr>
                                    <td className="w-32">Speaker</td>
                                    <td><input className="aseinput w-full" type="text" name="speaker" value={formData.speaker} onChange={handleChange}/></td>
                                </tr>
                                <tr>
                                    <td className="w-32">Date & Time</td>
                                    <td><input className="aseinput" type="date" name="datetime" value={formData.datetime} onChange={handleChange}/></td>
                                </tr>
                                <tr>
                                    <td className="w-32">Meeting Link</td>
                                    <td><input className="aseinput w-full" type="text" name="meetinglink" value={formData.meetinglink} onChange={handleChange} /></td>
                                </tr>
                                <tr>
                                    <td className="w-32">Description</td>
                                    <td><input className="aseinput w-full" type="text" name="description" value={formData.description} onChange={handleChange} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
                </PopUpContents>
                <PopUpActions>
                    <button className="py-1 px-4 rounded-full bg-aseorange text-white" onClick={() => {onSubmit(formData); closeDialog(false)}}>Save</button>
                    <button className="py-1 px-4 rounded-full bg-aseorange text-white" onClick={() => closeDialog(false)}>Close</button>
                </PopUpActions>
            </PopUpDialog>
        </div>
    )
}

function ViewPertemuanData({showDialog, setShowDialog, data}){

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

    return (
        <PopUpDialog open={showDialog} onChange={setShowDialog}>
                <PopUpHeader text={data.meetingname}/>
                <PopUpContents> 
                    <h1>{data.speaker}</h1>
                    <h1>{formatDate(data.datetime)}</h1>
                    <h1>{data.meetinglink}</h1>
                    <h1>{data.description}</h1>
                </PopUpContents>
                <PopUpActions>
                    <button className="py-1 px-4 rounded-full bg-aseorange text-white" onClick={() => setShowDialog(false)}>Close</button>
                </PopUpActions>
            </PopUpDialog>
    )
}

export default function Pertemuan(){
    const bearertoken = sessionStorage.getItem("token");
    const apiurl = "http://localhost:5500/api/pertemuan";
    const [showDialog, setShowDialog] = useState(false);
    const [meetingData, setMeetingData] = useState([]);
    const [selectedData, setSelectData] = useState(null);
    const [showView, setShowView] = useState(false);

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

    async function handleDelete(id) {
        const headers = {
            'Authorization': 'Bearer ' + bearertoken
        }
        if (confirm("Are you sure you want to delete this schedule?") == false) return;
        const response = await fetch(apiurl + "/" + id, {method: 'DELETE', headers});
        updateMeetingData()
    }

    async function getMeetingData() {
        // GET $apiurl?month=$month&year=$year with bearer token, return json
        let response;
        const headers = {
            'Authorization': 'Bearer ' + bearertoken
        }
        response = await fetch(apiurl, {headers});
        let data = await response.json();
        data = data.map((e) => {
            return {
                id: e.id,
                meetingname: e.meetingname,
                speaker: e.speaker,
                datetime: new Date(e.datetime),
                meetinglink: e.meetinglink,
                description: e.description
            }
        })
        return data;
    }

    async function updateMeetingData() {
        const data = await getMeetingData();
        setMeetingData(data);
    }

    async function handleCreate(data) {
        const headers = {
            'Authorization': 'Bearer ' + bearertoken,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        const response = await fetch(apiurl, {method: 'POST', headers, body: new URLSearchParams(data)});
        if (response.status >= 400) {
            const res = await response.json();
            alert("Error: " + res.error);
            return;
        }
        updateMeetingData();
        return response;
    }

    useEffect(() => {        updateMeetingData();
    }, [])

    return (
        <div className="overflow-x-auto relative w-full flex-1 h-fit border-separate border-spacing-x-0 border-spacing-y-4 p-10 flex flex-col" >
            <h1 className="font-semibold text-3xl mb-2">Daftar Pertemuan</h1>
            <Table>
                <TableHeader>
                    <TableCol>Title</TableCol>
                    <TableCol>Pembicara</TableCol>
                    <TableCol>Date</TableCol>
                    <TableCol></TableCol>
                </TableHeader>
                <TableBody>
                    {
                        meetingData.map(p=>(
                            <TableRow onClick={() => {
                                setSelectData(p);
                                setShowView(true);
                            } } >
                                <TableCol>{p.meetingname}</TableCol>
                                <TableCol>{p.speaker}</TableCol>
                                <TableCol>{formatDate(p.datetime)}</TableCol>
                                <TableCol><span className="ml-auto mr-8 w-fit flex flex-row gap-2">
                                    <MdLink size={24} onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(p.meetinglink); alert("Link tersalin")}}></MdLink>
                                    <MdOutlineDelete onClick={(e) => { e.stopPropagation(); handleDelete(p.id)}} size={24} />
                                </span>
                                </TableCol>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <button onClick={() => setShowDialog(true)} class="item-right self-end border-2 bg-white hover:bg-asegrey text-black font-normal px-9 py-1 my-10 rounded-full">New Meeting</button>
            <NewPertemuanDialog showDialog={showDialog} setShowDialog={setShowDialog} onSubmit={handleCreate}/>
            { selectedData && <ViewPertemuanData showDialog={showView} setShowDialog={setShowView} data={selectedData} />}
        </div>
    )
}