import type { APIRoute } from "astro";
import { Clients, db } from "astro:db";

export const prerender = false;


// obtiene todos los clientes
export const GET: APIRoute = async ({ params, request }) => {
  // en los params vienen los parámetros de la URL
  // en el request vienen los datos de la petición

  const clientes = await db.select().from(Clients); // extraemos los clientes de la base de datos

  console.log(clientes)
  return new Response(
    JSON.stringify({
      method: "GET",
      msg: "GET desde index.ts",
      body : clientes
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};


// crea un nuevo cliente
export const POST: APIRoute = async ({ params, request }) => {
  // en los params vienen los parámetros de la URL
  // en el request vienen los datos de la petición
  try {
    const body = await request.json(); // extraemos el body de la petición
    // Verificamos si el body está vacío o no contiene las propiedades necesarias
    if (!body || Object.keys(body).length === 0) {
      return new Response(
        JSON.stringify({ error: "El cuerpo de la petición está vacío" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
   
    // insertamos el body en la tabla Clients
    const {lastInsertRowid} = await db.insert(Clients).values(body);

    // devuelve una respuesta
    return new Response(JSON.stringify({ method: "POST", id: +lastInsertRowid!.toString() ,...body }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Error en la petición , seguramente el body esta vacio" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
