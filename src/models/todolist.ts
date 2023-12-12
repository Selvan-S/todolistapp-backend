// eslint-disable-next-line @typescript-eslint/no-unused-vars
import mongoose, { InferSchemaType, Schema, model } from "mongoose";
// const mSchema = mongoose.Schema;
// import TaskModel from "./task";

const todolistSchema = new Schema(
  {
    userId: {type: Schema.Types.ObjectId, required: true},
    title: { type: String, required: true },
    text: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    finishedTask: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

type Todo = InferSchemaType<typeof todolistSchema>;

export default model<Todo>("Todo", todolistSchema);
