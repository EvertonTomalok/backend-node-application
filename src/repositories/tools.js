/* eslint-disable no-unused-vars */

const db = require("../helpers/database");
const { off } = require("../helpers/database");

const createSetter = (title, link, description, tags) => {
  const setters = [];

  [title, link, description, tags].forEach((item) => {
    if (item !== "") {
      setters.push(item);
    }
  });

  return setters.join(", ");
};

const envolveItem = (item) => `"${item}"`;

const buildArrayInserter = (items) => {
  const elements = items.map(envolveItem);
  return `{${elements.join(", ")}}`;
};

async function createTool(title, link, description, tags) {
  const query = `
    INSERT INTO tools (
        title,
        link,
        description,
        tags
    ) VALUES ($1, $2, $3, $4) RETURNING *;
    `;

  const preparedTags = buildArrayInserter(tags);

  const result = await db.query({
    text: query,
    values: [title, link, description, preparedTags],
  });

  return result.rows[0];
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
