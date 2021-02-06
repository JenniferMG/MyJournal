import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {

    const dispatch = useDispatch();
    const { active: note } = useSelector(state => state.notes)
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { body, title } = formValues;

    const activeId = useRef( note.id );

    const handleDelete = () => {
        dispatch( startDeleting( activeId.current ) );
    }

    useEffect(() => {
        if( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id;
        }
    }, [ note, reset ]);

    useEffect(() => {
        dispatch( activeNote( formValues.id, { ...formValues } ));
    }, [formValues, dispatch]);

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input 
                    type="text"
                    placeholder="Title"
                    name="title"
                    autoComplete="off"
                    className="notes__title-input"
                    value={ title }
                    onChange={ handleInputChange }
                />

                <textarea
                    placeholder="What happend today"
                    name="body"
                    className="notes__textarea"
                    value={ body }
                    onChange={ handleInputChange }
                ></textarea>

            </div>

            {
                note.url &&
                    ( <div className="notes__image animate__animated animate__slideInUp">
                        <img 
                            src={ note.url }
                            alt="bts"
                        />
                    </div>)
            }

            <div className="notes__button-delete">
                <button 
                    onClick={ handleDelete }
                    className="btn btn-outline-danger"
                >
                    <i className="fas fa-trash"></i> Delete
                </button>
            </div>

        
        </div>
    );
}
