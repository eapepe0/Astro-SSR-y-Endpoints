import {db , eq , Posts} from "astro:db";
import { defineAction } from "astro:actions";
import { z } from 'astro:schema';

// siempre exportamos y definimos la accion
export const getPostLikes = defineAction({
    accept : 'json',
    // el esquema de datos que vamos a recibir
    input : z.string(),// si no se cumple este esquema lanzara un error
    // función que maneja la acción. Recibe los datos validados como argumento.
    handler: async (postId) => {
        // desestructuramos el array posts que devuelve [{ id : ... , title : ... , likes : .. }]
        // buscamos en la tabla Posts donde el Posts.id sea igual al postId que nos envian
        const [posts] = await db.select().from(Posts).where(eq(Posts.id, postId));

        // si posts no existe 
        if(!posts){
            return {
                likes : 0,
                exist : false
            }
        }
        return { 
            likes : posts.likes,
            exist : true
        };// retorna esto
    },
});