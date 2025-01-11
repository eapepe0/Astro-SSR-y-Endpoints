
import type { APIRoute } from "astro";
import { db, eq, Posts } from "astro:db";

export const prerender = false;


export const GET: APIRoute = async ({ params, request }) => {
    // en los params vienen los parámetros de la URL
    // en el request vienen los datos de la petición
    const postId = params.id ?? ''; 

    const posts = await db.select().from(Posts).where(eq(Posts.id , postId));

   // si no existe el post
   if(!posts.length){

    // creamos un post con los datos de error
    const post = {
        id : postId ,
        title : "Post not found",
        likes : 0
    }

    // devolvemos los datos con error
    return new Response(JSON.stringify(post),{
        status : 200 ,
        headers : {
            'Content-Type' : 'application/json'
        }
     })
   } // fin if

   

   // devolvemos los valores obtenidos de la DB , en caracter 0 por que es un array , obtenemos solo el objeto
   return new Response(JSON.stringify(posts.at(0)),{
        status : 200 ,
        headers : {
            'Content-Type' : 'application/json'
        }
    })

}
