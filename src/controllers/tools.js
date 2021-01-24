/* eslint-disable no-return-assign */

const response = require("../utils/response");
const ToolsDB = require("../repositories/tools");

const createTool = async (ctx) => {
  const {
    title = null,
    link = null,
    description = null,
    tags = null,
  } = ctx.request.body;

  const { userId } = ctx.state;

  if (!title || !link || !description || !tags) {
    return response(ctx, 400, { message: "BAD REQUEST." });
  }

  const tool = await ToolsDB.createTool(userId, title, link, description, tags);

  if (tool) {
    return response(ctx, 201, { tool });
  }
  return response(ctx, 400, { message: "Something went wrong." });
};

const findTools = async (ctx) => {
  const {
    tag = "",
    skip = 0,
    limit = 500,
  } = ctx.request.query;

  const { userId } = ctx.state;

  const tools = await ToolsDB.getTools(userId, tag, skip, limit);
  return response(ctx, 200, tools);
};

const editTool = async (ctx) => {
  const {
    title = "",
    description = "",
    link = "",
    tags = null,
  } = ctx.request.body;

  const { userId } = ctx.state;
  const { id } = ctx.request.params;

  if (!id || (!title && !link && !description && !tags)) {
    return response(ctx, 400, "BAD REQUEST!");
  }

  const tool = await ToolsDB.editTool(userId, id, title, description, link, tags);
  if (tool.updated) {
    return response(ctx, 200, tool.data);
  } if (!tool.updated) {
    return ctx.response.status = 204;
  }
  return response(ctx, 500, "SOMETHING WENT WRONG!");
};

const deleteTool = async (ctx) => {
  const { userId } = ctx.state;
  const { id } = ctx.request.params;

  await ToolsDB.deleteTool(userId, id);
  return ctx.response.status = 204;
};

module.exports = {
  createTool, deleteTool, editTool, findTools,
};
