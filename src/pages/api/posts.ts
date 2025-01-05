import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
    // en los params vienen los parámetros de la URL
    // en el request vienen los datos de la petición
    const blogPosts = await getCollection("blog");
    // devuelve una respuesta
   return new Response(JSON.stringify(blogPosts), { status: 200 , headers: { "Content-Type": "application/json" }, });
}