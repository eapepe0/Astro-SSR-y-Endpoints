import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  // en los params vienen los parámetros de la URL
  // en el request vienen los datos de la petición

  return new Response(
    JSON.stringify({
      method: "GET",
      msg: "GET desde index.ts",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};

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

    // devuelve una respuesta
    return new Response(JSON.stringify({ method: "POST", ...body }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Error en la petición" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  // en los params vienen los parámetros de la URL
  // en el request vienen los datos de la petición

  const body = await request.json(); // extraemos el body de la petición

  // devuelve una respuesta
  return new Response(JSON.stringify({ method: "PUT", ...body }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
