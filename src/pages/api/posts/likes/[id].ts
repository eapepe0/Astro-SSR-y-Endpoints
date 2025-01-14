
import type { APIRoute } from "astro";
import { db, eq, Posts } from "astro:db";

export const prerender = false;


export const GET: APIRoute = async ({ params }) => {
    try {
        const postId = params.id ?? '';
        if (!postId) {
            return new Response(
                JSON.stringify({ error: "Missing post ID" }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const posts = await db.select().from(Posts).where(eq(Posts.id, postId));

        if (!posts.length) {
            const post = {
                id: postId,
                title: "Post not found",
                likes: 0,
            };
            return new Response(JSON.stringify(post), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify(posts.at(0)), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error in GET /api/likes:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error", details: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

export const PUT: APIRoute = async ({ params, request }) => {
    // en los params vienen los parámetros de la URL
    // en el request vienen los datos de la petición

    // si viene el postId en los params
    const postId = params.id ?? ''; 

    // buscamos el post basandonos en el postId
    const posts = await db.select().from(Posts).where(eq(Posts.id , postId));

    // recibimos los likes ( veces que apretaron el boton)
    const {likes = 0} = await request.json()

   // si no existe el post
   if(!posts.length){

    // creamos un post nuevo por si es la primera vez que creamos la DB
    const newPost = {
        id : postId ,
        title : "Post not found",
        likes : 0
    }

    // grabamos en DB
    await db.insert(Posts).values(newPost);

    // si no existe el post, ponemos el post recien creado en la posicion 0
    posts.push(newPost) 
   }  // fin if

    // el 1er post si no existe el post lo crea igual en la posicion 0
    const post = posts.at(0)! // el signo de exclamacion significa que siempre hay un valor

    // sumamos los likes con los likes que ya tenia 
    post.likes = post.likes + likes;

    // actualizamos los likes del post
   await db.update(Posts).set(post).where(eq(Posts.id , postId))
   
   // devolvemos los valores obtenidos de la DB , en caracter 0 por que es un array , obtenemos solo el objeto
   return new Response('Ok , likes sumados!!',{
    status : 200 ,
    headers : {
        'Content-Type' : 'application/json'
    }
})

}