const button = document.querySelector('button');

button.addEventListener('click', () => {
  // document.querySelector('div').style.display = 'block';
  document.querySelector('iframe').style.display = 'block';
});

const iframeEle = document.querySelector('iframe');
const iframeDocument = iframeEle.contentWindow.document;
const iframeP = iframeDocument.querySelector('p');

/*iframeP.addEventListener('click', (e) => {
  console.log(e);
});
*/
