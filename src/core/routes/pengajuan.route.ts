import { Router } from "express";
import { authenticate, authorize } from "@/middlewares/auth.middleware.js";
import { createPengajuanController } from "../controllers/pengajuan.controller.js";
import { uploadBerkasPendukung } from "../../middlewares/upload.middleware.js";

const pengajuanRoute = Router();

// public api
pengajuanRoute.post("/createPengajuan", uploadBerkasPendukung, createPengajuanController);



export default pengajuanRoute;
