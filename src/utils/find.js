
export function findUser(userId, users){
    return users.find(user=>user.id===userId);
  }

export function findComments(post, comments){
  return comments.filter(comment=>comment.postId===post.id);
}

export function findLikes(post, likes, currentUserId){
  let postLikes = likes.filter(like=>like.postId===post.id);
  return {
    self: postLikes.some(like=> like.userId===currentUserId),
    count: postLikes.length
  }
}
 
export function findPosts(userId, posts){
    return posts.filter(post => post.userId === userId);
}
