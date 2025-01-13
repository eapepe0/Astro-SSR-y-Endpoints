<template>

    <div v-if="isLoading">
        Loading ...
    </div>

    <button v-else-if="likeCount === 0" @click="likePost">
        Like this post
    </button>
    <button v-else @click="likePost">
        Likes
        <span>{{ likeCount }}</span>
    </button>

    {{ likeClicks }}

</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import confetti from 'canvas-confetti';


    // definimos una interfaz en el cual nuestras Props es un postId que es un string
    interface Props{
        postId : string;
    }

    // le decimos a Vue que la props reciben algo del tipo Props
    const props = defineProps<Props>();

    // declaramos tres variables reactivas

    const likeCount = ref(0) ; // cuenta cuantos likes tiene el post 
    const likeClicks = ref(0) ; // cuantas veces hicimos clicks
    const isLoading = ref(true) ; // si ya termino de cargar 


    // funcion

    const likePost = () => {
        likeCount.value++; // incrementamos el contador de likes
        likeClicks.value++; // incrementamos el contador de clicks
        
        // mostramos el confetti
        confetti({
        particleCount : 100,
        spread : 70,
        origin : {
            x : Math.random(),
            y : Math.random() - 0.2 
        } 
        })
    }

    const getCurrentLikes = async() => {
        // hago la llamada a la api pasandole el post
        const resp = await fetch(`/api/posts/likes/${props.postId}`)

        // si la respuesta no es buena no hacemos nada
        if(!resp.ok) return

        // si la respuesta es buen
        const data = await resp.json()
        
        // el valor de el contador inicialmente es que nos da la api
        likeCount.value = data.likes;

        // dejamos de cargar , podemos mostrar el boton de Likes
        isLoading.value = false;

    
    }


    // ejecutamos la funcion
    getCurrentLikes()
</script>


<style scoped>

button{
    background-color: #5e51bc;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
}

button:hover{
    background-color: #4a3f9a;
}

</style>