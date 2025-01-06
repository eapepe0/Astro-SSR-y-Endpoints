import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
    // en los params vienen los parámetros de la URL
    // en el request vienen los datos de la petición

    const {slug} = params;

    if(slug){ // si existe el slug en la url
        // obtenemos el post con el slug
        const post = await getEntry("blog", slug); 
        if(post){ // si existe el post
            return new Response(JSON.stringify(post), { 
                status: 200 , headers: { "Content-Type": "application/json" },
            });
        }
    // si el post no existe    
    return new Response(JSON.stringify({
        msg : 'Error 404 Not found'}), {
            status: 404 , headers: { "Content-Type": "application/json" }, 
        });
        
    }


    // devuelve una respuesta
    const blogPosts = await getCollection("blog");
    return new Response(JSON.stringify(blogPosts), {
        status: 200 , headers: { "Content-Type": "application/json" },
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