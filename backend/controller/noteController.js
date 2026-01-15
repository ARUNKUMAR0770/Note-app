import Note from "../models/note.js";

export const createNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const note = await Note.create({
      title,
      content,
      userId: req.user,
    });

    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Note not saved" });
  }
};

export const getNote = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user }).sort({
      createdAt: -1,
    });

    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: "failed to fetch Notes" });
  }
};
export const deleteNote = async (req, res) => {
  try{
    const note = await Note.findOneAndDelete(
      {_id : req.params.id,
        userId: req.user,
      }
    )
    if(!note){
      return res.status(404).json({message: "Note not found"});
    }
    res.status(200).json({message: "Note deleted successfully"});
  }catch(err){
    console.log(err);
  }
}
export const updateNote = async (req, res) =>{
  try {
    const {title, content} = req.body;
    const {id} = req.params;

    const updatedNote = await Note.findOneAndUpdate(
      {_id:id, userId: req.user},
      { title, content },
      { new: true }
    )
    if(!updatedNote){
      return res.status(404).json({message: "Note not found"})
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({message: "Failed to update note"});
  }
}