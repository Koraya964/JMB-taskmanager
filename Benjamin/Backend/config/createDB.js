import path from "path";
import fs from "fs";

const createDb = () => {
  let database;

  const database_init = path.join(import.meta.dirname, "./init.sql");
  const sql = fs.readFileSync(database_init, "utf-8");

  database.exec(sql);
};

export default createDb;
