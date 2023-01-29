import { Router } from "express";
import { canceling, issuing } from "../controllers/members.js";

const router = new Router();

router.post('/issuing/:id', issuing);

router.post('/canceling/:id', canceling)



export default router;