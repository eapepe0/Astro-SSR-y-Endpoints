import { defineAction } from "astro:actions";
import { z } from 'astro:schema';


// siempre exportamos y definimos la accion
export const getGreeting = defineAction({
    // los datos recibidos son json
    accept : 'json',
    // el esquema de datos que vamos a recibir
    input : z.object({
        name : z.string(),
        age : z.number(),
        isActive : z.boolean()
    }), // si no se cumple este esquema lanzara un error
    
    // función que maneja la acción. Recibe los datos validados como argumento.
    handler: async ({name , age , isActive}) => {
        console.log({name , age , isActive})
        return `Hola , ${name}`; // retorna esto
    },
});