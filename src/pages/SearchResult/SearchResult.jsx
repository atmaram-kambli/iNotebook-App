import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SearchResult.css';
import NoteHeader from '../../components/NoteHeader/NoteHeader';
import noteContext from '../../context/notes/NoteContex';
import NotesList from '../../components/NotesList/NotesList';
import ContentWrapper from '../../components/ContentWrapper/ContentWrapper';

const SearchResult = (props) => {
    const { query } = useParams();
    const context = useContext(noteContext);
    const { notes, getNotes, editNote, deleteNote } = context;
    const navigate = useNavigate();

    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            navigate("/login");
        };
    }, [])

    useEffect(() => {
        const filterNotesFunc = () => {
            const filteredNotes = notes.filter(
                noteItem => {
                    return (
                        noteItem.title.toLowerCase().includes(query.toLowerCase()) ||
                        noteItem.description.toLowerCase().includes(query.toLowerCase())
                    );
                }
            );
            setFilteredData(filteredNotes);
        };
        console.log(filteredData)
        filterNotesFunc();
        // console.log(query)
    }, [notes, query])

    const [grid, setGrid] = useState("list")
    const handleGrid = () => {
        if (grid === 'list') setGrid('items');
        else setGrid('list')
    }
    return (

        <div className='searchResultsPage'>
            <NoteHeader grid={grid} handleGrid={handleGrid} />
            {filteredData.length > 0 ? (
                <>
                    <div className="pageTitle">
                    <ContentWrapper>
                        {`Search ${filteredData.length > 1 ? "results" : "result"} for '${query}'`}
                    </ContentWrapper>
                    </div>
                    <NotesList showAlert={props.showAlert} notesTitle={""} notes={filteredData} getNotes={getNotes} deleteNote={deleteNote} editNote={editNote} grid={grid} />

                </>
            ) : (
                <div className="resultNotFound">
                    <ContentWrapper>
                        <span>No matching result for '{query}'</span>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default SearchResult;
