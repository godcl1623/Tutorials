const title = document.querySelector('.title');
const BaseColor = 'tomato';
const ChangeColor = 'white';
function colorChanger() {
  const currentColor = title.style.color;
  if (currentColor === BaseColor) {
    title.style.color = ChangeColor;
  } else {
    title.style.color = BaseColor;
  }
}
document.addEventListener('click', colorChanger);