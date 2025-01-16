import { actions, defineAction } from 'astro:actions';
import { db, eq, Posts } from 'astro:db';
import { z } from 'astro:schema';
import { getPostLikes } from './get-post-likes.actions';

export const updatePostLikes = defineAction({
  input: z.object({
    postId: z.string(),
    increment: z.number(),
  }),
  handler: async ({ postId, increment }) => {
    // const posts = await db.select().from(Posts).where(eq(Posts.id, postId));
    const [post] = await db.select().from(Posts).where(eq(Posts.id, postId));
    if (!post) {
        const newPost = {
  
          id: postId,
  
          title: 'Post not found',
  
          likes: 0,
  
    }; 
  
      await db.insert(Posts).values(newPost);
    }
    const suma = post.likes + increment;
    await db
      .update(Posts)
      .set({
        likes: suma,
      })
      .where(eq(Posts.id, postId));

    return true;
  },
});