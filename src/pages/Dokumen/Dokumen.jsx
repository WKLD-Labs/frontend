import { BiFilterAlt } from 'react-icons/bi';
import { Table, TableHeader, TableBody, TableRow, TableCol } from '../../components/Table';
import { MdPersonOutline, MdMenuBook, MdOutlineDelete, MdMoreVert } from "react-icons/md";
import { PopUpDialog, PopUpHeader, PopUpContents, PopUpActions } from "../../components/PopUpDialog";
import { useState, useEffect } from "react";

function NewDocument({ showDialog, setShowDialog, onSubmit }) {
    const [doc, setDoc] = useState({ title: '', writer: '', description: '' });

    function handleTitle(e) {
        setDoc({ ...doc, title: e.target.value });
    }
    function handleWriter(e) {
        setDoc({ ...doc, writer: e.target.value });
    }
    function handleDesc(e) {
        setDoc({ ...doc, description: e.target.value });
    }
    function handleSave() {
        onSubmit(doc);
    }

    return (
        <div className=''>
            <PopUpDialog open={showDialog} onChange={setShowDialog}>
                <PopUpHeader text="New Document" />
                <PopUpContents>
                    <div className='flex flex-col overflow-x-auto items-center md:flex'>
                        <form action="" className='flex flex-col w-full'>
                            <table className='border-separate border-spacing-y-4'>
                                <tr className=''>
                                    <td style={{ width: "20%" }}><h1 className='inline-block'>Title</h1></td>
                                    <td>
                                        <div className='flex flex-row items-center'>
                                            <input type="text" placeholder='Enter document name...' className='aseinput pl-2 block w-full' name='title' value={doc.title} onChange={handleTitle} />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: "20%" }}><h1 className='inline-block'>Author</h1></td>
                                    <td>
                                        <div className='flex flex-row items-center'>
                                            <input type="text" placeholder='Enter author name...' name='writer' className='aseinput pl-2 block w-full' value={doc.writer} onChange={handleWriter} />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: "20%" }} className='flex flex-col'>
                                        <h1 className='inline-block'>Description</h1>
                                    </td>
                                    <td>
                                        <div>
                                            <textarea name='description' id="desc" rows="4" className='border border-asegrey w-full pl-2' placeholder='Add details...' value={doc.description} onChange={handleDesc}></textarea>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </form>
                    </div>
                </PopUpContents>
                <PopUpActions>
                    <button id='add' className='ASE-button gap-2' onClick={() => { setShowDialog(false); handleSave(); }}>Save</button>
                    <button id='cancel' className='ASE-button bg-white text-black border-black border hover:bg-gray-300' onClick={() => setShowDialog(false)}>Cancel</button>
                </PopUpActions>
            </PopUpDialog>
        </div>
    )
}

function BorrowDoc({ showDialogBor, setShowDialogBor, onSubmit, selectedDoc }) {
    const [doc, setDoc] = useState({ return_date: '', borrower: '' });

    function handleReturn(e) {
        setDoc({ ...doc, return_date: e.target.value });
    }

    function handleBorrower(e) {
        setDoc({ ...doc, borrower: e.target.value });
    }

    function handleSave() {
        onSubmit({ ...selectedDoc, return: doc.return_date, status: false, borrower: doc.borrower });
    }

    return (
        <div className=''>
            <PopUpDialog open={showDialogBor} onChange={setShowDialogBor}>
                <PopUpHeader text="Borrow Document" />
                <PopUpContents>
                    <div className='flex flex-col overflow-x-scroll items-center md:flex'>
                        <form action="" className='flex flex-col w-full gap-y-5'>
                            <div className='flex items-center justify-center flex-row gap-5'>
                                <div className=''>
                                    <MdMenuBook size={24} />
                                </div>
                                <div className='flex flex-row items-center w-2/3'>
                                    <h1>{selectedDoc?.title}</h1>
                                </div>
                            </div>
                            <div className='flex items-center justify-center flex-row gap-5'>
                                <div className=''>
                                    <MdPersonOutline size={24} />
                                </div>
                                <div className='flex flex-row items-center w-2/3'>
                                    <h1>{selectedDoc?.writer}</h1>
                                </div>
                            </div>
                            <div className='flex items-center justify-center flex-row gap-5'>
                                <h1 className='inline-block'>Return Date</h1>
                                <input type="date" name="return" id="return" className='block w-2/3 aseinput pl-2' value={doc.return_date} onChange={handleReturn} />
                            </div>
                            <div className='flex items-center justify-center flex-row gap-5'>
                                <h1 className='inline-block'>Borrower Name</h1>
                                <input type="text" name="borrower" id="borrower" className='block w-2/3 aseinput pl-2' placeholder='Enter borrower name...' value={doc.borrower} onChange={handleBorrower} />
                            </div>
                        </form>
                    </div>
                </PopUpContents>
                <PopUpActions>
                    <button id='add' className='ASE-button gap-2' onClick={() => { setShowDialogBor(false); handleSave() }}>Save</button>
                    <button id='cancel' className='ASE-button bg-white text-black border-black border hover:bg-gray-300' onClick={() => setShowDialogBor(false)}>Cancel</button>
                </PopUpActions>
            </PopUpDialog>
        </div>
    )
}

