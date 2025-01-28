export function initLinks(isLogin) {
    const wrapper = document.querySelector('.wrapper');
    const registerLink = document.querySelector('.register-link');
    const loginLink = document.querySelector('.login-link');

    if (isLogin) {
        registerLink.onclick = () => {
          wrapper.classList.add('active');
        };
        
      } else {
        loginLink.onclick = () => {
          wrapper.classList.remove('active');
        };
      }
}
