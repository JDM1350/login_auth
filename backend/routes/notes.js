const express = require("express");
const router = express.Router();
const Note = require("../models/Note")
const fetchuser = require("../middleware/fetchuser")


const { body, validationResult } = require("express-validator");
//Route 1 : get all the notes  get 
router.get("/fetchallnotes", fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error occur")
    }


})

//Route 2: add notes using post 
router.post("/addnote", fetchuser,
    [
        body('title', 'enter the valid title').isLength({ min: 3 }),
        body('description', 'description is must be atleast 5 lines ').isLength({ min: 5 }),
    ]
    , async (req, res) => {

        try {


            const { title, description, tag } = req.body;


            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });

            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savenote = await note.save()

            res.json(savenote)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("internal server error occur")

        }

    })

//Route 3 update an exists note using post "api/notes/addnotes"
router.put("/updatenote/:id", fetchuser,
    async (req, res) => {

        const { title, description, tag } = req.body;

        try {
            const newNote = {};
            if (title) { newNote.title = title };
            if (description) { newNote.description = description };
            if (tag) { newNote.tag = tag };
            // find the note to be updated and update it 
            let note = await Note.findById(req.params.id);
            if (!note) { res.status(404).send("not found") }

            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("not allowed");

            }
            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json({ note })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("internal server error occur")
        }


    })



//Route 4  delete an exists note using delete "api/notes/addnotes"
router.delete("/deletenote/:id", fetchuser,
    async (req, res) => {


        try {
            // find the note to be deleted and delete it 
            let note = await Note.findById(req.params.id);
            if (!note) { res.status(404).send("not found") }
            //allow deletion only if user owns this
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("not allowed");

            }
            note = await Note.findByIdAndDelete(req.params.id)
            res.json({ "succes": "note has been deleted ",note:note });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("internal server error occur")
        }

    })
module.exports = router