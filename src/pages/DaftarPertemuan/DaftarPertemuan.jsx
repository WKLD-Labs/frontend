import { useState } from "react";
import { MdOutlineDelete, MdMoreVert, MdLink } from "react-icons/md";
import { PopUpDialog, PopUpHeader, PopUpContents, PopUpActions } from "../../components/PopUpDialog";
import { Table, TableHeader, TableBody, TableRow, TableCol } from '../../components/Table';

function NewPertemuanDialog({showDialog, setShowDialog}) {
    return (
        <div>
            <PopUpDialog open={showDialog} onChange={setShowDialog}>
                <PopUpHeader text="New Meeting"/>
                <PopUpContents>
                    <div className="flex flex-row gap-4 items-center">
                    <form className="flex flex-col gap-2 flex-1">
                        <table className="w-full border-separate border-spacing-x-2 border-spacing-y-2">
                            <tbody>
                                <tr>
                                    <td className="w-32">Meeting Name</td>
                                    <td><input className="aseinput w-full" type="text" /></td>
                                </tr>
                                <tr>
                                    <td className="w-32">Speaker</td>
                                    <td><input className="aseinput w-full" type="text" /></td>
                                </tr>
                                <tr>
                                    <td className="w-32">Date & Time</td>
                                    <td><input className="aseinput" type="date" /></td>
                                </tr>
                                <tr>
                                    <td className="w-32"></td>
                                    <td><input className="aseinput" type="time" /></td>
                                </tr>
                                <tr>
                                    <td className="w-32">Meeting Link</td>
                                    <td><input className="aseinput w-full" type="text" /></td>
                                </tr>
                                <tr>
                                    <td className="w-32">Description</td>
                                    <td><input className="aseinput w-full" type="text" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
                </PopUpContents>
                <PopUpActions>
                    <button className="py-1 px-4 rounded-full bg-aseorange text-white" onClick={() => {alert("Pura Puranya di save");setShowDialog(false)}}>Save</button>
                    <button className="py-1 px-4 rounded-full bg-aseorange text-white" onClick={()=>setShowDialog(false)}>Close</button>
                </PopUpActions>
            </PopUpDialog>
        </div>
    )
}

export default function Pertemuan(){
    const [showDialog, setShowDialog] = useState(false);
    return (
        <div className="overflow-x-auto relative w-full flex-1 h-fit border-separate border-spacing-x-0 border-spacing-y-4 p-10 flex flex-col" >
            <h1 className="font-semibold text-3xl mb-2">Daftar Pertemuan</h1>
            <Table>
                <TableHeader>
                    <TableCol>Title</TableCol>
                    <TableCol>Item</TableCol>
                    <TableCol>Date</TableCol>
                    <TableCol>Time</TableCol>
                    <TableCol></TableCol>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCol>Konsultasi TA</TableCol>
                        <TableCol>dr. Rani Saprina</TableCol>
                        <TableCol>12 June 2023</TableCol>
                        <TableCol>11.00 - 13.00</TableCol>
                        <TableCol><span className="ml-auto mr-8 w-fit flex flex-row gap-2">
                            <MdLink size={24}/>
                            <MdOutlineDelete size={24} />
                            <MdMoreVert size={24} />
                        </span>
                        </TableCol>
                    </TableRow>
                    <TableRow>
                        <TableCol>Konsultasi TA</TableCol>
                        <TableCol>dr. Richard Lee</TableCol>
                        <TableCol>17 June 2023</TableCol>
                        <TableCol>15.00 - 17.00</TableCol>
                        <TableCol><span className="ml-auto mr-8 w-fit flex flex-row gap-2">
                            <MdLink size={24}/>
                            <MdOutlineDelete size={24} />
                            <MdMoreVert size={24} />
                        </span>
                        </TableCol>
                    </TableRow>
                </TableBody>
            </Table>
            <button onClick={() => setShowDialog(true)} class="item-right self-end border-2 bg-white hover:bg-asegrey text-black font-normal px-9 py-1 my-10 rounded-full">New Meeting</button>
            <NewPertemuanDialog showDialog={showDialog} setShowDialog={setShowDialog}/>
        </div>
    )
}