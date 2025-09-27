import { getPosts, getUserPosts, addPost } from "./api";
import { renderAddPostPageComponent } from "./components/add-post-page-component";
import { renderAuthPageComponent } from "./components/auth-page-component";
import {
  ADD_POSTS_PAGE,
  AUTH_PAGE,
  LOADING_PAGE,
  POSTS_PAGE,
  USER_POSTS_PAGE,
} from "./routes";
import { renderPostsPageComponent, renderUserPostsPageComponent } from "./components/posts-page-component";
import { renderLoadingPageComponent } from "./components/loading-page-component";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  saveUserToLocalStorage,
} from "./helpers";

export let user = getUserFromLocalStorage();
export let page = null;
export let posts = [];

export const getToken = () => {
  const token = user ? `Bearer ${user.token}` : undefined;
  return token;
};

export const getUserId = () => {
  // console.log(user);
  // console.log(user._id);
  const userId = user._id;
  return userId;
};

export const updatePosts = (newPosts) => {
  posts = newPosts;
};

export const logout = () => {
  user = null;
  removeUserFromLocalStorage();
  goToPage(POSTS_PAGE);
};

/**
 * Включает страницу приложения
 */
export const goToPage = (newPage, data) => {
  if (
    [
      POSTS_PAGE,
      AUTH_PAGE,
      ADD_POSTS_PAGE,
      USER_POSTS_PAGE,
      LOADING_PAGE,
    ].includes(newPage)
  ) {
    if (newPage === ADD_POSTS_PAGE) {
      /* Если пользователь не авторизован, то отправляем его на страницу авторизации перед добавлением поста */
      page = user ? ADD_POSTS_PAGE : AUTH_PAGE;
      return renderApp();
    }

    if (newPage === POSTS_PAGE) {
      page = LOADING_PAGE;
      renderApp();

      return getPosts({ token: getToken() })
        .then((newPosts) => {
          page = POSTS_PAGE;
          posts = newPosts;
          renderApp();
        })
        .catch((error) => {
          console.error(error);
          goToPage(POSTS_PAGE);
        });
    }

    if (newPage === USER_POSTS_PAGE) {
      // @@TODO: реализовать получение постов юзера из API
      // console.log("Открыть страницу пользователя: ", data.userId);
      page = LOADING_PAGE;
      renderApp();

      const appEl = document.getElementById("app");
      // console.log("\nЭто appEl:");
      // console.log(appEl);

      return getUserPosts({ token: getToken() }, data.userId)
        .then((userPosts) => {
          // console.log("\nЭто data.userId в getUserPosts:");
          // console.log(data.userId);

          // console.log("\nЭто userPosts в getUserPosts:");
          // console.log(userPosts);

          page = USER_POSTS_PAGE;
          posts = userPosts;

          // renderUserPostsPageComponent(appEl, data.userId); // лишний вызов, есть в renderApp()
          renderApp();
        })
        .catch((error) => {
          console.error(error);
          goToPage(POSTS_PAGE);
        });

    }

    page = newPage;
    renderApp();

    return;
  }

  throw new Error("страницы не существует");
};

export const renderApp = () => {
  const appEl = document.getElementById("app");
  if (page === LOADING_PAGE) {
    return renderLoadingPageComponent({
      appEl,
      user,
      goToPage,
    });
  }

  if (page === AUTH_PAGE) {
    return renderAuthPageComponent({
      appEl,
      setUser: (newUser) => {
        user = newUser;
        saveUserToLocalStorage(user);
        goToPage(POSTS_PAGE);
      },
      user,
      goToPage,
    });
  }

  if (page === ADD_POSTS_PAGE) {
    return renderAddPostPageComponent({
      appEl,
      onAddPostClick({ description, imageUrl }) {
        // @TODO: реализовать добавление поста в API
        // console.log("Добавляю пост...", { description, imageUrl });


        addPost(getToken(), description, imageUrl)
          .then(() => {
            goToPage(POSTS_PAGE);
          })
          .catch((error) => {
            // console.log("\nОшибка при добавлении поста: ", error.message);
            alert(`Ошибка при добавлении поста: ${error.message}`);
          })
      },
    });
  }

  if (page === POSTS_PAGE) {
    return renderPostsPageComponent({
      appEl,
    });
  }

  if (page === USER_POSTS_PAGE) {
    // @TODO: реализовать страницу с фотографиями отдельного пользвателя
    // appEl.innerHTML = "Здесь будет страница фотографий пользователя";
    // return;
    return renderUserPostsPageComponent(appEl, getUserId())
  }
};

goToPage(POSTS_PAGE);
