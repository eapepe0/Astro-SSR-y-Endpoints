import { column, defineDb, defineTable } from 'astro:db';

// Define la tabla Clients
const Clients = defineTable({
  // Define las columnas de la tabla
  columns: {
    // el id sera un numero autoincremental unico
    id : column.number({primaryKey: true}),
    // el nombre sera un string
    name : column.text(),
    // la edad sera un numero
    age : column.number(),
    // isActive sera un booleano
    isActive : column.boolean(),
  }
})



// https://astro.build/db/config
export default defineDb({
  // Define las tablas de la base de datos
  tables: {
    Clients,
  }
});
