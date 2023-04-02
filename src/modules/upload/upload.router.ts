import { Router } from "express";
import { uploadController } from "./upload.controller";

const fileUpload = require("express-fileupload");

export const uploadRouter = Router();

uploadRouter.post("/", fileUpload(), uploadController);