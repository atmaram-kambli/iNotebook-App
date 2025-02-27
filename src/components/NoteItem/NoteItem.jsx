import React, {useState, useEffect, useContext } from 'react';
import noteContext from '../../context/notes/NoteContex';
import './style.css'

function NoteItem(props) {
    const { note, updateNote, deleteNoteBTN } = props;

    const context = useContext(noteContext);
    const {toggleTags} = context;
    const [width, setWidth] = useState("auto")
    useEffect(() => {
      if(props.grid == 'list') {
        //   setHeight("100%")
          setWidth("700px")
      }
      else {
        setWidth('300px')
      }
    
    }, [props.grid])
    
    function convertTimestampToDateTime(timestamp) {
      const date = new Date(parseInt(timestamp));
      const hours = ('0' + date.getHours()).slice(-2);
      const minutes = ('0' + date.getMinutes()).slice(-2);
      return [
          ('0' + date.getDate()).slice(-2),
          ('0' + (date.getMonth() + 1)).slice(-2),
          date.getFullYear()
      ].join('/') + `, ${hours}:${minutes}`;
  }
    

    return (
        <>
        <div className='noteitem col-md-3 my-2' style={{width, maxWidth:"100%", margin:`0 ${props.grid === 'list'?"auto":""}`}}>
            <div className="card shadow row m-1">
                    <div className="card-body" style={{minHeight:"120px"}}>
                    {!note.isTrash && <div className="favourite-symbol" onClick={()=>toggleTags(note._id, 'fav')}>
                    {
                      !note.isFavourite? <i className="fa-regular fa-heart"></i> : <i className="fa-solid fa-heart"></i> }

                    </div>
                    }
                        <div className="d-flex align-items-center">
                            <h5 className="card-title">{note.title}</h5>
                        </div>
                        <div className='d-flex flex-rowreverse'>
                          <small className='small-date-text fw-light lh-sm'>
                            {note.edited === true?"last updated: ":"created: "}{convertTimestampToDateTime    (note.date)}
                          </small>
                        </div>
                        <p className="card-text">{note.description}</p>
                        <div className='d-flex gap-2 justify-content-center align-items-center'>
                        
                          {!note.isTrash?
                            <button className='btn border border-info flex-grow-1' onClick={() => {updateNote(note)}}><i className="fa-solid fa-pen-to-square m-1" ></i>Update</button>:
                            <button className='btn border border-info flex-grow-1' onClick={() => {deleteNoteBTN(note)}}><i className="fa-solid fa-trash-can m-1" ></i>Delete Forever</button>
                          }
                          <button className='btn border border-danger flex-grow-1'  onClick={() => {toggleTags(note._id, "trash")}}><i className={`fa-solid fa-${note.isTrash?"pen-to-square":"trash-can"} m-1`}></i>{note.isTrash?"Restore":"Delete"}</button>
                          
                          {!note.isTrash && <div  className="tag-symbol" onClick={()=>toggleTags(note._id, 'archive')}>
                          {!note.isArchived? <i className="fa-solid fa-outdent fa-flip-horizontal" title='Archive'></i> : <i className="fa-solid fa-outdent fa-flip-vertical" title='Unarchive'></i> }

                          </div>}
                        </div>
                    </div>
            </div>
        </div>
        </>
    )
}

export default NoteItem