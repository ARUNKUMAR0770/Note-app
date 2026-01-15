import express from "express";
import { createNote, getNote, deleteNote, updateNote } from "../controller/noteController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createNote);
router.get("/", authMiddleware, getNote);
router.delete("/:id", authMiddleware, deleteNote);
router.put("/:id", authMiddleware,updateNote);


export default router;
