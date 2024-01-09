const httpStatus = require("http-status");
const { Response } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Creates a new Response from user submission.
 * @param {Object} data - The data for the new Response.
 * @returns {Promise<Response>}
 */
const createResponse = async (data) => {
    let response = await Response.create({ ...data });
    return response;
};

/**
 * Retrieves a Response by its ID.
 * @param {String} id - The ID of the Response to retrieve.
 * @returns {Promise<Response>}
 */
const getResponseById = async (id) => {
    let response = await Response.findById(id);
    return response;
};

/**
 * Updates an existing Response.
 * @param {String} id - The ID of the Response to update.
 * @param {Object} data - The new data for the Response.
 * @returns {Promise<Response>}
 */
const updateResponse = async (id, data) => {
    let response = await Response.findByIdAndUpdate(id, { ...data }, { new: true });
    return response;
};

/**
 * Deletes a Response by its ID.
 * @param {String} id - The ID of the Response to delete.
 * @returns {Promise<Response>}
 */
const deleteResponse = async (id) => {
    let response = await Response.findByIdAndDelete(id);
    return response;
};

/**
 * Retrieves all Responses.
 * @returns {Promise<Array<Response>>}
 */
const getAllResponses = async () => {
    let responses = await Response.find({});
    return responses;
};

module.exports = {
    createResponse,
    getResponseById,
    updateResponse,
    deleteResponse,
    getAllResponses
};