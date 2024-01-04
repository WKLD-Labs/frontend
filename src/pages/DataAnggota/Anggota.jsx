import { useState, useEffect } from "react";
import { Table, TableHeader, TableBody, TableRow, TableCol } from '../../components/Table';
import profile from "../../assets/dummy-profile.jpg";
import { MdOutlineDelete, MdMoreVert } from "react-icons/md";
import { PopUpDialog, PopUpActions, PopUpContents, PopUpHeader } from "../../components/PopUpDialog";

function NewMemberDialog({ showDialog, setShowDialog, onSubmit }) {
    const facultiesWithMajors = {
        "Fakultas Teknik Elektro (FTE)": ["Electrical Energy Engineering", "Teknik Biomedis", "Teknik Telekomunikasi", "Teknik Elektro", "Smart Science and Technology", "Teknik Komputer"],
        "Fakultas Rekayasa Industri (FRI)": ["Teknik Industri", "Sistem Informasi", "Digital Supply Chain"],
        "Fakultas Informatika (FIF)": ["Informatika", "Rekayasa Perangkat Lunak", "Cybersecurity", "Teknologi Informasi", "Data Sains"],
        "Fakultas Ekonomi dan Bisnis (FEB)": ["Akuntansi", "Manajemen", "Leisure Management"],
        "Fakultas Komunikasi & Bisnis (FKB)": ["Ilmu Komunikasi", "Administrasi Bisnis", "Digital Public Relation", "Digital Content Broadcasting"],
        "Fakultas Industri Kreatif (FIK)": ["Creative Arts", "Desain Komunikasi Visual", "Desain Produk & Inovasi", "Desain Interior", "Kriya (Fashion & Textile Design)", "Film dan Animasi"],
        "Fakultas Ilmu Terapan (FIT)": ["Akuntansi", "Rekayasa Perangkat Lunak", "Hospitality & Culinary Arts", "Sistem Informasi", "Teknik Telekomunikasit", "Teknik Komputer", "Digital Accounting", "Digital Marketing", "Digital Creative Multimedia"],
        // Add more faculties and their respective majors
    };
    const [selectedFaculty, setSelectedFaculty] = useState(Object.keys(facultiesWithMajors)[0]); // Default selected faculty
    const selectedFacultyMajors = facultiesWithMajors[selectedFaculty] || []; // Ensure selected faculty has associated majors
    const [formData, setFormData] = useState({
        nim: '',
        name: '',
        faculty: selectedFaculty,
        major: '',
        entryYear: null,
    });
    useEffect(() => {
        if (showDialog) {
            setFormData({
                nim: '',
                name: '',
                faculty: Object.keys(facultiesWithMajors)[0],
                major: '',
                entryYear: 0,
            });
        }
    }, [showDialog]);
    function handleSave() {
        onSubmit(formData);
    }
    function handleNimChange(e) {
        setFormData({ ...formData, nim: e.target.value });
    }
    function handleNameChange(e) {
        setFormData({ ...formData, name: e.target.value });
    }

    function handleFacultyChange(e) {
        setFormData({ ...formData, faculty: e.target.value });
    }

    function handleMajorChange(e) {
        setFormData({ ...formData, major: e.target.value });
    }
    function handleEntryChange(e) {
        setFormData({ ...formData, entryYear: e.target.value });
    }
    return (
        <PopUpDialog open={showDialog} onChange={setShowDialog}>
            <PopUpHeader text="New Member" />
            <PopUpContents>
                <div class="flex flex-row gap-4 items-center">
                    <form class="flex flex-col gap-2 flex-1">
                        <table class="w-full border-separate border-spacing-x-2 border-spacing-y-2">
                            <tbody>
                                <tr>
                                    <td class="w-32">NIM</td>
                                    <td><input class="aseinput w-full" type="text" onChange={handleNimChange} value={formData.nim} /></td>
                                </tr>
                                <tr>
                                    <td className="w-32">Name</td>
                                    <td><input className="aseinput w-full" type="text" onChange={handleNameChange} value={formData.name}/></td>
                                </tr>
                                <tr>
                                    <td className="w-32">Faculty</td>
                                    <td><select
                                        className="aseinput w-full"
                                        onChange={(e) => {setSelectedFaculty(e.target.value);setFormData({ ...formData, faculty: e.target.value })}}
                                        value={formData.faculty}
                                    >
                                        {Object.keys(facultiesWithMajors).map((faculty) => (
                                            <option key={faculty} value={faculty}>
                                                {faculty}
                                            </option>
                                        ))}
                                    </select></td>
                                </tr>
                                <tr>
                                    <td className="w-32">Major</td>
                                    <td><select
                                        className="aseinput w-full"
                                        onChange={handleMajorChange}
                                        value={formData.major}
                                    >
                                        {selectedFacultyMajors.map((major) => (
                                            <option key={major} value={major}>
                                                {major}
                                            </option>
                                        ))}
                                    </select></td>
                                </tr>
                                <tr>
                                    <td className="w-32">Enty Year</td>
                                    <td><input className="aseinput w-full" type="number" onChange={handleEntryChange} value={formData.entryYear}/></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>

            </PopUpContents>
            <PopUpActions>
                <button className="py-1 px-4 rounded-full bg-aseorange text-white" onClick={handleSave}>Save</button>
                <button className="py-1 px-4 rounded-full bg-aseorange text-white" onClick={() => setShowDialog(false)}>Close</button>
            </PopUpActions>
        </PopUpDialog>
    )
}

