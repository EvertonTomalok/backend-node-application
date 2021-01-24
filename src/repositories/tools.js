/* eslint-disable no-restricted-syntax */

const { Op } = require("sequelize");
const Tools = require("../models/tools");

async function createTool(userId, title, link, description, tags = []) {
  const tool = await Tools.create({
    title,
    userId,
    link,
    description,
    tags,
  });

  return tool;
}

async function getTools(userId, tag = "node", offset = 0, limit = 10) {
  const whereClause = {
    userId: {
      [Op.eq]: userId,
    },
  };

  if (tag) {
    whereClause.tags = {
      [Op.contains]: [tag],
    };
  }

  const result = Tools.findAll({
    offset,
    limit,
    where: whereClause,
  });

  return result;
}

async function editTool(userId, id, title = null, link = null, description = null, tags = null) {
  const updateValues = {
    title, link, description, tags,
  };

  // removing null update values
  Object.keys(updateValues).forEach(
    (k) => (!updateValues[k] && updateValues[k] !== undefined) && delete updateValues[k],
  );

  try {
    const tool = await Tools.update(
      updateValues,
      {
        where: { id, userId },
        returning: true,
        plain: true,
      },
    );
    return { updated: true, data: tool[1] };
  } catch (err) {
    if (err instanceof TypeError) {
      return { updated: false, data: {} };
    }
    return { generalErr: true, data: {} };
  }
}

async function deleteTool(userId, id) {
  await Tools.destroy({
    where: {
      id,
      userId,
    },
  });
}

module.exports = {
  createTool, deleteTool, editTool, getTools,
};
