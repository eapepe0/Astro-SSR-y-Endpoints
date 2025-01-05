import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  // en los params vienen los parámetros de la URL
  // en el request vienen los datos de la petición

  const persona = {
    nombre: "Cristian",
    apellido: "Oyola",
    edad: 38,
    ciudad: "San Martin",
    pais: "Buenos Aires",
  };
  // devuelve una respuesta
  return new Response(
    JSON.stringify(persona),
     { status: 200 ,
        headers: {
            "Content-Type": "application/json",
          },
     });
};
