import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/handleMongooseError.js";

const newsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Set title for news'],
      minlength: 2,
      maxlength: 100,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    content: {
      type: String,
      // required: [true, 'Set content for news'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

newsSchema.post("save", handleMongooseError);

export const News = model("news", newsSchema);
