import express from "express";
import {
  createContact,
  deleteContact,
  getContact,
  getContacts,
  updateContact,
} from "../controllers/contactController";
import { validateToken } from "../middleware/verifyTokenHandler";
const router = express.Router();

// router.use(validateToken);
router
  .route("/")
  .get(getContacts)
  .post(createContact)
  .delete(deleteContact)
  .put(updateContact);

router.route("/:id").get(getContact);

module.exports = router;
