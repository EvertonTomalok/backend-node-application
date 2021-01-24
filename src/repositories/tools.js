const Tools = require('../models/tools')

async function createTool(userId, title, link, description, tags = []) {

  const tool = await Tools.create({
    title,
    userId,
    link,
    description,
    tags
  });

  return tool;
}

async function getTools(tag = "", offset = 0, limit = 0) {
  const WHERE = tag ? `WHERE '${tag}' = ANY (tags)` : "";
  const LIMIT = limit > 0 ? `LIMIT ${limit}` : "";
  const OFFSET = offset > 0 ? `OFFSET ${offset}` : "";

  const query = `
        SELECT * FROM tools
        ${WHERE}
        ${OFFSET}
        ${LIMIT}
        `;

  const result = await db.query({
    text: query,
  });

  return result.rows;
}

async function editTool(id, title = null, link = null, description = null, tags = null) {
  const TITLE = title ? `title='${title}'` : "";
  const LINK = link ? `link='${link}'` : "";
  const DESCRIPTION = description ? `description='${description}'` : "";
  const TAGS = tags ? `tags='${buildArrayInserter(tags)}'` : "";

  const SETTER = createSetter(TITLE, LINK, DESCRIPTION, TAGS);

  const query = `
        UPDATE tools
        SET ${SETTER} 
        WHERE id=${id}
        RETURNING *;
    `;
  const result = await db.query({
    text: query,
  });
  return result.rows.shift();
}

async function deleteTool(id) {
  const query = `
        DELETE FROM tools
        WHERE id=${id};
    `;
  await db.query({
    text: query,
  });
}

module.exports = {
  createTool, deleteTool, editTool, getTools,
};
