import express from "express";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /api.
const router = express.Router();

import { getMyItems, addNewItem, editItem, deleteItem, getAllItems } from '../controllers/controller.js';

router
.get("/all", getAllItems)
.post("/new",addNewItem)
.put("/edit/:itemId", editItem)
.delete("/delete/:itemId", deleteItem)
.get("/get/:userId", getMyItems)

export default router;