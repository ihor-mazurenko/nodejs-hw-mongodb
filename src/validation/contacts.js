import Joi from "joi";
import { isValidObjectId } from "mongoose";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phoneNumber: Joi.string().min(10).max(15).required(),
    contactType: Joi.string().valid('personal', 'home', 'work').required(),
    email: Joi.string().email().optional(),
    isFavourite: Joi.boolean().optional(),
    userId: Joi.string().custom((value, helper) => {
        if (value && !isValidObjectId(value)) {
            return helper.message('UserId should be a valid mongo id');
        }
        return true;
    }),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    phoneNumber: Joi.string().min(10).max(15),
    contactType: Joi.string().valid('personal', 'home', 'work'),
    email: Joi.string().email(),
    isFavourite: Joi.boolean(),
});