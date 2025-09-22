import { renderHeaderComponent } from "./header-component";
import { renderUploadImageComponent } from "./upload-image-component";
// import { addPost } from "../api";


export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    let postImageUrl = "";

    // @TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      Cтраница добавления поста
      <div id="postImage" class="upload-image-container">Тут будет картинка</div>
      <textarea id="postText" type="textarea" class="textarea" placeholder="Введите текст поста" rows="4"></textarea>
      <button class="button" id="add-button">Добавить</button>
    </div>
  `;

    appEl.innerHTML = appHtml;

    // рендерим компонент загрузки изображения
    const uploadImageContainer = document.getElementById("postImage");
    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: uploadImageContainer,
        onImageUrlChange(newImageUrl) {
          postImageUrl = newImageUrl;
        },
      });
    }


    document.getElementById("add-button").addEventListener("click", () => {
      const postEl = document.getElementById("postText");
      const postDescription = postEl.value;


      onAddPostClick({
        // description: "Описание картинки",
        description: postDescription,
        // imageUrl: "https://image.png",
        imageUrl: postImageUrl,
      });
    });
  };

  render();
  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });
}
