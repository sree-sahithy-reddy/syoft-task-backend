const Pool = require("pg").Pool;
const { v4: uuidv4 } = require("uuid");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "syoft_products_db",
  password: "1234",
  port: 5432,
});

async function checkLoginDetails(username, password) {
  const client = await pool.connect();

  try {
    console.log("came to check login details");

    await client.query("BEGIN");
    let query = {
      text: "SELECT * FROM syoft_users where username = $1 AND password = $2",
      values: [username, password],
    };
    let { rows } = await client.query(query);

    await client.query("COMMIT");

    if (rows == null || rows.length == 0) return "User doesn't exist";

    return rows[0]
  } catch (err) {
    console.log(err);
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
}

async function registerUser(username, email, password, role) {
  const client = await pool.connect();

  try {
    console.log("came register user");

    await client.query("BEGIN");
    let query = {
      text: "INSERT INTO syoft_users(username,password,email,role,created_at) VALUES($1,$2,$3,$4,NOW())",
      values: [username,password,email,role],
    };
    let { rows } = await client.query(query);

    await client.query("COMMIT");

    if (rows == null || rows.length == 0) return null;

    return "ok";
  } catch (err) {
    console.log(err);
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
}

async function getAllProductsList() {
  const client = await pool.connect();

  try {
    console.log("came to get all products");

    await client.query("BEGIN");
    let query = {
      text: "SELECT * FROM products_list"
    };
    let { rows } = await client.query(query);

    await client.query("COMMIT");

    if (rows == null || rows.length == 0) return null;

    return rows;
  } catch (err) {
    console.log(err);
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
}

async function addProduct(productname,description,count,price) {
  const client = await pool.connect();

  try {
    let uniqueId = uuidv4();
    console.log("came to add",uniqueId);

    await client.query("BEGIN");
    let query = {
      text: "INSERT INTO products_list(id,product_name,product_description,inventory_count,price,created_at) VALUES($1,$2,$3,$4,$5,NOW())",
      values: [uniqueId,productname,description,count,price]
    };
    let { rows } = await client.query(query);

    await client.query("COMMIT");

    return "success";
  } catch (err) {
    console.log(err);
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
}

async function deleteProduct(id) {
  const client = await pool.connect();

  try {
    console.log("came to delete");

    await client.query("BEGIN");
    let query = {
      text: "DELETE FROM products_list WHERE id = $1",
      values: [id]
    };
    let { rows } = await client.query(query);

    await client.query("COMMIT");

    if (rows == null || rows.length == 0) return null;

    return 
  } catch (err) {
    console.log(err);
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
}

module.exports = {
  checkLoginDetails,
  registerUser,
  getAllProductsList,
  addProduct,
  deleteProduct
};
