var a = 10;
if (a < 10) {
  console.log("a is less than 10");
} else {
  console.log("a is greater than 10");
}
a < 10 ? console.log("a is less than 10") : null

a < 10 && console.log("a is less than 10") 
a < 10 ? console.log("a is less than 10") : a > 10 ? console.log("a is greater than 10") : console.log("a is greater than 10");