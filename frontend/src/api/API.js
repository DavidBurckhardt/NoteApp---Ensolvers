const API_BASE_URL = 'http://localhost:8080'; 

export const newNoteAPI = async (note) => {
    try {
        const response = await fetch(`${API_BASE_URL}/note/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        });

        if (!response.ok) {
            throw new Error('Failed to save the note');
        }

        return await response.json();
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};

export const getNotes = async (archived, tag) => {
    try {
        const url = new URL(`${API_BASE_URL}/note/list`);
        
        if (archived !== undefined) {
            url.searchParams.append('archived', archived);
        }
        
        if (tag) {
            url.searchParams.append('tag', tag);
        }

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to get notes: ${errorData.message || response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Request error:', error);
        throw new Error(`An error occurred while fetching notes: ${error.message}`);
    }
};

export const deleteNoteAPI = async (noteId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/note/delete/${noteId}`, { 
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete note');
        }
        return await response.json();


    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};

export const deleteAllNotesAPI = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/note/deleteAll`, { 
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to delete all notes');
        }
        return await response.json();


    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};

export const updateNoteAPI = async (noteId, updatedData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/note/update/${noteId}`, { 
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error('Failed to update note');
        }

        return await response.json();
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};

export const setArchiveNotesAPI = async (noteIds) => {
    try {
        const response = await fetch(`${API_BASE_URL}/note/archive`, { // Replace with your endpoint URL
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noteIds),
        });

        if (!response.ok) {
            throw new Error('Failed to set archives notes');
        }
        // Verifica si hay contenido antes de intentar analizarlo
        return await response.json();


    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};

export const getTags = async () => {
    try {
        
        const url = `${API_BASE_URL}/tag/list`;

        const response = await fetch(url, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get tags');
        }

        return await response.json();
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};

export const addTagNote = async (addTagIds) => {
    console.log(addTagIds);
    try {
        const response = await fetch(`${API_BASE_URL}/tag/addToNote`, { // Reemplaza con tu URL de endpoint
            method: 'PUT', // Usa PUT o PATCH dependiendo de tu API
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addTagIds),
        });

        if (!response.ok) {
            throw new Error('Failed to add tag');
        }

        return await response.json();
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};

export const deleteTagNote = async (noteId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tag/deleteFromNote/${noteId}`, { // Reemplaza con tu URL de endpoint
            method: 'PUT', // Usa PUT o PATCH dependiendo de tu API
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete tag');
        }

        return await response.json();
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};
