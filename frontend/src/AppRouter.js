
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewNote from './components/Note/NewNote/NewNote';
import DeleteNote from './components/Note/DeleteNote/DeleteNote';
import EditNote from './components/Note/EditNote/EditNote';
import ArchiveNote from './components/Note/ArchiveNote/ArchiveNote';
import ListNote from './components/Note/ListNote/ListNote';
import TagNote from './components/Note/TagNote/TagNote';
import Menu from './components/Menu/Menu';


const AppRouter = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/new" element={<NewNote />} />
          <Route path="/edit" element={<EditNote/>} />
          <Route path="/delete" element={<DeleteNote/>} />
          <Route path="/archive" element={<ArchiveNote/>} />
          <Route path="/notes" element={<ListNote/>} />
          <Route path="/tags" element={<TagNote/>} />
        </Routes>
    </Router>
  );
};

export default AppRouter;