function MoreDetailsPopup({ showDialogMore, setShowDialogMore, selectedDoc }) {
    return (
        <div className=''>
            <PopUpDialog open={showDialogMore} onChange={setShowDialogMore}>
                <PopUpHeader text="Document Details" />
                <PopUpContents>
                    <div className='flex flex-col overflow-x-scroll items-center md:flex'>
                        <div className='flex flex-col w-full gap-y-5'>
                            <div className='flex items-center justify-center flex-row gap-5'>
                                <div className=''>
                                    <MdMenuBook size={24} />
                                </div>
                                <div className='flex flex-row items-center w-2/3'>
                                    <h1>{selectedDoc?.title}</h1>
                                </div>
                            </div>
                            <div className='flex items-center justify-center flex-row gap-5'>
                                <div className=''>
                                    <MdPersonOutline size={24} />
                                </div>
                                <div className='flex flex-row items-center w-2/3'>
                                    <h1>{selectedDoc?.writer}</h1>
                                </div>
                            </div>
                            <div className='flex items-center justify-center flex-row gap-5'>
                                <h1 className='inline-block'>Description</h1>
                                <div className='block w-2/3 aseinput pl-2'>{selectedDoc?.description}</div>
                            </div>
                            <div className='flex items-center justify-center flex-row gap-5'>
                                <h1 className='inline-block'>Status</h1>
                                <div className='block w-2/3 aseinput pl-2'>{selectedDoc?.status ? 'Available' : 'Borrowed'}</div>
                            </div>
                            {selectedDoc?.borrower && (
                                <div className='flex items-center justify-center flex-row gap-5'>
                                    <h1 className='inline-block'>Borrower</h1>
                                    <div className='block w-2/3 aseinput pl-2'>{selectedDoc?.borrower}</div>
                                </div>
                            )}
                            {selectedDoc?.return && (
                                <div className='flex items-center justify-center flex-row gap-5'>
                                    <h1 className='inline-block'>Return Date</h1>
                                    <div className='block w-2/3 aseinput pl-2'>{selectedDoc?.return}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </PopUpContents>
                <PopUpActions>
                    <button id='close' className='ASE-button bg-white text-black border-black border hover:bg-gray-300' onClick={() => setShowDialogMore(false)}>Close</button>
                </PopUpActions>
            </PopUpDialog>
        </div>
    )
}


export default function Document() {
    const bearertoken = sessionStorage.getItem('token');
    const apiurl = import.meta.env.VITE_API_SERVER + "/api/document";
    const [showDialog, setOpen] = useState(false);
    const [showDialogBor, setOpenBor] = useState(false);
    const [showDialogMore, setOpenMore] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);

    //===================================Backend===================================
    const [docData, setDocData] = useState([]);

    //Get Document
    async function getDocument(id) {
        let response;
        const headers = {
            'Authorization': 'Bearer ' + bearertoken
        }
        if (id) {
            response = await fetch(apiurl + "/", { headers });
        } else {
            response = await fetch(apiurl, { headers });
        }
        let data = await response.json();
        console.log(data);
        return data.data;
    }

    //Read Document
    async function readDocData() {
        const data = await getDocument();
        setDocData(data);
    }

    //Delete Document
    async function deleteDoc(id) {
        const headers = {
            'Authorization': 'Bearer ' + bearertoken
        }
        await fetch(apiurl + "/" + id, { method: 'DELETE', headers });
        readDocData();
    }

    //POST and PUT
    async function submit(data) {
        const headers = {
            'Authorization': 'Bearer ' + bearertoken,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        let response;
        if (data.id) {
            response = await fetch(apiurl + "/" + data.id, { method: 'PUT', headers, body: new URLSearchParams(data) });
        } else {
            response = await fetch(apiurl, { method: 'POST', headers, body: new URLSearchParams(data) });
        }
        if (response.status >= 400) {
            const res = await response.json();
            alert("Error", res.error);
            return;
        }
        readDocData();
        return response;
    }

    useEffect(() => {
        readDocData();
    }, [])

    //===================================Frontend===================================
    return (
        <div className="w-full relative p-10 mb-36">
            {/* Div for Search and filter */}
            <div className="flex flex-col justify-center gap-2 align-middle pb-5">
                <div>
                    <h1 className="text-4xl font-semibold">Document</h1>
                </div>
                <div className='flex flex-row gap-2'>
                    <input type="text" placeholder="Search..." className="border border-asegreydark w-full rounded-xl p-1 pl-2"/>
                    <details className='relative'>
                        <summary className="border border-asegreydark rounded-xl p-1 list-none mb-1 hover:bg-gray-300"><BiFilterAlt size={20}/></summary>
                        <ul className='fixed right-0 p-2 shadow z-[1] bg-aseorange rounded-xl w-32 text-center text-white mr-6' >
                            <li><a href="#" className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-aseorangedark dark:hover:text-white'>Alphabet</a></li>
                            <li><a href="#" className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-aseorangedark dark:hover:text-white'>Borrowed</a></li>
                            <li><a href="#" className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-aseorangedark dark:hover:text-white'>Available</a></li>
                        </ul>
                    </details>
                </div>
            </div>

            {/* Div for new "Table" */}
            <div className='pb-10 w-full flex flex-col overflow-x-hidden'>
                <div className='overflow-x-auto'>
                    <Table>
                        <TableHeader>
                            <TableCol>Title</TableCol>
                            <TableCol><div className='text-center m-auto'>Status</div></TableCol>
                            <TableCol>Borrower</TableCol>
                            <TableCol></TableCol>
                        </TableHeader>

                        <TableBody>
                            {docData.map((data) => (
                                <TableRow key={data.id}>
                                    <TableCol>
                                        <div className='w-96 break-words'>{data.title}</div>
                                        <p className='text-gray-500 text-sm leading-tight'> {data.writer}</p> </TableCol>
                                    <TableCol>
                                        <div className='w-full'>
                                            {data.status ? (
                                                <div className="bg-green-300 text-center p-1 w-36 m-auto">
                                                    <p>Available</p>
                                                </div>
                                            ) : (
                                                <div className="bg-gray-300 text-center p-1 w-36 m-auto">
                                                    <p>Borrowed</p>
                                                </div>
                                            )}
                                        </div>
                                    </TableCol>
                                    <TableCol>
                                        {data.borrower ? (
                                            data.borrower
                                        ) : (
                                            <p></p>
                                        )}
                                    </TableCol>

                                    <TableCol>
                                        <div className='flex flex-row items-center justify-center gap-3'>
                                            {data.status ? (
                                                <button className="ASE-button" onClick={() => { setSelectedDoc(data); setOpenBor(true); }}>Borrow</button>
                                            ) : (
                                                <button className="ASE-button bg-gray-400 hover:bg-gray-400 cursor-not-allowed">Borrow</button>
                                            )}

                                            <button onClick={() => deleteDoc(data.id)}>
                                                <MdOutlineDelete size={24} />
                                            </button>
                                            <button onClick={() => { setSelectedDoc(data); setOpenMore(true); }}>
                                                <MdMoreVert size={24} />
                                            </button>
                                        </div>
                                    </TableCol>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <button onClick={() => setOpen(true)} className='self-end rounded-xl w-48 h-8 bg-white text-black border border-asegrey my-5 hover:bg-gray-200'>New Document</button>
                <NewDocument showDialog={showDialog} setShowDialog={setOpen} onSubmit={submit} />
                <BorrowDoc showDialogBor={showDialogBor} setShowDialogBor={setOpenBor} onSubmit={submit} selectedDoc={selectedDoc} />
                <MoreDetailsPopup showDialogMore={showDialogMore} setShowDialogMore={setOpenMore} selectedDoc={selectedDoc} />
            </div>
        </div>
    )
}