import { Router } from "express";
import {
    createContactController,
    deleteContactController,
    getAllContactsController,
    getContactByIdController,
    patchContactController
} from "../controllers/contacts.js";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../utils/multer.js";

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

contactsRouter.post('/', upload.single('photo'), validateBody(createContactSchema), ctrlWrapper(createContactController));

contactsRouter.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

contactsRouter.patch('/:contactId', isValidId, upload.single('photo'), validateBody(updateContactSchema), ctrlWrapper(patchContactController));

export default contactsRouter;