import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Button/Button'; 
import { getNotes, getTags } from '../../../api/API'; 
import './ListNote.css'

const ArchiveNote = () => {
    const [message, setMessage] = useState('');
    const [notes, setNotes] = useState([]);
    const [filterArchiveStatus, setFilterArchiveStatus] = useState('All');
    const [filterTag, setFilterTag] = useState(10);
    const [selectedNote, setSelectedNote] = useState(null);
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();


    const fetchNotes = useCallback(async () => {
        try {
            console.log(filterArchiveStatus)
            console.log(filterTag)
            let fetchedNotes;
            if (filterArchiveStatus === 'All' && parseInt(filterTag) === 10) {
                fetchedNotes = await getNotes();
            } else if (parseInt(filterTag) === 10) {
                fetchedNotes = await getNotes(filterArchiveStatus === 'Archived', null);
            } else if (filterArchiveStatus === 'All') {
                fetchedNotes = await getNotes(undefined, filterTag);
            } else {
                fetchedNotes = await getNotes(filterArchiveStatus === 'Archived', filterTag);
            }
            if (fetchedNotes && fetchedNotes.length === 0){
                setMessage('No notes have been loaded yet')
            }else{
                setMessage('')
            }
            setNotes(fetchedNotes);
        } catch (error) {
            console.error('Failed to fetch notes:', error);
        }
    }, [filterArchiveStatus, filterTag]); 
    
    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const tagsData = await getTags();
                setTags(tagsData);
            } catch (error) {
                console.error('Failed to fetch tags:', error);
            }
        };
        fetchTags();
    },[])

    const handleRowClick = (note) => {
        setSelectedNote(note);
    };

    const handleFilterArchiveChange = (event) => {
        setFilterArchiveStatus(event.target.value);
    };

    const handleFilterTagChange = (event) => {
        setFilterTag(event.target.value);
    };


    const backMenu = () => {
        navigate('/'); 
    };

    return (
        <div className="app">
            <h1 className='title'>YOUR NOTES</h1>
            <h2 className='subtitle'>Here you can view, list, and filter your notes.</h2>
            <div className='filters'>
                <div className='filter'>
                    <label htmlFor="text">
                            Status
                    </label>
                    <select 
                            onChange={handleFilterArchiveChange} 
                            value={filterArchiveStatus}
                            className="select-note-list"
                        >
                            <option value="All" disabled>Filter by archive status</option>
                            <option value="All" onClick={handleFilterArchiveChange}>All</option>
                            <option value="Actives" onClick={handleFilterArchiveChange}>Active</option>
                            <option value="Archived" onClick={handleFilterArchiveChange}>Archived</option>
                        </select>
                </div>
                <div className='filter'>
                    <label htmlFor="text">
                            Tag
                    </label>
                    <select 
                            onChange={handleFilterTagChange} 
                            value={filterTag}
                            className="select-note-list"
                        >
                        <option value={10} disabled>Filter by tag</option>
                        <option value={10} onClick={handleFilterTagChange}>All</option>
                        <option className="deleteall" value={0} >Only no tags</option>
                        {tags.map(tag => (
                            <option key={tag.id} value={tag.id} onClick={handleFilterTagChange}>
                                {tag.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="notes-container-list">
                <div className="notes-table-container">
                    <table className="notes-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Tag</th>
                                <th>Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.map(note => (
                                <tr 
                                    key={note.id} 
                                    onClick={() => handleRowClick(note)} 
                                    style={{ cursor: 'pointer', backgroundColor: selectedNote?.id === note.id ? '#009087' : '#ddd' ,
                                        color: selectedNote?.id === note.id ? 'white' : 'black'
                                    }} 
                                >
                                    <td>{note.title}</td>
                                    <td>{note.tag ? note.tag.name : 'no tag'}</td>
                                    <td>{note.archived ? 'No' : 'Yes'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="note-details-list">
                    <label htmlFor="text">
                        Text
                    </label>
                    <textarea 
                        value={selectedNote ? selectedNote.text : ''} 
                        readOnly 
                        rows={10} 
                        cols={50} 
                        placeholder="Select a note to see its details..."
                        className='note-textarea'
                    />
                </div>
            </div>
            <div className="buttons-container">
                <Button className='option' text="BACK" onClick={backMenu} />
            </div>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default ArchiveNote;
