import { posts, renderApp } from "../index.js";
import { renderPostsPageComponent } from "./posts-page-component.js";
import { addDislike, addLike } from "../api.js";


export function renderLike() {
  // const app = document.getElementById("app");

  console.log("\nСписок постов:");
  console.log(posts);

  // найти все кнопки like
  const likeButtons = document.querySelectorAll(".like-button");

  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();

      // // получить целевой элемент
      // const postTarget = event.target.closest('.like-button');
      // // console.log("\nЭто целевой элемент: ", postTarget);

      // // получить Id поста из лайка
      // // console.log("\nЭто все dataset-атрибуты поста:");
      // // console.log(postTarget.dataset);
      // const postId = postTarget.dataset.postId;
      const postId = likeButton.dataset.postId;
      // console.log("\nЭто Id поста: ", postId);

      // // получить пост по Id поста из массива
      const currentPost = posts.find(post => post.id === postId);
      // console.log("\nЭто пост, на котором кликнули лайк:");
      // console.log(currentPost);

      const currentPostIsLiked = currentPost.isLiked;
      // console.log("\nЭто текущее состояние лайка у текущего поста после смены значения currentPost.isLiked: ", currentPostIsLiked);
      // console.log("\nЭто лайки у текущего поста: ", currentPost.likes);

      let likes;

      if (!currentPostIsLiked) {
        addLike(postId)
          .then((response) => {
            // console.log("\nЭто ответ сервера из функции addLike:");
            // console.log(response);
            // console.log("\nЭто response.post.isLiked из ответа сервера из функции addLike:");
            // console.log(response.post.isLiked);
            // console.log("\nЭто лайки из ответа сервера из функции addLike:");
            // console.log(response.post.likes);
            // console.log(response.post.likes.length);
            likes = response.post.likes.length
            console.log("\nЭто лайки после addLike: ", likes);
          })
      } else {
        addDislike(postId)
          .then((response) => {
            // console.log("\nЭто ответ сервера из функции addDislike:");
            // console.log(response);
            // console.log("\nЭто response.post.isLiked из ответа сервера из функции addDislike:");
            // console.log(response.post.isLiked);
            // console.log("\nЭто лайки из ответа сервера из функции addDislike:");
            // console.log(response.post.likes);
            // console.log(response.post.likes.length);
            likes = response.post.likes.length
            console.log("\nЭто лайки после addDislike: ", likes);
          })
      }

      // поменять значение isLiked на противоположное
      currentPost.isLiked = !currentPost.isLiked

      renderApp();
    })
  }
}