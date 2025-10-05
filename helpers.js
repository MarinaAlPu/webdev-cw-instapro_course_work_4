export function saveUserToLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user));
}

// export function getUserFromLocalStorage(user) {
export function getUserFromLocalStorage() {
  try {
    const user = JSON.parse(window.localStorage.getItem("user"));
    return userData ? JSON.parse(user) : null;
  } catch (error) {
    // console.log("Пользователь не залогинен");
    return null;
  }
}

export function removeUserFromLocalStorage(user) {
  window.localStorage.removeItem("user");
}
