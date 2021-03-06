import { ColumnBuilder } from "./columnbuilder.ts";
import { assertEquals } from "../../testdeps.ts";

Deno.test("Column: default", () => {
  const column1 = new ColumnBuilder("id", "integer").default(1);
  assertEquals(column1.toSQL("mysql"), "`id` INTEGER DEFAULT 1");
  assertEquals(column1.toSQL("postgres"), '"id" INTEGER DEFAULT 1');
  assertEquals(column1.toSQL("sqlite"), "`id` INTEGER DEFAULT 1");

  const column2 = new ColumnBuilder("name", "varchar").default("john");
  assertEquals(column2.toSQL("mysql"), "`name` VARCHAR(255) DEFAULT 'john'");
  assertEquals(
    column2.toSQL("postgres"),
    "\"name\" VARCHAR(255) DEFAULT 'john'",
  );
  assertEquals(column2.toSQL("sqlite"), "`name` VARCHAR(255) DEFAULT 'john'");

  const column3 = new ColumnBuilder("is_published", "boolean").default(false);
  assertEquals(column3.toSQL("mysql"), "`is_published` TINYINT DEFAULT 0");
  assertEquals(
    column3.toSQL("postgres"),
    '"is_published" BOOLEAN DEFAULT false',
  );
  assertEquals(column3.toSQL("sqlite"), "`is_published` BOOLEAN DEFAULT 0");

  const column4 = new ColumnBuilder("created_at", "datetime").default(
    "NOW()",
    true,
  );
  assertEquals(column4.toSQL("mysql"), "`created_at` DATETIME DEFAULT NOW()");
  assertEquals(
    column4.toSQL("postgres"),
    '"created_at" TIMESTAMP DEFAULT NOW()',
  );
  assertEquals(column4.toSQL("sqlite"), "`created_at` DATETIME DEFAULT NOW()");
});

Deno.test("Column: primary", () => {
  const column = new ColumnBuilder("id", "integer").primary();
  assertEquals(column.toSQL("mysql"), "`id` INTEGER PRIMARY KEY");
  assertEquals(column.toSQL("postgres"), '"id" INTEGER PRIMARY KEY');
  assertEquals(column.toSQL("sqlite"), "`id` INTEGER PRIMARY KEY");
});

Deno.test("Column: unique", () => {
  const column = new ColumnBuilder("id", "integer").unique();
  assertEquals(column.toSQL("mysql"), "`id` INTEGER UNIQUE");
  assertEquals(column.toSQL("postgres"), '"id" INTEGER UNIQUE');
  assertEquals(column.toSQL("sqlite"), "`id` INTEGER UNIQUE");
});

Deno.test("Column: notNull", () => {
  const column = new ColumnBuilder("id", "integer").notNull();
  assertEquals(column.toSQL("mysql"), "`id` INTEGER NOT NULL");
  assertEquals(column.toSQL("postgres"), '"id" INTEGER NOT NULL');
  assertEquals(column.toSQL("sqlite"), "`id` INTEGER NOT NULL");
});

Deno.test("Column: multiple constraints", () => {
  const column = new ColumnBuilder("email", "varchar")
    .primary()
    .unique()
    .notNull()
    .default("a@b.com");

  assertEquals(
    column.toSQL("mysql"),
    "`email` VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE DEFAULT 'a@b.com'",
  );
  assertEquals(
    column.toSQL("postgres"),
    "\"email\" VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE DEFAULT 'a@b.com'",
  );
  assertEquals(
    column.toSQL("sqlite"),
    "`email` VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE DEFAULT 'a@b.com'",
  );
});

// --------------------------------------------------------------------------------
// INCREMENTS
// --------------------------------------------------------------------------------

Deno.test("Column: toSQL increments", () => {
  const column = new ColumnBuilder("id", "increments");
  assertEquals(column.toSQL("mysql"), "`id` INTEGER AUTO_INCREMENT");
  assertEquals(column.toSQL("postgres"), '"id" SERIAL');
  assertEquals(column.toSQL("sqlite"), "`id` INTEGER AUTOINCREMENT");
});

Deno.test("Column: toSQL bigIncrements", () => {
  const column = new ColumnBuilder("id", "bigIncrements");
  assertEquals(column.toSQL("mysql"), "`id` BIGINT AUTO_INCREMENT");
  assertEquals(column.toSQL("postgres"), '"id" BIGSERIAL');
  assertEquals(column.toSQL("sqlite"), "`id` INTEGER AUTOINCREMENT");
});

Deno.test("Column: toSQL smallIncrements", () => {
  const column = new ColumnBuilder("id", "smallIncrements");
  assertEquals(column.toSQL("mysql"), "`id` SMALLINT AUTO_INCREMENT");
  assertEquals(column.toSQL("postgres"), '"id" SMALLSERIAL');
  assertEquals(column.toSQL("sqlite"), "`id` INTEGER AUTOINCREMENT");
});

