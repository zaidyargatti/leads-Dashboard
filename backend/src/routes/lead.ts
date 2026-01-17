import { Router } from "express";
import {
  getLeads,
  getLeadById,
  getLeadAnalytics,
} from "../controller/lead";
import protect from "../middleware/auth";

const router = Router();

router.get("/all",protect, getLeads);
router.get("/analytics",protect, getLeadAnalytics);
router.get("/:id",protect, getLeadById);

export default router;
