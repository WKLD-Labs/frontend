import { Table, TableHeader, TableBody, TableRow, TableCol } from '../../components/Table';
import { MdOutlineDelete, MdMoreVert } from "react-icons/md";
import { PopUpDialog, PopUpHeader, PopUpContents, PopUpActions } from "../../components/PopUpDialog";
import { useState, useEffect } from "react";

function ViewActivityData({ showDialog, setShowDialog, data }) {

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
            <PopUpHeader text={data.activity} />
            <PopUpContents>
                <h1>{data.participant}</h1>
                <h1>{formatDate(data.date)}</h1>
            </PopUpContents>
            <PopUpActions>
                <button className="py-1 px-4 rounded-full bg-aseorange text-white" onClick={() => setShowDialog(false)}>Close</button>
            </PopUpActions>
        </PopUpDialog>
    )
}

function NewActvityDialog({ showDialog, setShowDialog, onSubmit }) {
    const [formData, setFormData] = useState([{ activity: "", participant: "", date: null }]);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function closeDialog(e) {
        setShowDialog(e);
        setFormData({ activity: "", participant: "", date: null })
    }

    return (
        <div>
            <PopUpDialog open={showDialog} onChange={closeDialog}>
                <PopUpHeader text="New Activity" />
                <PopUpContents>
                    <div className="flex flex-row gap-4 items-center">
                        <form className="flex flex-col gap-2 flex-1">
                            <table className="w-full border-separate border-spacing-x-2 border-spacing-y-2">
                                <tbody>
                                    <tr>
                                        <td className="w-32">Activity Name</td>
                                        <td><input className="aseinput w-full" type="text" name="activity" value={formData.activity} onChange={handleChange} /></td>
                                    </tr>
                                    <tr>
                                        <td className="w-32">Date & Time</td>
                                        <td><input className="aseinput" type="date" name="date" value={formData.date} onChange={handleChange} /></td>
                                    </tr>
                                    <tr>
                                        <td className="w-32 ">Participant</td>
                                        <td><input className="aseinput w-full" type="text" name="participant" value={formData.participant} onChange={handleChange} /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </PopUpContents>
                <PopUpActions>
                    <button className="py-1 px-4 rounded-full bg-aseorange text-white" onClick={() => { onSubmit(formData); closeDialog(false) }}>Save</button>
                    <button className="py-1 px-4 rounded-full bg-aseorange text-white" onClick={() => closeDialog(false)}>Close</button>
                </PopUpActions>
            </PopUpDialog>
        </div>
    )
}

