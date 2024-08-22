// src/App.js
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import './Menu.css';

const Menu = () => {
  return (
    <div className="app">
      <h1 className='title'>NOTES CHALLENGE</h1>
      <div className='first-options'>
        <Link to="/new">
          <Button className='option' text="NEW" />
        </Link>
        <Link to="/edit">
          <Button className='option' text="EDIT" />
        </Link>
        <Link to="/delete">
          <Button className='option' text="DELETE" />
        </Link>
        <Link to="/archive">
          <Button className='option' text="ARCHIVE" />
        </Link>
        <Link to="/notes">
          <Button className='option' text="NOTES" />
        </Link>
        <Link to="/tags">
          <Button className='option' text="TAGS" />
        </Link>
      </div>
    </div>
  );
};

export default Menu;
