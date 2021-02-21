function myFunction() {
  console.dir(arguments);
  let args = Array.prototype.slice.apply(arguments);
  console.dir(args);
}