// --------------------------------------------------------------------------------
// TEXT
// --------------------------------------------------------------------------------

Deno.test("Column: toSQL varchar", () => {
  let column = new ColumnBuilder("id", "varchar");
  assertEquals(column.toSQL("mysql"), "`id` VARCHAR(255)");
  assertEquals(column.toSQL("postgres"), '"id" VARCHAR(255)');
  assertEquals(column.toSQL("sqlite"), "`id` VARCHAR(255)");

  column = new ColumnBuilder("id", "varchar", 100);
  assertEquals(column.toSQL("mysql"), "`id` VARCHAR(100)");
  assertEquals(column.toSQL("postgres"), '"id" VARCHAR(100)');
  assertEquals(column.toSQL("sqlite"), "`id` VARCHAR(100)");
});

Deno.test("Column: toSQL text", () => {
  let column = new ColumnBuilder("id", "text");
  assertEquals(column.toSQL("mysql"), "`id` LONGTEXT");
  assertEquals(column.toSQL("postgres"), '"id" TEXT');
  assertEquals(column.toSQL("sqlite"), "`id` TEXT");
});

// --------------------------------------------------------------------------------
// TEXT
// --------------------------------------------------------------------------------

Deno.test("Column: toSQL integer", () => {
  let column = new ColumnBuilder("id", "integer");
  assertEquals(column.toSQL("mysql"), "`id` INTEGER");
  assertEquals(column.toSQL("postgres"), '"id" INTEGER');
  assertEquals(column.toSQL("sqlite"), "`id` INTEGER");
});

Deno.test("Column: toSQL unsigned integer", () => {
  let column = new ColumnBuilder("id", "integer").unsigned();
  assertEquals(column.toSQL("mysql"), "`id` UNSIGNED INTEGER");
  assertEquals(column.toSQL("postgres"), '"id" UNSIGNED INTEGER');
  assertEquals(column.toSQL("sqlite"), "`id` UNSIGNED INTEGER");
});

Deno.test("Column: toSQL bigInteger", () => {
  let column = new ColumnBuilder("id", "bigInteger");
  assertEquals(column.toSQL("mysql"), "`id` BIGINT");
  assertEquals(column.toSQL("postgres"), '"id" BIGINT');
  assertEquals(column.toSQL("sqlite"), "`id` BIGINT");
});

Deno.test("Column: toSQL unsigned bigInteger", () => {
  let column = new ColumnBuilder("id", "bigInteger").unsigned();
  assertEquals(column.toSQL("mysql"), "`id` UNSIGNED BIGINT");
  assertEquals(column.toSQL("postgres"), '"id" UNSIGNED BIGINT');
  assertEquals(column.toSQL("sqlite"), "`id` UNSIGNED BIGINT");
});

Deno.test("Column: toSQL smallInteger", () => {
  let column = new ColumnBuilder("id", "smallInteger");
  assertEquals(column.toSQL("mysql"), "`id` SMALLINT");
  assertEquals(column.toSQL("postgres"), '"id" SMALLINT');
  assertEquals(column.toSQL("sqlite"), "`id` SMALLINT");
});

Deno.test("Column: toSQL unsigned smallInteger", () => {
  let column = new ColumnBuilder("id", "smallInteger").unsigned();
  assertEquals(column.toSQL("mysql"), "`id` UNSIGNED SMALLINT");
  assertEquals(column.toSQL("postgres"), '"id" UNSIGNED SMALLINT');
  assertEquals(column.toSQL("sqlite"), "`id` UNSIGNED SMALLINT");
});

// --------------------------------------------------------------------------------
// DATE & TIME
// --------------------------------------------------------------------------------

Deno.test("Column: toSQL datetime", () => {
  let column = new ColumnBuilder("id", "datetime");
  assertEquals(column.toSQL("mysql"), "`id` DATETIME");
  assertEquals(column.toSQL("postgres"), '"id" TIMESTAMP');
  assertEquals(column.toSQL("sqlite"), "`id` DATETIME");
});

Deno.test("Column: toSQL date", () => {
  let column = new ColumnBuilder("id", "date");
  assertEquals(column.toSQL("mysql"), "`id` DATE");
  assertEquals(column.toSQL("postgres"), '"id" DATE');
  assertEquals(column.toSQL("sqlite"), "`id` DATE");
});

// --------------------------------------------------------------------------------
// OTHER DATATYPES
// --------------------------------------------------------------------------------

Deno.test("Column: toSQL boolean", () => {
  let column = new ColumnBuilder("id", "boolean");
  assertEquals(column.toSQL("mysql"), "`id` TINYINT");
  assertEquals(column.toSQL("postgres"), '"id" BOOLEAN');
  assertEquals(column.toSQL("sqlite"), "`id` BOOLEAN");
});
