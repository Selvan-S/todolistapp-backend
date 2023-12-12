// eslint-disable-next-line @typescript-eslint/no-unused-vars
import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    todo_id: { type: mongoose.Types.ObjectId },
    task: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

type Task = InferSchemaType<typeof taskSchema>;

export default model<Task>("Task", taskSchema);
