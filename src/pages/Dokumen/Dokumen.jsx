import { BiFilterAlt } from 'react-icons/bi';
import { Table, TableHeader, TableBody, TableRow, TableCol } from '../../components/Table';
import { MdPersonOutline, MdMenuBook, MdOutlineDelete, MdMoreVert } from "react-icons/md";
import { PopUpDialog, PopUpHeader, PopUpContents, PopUpActions } from "../../components/PopUpDialog";
import { useState } from "react";

function NewMeeting({showDialog, setShowDialog}) {
    return(
        <div className=''>
            <PopUpDialog open={showDialog} onChange={setShowDialog}>
                <PopUpHeader text="New Document"/>
                <PopUpContents>
                    <div className='flex flex-col overflow-x-auto items-center md:flex'>
                        <form action="" className='flex flex-col w-full'>
                            <table className='border-separate border-spacing-y-4'>
                                <tr className=''>
                                    <td style="width:20%"><h1 className='inline-block'>Title</h1></td>
                                    <td>
                                        <div className='flex flex-row items-center'>
                                            <input type="text" placeholder='Enter document name...' className='aseinput pl-2 block w-full' />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width:20%"><h1 className='inline-block'>Author</h1></td>
                                    <td>
                                        <div className='flex flex-row items-center'>
                                            <input type="text" placeholder='Enter author name...' className='aseinput pl-2 block w-full' />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width:20%" className='flex flex-col'>
                                        <h1 className='inline-block'>Description</h1>
                                    </td>
                                    <td>
                                        <div>
                                            <textarea name="details" id="desc" rows="4" className='border border-asegrey w-full pl-2' placeholder='Add details...'></textarea>
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

function BorrowDoc({showDialogBor, setShowDialogBor}) {
    return(
        <div className=''>
            <PopUpDialog open={showDialogBor} onChange={setShowDialogBor}>
                <PopUpHeader text="New Document"/>
                <PopUpContents>
                    <div className='flex flex-col overflow-x-scroll items-center md:flex'>
                        <form action="" className='flex flex-col w-full gap-y-5'>
                            <div className='flex items-center justify-center flex-row gap-5'>
                                    <div className=''>
                                        <MdMenuBook size={24}/>
                                    </div>
                                    <div className='flex flex-row items-center w-2/3'>
                                            <h1>Pemanfaatan Teknologi Game Untuk Pembelajaran Mengenal Ragam Budaya Indonesia Berbasis Android</h1>
                                    </div>
                            </div>
                            <div className='flex items-center justify-center flex-row gap-5'>
                                    <div className=''>
                                            <MdPersonOutline size={24}/>
                                    </div>
                                    <div className='flex flex-row items-center w-2/3'>
                                            <h1>AZ Falani, PL Ekawati</h1>
                                    </div>
                            </div>
                            <div className='flex items-center justify-center flex-row gap-5'>
                                    <h1 className='inline-block'>Return Date</h1>
                                    <input type="date" name="tgl-event" id="tgl-event" className='block w-2/3 aseinput pl-2' />
                            </div>
                            
                            
                        </form>
                    </div>
                </PopUpContents>
                <PopUpActions>
                    <button id='add' className='ASE-button gap-2' onClick={()=>{setShowDialogBor(false);alert("Pura Puranya di save")}}>Save</button>
                    <button id='cancel' className='ASE-button bg-white text-black border-black border hover:bg-gray-300' onClick={()=>setShowDialogBor(false)}>Cancel</button>
                </PopUpActions>
            </PopUpDialog>
        </div>
    )
}

export default function Document () {
    const [showDialog, setOpen] = useState(false);
    const [showDialogBor, setOpenBor] = useState(false);
    return(
        <div className="w-full relative p-10 mb-36">
            {/*Div for Search and filter*/}
            <div className="flex flex-col justify-center gap-2 align-middle pb-5">
                <div>
                    <h1 className="text-4xl font-semibold">Document</h1>
                </div>
                <div className='flex flex-row gap-2'>
                    <input type="text" placeholder="Search..." className="border border-asegreydark w-full rounded-xl p-1 pl-2"/>
                    <details className='relative'>
                        <summary className=" border border-asegreydark rounded-xl p-1 list-none mb-1 hover:bg-gray-300"><BiFilterAlt size={20}/></summary>
                        <ul className='fixed right-0 p-2 shadow z-[1] bg-aseorange rounded-xl w-32 text-center text-white mr-6' >
                            <li><a href="#" className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-aseorangedark dark:hover:text-white'>Alphabet</a></li>
                            <li><a href="#" className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-aseorangedark dark:hover:text-white'>Borrowed</a></li>
                            <li><a href="#" className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-aseorangedark dark:hover:text-white'>Available</a></li>
                        </ul>
                    </details>
                    
                </div>
                
            </div>

            {/*Div for new "Table"*/}
                <div className=' pb-10 w-full flex flex-col overflow-x-hidden'>
                    <div className='overflow-x-auto' >
                        <Table>
                            <TableHeader>
                                <TableCol>Title</TableCol>
                                <TableCol><div className='text-center m-auto'>Status</div></TableCol>
                                <TableCol>Borrower</TableCol>
                                <TableCol></TableCol>
                            </TableHeader>

                            <TableBody>
                                
                                <TableRow>
                                    <TableCol><div className='w-96 break-words'>Sustainable Minds</div> <p className='text-gray-500 text-sm leading-tight'> Eli Blevis</p> </TableCol>
                                    <TableCol> 
                                    <div className='w-full'>
                                        <div className="bg-gray-300 text-center p-1 w-36 m-auto"><p>Borrowed</p></div>
                                    </div>
                                    </TableCol>
                                    <TableCol>Rusdi</TableCol>
                                    
                                    <TableCol>
                                        <div className='flex flex-row items-center justify-center gap-3'>
                                            <button className="ASE-button bg-gray-400 hover:bg-gray-400 cursor-not-allowed">Borrow</button>
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
                                    <TableCol> <div className='w-96 break-words'>Pemanfaatan Teknologi Game Untuk Pembelajaran</div> <p className='text-gray-500 text-sm leading-tight'> AZ Falani, PL Ekawati</p> </TableCol>
                                    <TableCol> 
                                    <div className='w-full'>
                                        <div className="bg-green-300 text-center p-1 w-36 m-auto"><p>Available</p></div>
                                    </div>
                                    </TableCol>
                                    <TableCol>-</TableCol>
                                    
                                    <TableCol>
                                        <div className='flex flex-row items-center justify-center gap-3'>
                                            <button className="ASE-button" onClick={()=>setOpenBor(true)}>Borrow</button>
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
                <button onClick={()=>setOpen(true)} className='self-end rounded-xl w-48 h-8 bg-white text-black border border-asegrey my-5 hover:bg-gray-200'>New Document</button>
                <NewMeeting showDialog={showDialog} setShowDialog={setOpen}/>
                <BorrowDoc showDialogBor={showDialogBor} setShowDialogBor={setOpenBor}/>
            </div>
        </div>
    )
}

