import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";

export function renderPostsPageComponent({ appEl }) {
  // @TODO: реализовать рендер постов из api
  // console.log("Актуальный список постов:", posts);Comment console.log

  /**
   * @TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
  */

  const postsHtml = posts.map((post) => {
    return `
    <li class="post">
      <div class="post-header" data-user-id="${post.user.id}">
          <img src="${post.user.imageUrl}" class="post-header__user-image">
          <p class="post-header__user-name">${post.user.name}</p>
      </div>
      <div class="post-image-container">
        <img class="post-image" src="${post.imageUrl}">
      </div>
      <div class="post-likes">
        <button data-post-id="${post.id}" class="like-button">
        <${post.likes.length > 0 ? 'img src="./assets/images/like-active.svg"' : 'img src="./assets/images/like-not-active.svg"'}>
        </button>
        <p class="post-likes-text">
          Нравится: <strong>${post.likes.length}</strong>
        </p>
      </div>
      <p class="post-text">
        <span class="user-name">${post.user.name}</span>
        ${post.description}
      </p>
      <p class="post-date">
        19 минут назад
      </p>
    </li>
  `
  })
    .join("");

  
  const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
        ${postsHtml}
      </ul>
    </div>
  `
  appEl.innerHTML = appHtml;


  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}

export function renderUserPostsPageComponent( appEl , userId) {
  // @TODO: реализовать рендер постов из api
  // console.log("Актуальный список постов в renderUserPostsPageComponent:", posts);
  
  // console.log("\nЭто appEl в функции:");
  // console.log(appEl);
  
  // console.log("\nЭто userId в renderUserPostsPageComponent:");
  // console.log(userId);
  
  const userPostsFiltered = posts.filter((post) => post.user.id === userId);
  // console.log("\nОтфильтрованный список постов юзера в renderUserPostsPageComponent:");
  // console.log(userPostsFiltered);

  /**
   * @TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
  */

  const userPostsHtml = userPostsFiltered.map((userPost) => {
    return `
    <li class="post">
      <div class="post-header" data-user-id="${userPost.user.id}">
          <img src="${userPost.user.imageUrl}" class="post-header__user-image">
          <p class="post-header__user-name">${userPost.user.name}</p>
      </div>
      <div class="post-image-container">
        <img class="post-image" src="${userPost.imageUrl}">
      </div>
      <div class="post-likes">
        <button data-post-id="${userPost.id}" class="like-button">
        <${userPost.likes.length > 0 ? 'img src="./assets/images/like-active.svg"' : 'img src="./assets/images/like-not-active.svg"'}>
        </button>
        <p class="post-likes-text">
          Нравится: <strong>${userPost.likes.length}</strong>
        </p>
      </div>
      <p class="post-text">
        <span class="user-name">${userPost.user.name}</span>
        ${userPost.description}
      </p>
      <p class="post-date">
        19 минут назад
      </p>
    </li>
  `
  })
    .join("");


  const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
        ${userPostsHtml}
      </ul>
    </div>
  `

  appEl.innerHTML = appHtml;


  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
