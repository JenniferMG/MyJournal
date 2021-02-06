import React from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

    const { date } = useSelector(state => state.notes)

    const noteDate = moment( date );

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes)

    const handleSaveNote = () => {
        dispatch( startSaveNote( active ) );
    }

    const handlePictureUpload = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
 
        const file = e.target.files[0];

        if( file ) {
            dispatch( startUploading(file) );
        }
    }

    return (
        <div className="notes__appbar">
            <span>
                { 
                    noteDate.format('MMMM') +
                    ' ' + 
                    noteDate.format('Do') +
                    ' ' +
                    noteDate.format('YYYY')
                }
            </span>

            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{ display: 'none' }}
                onChange={ handleFileChange }
            />

            <div>
                <button 
                    onClick={ handlePictureUpload }
                    className="btn btn-entry"
                >
                    <i className="far fa-image"></i> Picture
                </button>

                <button 
                    onClick={ handleSaveNote }
                    className="btn btn-entry"
                >
                    <i className="far fa-save"></i> Save
                </button>
            </div>
        </div>
    );
}