export default function Pertemuan() {
    const bearertoken = sessionStorage.getItem("token");
    const apiurl = "http://localhost:5500/api/jadwal";
    const [showDialog, setShowDialog] = useState(false);
    const [activityData, setActivityData] = useState([]);
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
        const response = await fetch(apiurl + "/" + id, { method: 'DELETE', headers });
        updateActivityData()
    }

    async function getActivityData() {
        // GET $apiurl?month=$month&year=$year with bearer token, return json
        let response;
        const headers = {
            'Authorization': 'Bearer ' + bearertoken
        }
        response = await fetch(apiurl, { headers });
        let data = await response.json();
        data = data.map((e) => {
            return {
                id: e.id,
                activity: e.activity,
                participant: e.participant,
                date: new Date(e.date),
            }
        })
        return data;
    }

    async function updateActivityData() {
        const data = await getActivityData();
        setActivityData(data);
    }

    async function handleCreate(data) {
        const headers = {
            'Authorization': 'Bearer ' + bearertoken,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        const response = await fetch(apiurl, { method: 'POST', headers, body: new URLSearchParams(data) });
        if (response.status >= 400) {
            const res = await response.json();
            alert("Error: " + res.error);
            return;
        }
        updateActivityData();
        return response;
    }

    useEffect(() => {
        updateActivityData();
    }, [])

    return (
        <div className="overflow-x-auto relative w-full flex-1 h-fit border-separate border-spacing-x-0 border-spacing-y-4 p-10 flex flex-col" >
            <h1 className="font-semibold text-3xl mb-2">Jadwal</h1>
            <Table>
                <TableHeader>
                    <TableCol>Activity</TableCol>
                    <TableCol>Participant</TableCol>
                    <TableCol>Time</TableCol>
                    {/* <TableCol>Status</TableCol> */}
                </TableHeader>
                <TableBody>
                    {
                        activityData.map(p => (
                            <TableRow onClick={() => {
                                setSelectData(p);
                                setShowView(true);
                            }} >
                                <TableCol>{p.activity}</TableCol>
                                <TableCol>{p.participant}</TableCol>
                                <TableCol>{formatDate(p.date)}</TableCol>
                                <TableCol>
                                    <div className=' w-full'>
                                        <div className="bg-green-300 text-center p-1 w-36 m-auto"><p>Ongoing</p></div>
                                    </div>
                                </TableCol>
                                <TableCol><span className="ml-auto mr-8 w-fit flex flex-row gap-2">
                                    <MdOutlineDelete onClick={(e) => { e.stopPropagation(); handleDelete(p.id) }} size={24} />
                                    <MdMoreVert size={24} />
                                </span>
                                </TableCol>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <button onClick={() => setShowDialog(true)} class="item-right self-end border-2 bg-white hover:bg-asegrey text-black font-normal px-9 py-1 my-10 rounded-full">New Meeting</button>
            <NewActvityDialog showDialog={showDialog} setShowDialog={setShowDialog} onSubmit={handleCreate} />
            {selectedData && <ViewActivityData showDialog={showView} setShowDialog={setShowView} data={selectedData} />}
        </div>
    )
}

// ----------------------------------------------------------------- nas ----------------------------------------------------------------------------

// function NewMeeting({ showDialog, setShowDialog }) {
//     return (
//         <div className=''>
//             <PopUpDialog open={showDialog} onChange={setShowDialog}>
//                 <PopUpHeader text="New Event" />
//                 <PopUpContents>
//                     <div className='flex flex-col overflow-x-scroll items-center md:flex'>
//                         <form action="" className='flex flex-col w-full'>
//                             <table className='border-separate border-spacing-y-4'>
//                                 <tr className=''>
//                                     <td style="width:20%"><h1 className='inline-block'>Activity Name</h1></td>
//                                     <td>
//                                         <div className='flex flex-row items-center'>
//                                             <input type="text" placeholder='Enter activity name...' className='aseinput pl-2 block w-full' />
//                                         </div>
//                                     </td>
//                                 </tr>
//                                 <tr>
//                                     <td style="width:20%"><h1 className='inline-block'>Date</h1></td>
//                                     <td>
//                                         <div className='flex flex-row gap-2'>
//                                             <input type="date" name="tgl-event" id="tgl-event" className='block w-36 aseinput pl-2' />
//                                             <h1 className=' my-auto'>Time</h1>
//                                             <input type="time" name="time-event" id="tevt" className='aseinput' />
//                                         </div>
//                                     </td>
//                                 </tr>
//                                 <tr>
//                                     <td style="width:20%" className='flex flex-col'>
//                                         <h1 className='inline-block'>Paticipant</h1>
//                                     </td>
//                                     <td>
//                                         <div>
//                                             <textarea name="participant" id="ppl" rows="4" className='border border-asegrey w-full pl-2' placeholder='Add participant...'></textarea>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             </table>
//                         </form>
//                     </div>
//                 </PopUpContents>
//                 <PopUpActions>
//                     <button id='add' className='ASE-button gap-2' onClick={() => { setShowDialog(false); alert("Pura Puranya di save") }}>Save</button>
//                     <button id='cancel' className='ASE-button bg-white text-black border-black border hover:bg-gray-300' onClick={() => setShowDialog(false)}>Cancel</button>
//                 </PopUpActions>
//             </PopUpDialog>
//         </div>
//     )
// }

// export default function Jadwal() {
//     const [showDialog, setOpen] = useState(false);
//     return (
//         <div className='px-10 pb-16 w-full flex flex-col overflow-x-hidden'>
//             <h1 className='text-3xl font-semibold pt-16 pb-2'>Jadwal</h1>
//             <div className='overflow-x-auto' >
//                 <Table>
//                     <TableHeader>
//                         <TableCol>Activity</TableCol>
//                         <TableCol>Participant</TableCol>
//                         <TableCol>Time</TableCol>
//                         <TableCol><div className='text-center m-auto'>Status</div></TableCol>
//                         <TableCol></TableCol>
//                     </TableHeader>

//                     <TableBody>

//                         <h1 className='font-extrabold text-lg text-aseorange'>Monday, 9 July 2023</h1>

//                         <TableRow>
//                             <TableCol>Responsi</TableCol>
//                             <TableCol><div className='w-96 break-words'>Habli Zulfana, Maximus Bayu</div></TableCol>
//                             <TableCol>11 : 00</TableCol>
//                             <TableCol>
//                                 <div className='w-full'>
//                                     <div className="bg-green-300 text-center p-1 w-36 m-auto"><p>Ongoing</p></div>
//                                 </div>
//                             </TableCol>
//                             <TableCol>
//                                 <div className='flex flex-row items-center'>
//                                     <button onClick={() => alert("DELETE ")}>
//                                         <MdOutlineDelete size={24} />
//                                     </button>
//                                     <button onClick={() => alert("MORE ")}>
//                                         <MdMoreVert size={24} />
//                                     </button>
//                                 </div>
//                             </TableCol>
//                         </TableRow>

//                         <TableRow>
//                             <TableCol>Asistensi</TableCol>
//                             <TableCol>
//                                 <div className='w-96 break-words'>Habli Zulfana, Maximus Bayu</div>
//                             </TableCol>
//                             <TableCol>15 : 00</TableCol>
//                             <TableCol>
//                                 <div className='w-full'>
//                                     <div className="bg-gray-300 text-center p-1 w-36 m-auto"><p>Not Started</p></div>
//                                 </div>
//                             </TableCol>
//                             <TableCol>
//                                 <div className='flex flex-row items-center'>
//                                     <button onClick={() => alert("DELETE ")}>
//                                         <MdOutlineDelete size={24} />
//                                     </button>
//                                     <button onClick={() => alert("MORE ")}>
//                                         <MdMoreVert size={24} />
//                                     </button>
//                                 </div>
//                             </TableCol>
//                         </TableRow>

//                         <h1 className='font-extrabold text-lg text-aseorange'>Friday, 13 July 2023</h1>

//                         <TableRow>
//                             <TableCol>Asistensi</TableCol>
//                             <TableCol>
//                                 <div className='w-96 break-words'>Rusdi, Faiz</div>
//                             </TableCol>
//                             <TableCol>15 : 00</TableCol>
//                             <TableCol>
//                                 <div className='w-full'>
//                                     <div className="bg-gray-300 text-center p-1 w-36 m-auto"><p>Not Started</p></div>
//                                 </div>
//                             </TableCol>
//                             <TableCol>
//                                 <div className='flex flex-row items-center'>
//                                     <button onClick={() => alert("DELETE ")}>
//                                         <MdOutlineDelete size={24} />
//                                     </button>
//                                     <button onClick={() => alert("MORE ")}>
//                                         <MdMoreVert size={24} />
//                                     </button>
//                                 </div>
//                             </TableCol>
//                         </TableRow>

//                     </TableBody>
//                 </Table>
//             </div>
//             <button onClick={() => setOpen(true)} className='rigt-0 self-end rounded-xl w-48 h-8 bg-white text-black border border-asegrey my-5 hover:bg-gray-200'>New Event</button>
//             <NewMeeting showDialog={showDialog} setShowDialog={setOpen} />
//         </div>
//     )
// }









