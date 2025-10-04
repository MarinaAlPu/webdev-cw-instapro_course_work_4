import { USER_POSTS_PAGE } from "../routes";
import { renderHeaderComponent } from "./header-component";
import { posts, goToPage, getUserId } from "../index";
import { renderLike } from "./add-like-page-component";
import { formatDistanceToNow } from "date-fns";
import { ru } from 'date-fns/locale';
import { renderDeletePost } from "./delete-post-page-component";

export function renderPostsPageComponent({ appEl }) {
  // @TODO: реализовать рендер постов из api
  // console.log("Актуальный список постов:", posts);Comment console.log

  /**
   * @TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
  */

  const postsHtml = posts.map((post) => {
    let messageForLike = "";

    if (post.likes.length === 0) {
      messageForLike = post.likes.length;
    } else if (post.likes.length === 1) {
      messageForLike = post.likes[0].name;
    } else if (post.likes.length > 0) {
      // messageForLike = post.likes[0].name + " и " + (post.likes.length - 1) + " другим пользователям";
      messageForLike = post.likes[0].name + " и другим";
    }

    let deleteButton;

    let userId = getUserId();

    if (!getUserId()) {
      deleteButton = "";
    } else {
      deleteButton = `
        <div class="post-delete">
          <button data-post-id="${post.id}" class="header-button delete-button">Удалить</button>
        </div>
        `
    }

    return `
    <li class="post">
      <div class="post-header" data-user-id="${post.user.id}">
          <img src="${post.user.imageUrl}" class="post-header__user-image">
          <p class="post-header__user-name">${post.user.name}</p>
      </div>
      <div class="post-image-container">
        <img class="post-image" src="${post.imageUrl}">
      </div>
      <div class="post-footer">
        <div class="post-likes">
          <button data-post-id="${post.id}" data-post-is-liked="${post.isLiked}" class="like-button">
          <${post.isLiked > 0 ? 'img src="./assets/images/like-active.svg"' : 'img src="./assets/images/like-not-active.svg"'}>
          </button>
          <p class="post-likes-text">
          Нравится: <strong>${messageForLike}</strong>
          </p>
        </div>
        ${post.user.id === userId ? deleteButton : ""}
      </div>
      <p class="post-text">
        <span class="user-name">${post.user.name}</span>
        ${post.description}
      </p>
      <p class="post-date">
        ${formatDistanceToNow(post.createdAt, { addSuffix: true, locale: ru })}
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

  renderLike();
  renderDeletePost();
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

export function renderUserPostsPageComponent(appEl) {
  // @TODO: реализовать рендер постов из api
  // console.log("Актуальный список постов в renderUserPostsPageComponent:", posts);

  /**
   * @TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
  */

  const userPostsHtml = posts.map((userPost) => {
    let messageForLike = "";

    if (userPost.likes.length === 0) {
      messageForLike = userPost.likes.length;
    } else if (userPost.likes.length === 1) {
      messageForLike = userPost.likes[0].name;
    } else if (userPost.likes.length > 0) {
      // messageForLike = post.likes[0].name + " и " + (post.likes.length - 1) + " другим пользователям";
      messageForLike = userPost.likes[0].name + " и другим";
    }

    let deleteButton;

    let userId = getUserId();

    if (!getUserId()) {
      deleteButton = "";
    } else {
      deleteButton = `
        <div class="post-delete">
          <button data-post-id="${userPost.id}" class="header-button delete-button">Удалить</button>
        </div>
        `
    }

    return `
    <li class="post">
      <div class="post-header" data-user-id="${userPost.user.id}">
          <img src="${userPost.user.imageUrl}" class="post-header__user-image">
          <p class="post-header__user-name">${userPost.user.name}</p>
      </div>
      <div class="post-image-container">
        <img class="post-image" src="${userPost.imageUrl}">
      </div>
      <div class="post-footer">
        <div class="post-likes">
          <button data-post-id="${userPost.id}" data-post-is-liked="${userPost.isLiked}" class="like-button">
          <${userPost.isLiked > 0 ? 'img src="./assets/images/like-active.svg"' : 'img src="./assets/images/like-not-active.svg"'}>
          </button>
          <p class="post-likes-text">
            Нравится: <strong>${messageForLike}</strong>
          </p>
        </div>
        ${userPost.user.id === userId ? deleteButton : ""}
      </div>
      <p class="post-text">
        <span class="user-name">${userPost.user.name}</span>
        ${userPost.description}
      </p>
      <p class="post-date">
        ${formatDistanceToNow(userPost.createdAt, { addSuffix: true, locale: ru })}
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

  renderLike();
  renderDeletePost();
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
