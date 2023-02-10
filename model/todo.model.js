/**
 * name,createdBy:userId,createdDate:new Date(),status-notyet started,started, review, completed
 * updatedBy,updatedDate
 *
 * create,update, getAll, getSingle, delete
 */

const mongoose = require("mongoose");
const { STATICDATA } = require("../util/static.util");

const todoSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        createdBy: {
            type: String,
            trim: true,
            required: true,
        },
        createdDate: {
            type: Date,
        },
        updatedBy: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: STATICDATA.status,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("todoModel", todoSchema);
