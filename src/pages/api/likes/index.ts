import type { APIRoute } from "astro";

export const prerender = false;


export const GET: APIRoute = async ({ params, request }) => {
  // en los params vienen los parámetros de la URL
  // en el request vienen los datos de la petición

  return new Response("Ok",    
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};

