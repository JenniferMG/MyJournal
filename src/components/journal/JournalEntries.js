import React from 'react'
import { useSelector } from 'react-redux';
import { JounarlEntry } from './JounarlEntry';

export const JournalEntries = () => {

    const { notes } = useSelector(state => state.notes);

    return (
        <div className="journal__entries">
            {
                notes.map( note => (
                    <JounarlEntry 
                        key={ note.id } 
                        { ...note }
                    />
                ))
            }
        </div>
    );
}
