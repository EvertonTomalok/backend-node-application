/* eslint-disable no-return-assign */

const response = require("../utils/response");
const ToolsDB = require("../repositories/tools");

async function createTool(ctx) {
  const {
    title = null,
    link = null,
    description = null,
    tags = null,
  } = ctx.request.body;

  const userId = ctx.state.userId;

  if (!title || !link || !description || !tags) {
    return response(ctx, 400, { message: "BAD REQUEST." });
  }

  const tool = await ToolsDB.createTool(userId, title, link, description, tags);

  if (tool) {
    return response(ctx, 201, { tool });
  }
  return response(ctx, 400, { message: "Something went wrong." });
}

async function findTools(ctx) {
  const {
    tag = "",
    skip = 0,
    limit = 0,
  } = ctx.request.query;

  const tools = await ToolsDB.getTools(tag, skip, limit);
  return response(ctx, 200, tools);
}

async function editTool(ctx) {
  const {
    title = "",
    description = "",
    link = "",
    tags = null,
  } = ctx.request.body;

  const { id } = ctx.request.params;

  if (!id || (!title && !link && !description && !tags)) {
    return response(ctx, 400, "BAD REQUEST!");
  }

  const tool = await ToolsDB.editTool(id, title, description, link, tags);
  if (tool) {
    return response(ctx, 200, tool);
  }
  return ctx.response.status = 204;
}

async function deleteTool(ctx) {
  const { id } = ctx.request.params;
  if (!id) {
    return response(ctx, 400, "BAD REQUEST!");
  }

  await ToolsDB.deleteTool(id);
  return ctx.response.status = 204;
}

module.exports = {
  createTool, deleteTool, editTool, findTools,
};
