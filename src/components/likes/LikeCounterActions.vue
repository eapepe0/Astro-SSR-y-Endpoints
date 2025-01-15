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
    import { ref, watch } from 'vue';
    import confetti from 'canvas-confetti';
    import debounce from 'lodash.debounce';
import { actions } from 'astro:actions';

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


    // revisamos la variable likeCount cuando se ejecute por primera vez o cambie dispara la funcion
    watch(likeCount , debounce(() => {
        // enviamos un PUT con el valor de los clicks
        fetch(`/api/posts/likes/${props.postId}`,{
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({likes : likeClicks.value})
        })

        likeClicks.value = 0; // reiniciamos el contador
    },700))


    // funcion

    const likePost = async() => {
        likeCount.value++; // incrementamos el contador de likes
        likeClicks.value++; // incrementamos el contador de clicks
        
        const {data , error} = await actions.getGreeting({
            age : 38,
            name : 'Cristian',
            isActive : true
        })

        if (error){
            return alert('Algo salio mal')
        }

        console.log(data)
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
        
        // en data resultado positivo , error resultado negativo
        const {data  , error} = await actions.getPostLikes(props.postId);

        // si hay un error
        if(error){
            return alert(error);
        }
       
        // el valor de el contador inicialmente es que nos da el server Action
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