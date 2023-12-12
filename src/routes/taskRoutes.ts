import express from "express";
import * as TaskController from "../controllers/taskControllers";


const router = express.Router();

router.get("/", TaskController.getTasks); // server end point

router.get("/:taskId", TaskController.getTask); // server end point

router.post("/", TaskController.createTask); // server end point

router.put("/", TaskController.updateTask); // server end point

router.delete("/", TaskController.deleteTask); // server end point
// router.put("/", TaskController.updateTask);
export default router;
