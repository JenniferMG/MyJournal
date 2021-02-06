import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries';

export const SideBar = () => {

    const dispatch = useDispatch();
    const { name } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch( startLogout() );
    }

    const handleAddNew = () => {
        dispatch( startNewNote() );
    }

    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar mt-5">
                <h3 className="mt-1">
                    <i className="far fa-newspaper"></i>
                    <span> { name } </span>
                </h3>

                <button 
                    onClick={ handleLogout }
                    className="btn btn-entry"
                >
                    Logout
                </button>
            </div>

            <div 
                onClick={ handleAddNew }
                className="journal__new-entry"
            >
                <i className="fas fa-plus fa-4x"></i>
                <p className="mt-1">New entry</p>
            </div>

            <JournalEntries />
        </aside>
    )
}