export default function Anggota() {
    const token = sessionStorage.getItem('token');
    const [showDialog, setShowDialog] = useState(false);
    const [memberData, setMemberData] = useState([]);
    function handleNewMember(newInventoryData) {
        fetch(import.meta.env.VITE_API_SERVER + '/api/member', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(newInventoryData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add new member');
                }
                return response.json();
            })
            .then(data => {
                console.log('New member added:', data);
                setShowDialog(false);
                fetchMemberData();
            })
            .catch(error => {
                console.error('Error adding new member:', error);
            });
    }
    function handleDelete(id) {
        const confirmDelete = window.confirm("Are you sure you want to delete this member?");
        if (confirmDelete) {
            fetch(import.meta.env.VITE_API_SERVER + `/api/member/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to delete member');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Member deleted:', data);
                    fetchMemberData();
                })
                .catch(error => {
                    console.error('Error deleting Member:', error);
                });
        }
    }

    function fetchMemberData() {
        fetch(import.meta.env.VITE_API_SERVER + '/api/member', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setMemberData(data);
            })
            .catch(err => {
                console.error(err);
            });
    }
    useEffect(()=>{
        fetch(import.meta.env.VITE_API_SERVER + '/api/member', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setMemberData(data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);
    return (
        <div className="p-4 w-full flex flex-col overflow-x-auto" >
            <h1 className="text-3xl font-medium my-5 mx-5">Data Anggota</h1>
            <Table>
                <TableHeader>
                    <TableCol></TableCol>
                    <TableCol>NIM</TableCol>
                    <TableCol>Name</TableCol>
                    <TableCol>Faculty</TableCol>
                    <TableCol>Major</TableCol>
                    <TableCol>Entry Year</TableCol>
                    <TableCol></TableCol>
                </TableHeader>
                <TableBody>
                    {memberData.map((e, i) => (
                        <TableRow>
                            <TableCol><img class="w-10 aspect-square rounded-full place-content-center" src={profile} /></TableCol>
                            <TableCol>{e.nim}</TableCol>
                            <TableCol>{e.name}</TableCol>
                            <TableCol>{e.faculty}</TableCol>
                            <TableCol>{e.major}</TableCol>
                            <TableCol>{e.entryYear}</TableCol>
                            <TableCol><span className="ml-auto mr-8 w-fit flex flex-row gap-2">
                            <MdOutlineDelete size={24} onClick={(event)=>{handleDelete(e.id);event.stopPropagation()}}/>
                        </span>
                            </TableCol>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <button onClick={() => setShowDialog(true)} class="item-right self-end border-2 bg-white hover:bg-asegrey text-black font-normal px-9 py-1 my-10 rounded-full">New Member</button>
            <NewMemberDialog showDialog={showDialog} setShowDialog={setShowDialog} onSubmit={handleNewMember}/>
        </div>
    )
}