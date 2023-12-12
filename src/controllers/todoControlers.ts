import { RequestHandler } from "express";
import TodoModel from "../models/todolist";
import mongoose from "mongoose";
import TaskModel from "../models/task";
import createHttpError from "http-errors";
import { assertIsDefined } from "../util/assertIsDefined";

export const getTodos: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);
    const textCon = await TodoModel.find({ userId: authenticatedUserId })
      .sort({ updatedAt: -1 })
      .exec();
    const todos = await TaskModel.populate(textCon, {
      path: "text",
      options: { sort: { updatedAt: -1 } },
    });
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

export const getTodo: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    const todo_id = new mongoose.Types.ObjectId(req.params.todoId);
    const textCon = await TodoModel.findById(todo_id).exec();
    const todos = await TaskModel.populate(textCon, {
      path: "text",
      options: { sort: { updatedAt: -1 } },
    });

    // if (!todos.userId.equals(authenticatedUserId)) {
    //   throw createHttpError(401, "You cannot access this todo!");
    // }
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

interface CreateTodoBody {
  title?: string;
  text?: [mongoose.Types.ObjectId];
}

export const createTodo: RequestHandler<
  unknown,
  unknown,
  CreateTodoBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!title) {
      throw createHttpError(400, "Todo must have a title");
    }

    const data = {
      userId: authenticatedUserId,
      title: title,
      // text: [],
      // finishedTask: []
    };
    const createTodo = await TodoModel.create(data);
    res.status(201).json(createTodo); // 201 new resource create
  } catch (error) {
    next(error);
  }
};

interface UpdateTodoParams {
  todoId: string;
}

interface updateTodoBody {
  title?: string;
}

export const updateTodo: RequestHandler<
  UpdateTodoParams,
  unknown,
  updateTodoBody,
  unknown
> = async (req, res, next) => {
  const id = req.params.todoId;
  const title = req.body.title;
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Invalid todo ID");
    }
    if (!title) {
      throw createHttpError(400, "Todo must have a title");
    }

    const updateTodo = await TodoModel.findByIdAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { title: title },
      { new: true }
    );
    if (!updateTodo) {
      throw createHttpError(404, "Can't update the title");
    }

    if (!updateTodo.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, "You cannot access this todo!");
    }

    res.status(201).json(updateTodo); // 201 new resource create
  } catch (error) {
    next(error);
  }
};

export const deleteTodo: RequestHandler = async (req, res, next) => {
  const id = req.params.todoId;
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Invalid todo ID");
    }
    const deleteTodo = await TodoModel.findByIdAndDelete({
      _id: new mongoose.Types.ObjectId(id),
    });
    if (!deleteTodo) {
      throw createHttpError(404, "Todo not found, can't delete the todo :(");
    }
    
    // if (!deleteTodo.userId.equals(authenticatedUserId)) {
    //   throw createHttpError(401, "You cannot access this todo!");
    // }

    res.sendStatus(204); // 204 for delete
  } catch (error) {
    next(error);
  }
};
