import express from "express";
import * as TodoController from "../controllers/todoControlers";

const router = express.Router();

router.get("/", TodoController.getTodos); // server end point

router.get("/:todoId", TodoController.getTodo); // server end point

router.post("/", TodoController.createTodo);

router.put("/:todoId", TodoController.updateTodo);

router.delete("/:todoId", TodoController.deleteTodo);
export default router;