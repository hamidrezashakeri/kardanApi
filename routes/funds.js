import { Router } from "express";
import { addFund, getFunds } from "../controllers/funds.js";

const router = new Router();

router.post('/add-fund', addFund);

router.get('/', getFunds)


export default router;