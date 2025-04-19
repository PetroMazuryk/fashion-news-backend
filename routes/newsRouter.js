import express from "express";

import ctrl from "../controllers/newsControllers.js";
import validateBody from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import {
  createNewsSchema,
  updateNewsSchema,
  uptadeFavoriteSchema,
} from "../schemas/newsSchemas.js";

import { authenticate } from "../middlewares/authenticate.js";

const newsRouter = express.Router();

newsRouter.get("/", authenticate, ctrl.getAllNews);

newsRouter.get("/:id", authenticate, isValidId, ctrl.getOneNews);

newsRouter.delete("/:id", authenticate, isValidId, ctrl.deleteNews);

newsRouter.post(
  "/",
  authenticate,
  validateBody(createNewsSchema),
  ctrl.createNews
);

newsRouter.patch(
  "/:id",
  authenticate,
  isValidId,
  validateBody(updateNewsSchema),
  ctrl.updateNews
);

newsRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(uptadeFavoriteSchema),
  ctrl.updateStatusNews
);

export default newsRouter;
