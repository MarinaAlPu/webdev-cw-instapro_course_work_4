import { getToken, posts, renderApp, updatePosts } from "../index";
import { deletePost } from "../api";


export const renderDeletePost = () => {
  const deleteButtons = document.querySelectorAll(".delete-button");

  for (const deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();

      const postId = deleteButton.dataset.postId;
      // console.log("Это postId: ", postId);

      const currentPost = posts.find(post => post.id === postId);
      // console.log("Это пост, на котором нажали кнопку 'Удалить':");
      // console.log(currentPost);

      // отфильтровать все посты, кроме того, у которого нажали кнопку удалить
      let newPostsList = posts.filter(post => post.id !== postId);
      // console.log("\nСписок постов после удаления поста:");
      // console.log(newPostsList);

      let token = getToken();
      // console.log("Это token: ", token);

      deletePost(token, postId)
          .then((data) => {
            // console.log("Это data: ", data);
            
            alert(data.error);
            
            updatePosts(newPostsList)
            // console.log("\nСписок постов после обновления после удаления поста:");
            // console.log(newPostsList);

            renderApp();
          })
          .catch((error) => {
            // console.log("Ошибка при удалении поста", error);
            // alert("Не удалось удалить пост. Попробуйте ещё раз");
            renderApp();
          })
    })
  }
}
