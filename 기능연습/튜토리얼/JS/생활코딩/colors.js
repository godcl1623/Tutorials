var objectBody = {
  setBgColor:function(color) {
    // document.querySelector('body').style.backgroundColor = color;
    $('body').css('backgroundColor', color);
  },
  setColor:function(color) {
    // document.querySelector('body').style.color = color;
    $('body').css('color', color);
  }
}
var objectAlist = {
  setAColor:function(color) {
    // var alist = document.querySelectorAll('a');
    // var i = 0;
    // while (i < alist.length) {
    //   alist[i].style.color = color;
    //   i = i + 1;
    // }
    $('a').css('color', color);
  }
}
function dayNightHandler(self) {
  if (self.value === 'night') {
    objectBody.setBgColor('black');
    objectBody.setColor('white');
    self.value = 'day';

    objectAlist.setAColor('powderblue');
  } else {
    objectBody.setBgColor('white');
    objectBody.setColor('black');
    self.value = 'night';

    objectAlist.setAColor('blue');
  }
}		