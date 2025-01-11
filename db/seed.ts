import { getCollection } from 'astro:content';
import { db , Clients, Posts } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	
	// Inserta datos en la tabla Clients
	await db.insert(Clients).values([
		{id : 1, name : 'Cristian', age : 38, isActive : true},
		{id : 2, name : 'Manuel', age : 12, isActive : false},
		{id : 3, name : 'Florencia', age : 18, isActive : true},
		{id : 4, name : 'Pepe', age : 27, isActive : true},
		{id : 5, name : 'Jaime', age : 42, isActive : false},
		{id : 6, name : 'Mauricio', age : 56, isActive : false},
		{id : 7, name : 'Rosa', age : 5, isActive : true},
		{id : 8, name : 'Jose Jose', age : 70, isActive : true},

	])

	// Obtenemos los posts de la coleccion Blog
	const posts = await getCollection('blog')
	// Insertamos los valores en cada post , 
	// donde el id sera el id del post, el titulo , el titulo del post 
	// y los likes se generan de forma aleatoria
	
	await db.insert(Posts).values(
		posts.map( p => ({
			id: p.id,
			title : p.data.title,
			likes : Math.round(Math.random() * 100)
		}))
	)

	console.log('Seed done');
}
