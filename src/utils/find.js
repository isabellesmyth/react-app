
export function findUser(post, store){
    return store.users.find(user=>user.id===post.userId);
  }

export function findComments(post, store){
  return store.comments.filter(comment=>comment.postId===post.id);
}

export function findLikes(post, store){
  let postLikes = store.likes.filter(like=>like.postId===post.id);
  return {
    self: postLikes.some(like=> like.userId===store.currentUserId),
    count: postLikes.length
  }
}
 
export function findPosts(userId, store){
    return store.posts.filter(post => post.userId === userId);
}
