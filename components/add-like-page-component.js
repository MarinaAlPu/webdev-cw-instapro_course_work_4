import { posts, renderApp, updatePosts } from "../index";
import { addDislike, addLike } from "../api";


export function renderLike() {
  // найти все кнопки like
  const likeButtons = document.querySelectorAll(".like-button");

  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();

      // добавить класс для анимации, убрать в finally
      likeButton.classList.add('loading-like');

      const postId = likeButton.dataset.postId;
      const currentPost = posts.find(post => post.id === postId);
      const currentPostIsLiked = likeButton.dataset.postIsLiked === 'true';

      let newPost = {};
      let likes = [];
      let likesQuantity;

      if (!currentPostIsLiked) {
        addLike(postId)
          .then((response) => {
            newPost = response.post
            likes = response.post.likes
            likesQuantity = response.post.likes.length

            let newPosts = posts.map(post => {
              if (post.id === postId) {
                post = newPost;
                return post
              }
              return post
            })

            updatePosts(newPosts)
            renderApp();
          })
          .finally(() => {
            likeButton.classList.remove('loading-like');
          });
      } else {
        addDislike(postId)
          .then((response) => {
            newPost = response.post
            likes = response.post.likes
            likesQuantity = response.post.likes.length

            let newPosts = posts.map(post => {
              if (post.id === postId) {
                post = newPost;
                return post
              }
              return post
            })

            updatePosts(newPosts)
            renderApp();
          })
          .finally(() => {
            likeButton.classList.remove('loading-like');
          });
      }

      // поменять значение isLiked на противоположное
      currentPost.isLiked = !currentPost.isLiked
    })
  }
}