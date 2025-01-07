import type { APIRoute } from "astro";


export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
   // en los params vienen los parámetros de la URL
   // en el request vienen los datos de la petición
   const clientId = params.clientId; // extraemos el clientId de los parámetros de la URL
   return new Response(
     JSON.stringify({
       method: "GET",
       msg: `GET el cliente ${clientId} desde [clientId].ts`,
     }),
     {
       status: 200,
       headers: { "Content-Type": "application/json" },
     }
   );
 };




export const PATCH: APIRoute = async ({ params, request }) => {
    // en los params vienen los parámetros de la URL
    // en el request vienen los datos de la petición

   const clientId = params.clientId; // extraemos el clientId de los parámetros de la URL

    // devuelve una respuesta
   return new Response(JSON.stringify({ method: "PATCH", msg : `${clientId} enviado por la url` }), {
     status: 200,
     headers: { "Content-Type": "application/json" },
   });
}

export const DELETE: APIRoute = async ({ params, request }) => {
    // en los params vienen los parámetros de la URL
    // en el request vienen los datos de la petición
   

    const clientId = params.clientId; // extraemos el clientId de los parámetros de la URL

    // devuelve una respuesta
    return new Response(JSON.stringify({ method: "DELETE", msg : `${clientId} enviado por la url` }), {
     status: 200,
     headers: { "Content-Type": "application/json" },
   });
   
}