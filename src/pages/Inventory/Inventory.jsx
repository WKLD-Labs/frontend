import { PopUpDialog, PopUpActions, PopUpContents, PopUpHeader } from "../../components/PopUpDialog";
import {MdDeleteForever, MdMoreVert} from "react-icons/md"
import {useState, useEffect} from "react";
import { Table, TableHeader, TableBody, TableRow, TableCol } from '../../components/Table';
function NewInventoryDialog({showDialog, setShowDialog}){
    return (
        <PopUpDialog open={showDialog} onChange={setShowDialog}>
            <PopUpHeader text="New Item"></PopUpHeader>
            <PopUpContents>
                <div className="flex flex-row gap-4 items-center">
                    <form className="flex flex-col gap-2 flex-1">
                        <table className="w-full border-separate border-spacing-x-2 border-spacing-y-2">
                            <tbody>
                            <tr>
                                <td className="w-32">Item Name</td>
                                <td><input className="aseinput w-full" type="text" /></td>
                            </tr>
                            <tr>
                                <td className="w-32">Unit</td>
                                <td><input className="aseinput w-full" type="number" /></td>
                            </tr>
                            <tr>
                                <td className="w-32">Date</td>
                                <td><input className="aseinput w-full" type="date" /></td>
                            </tr>
                            <tr>
                                <td className="w-32">Picture</td>
                                <td><input className="aseinput w-full" type="file" /></td>
                            </tr>
                            <tr>
                                <td className="w-32">Description</td>
                                <td><input className="aseinput w-full" type="textarea" /></td>
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
    )
}

export default function Inventory(){
    const [selectedData, setSelectedData] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const sampleData = [
        {
            id: "E01",
            nama: "PC",
            unit: "4 Unit",
            date: "23 January 2023",
            deskripsi: "Ini PC bang hehe",
            gambar: "https://source.unsplash.com/640x360?funny-animals"
        },
        {
            id: "E02",
            nama: "PS5",
            unit: "1 Unit",
            date: "23 January 2023",
            deskripsi: "Ini PS bang hehe",
            gambar: "https://source.unsplash.com/640x360?funny-animals"
        },
        {
            id: "E03",
            nama: "Microwave",
            unit: "1 Unit",
            date: "23 January 2023",
            deskripsi: "Ini buat masak bang hehe",
            gambar: "https://source.unsplash.com/640x360?funny-animals"
        }
    ]
    useEffect(() => {
        setSelectedData(sampleData[0])
    }, []);
    return (
        <div className="flex flex-col p-20 gap-4 overflow-x-auto">
            <h1 className="text-5xl max-lg:text-center">Inventaris</h1>
            <div className="flex flex-col-reverse max-lg:items-center lg:flex-row gap-4">
                <div className="flex-1">
                    <Table>
                        <TableHeader>
                            <TableCol>ID</TableCol>
                            <TableCol>Name</TableCol>
                            <TableCol>Unit</TableCol>
                            <TableCol>Date</TableCol>
                            <TableCol></TableCol>
                        </TableHeader>
                        <TableBody>
                            {sampleData.map((e, i)=>(
                                <TableRow className="hover:bg-opacity-20" onClick={()=>setSelectedData(sampleData[i])}>
                                    <TableCol>{e.id}</TableCol>
                                    <TableCol>{e.nama}</TableCol>
                                    <TableCol>{e.unit}</TableCol>
                                    <TableCol>{e.date}</TableCol>
                                    <TableCol>
                                        <span className="ml-auto mr-8 w-fit flex flex-row gap-2">
                                            <button onClick={(e)=>{alert("123");e.stopPropagation()}}><MdDeleteForever size="24px"/></button>
                                            <button onClick={(e)=>{alert("123");e.stopPropagation()}}><MdMoreVert size="24px"/></button>
                                        </span>
                                    </TableCol>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex flex-col justify-center items-center bg-asegrey bg-opacity-10 p-4 gap-2">
                    <img src={selectedData?.gambar} alt="" className="w-56 object-cover rounded-xl"/>
                    <form action="">
                        <table className="border-separate border-spacing-x-2 border-spacing-y-2">
                            <tr>
                                <td>ID</td>
                                <td>
                                    <input type="text" className="aseinput w-48" value={selectedData?.id} disabled/>
                                </td>
                            </tr>
                            <tr>
                                <td>Nama</td>
                                <td>
                                    <input type="text" className="aseinput w-48" value={selectedData?.nama}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Deskripsi</td>
                                <td>
                                    <textarea name="" id="" className="aseinput w-48" value={selectedData?.deskripsi}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>Unit</td>
                                <td>
                                    <input type="text" className="aseinput w-48" value={selectedData?.unit}/>
                                </td>
                            </tr>
                        </table>
                        <input type="submit" value="Update" className="ASE-button bg-aseorange"/>
                    </form>
                </div>
            </div>
            <button onClick={()=>setShowDialog(true)} className="self-end rounded-xl w-48 h-8 bg-white text-black border border-asegrey">New Item</button>
            <NewInventoryDialog showDialog={showDialog} setShowDialog={setShowDialog} />
        </div>
    )
}