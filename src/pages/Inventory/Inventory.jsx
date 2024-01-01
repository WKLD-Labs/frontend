import { PopUpDialog, PopUpActions, PopUpContents, PopUpHeader } from "../../components/PopUpDialog";
import {MdDeleteForever, MdMoreVert} from "react-icons/md"
import {useState, useEffect} from "react";
import { Table, TableHeader, TableBody, TableRow, TableCol } from '../../components/Table';
import {data} from "autoprefixer";
function NewInventoryDialog({showDialog, setShowDialog, onSubmit}){
    const [formData, setFormData] = useState({
        name: '',
        unit: null,
        date: '',
        description: '',
    });

    function handleSave() {
        onSubmit(formData);
    }
    function handleNameChange(e) {
        setFormData({ ...formData, name: e.target.value });
    }

    function handleDescChange(e) {
        setFormData({ ...formData, description: e.target.value });
    }

    function handleUnitChange(e) {
        setFormData({ ...formData, unit: e.target.value });
    }

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
                                <td><input className="aseinput w-full" type="text" value={formData.name} onChange={handleNameChange} /></td>
                            </tr>
                            <tr>
                                <td className="w-32">Unit</td>
                                <td><input className="aseinput w-full" type="number" value={formData.unit} onChange={handleUnitChange} /></td>
                            </tr>
                            <tr>
                                <td className="w-32">Date</td>
                                <td><input className="aseinput w-full" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} /></td>
                            </tr>
                            <tr>
                                <td className="w-32">Description</td>
                                <td><input className="aseinput w-full" type="textarea" value={formData.description} onChange={handleDescChange} /></td>
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

export default function Inventory(){
    const token = sessionStorage.getItem('token');
    const [selectedData, setSelectedData] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [inventoryData, setInventoryData] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        unit: null,
        date: '',
        description: '',
    });

    function handleNewInventory(newInventoryData) {
        fetch('http://localhost:5500/api/inventory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(newInventoryData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add new inventory');
                }
                return response.json();
            })
            .then(data => {
                console.log('New inventory added:', data);
                setShowDialog(false);
                fetchInventoryData();
            })
            .catch(error => {
                console.error('Error adding new inventory:', error);
            });
    }
    function handleDelete(id) {
        fetch(`http://localhost:5500/api/inventory/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete inventory item');
                }
                return response.json();
            })
            .then(data => {
                console.log('Inventory item deleted:', data);
                fetchInventoryData();
            })
            .catch(error => {
                console.error('Error deleting inventory item:', error);
            });
    }
    function handleUpdate() {
        fetch(`http://localhost:5500/api/inventory/${selectedData.id}`, {
            method: 'PUT', // Use PUT method for updates
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData) // Send the updated data
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update inventory item');
                }
                return response.json();
            })
            .then(data => {
                console.log('Inventory item updated:', data);
                fetchInventoryData(); // Fetch updated inventory data
            })
            .catch(error => {
                console.error('Error updating inventory item:', error);
            });
    }
    function fetchInventoryData() {
        fetch('http://localhost:5500/api/inventory', {
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
                setInventoryData(data);
            })
            .catch(err => {
                console.error(err);
            });
    }
    function handleFormSubmit(event) {
        event.preventDefault(); // Prevent default form submission behavior

        handleUpdate(); // Call the update function when the form is submitted
    }
    function handleNameChange(e) {
        setFormData({...formData, name: e.target.value});
    }
    function handleDescChange(e) {
        setFormData({...formData, description: e.target.value});
    }
    function handleUnitChange(e) {
        setFormData({...formData, unit: e.target.value});
    }
    useEffect(()=>{
        fetch('http://localhost:5500/api/inventory', {
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
                setInventoryData(data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);
    useEffect(() => {
        setSelectedData(inventoryData[0])
    }, []);
    useEffect(() => {
        if (selectedData) {
            setFormData({
                id: selectedData.id || '',
                name: selectedData.name || '',
                unit: selectedData.unit || '',
                date: selectedData.date || '',
                description: selectedData.description || '',
            });
        }
    }, [selectedData]);
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
                            {inventoryData.map((e, i)=>(
                                <TableRow className="hover:bg-opacity-20" onClick={()=>setSelectedData(inventoryData[i])}>
                                    <TableCol>{e.id}</TableCol>
                                    <TableCol>{e.name}</TableCol>
                                    <TableCol>{e.unit}</TableCol>
                                    <TableCol>{e.date}</TableCol>
                                    <TableCol>
                                        <span className="ml-auto mr-8 w-fit flex flex-row gap-2">
                                            <button onClick={(event)=>{handleDelete(e.id);event.stopPropagation()}}><MdDeleteForever size="24px"/></button>
                                        </span>
                                    </TableCol>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex flex-col justify-center items-center bg-asegrey bg-opacity-10 p-4 gap-2">
                    <form onSubmit={handleFormSubmit}>
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
                                    <input type="text" className="aseinput w-48" value={formData?.name} onChange={handleNameChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Deskripsi</td>
                                <td>
                                    <textarea name="" id="" className="aseinput w-48" value={formData?.description} onChange={handleDescChange}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>Unit</td>
                                <td>
                                    <input type="number" className="aseinput w-48" value={formData?.unit} onChange={handleUnitChange}/>
                                </td>
                            </tr>
                        </table>
                        <input type="submit" value="Update" className="ASE-button bg-aseorange"/>
                    </form>
                </div>
            </div>
            <button onClick={()=>setShowDialog(true)} className="self-end rounded-xl w-48 h-8 bg-white text-black border border-asegrey">New Item</button>
            <NewInventoryDialog showDialog={showDialog} setShowDialog={setShowDialog} onSubmit={handleNewInventory} />
        </div>
    )
}