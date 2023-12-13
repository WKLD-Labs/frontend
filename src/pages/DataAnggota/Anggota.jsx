import { useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableCol } from '../../components/Table';
import profile from "../../assets/dummy-profile.jpg";
import { MdOutlineDelete, MdMoreVert } from "react-icons/md";
import { PopUpDialog, PopUpActions, PopUpContents, PopUpHeader } from "../../components/PopUpDialog";

function NewMemberDialog({ showDialog, setShowDialog }) {
    return (
        <PopUpDialog open={showDialog} onChange={setShowDialog}>
            <PopUpHeader text="New Member" />
            <PopUpContents>
                <div class="flex flex-row gap-4 items-center">
                    <form class="flex flex-col gap-2 flex-1">
                        <table class="w-full border-separate border-spacing-x-2 border-spacing-y-2">
                            <tbody>
                                <tr>
                                    <td class="w-32">Name</td>
                                    <td><input class="aseinput w-full" type="text" /></td>
                                </tr>
                                <tr>
                                    <td className="w-32">Faculty</td>
                                    <td><input class="aseinput w-full" type="text" /></td>
                                </tr>
                                <tr>
                                    <td className="w-32">Major</td>
                                    <td><input class="aseinput" type="date" /></td>
                                </tr>
                                <tr>
                                    <td className="w-32">Entry Year</td>
                                    <td><input class="aseinput" type="time" /></td>
                                </tr>
                                <tr>
                                    <td className="w-32">Age</td>
                                    <td><input class="aseinput w-full" type="text" /></td>
                                </tr>
                                <tr>
                                    <td className="w-32">Picture</td>
                                    <td><input class="aseinput w-full" type="file" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>

            </PopUpContents>
            <PopUpActions>
                <button className="py-1 px-4 rounded-full bg-aseorange text-white" onClick={() => { alert("Saved"); setShowDialog(false) }}>Save</button>
                <button className="py-1 px-4 rounded-full bg-aseorange text-white" onClick={() => setShowDialog(false)}>Close</button>
            </PopUpActions>
        </PopUpDialog>
    )
}

export default function Anggota() {
    const [showDialog, setShowDialog] = useState(false);
    return (
        <div className="p-4 w-full flex flex-col overflow-x-auto" >
            <h1 className="text-3xl font-medium my-5 mx-5">Data Anggota</h1>
            <Table>
                <TableHeader>
                    <TableCol></TableCol>
                    <TableCol>Name</TableCol>
                    <TableCol>Faculty</TableCol>
                    <TableCol>Major</TableCol>
                    <TableCol>Entry Year</TableCol>
                    <TableCol>Age</TableCol>
                    <TableCol></TableCol>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCol><img class="w-10 aspect-square rounded-full place-content-center" src={profile} /></TableCol>
                        <TableCol>Muhammad Isa Al Anshori</TableCol>
                        <TableCol>FIF</TableCol>
                        <TableCol>RPL</TableCol>
                        <TableCol>2021</TableCol>
                        <TableCol>20</TableCol>
                        <TableCol><span className="ml-auto mr-8 w-fit flex flex-row gap-2">
                            <MdOutlineDelete size={24} />
                            <MdMoreVert size={24} />
                        </span>
                        </TableCol>
                    </TableRow>
                    <TableRow>
                        <TableCol><img class="w-10 aspect-square rounded-full place-content-center" src={profile} /></TableCol>
                        <TableCol>Adam Rafif Faqih</TableCol>
                        <TableCol>FIF</TableCol>
                        <TableCol>RPL</TableCol>
                        <TableCol>2021</TableCol>
                        <TableCol>20</TableCol>
                        <TableCol><span className="ml-auto mr-8 w-fit flex flex-row gap-2">
                            <MdOutlineDelete size={24} />
                            <MdMoreVert size={24} />
                        </span>
                        </TableCol>
                    </TableRow>
                    <TableRow>
                        <TableCol><img class="w-10 aspect-square rounded-full place-content-center" src={profile} /></TableCol>
                        <TableCol>Maximus Bayu</TableCol>
                        <TableCol>FIF</TableCol>
                        <TableCol>RPL</TableCol>
                        <TableCol>2021</TableCol>
                        <TableCol>20</TableCol>
                        <TableCol><span className="ml-auto mr-8 w-fit flex flex-row gap-2">
                            <MdOutlineDelete size={24} />
                            <MdMoreVert size={24} />
                        </span>
                        </TableCol>
                    </TableRow>
                    <TableRow>
                        <TableCol><img class="w-10 aspect-square rounded-full place-content-center" src={profile} /></TableCol>
                        <TableCol>Muhamad Ilham Nasrullah</TableCol>
                        <TableCol>FIF</TableCol>
                        <TableCol>RPL</TableCol>
                        <TableCol>2021</TableCol>
                        <TableCol>20</TableCol>
                        <TableCol><span className="ml-auto mr-8 w-fit flex flex-row gap-2">
                            <MdOutlineDelete size={24} />
                            <MdMoreVert size={24} />
                        </span>
                        </TableCol>
                    </TableRow>
                    <TableRow>
                        <TableCol><img class="w-10 aspect-square rounded-full place-content-center" src={profile} /></TableCol>
                        <TableCol>Habli Zulvana Ath-Thaariq</TableCol>
                        <TableCol>FIF</TableCol>
                        <TableCol>RPL</TableCol>
                        <TableCol>2021</TableCol>
                        <TableCol>20</TableCol>
                        <TableCol><span className="ml-auto mr-8 w-fit flex flex-row gap-2">
                            <MdOutlineDelete size={24} />
                            <MdMoreVert size={24} />
                        </span>
                        </TableCol>
                    </TableRow>
                    <TableRow>
                        <TableCol><img class="w-10 aspect-square rounded-full place-content-center" src={profile} /></TableCol>
                        <TableCol>Nabiel Prayoga</TableCol>
                        <TableCol>FIF</TableCol>
                        <TableCol>RPL</TableCol>
                        <TableCol>2021</TableCol>
                        <TableCol>20</TableCol>
                        <TableCol><span className="ml-auto mr-8 w-fit flex flex-row gap-2">
                            <MdOutlineDelete size={24} />
                            <MdMoreVert size={24} />
                        </span>
                        </TableCol>
                    </TableRow>
                </TableBody>
            </Table>
            <button onClick={() => setShowDialog(true)} class="item-right self-end border-2 bg-white hover:bg-asegrey text-black font-normal px-9 py-1 my-10 rounded-full">New Member</button>
            <NewMemberDialog showDialog={showDialog} setShowDialog={setShowDialog}/>
        </div>
    )
}