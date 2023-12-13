import { Table, TableHeader, TableBody, TableRow, TableCol } from '../../components/Table';
import { MdOutlineDelete, MdMoreVert } from "react-icons/md";
import { PopUpDialog, PopUpHeader, PopUpContents, PopUpActions } from "../../components/PopUpDialog";
import { useState } from "react";

function NewMeeting({showDialog, setShowDialog}) {
    return(
        <div className=''>
            <PopUpDialog open={showDialog} onChange={setShowDialog}>
                <PopUpHeader text="New Event"/>
                <PopUpContents>
                    <div className='flex flex-col overflow-x-scroll items-center md:flex'>
                        <form action="" className='flex flex-col w-full'>
                            <table className='border-separate border-spacing-y-4'>
                                <tr className=''>
                                    <td style="width:20%"><h1 className='inline-block'>Activity Name</h1></td>
                                    <td>
                                        <div className='flex flex-row items-center'>
                                            <input type="text" placeholder='Enter activity name...' className='aseinput pl-2 block w-full' />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width:20%"><h1 className='inline-block'>Date</h1></td>
                                    <td>
                                        <div className='flex flex-row gap-2'>
                                            <input type="date" name="tgl-event" id="tgl-event" className='block w-36 aseinput pl-2' />
                                            <h1 className=' my-auto'>Time</h1>
                                            <input type="time" name="time-event" id="tevt" className='aseinput'/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width:20%" className='flex flex-col'>
                                        <h1 className='inline-block'>Paticipant</h1>
                                    </td>
                                    <td>
                                        <div>
                                            <textarea name="participant" id="ppl" rows="4" className='border border-asegrey w-full pl-2' placeholder='Add participant...'></textarea>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </form>
                    </div>
                </PopUpContents>
                <PopUpActions>
                    <button id='add' className='ASE-button gap-2' onClick={()=>{setShowDialog(false);alert("Pura Puranya di save")}}>Save</button>
                    <button id='cancel' className='ASE-button bg-white text-black border-black border hover:bg-gray-300' onClick={()=>setShowDialog(false)}>Cancel</button>
                </PopUpActions>
            </PopUpDialog>
        </div>
    )
}

export default function Jadwal() {
    const [showDialog, setOpen] = useState(false);
    return(
        <div className='px-10 pb-16 w-full flex flex-col overflow-x-hidden'>
            <h1 className='text-3xl font-semibold pt-16 pb-2'>Jadwal</h1>
            <div className='overflow-x-auto' >
                <Table>
                    <TableHeader>
                        <TableCol>Activity</TableCol>
                        <TableCol>Participant</TableCol>
                        <TableCol>Time</TableCol>
                        <TableCol><div className='text-center m-auto'>Status</div></TableCol>
                        <TableCol></TableCol>
                    </TableHeader>

                    <TableBody>

                        <h1 className='font-extrabold text-lg text-aseorange'>Monday, 9 July 2023</h1>
                        
                        <TableRow>
                            <TableCol>Responsi</TableCol>
                            <TableCol><div className='w-96 break-words'>Habli Zulfana, Maximus Bayu</div></TableCol>
                            <TableCol>11 : 00</TableCol>
                            <TableCol> 
                            <div className='w-full'>
                                <div className="bg-green-300 text-center p-1 w-36 m-auto"><p>Ongoing</p></div>
                            </div>
                            </TableCol>
                            <TableCol>
                                <div className='flex flex-row items-center'>
                                    <button onClick={()=>alert("DELETE ")}>
                                        <MdOutlineDelete size={24} />
                                    </button>
                                    <button onClick={()=>alert("MORE ")}>
                                        <MdMoreVert size={24} />
                                    </button>
                                </div>
                            </TableCol>
                        </TableRow>
                        
                        <TableRow>
                            <TableCol>Asistensi</TableCol>
                            <TableCol>
                                <div className='w-96 break-words'>Habli Zulfana, Maximus Bayu</div>
                            </TableCol>
                            <TableCol>15 : 00</TableCol>
                            <TableCol> 
                            <div className='w-full'>
                                <div className="bg-gray-300 text-center p-1 w-36 m-auto"><p>Not Started</p></div>
                            </div>
                            </TableCol>
                            <TableCol>
                                <div className='flex flex-row items-center'>
                                    <button onClick={()=>alert("DELETE ")}>
                                        <MdOutlineDelete size={24} />
                                    </button>
                                    <button onClick={()=>alert("MORE ")}>
                                        <MdMoreVert size={24} />
                                    </button>
                                </div>
                            </TableCol>
                        </TableRow>

                        <h1 className='font-extrabold text-lg text-aseorange'>Friday, 13 July 2023</h1>

                        <TableRow>
                            <TableCol>Asistensi</TableCol>
                            <TableCol>
                                <div className='w-96 break-words'>Rusdi, Faiz</div>
                            </TableCol>
                            <TableCol>15 : 00</TableCol>
                            <TableCol> 
                            <div className='w-full'>
                                <div className="bg-gray-300 text-center p-1 w-36 m-auto"><p>Not Started</p></div>
                            </div>
                            </TableCol>
                            <TableCol>
                                <div className='flex flex-row items-center'>
                                    <button onClick={()=>alert("DELETE ")}>
                                        <MdOutlineDelete size={24} />
                                    </button>
                                    <button onClick={()=>alert("MORE ")}>
                                        <MdMoreVert size={24} />
                                    </button>
                                </div>
                            </TableCol>
                        </TableRow>

                    </TableBody>
                </Table>
            </div>
            <button onClick={()=>setOpen(true)} className='rigt-0 self-end rounded-xl w-48 h-8 bg-white text-black border border-asegrey my-5 hover:bg-gray-200'>New Event</button>
            <NewMeeting showDialog={showDialog} setShowDialog={setOpen}/>
        </div>
    )
}

