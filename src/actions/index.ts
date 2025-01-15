// importamos la accion
import { getGreeting } from "./greetings/get-greeting.action";
import { getPostLikes } from "./posts/get-post-likes.actions";


// siempre debemos exportar server
export const server = {
    // aca van las acciones
    getGreeting,
    getPostLikes
}




