
import NotesList from './NotesList';

function Notes(props) {
    

    return (
        <>            
            <NotesList showAlert={props.showAlert}/>
        </>
    )
}

export default Notes