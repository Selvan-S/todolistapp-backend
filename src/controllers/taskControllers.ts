import { RequestHandler } from "express";
import TaskModel from "../models/task";
import TodoModel from "../models/todolist";
import mongoose from "mongoose";

export const getTasks: RequestHandler = async (req, res, next) => {
  try {
    const todos = await TaskModel.find().exec();
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

export const getTask: RequestHandler = async (req, res, next) => {
  const _id = new mongoose.Types.ObjectId(req.params.id);
  try {
    const todos = await TaskModel.findById({ _id }).exec();
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

export const createTask: RequestHandler = async (req, res, next) => {
  const id = new mongoose.Types.ObjectId(req.body.todo_id);
  const task = req.body.task;
  try {
    const createTasks = await TaskModel.create({
      todo_id: id,
      task: task,
    });
    // console.log(createTasks._id);
    // console.log(
    //   await TodoModel.findById(id).populate("text").sort({ updatedAt: 1 })
    // );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await TodoModel.findByIdAndUpdate(id, {
      $addToSet: { text: createTasks._id },
    });

    res.status(200).json(createTasks);
  } catch (error) {
    next(error);
  }
};

export const updateTask: RequestHandler = async (req, res, next) => {
  const id = new mongoose.Types.ObjectId(req.body.task_id);
  const task = req.body.task;
  try {
    const updateTask = await TaskModel.findByIdAndUpdate(
      {
        _id: id,
      },
      { task: task },
      { new: true }
    );
    res.status(200).json(updateTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTask: RequestHandler = async (req, res, next) => {
  const id = new mongoose.Types.ObjectId(req.body.task_id);
  const _id = new mongoose.Types.ObjectId(req.body.todo_id);
  try {
    const getTask = await TaskModel.findById({
      _id: id,
    }).exec();

    await TodoModel.findByIdAndUpdate(
      _id,
      {
        $push: {
          finishedTask: { $each: [getTask?.task], $position: 0 },
        },
        $pull: { text: id },
      },
      { new: true }
    );

    const deleteTask = await TaskModel.findByIdAndDelete({
      _id: id,
    });
    res.status(200).json(deleteTask);
  } catch (error) {
    next(error);
  }
};
