const express = require("express");
const db = require("../db");
const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  let query = 'SELECT * FROM "Products"';

  const params = [];
  for (queryParam in req.query) {
    params.push(req.query[queryParam]);
    if (params.length === 1)
      query += `WHERE ${queryParam} = $${params.length} `;
    else query += ` AND ${queryParam} = $${params.length} `;
  }

  const response = await db.query(query, params);
  res.send(response.rows);
});

productsRouter.get("/:_id", async (req, res) => {
  const response = await db.query(
    'SELECT name, description, image_url, price, category, _id FROM "Products" WHERE _ID = $1',
    [req.params._id]
  );
  if (response.rowCount === 0) return res.status(404).send("Not found");
  res.send(response.rows[0]);
});

productsRouter.post("/", async (req, res) => {
  const response = await db.query(
    `INSERT INTO "Products" (name, description, image_url, price, category) 
                                     Values ($1, $2, $3, $4, $5)
                                     RETURNING *`,
    [
      req.body.name,
      req.body.description,
      req.body.image_url,
      req.body.price,
      req.body.category,
    ]
  );

  console.log("done");
  res.send(response.rows[0]);
});

productsRouter.delete("/:_id", async (req, res) => {
  const response = await db.query(`DELETE FROM "Products" WHERE _ID = $1`, [
    req.params._id,
  ]);
  if (response.rowCount === 0) return res.status(404).send("Not Found");
  res.send("Deleted");
});

module.exports = productsRouter;
