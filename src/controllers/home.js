const hello = async (ctx) => {
  ctx.response.body = "Bossa Box Backend NodeJS...";
};

const health = async (ctx) => {
  ctx.response.body = "ok";
};

module.exports = { health, hello };
