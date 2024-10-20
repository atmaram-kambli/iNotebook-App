const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Note');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Route 1: Fetch all notes of particular user. Login required
router.get('/getallnotes', fetchuser, async(req, res) => {
    try {
        const allNotes = await Notes.find({ user: req.user.id }).sort('date')
        
        res.json(allNotes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error!");
    }
});

// Route 1.1: Fetch notes by tags
router.get('/notes', fetchuser, async(req, res) => {
    try {
        const {tag} = req.query;
        const notes = await Notes.find({user: req.user.id, tag:tag}).sort('date');
        res.status(200).json(notes)
        // console.log(notes)
    } catch(error){
        console.log(error.message);
        res.status(500).send("Internal server error!");
    }
})

// Route 2: Add new Note for User, login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').notEmpty(),
    body('description', 'Enter a valid description').notEmpty()
], async(req, res) => {
    try {
        const {title, description, tag} = req.body;
        // check for errors, return bad request and error msg if any
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // create new note for given data from user
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        // saved note on database
        const saveNote = await note.save();
        res.json(saveNote);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error!");
    }
})



// Route 3: Update exi Note for User, login required
router.put('/updatenote/:id', fetchuser , async (req, res) => {
    try {
        // take the updated value from req body using destructuring
        const {title, description, tag} = req.body;
        // create new note object
        const newNote = {};
        if(title) {newNote.title = title
            newNote.edited = true;
            newNote.date = Date.now();
            
        };
        if(description) {newNote.description = description
            newNote.edited = true;
            newNote.date = Date.now();

        };
        if(tag) {newNote.tag = tag;}
        
        // check wheter only user with user id can delete the note
        // get the note to be changed
        let note = await Notes.findById(req.params.id);
        // if note with this id does not exist
        if(!note) {return res.status(404).send("Not Found!")}
        // if user aims to update note of some other user, denied the access
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!");
        }
        // update the note
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json({note});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error!");
    }
})

// 3.1: update/change the note to achive or vice versa
router.put('/update/:id/archive', fetchuser, async(req, res) => {
    try {        
        let note = await Notes.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });

        note.isArchived = !note.isArchived;
        await note.save();
        
        res.status(200).json({ message: 'Note updated', note });
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error!");
    }
})

// 3.2: update/change the note to trash or vice versa
router.put('/update/:id/trash', fetchuser, async(req, res) => {
    try {        
        let note = await Notes.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });

        note.isTrash = !note.isTrash;
        if(note.isTrash) {
            note.isArchived = false;
            note.isFavourite = false;
        }
        await note.save();

        res.status(200).json({ message: 'Note updated', note });
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error!");
    }
})

// 3.3: update/change the note to favourite or vice versa
router.put('/update/:id/fav', fetchuser, async(req, res) => {
    try {        
        let note = await Notes.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });

        note.isFavourite = !note.isFavourite;
        await note.save();

        res.status(200).json({ message: 'Note updated', note });
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error!");
    }
})

// Route 4: Delete the note using DELETE '/api/notes/deletenote'. Login required.
router.delete('/deletenote/:id', fetchuser, async(req, res) => {
    try {

    // Get the note to be deleted
    let note = await Notes.findById(req.params.id);
    // check whether not with this id exists or not
    if(!note || !note.isTrash) return res.status(404).send("Not Found!");
    // check that user is deleting note of its own only, otherwise denied the access
    if(note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed!");
    }
    // delete the note
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ "success": "Note has been deleted!", note: note });
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error!");
}
})

module.exports = router;