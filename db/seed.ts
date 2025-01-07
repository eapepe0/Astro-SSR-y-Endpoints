import { db , Clients } from 'astro:db';

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

	console.log('Seed done');
}
