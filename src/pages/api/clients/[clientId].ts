import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";
import { turso } from '../../../turso.ts';


export const prerender = false;

// obtiene un cliente por su id
export const GET: APIRoute = async ({ params, request }) => {
  // en los params vienen los parámetros de la URL
  // en el request vienen los datos de la petición
  const clientId = params.clientId ?? ""; // extraemos el clientId de los parámetros de la URL

  // extraemos el cliente de la base de datos
  const cliente = await db.select().from(Clients).where(eq(Clients.id , +clientId)); 

  // si no se encuentra el cliente
  if (!cliente.length) {
    return new Response(
      JSON.stringify({
        error: "Cliente no encontrado",
      }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // si encuentra el cliente
  return new Response(
    JSON.stringify({
      method: "GET",
      msg: `GET el cliente ${clientId} desde [clientId].ts`,
      body: cliente.at(0),
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};

// editamos un cliente por su id
export const PATCH: APIRoute = async ({ params, request }) => {
  // en los params vienen los parámetros de la URL
  // en el request vienen los datos de la petición
  const clientId = params.clientId ?? ""; // extraemos el clientId de los parámetros de la URL
  try {
    const { id, ...body } = await request.json(); // extraemos el body de la petición

    // actualizamos el cliente en la tabla Clients
    await db
      .update(Clients)
      .set({
        name: body.name,
        age: body.age,
        isActive: body.isActive,
      })
      .where(eq(Clients.id, +clientId));

    // devolvemos el cliente actualizado
    const updatedClient = await db
      .select()
      .from(Clients)
      .where(eq(Clients.id, +clientId)); // extraemos el cliente de la base de datos

    // devuelve una respuesta
    return new Response(
      JSON.stringify({
        msg: "Cliente actualizado correctamente",
        body: updatedClient.at(0),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: "Error en la petición , seguramente el body esta vacio",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

// borramos un cliente por su id
export const DELETE: APIRoute = async ({ params, request }) => {
  // en los params vienen los parámetros de la URL
  // en el request vienen los datos de la petición

  const clientId = params.clientId ?? ''; // extraemos el clientId de los parámetros de la URL

  const {rowsAffected} = await db.delete(Clients).where(eq(Clients.id, +clientId)); // borramos el cliente de la base de datos

  // si rowsAffected es mayor a 0 , significa que se eliminó correctamente
  if(rowsAffected > 0) {
    // devuelve una respuesta
    return new Response(
      JSON.stringify({ msg: "Deleted!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return new Response(
   JSON.stringify({ msg: `Cliente con el id : ${clientId} no encontrado` }),
   {
     status: 404,
     headers: { "Content-Type": "application/json" },
   }
 );

  
};
