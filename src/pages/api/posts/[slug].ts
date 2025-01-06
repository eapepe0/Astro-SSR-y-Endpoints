
import type { APIRoute } from "astro";
import { getEntry } from "astro:content";


export const prerender = false

export const GET: APIRoute = async ({ params, request }) => {
    // en los params vienen los parámetros de la URL
    // en el request vienen los datos de la petición

    const {slug} = params; // extraemos el slug de los parámetros de la URL

    const post = await getEntry("blog", slug as any); // obtenemos el post con el slug

    // si el post no existe
    if (!post) {
      return new Response(
        JSON.stringify({
          msg: "Error 404 Not found",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // devuelve una respuesta
   return new Response(JSON.stringify(post), { 
        status: 200 , headers: { 
            "Content-Type": "application/json" 
        }
    });
}


export const POST: APIRoute = async ({ params, request }) => {
    // en los params vienen los parámetros de la URL
    // en el request vienen los datos de la petición

    const body = await request.json(); // extraemos el body de la petición

    // devuelve una respuesta
   return new Response(JSON.stringify({ method: "POST", ...body }), {
     status: 200,
     headers: { "Content-Type": "application/json" },
   });
}



export const PUT: APIRoute = async ({ params, request }) => {
    // en los params vienen los parámetros de la URL
    // en el request vienen los datos de la petición

    const body = await request.json(); // extraemos el body de la petición

    // devuelve una respuesta
   return new Response(JSON.stringify({ method: "PUT", ...body }), {
     status: 200,
     headers: { "Content-Type": "application/json" },
   });
}

export const PATCH: APIRoute = async ({ params, request }) => {
    // en los params vienen los parámetros de la URL
    // en el request vienen los datos de la petición

    const body = await request.json(); // extraemos el body de la petición

    // devuelve una respuesta
   return new Response(JSON.stringify({ method: "PATCH", ...body }), {
     status: 200,
     headers: { "Content-Type": "application/json" },
   });
}

export const DELETE: APIRoute = async ({ params, request }) => {
    // en los params vienen los parámetros de la URL
    // en el request vienen los datos de la petición
 // en los params vienen los parámetros de la URL
    // en el request vienen los datos de la petición

    const {slug} = params; // extraemos el slug de los parámetros de la URL

    // devuelve una respuesta
   return new Response(JSON.stringify({ method: "DELETE", slug : slug }), {
     status: 200,
     headers: { "Content-Type": "application/json" },
   });
   
}