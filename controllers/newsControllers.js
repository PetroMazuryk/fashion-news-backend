import HttpError from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { News } from "../models/news.js";

const getAllNews = async (req, res) => {
  // const { _id: owner } = req.user;
  // const { page = 1, limit = 5, favorite = false } = req.query;
  const {
    user: { _id: owner },
    query: { page = 1, limit = 5, favorite = false },
  } = req;
  const skip = (page - 1) * limit;

  let news;
  if (favorite) {
    news = await News.find(
      { owner, favorite: true },
      "-createdAt -updatedAt",
      {
        skip,
        limit: Number(limit),
      }
    ).populate("owner", " email subscription");
  } else {
    news = await News.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit: Number(limit),
    }).populate("owner", "email subscription");
  }

  res.json(news);
};

const getOneNews = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await News.findOne({ _id: id, owner });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteNews = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await News.findOneAndDelete({ _id: id, owner });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const createNews = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await News.create({ ...req.body, owner });

  if (!result) {
    throw HttpError(201, "Not found");
  }
  res.status(201).json(result);
};

const updateNews = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await News.findOneAndUpdate({ _id: id, owner }, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const updateStatusNews = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await News.findOneAndUpdate({ _id: id, owner }, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

export default {
  getAllNews: ctrlWrapper(getAllNews),
  getOneNews: ctrlWrapper(getOneNews),
  deleteNews: ctrlWrapper(deleteNews),
  createNews: ctrlWrapper(createNews),
  updateNews: ctrlWrapper(updateNews),
  updateStatusNews: ctrlWrapper(updateStatusNews),
};
