import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Button/Button'; 
import { getNotes, setArchiveNotesAPI } from '../../../api/API'; 
import './ArchiveNote.css'; 

const ArchiveNote = () => {
    const [message, setMessage] = useState(''); 
    const [error, setError] = useState(''); 
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();
    const [noteIds, setNoteIds] = useState({noteIds: []});

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const fetchedNotes = await getNotes();
                if (fetchedNotes && fetchedNotes.length === 0){
                    setMessage('No notes have been loaded yet')
                }
                setNotes(fetchedNotes);
            } catch (error) {
                console.error('Failed to fetch notes:', error);
            }
        };

        fetchNotes();
    }, []);

    const handleCheckboxChange = (noteId) => {
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.id === noteId ? { ...note, archived: !note.archived } : note
            )
        );

        // Actualiza el estado de noteIds con los IDs de las notas modificadas
        setNoteIds(prevNoteIds => {
            const updatedNoteIds = prevNoteIds.noteIds.includes(noteId)
                ? prevNoteIds.noteIds.filter(id => id !== noteId) // Si ya está, quítalo
                : [...prevNoteIds.noteIds, noteId]; // Si no está, agrégalo

            return { noteIds: updatedNoteIds };
        });
    };

    // Función para guardar cambios
    const handleSave = async () => {
        console.log(noteIds.noteIds)
        try {
            await setArchiveNotesAPI(noteIds);
            setMessage('Notes archived/unarchived succefully'); 
            setError('');
            setNoteIds({noteIds: []});
        } catch (error) {
            setMessage(''); 
            setError('Error archiving the notes');
        }
    };

    const backMenu = () => {
        navigate('/'); 
    };

    return (
        <div className="app">
            <h1 className='title'>ARCHIVE NOTES</h1>
            <h2 className='subtitle'>Click the 'Active' box to archive or unarchive, then press 'Save'.</h2>
            <div className="notes-table-container">
                <table className="notes-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notes.map(note => (
                            <tr key={note.id}>
                                <td>{note.title}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={!note.archived}
                                        onChange={() => handleCheckboxChange(note.id)} // Maneja el cambio del checkbox
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="buttons-container">
                <Button className='option' text="BACK" onClick={backMenu} />
                <Button text="SAVE" onClick={handleSave}/>
            </div>
            {message && <p className="message">{message}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default ArchiveNote;
