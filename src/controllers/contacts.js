import createHttpError from "http-errors";
import {
    createContact,
    deleteContact,
    getAllContacts,
    getContactById,
    updateContact
} from "../services/contacts.js";
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilteredParams } from '../utils/parseFilterParams.js';

export const getAllContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);

    const { sortOrder, sortBy } = parseSortParams(req.query);

    const filter = parseFilteredParams(req.query);

    const contacts = await getAllContacts({
        page,
        perPage,
        sortOrder,
        sortBy,
        filter,
    });

    res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
    });
};

export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }
    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}`,
        data: contact,
    });
};

export const createContactController = async (req, res, next) => {
    const contact = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data: contact,
    });
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;

    const contact = await deleteContact(contactId);

    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }
    res.status(204).send();
};

export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

    if (!result) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }
    res.json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: result.contact,
    });
};