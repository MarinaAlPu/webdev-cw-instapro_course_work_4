import { getToken, posts, renderApp, updatePosts } from "../index";
import { deletePost } from "../api";


export const renderDeletePost = () => {
  const deleteButtons = document.querySelectorAll(".delete-button");

  for (const deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();

      const postId = deleteButton.dataset.postId;

      // отфильтровать все посты, кроме того, у которого нажали кнопку удалить
      let newPostsList = posts.filter(post => post.id !== postId);

      let token = getToken();

      deletePost(token, postId)
          .then((data) => {
            alert(data.error);
            
            updatePosts(newPostsList)
            renderApp();
          })
          .catch(() => {
            renderApp();
          })
    })
  }
}
