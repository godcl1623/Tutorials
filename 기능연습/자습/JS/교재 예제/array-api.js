// Q1. make a string out of an array
{
  const fruits = ['apple', 'banana', 'orange'];
  console.log(fruits.toString(...fruits));
}

// Q2. make an array out of a string
{
  const fruits = '🍎, 🥝, 🍌, 🍒';
  console.log(Array.from(fruits));
}

// Q3. make this array look like this: [5, 4, 3, 2, 1]
{
  const array = [1, 2, 3, 4, 5];
  console.log(array.reverse());
}

// Q4. make new array without the first two elements
{
  const array = [1, 2, 3, 4, 5];
  console.log(array.splice(2, 3));
}

class Student {
  constructor(name, age, enrolled, score) {
    this.name = name;
    this.age = age;
    this.enrolled = enrolled;
    this.score = score;
  }
}
const students = [
  new Student('A', 29, true, 45),
  new Student('B', 28, false, 80),
  new Student('C', 30, true, 90),
  new Student('D', 40, false, 66),
  new Student('E', 18, true, 88),
];

// Q5. find a student with the score 90
{
  console.log(students.find(student => student.score === 90));
}

// Q6. make an array of enrolled students
{
  console.log(students.filter(student => student.enrolled === true));
}

// Q7. make an array containing only the students' scores
// result should be: [45, 80, 90, 66, 88]
{
  console.log(students.map(student => student.score));
}

// Q8. check if there is a student with the score lower than 50
{
  console.log(students.some(student => student.score < 50));
}

// Q9. compute students' average score
{
  const arr1 = students.map(student => student.score);
  const arr2 = arr1.reduce((prevValue, currValue) => {
    return prevValue + currValue;
  }, 0);
  const arr3 = arr2 / 5;
  console.log(arr3);
}

// Q10. make a string containing all the scores
// result should be: '45, 80, 90, 66, 88'
{
  const arr1 = students.map(student => student.score);
  console.log(`'${arr1.toString()}'`);
}

// Bonus! do Q10 sorted in ascending order
// result should be: '45, 66, 80, 88, 90'
{
  const arr1 = students.map(student => student.score);
  const arr2 = arr1.sort((prev, now) => prev < now ? -1 : 1);
  console.log(`'${arr2.toString()}'`);
}
