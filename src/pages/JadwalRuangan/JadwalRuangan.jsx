import { useState, useEffect } from "react";
import ScheduleCalendar from "./components/ScheduleCalendar";
import { MdOutlineDelete, MdMoreVert } from "react-icons/md";
import { PopUpDialog, PopUpActions, PopUpContents, PopUpHeader } from "../../components/PopUpDialog";
import { Table, TableHeader, TableBody, TableRow, TableCol } from '../../components/Table';

function NewActivityDialog({showDialog, setShowDialog}) {
    const [date, setDate] = useState(new Date());
    return (
        <PopUpDialog open={showDialog} onChange={setShowDialog}>
            <PopUpHeader text="New Activity"/>
            <PopUpContents>
                <div className="flex flex-col md:flex-row gap-4 items-center overflow-x-hidden">
                    <form className="flex flex-col gap-2 flex-1">
                        <table className="w-full border-separate border-spacing-x-2 border-spacing-y-2">
                            <tbody>
                                <tr>
                                    <td className="w-32">Meeting Name</td>
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
                            </tbody>
                        </table>
                    </form>
                    <div>
                        <ScheduleCalendar currentDate={date} onDateUpdate={setDate} markedDates={[
                                {
                                    start: new Date("11 Oct 2023, 15:00"),
                                    end: new Date("14 Oct 2023, 12:00"),
                                    state: "selected"
                                }
                            ]
                        } />
                    </div>
                </div>
                
            </PopUpContents>
            <PopUpActions>
                <button className="py-1 px-4 rounded-full bg-aseorange text-white" onClick={() => {alert("Pura Puranya di save");setShowDialog(false)}}>Save</button>
                <button className="py-1 px-4 rounded-full bg-aseorange text-white" onClick={()=>setShowDialog(false)}>Close</button>
            </PopUpActions>
        </PopUpDialog>
    )
}

export default function JadwalRuangan() {
    const [date, setDate] = useState(new Date());
    const [scheduleData, setScheduleData] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    useEffect(() => {
        setScheduleData([
            {
                name: "Nama Kegiatan",
                start: new Date("11 Oct 2023, 15:00"),
                end: new Date("12 Oct 2023, 12:00")
            },
            {
                name: "Nama Kegiatan",
                start: new Date("23 Oct 2023, 12:00"),
                end: new Date("24 Oct 2023, 12:00")
            },
            {
                name: "Nama Kegiatan 1 2 3 4 5",
                start: new Date("23 June 2023, 12:00"),
                end: new Date("24 June 2023, 12:00")
            },
            {
                name: "Nama Kegiatan",
                start: new Date("23 June 2023, 12:00"),
                end: new Date("24 June 2023, 12:00")
            },
            
        ])
    }, [])
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
    console.log(date)
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
                                    <button onClick={()=>alert("DELETE " + data.name )}>
                                        <MdOutlineDelete size={24} />
                                    </button>
                                    <button onClick={()=>alert("MORE " + data.name )}>
                                        <MdMoreVert size={24} />
                                    </button>
                                    
                                </span>
                            </TableCol>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </div>
            <div className="flex flex-col gap-4 ">
                <ScheduleCalendar currentDate={date} onDateUpdate={setDate} markedDates={[
                        {
                            start: new Date("11 Oct 2023, 15:00"),
                            end: new Date("14 Oct 2023, 12:00"),
                            state: "occupied"
                        },
                        {
                            start: new Date("23 Nov 2023, 12:00"),
                            end: new Date("24 Nov 2023, 12:00"),
                            state: "occupied"
                        }
                    ]
                } />
                <button onClick={()=>setShowDialog(true)} className="self-center lg:self-end rounded-xl w-48 h-8 bg-white text-black border border-asegrey">New Schedule</button>
                <NewActivityDialog showDialog={showDialog} setShowDialog={setShowDialog}/>
            </div>
          
        </div>
        
      </div>
    );
}