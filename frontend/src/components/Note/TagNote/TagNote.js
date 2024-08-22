import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Button/Button';
import { getNotes, getTags, addTagNote, deleteTagNote } from '../../../api/API';
import './TagNote.css'

const TagNote = () => {
    const [message, setMessage] = useState(''); 
    const [error, setError] = useState(''); 
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const [selectedTagId, setSelectedTagId] = useState(null);
    const [newTag, setNewTag] = useState({ idNote: 0, idTag: 0 });

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
        const fetchTags = async () => {
            try {
                const tagsData = await getTags();
                setTags(tagsData);
            } catch (error) {
                console.error('Failed to fetch tags:', error);
            }
        };

        fetchNotes();
        fetchTags();
    }, [selectedNoteId]);

    const handleNoteChange = (event) => {
        const Note = event.target.value
        setSelectedNoteId(Note);
        setNewTag(prevTag => ({ ...prevTag, idNote: Note }));
    };

    const handleTagChange = (event) => {
        const Tag = event.target.value
        setSelectedTagId(Tag);
        setNewTag(prevTag => ({ ...prevTag, idTag: Tag }));
    };

    const handleTagNote = async () => {
        console.log(selectedNoteId);
        console.log(selectedTagId);
        console.log(newTag);
        try {
            if (selectedTagId === 'DELETE_TAG') {
                await deleteTagNote(selectedNoteId); 
                setMessage('Tag deleted successfully');
            } else {
                await addTagNote(newTag);
                setMessage('Tag added successfully');
            }
            setError(''); 
            setSelectedNoteId('.');
            setSelectedTagId('.');
            setNewTag({ idNote: 0, idTag: 0 });
        } catch (error) {
            setMessage(''); 
            setError('Error to handle the tag'); 
        }
    };
    
    const backMenu = () => {
        navigate('/'); 
    };

    return (
        <div className="app">
            <h1 className='title'>TAG NOTES</h1>
            <h2 className='subtitle'>Select a note, add or delete a tag, then press 'Save'</h2>
            <div className="note-form-delete">
                <select 
                    onChange={handleNoteChange} 
                    value={selectedNoteId}
                    className="select-note"
                >
                    <option value=".">Select a note</option>
                    {notes.map(note => (
                        <option key={note.id} value={note.id} onClick={handleNoteChange}>
                            {note.title} : {note.tag ? note.tag.name : 'no tag'}
                        </option>
                    ))}
                </select>
                <select 
                    onChange={handleTagChange} 
                    value={selectedTagId}
                    className="select-note"
                >
                    <option value=".">Add or delete a tag</option>
                    <option className="deleteall" value="DELETE_TAG">Delete tag</option>
                    {tags.map(tag => (
                        <option key={tag.id} value={tag.id} onClick={handleTagChange}>
                            {tag.name}
                        </option>
                    ))}
                </select>
                <div className="buttons-container">
                    <Button className='option' text="BACK" onClick={backMenu} />
                    <Button text="OK" onClick={handleTagNote} disabled={!selectedNoteId} />
                </div>
                {message && <p className="message">{message}</p>}
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default TagNote;
