import React from "react";
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  introduce() {
    return `Hi, my name is ${this.name} and I am ${this.age} years old.`;
  }
}
class Student extends Person {
  constructor(name, age, scores = []) {
    super(name, age);
    this.scores = scores;
  }
  calculateAverageScore() {
    if (this.scores.length === 0) {
      return 0;
    }
    const totalScore = this.scores.reduce((acc, score) => acc + score, 0);
    return totalScore / this.scores.length;
  }
  displayInfo() {
    const averageScore = this.calculateAverageScore();
    return `${this.introduce()} My average score is ${averageScore.toFixed(2)}.`;
  }
}

function DemoES6() {
  const person1 = new Person("Alice", 25);
  console.log(person1.introduce());
  //rest parameter
  function createScores(...scores) {
    return scores;
  }
  const student1 = new Student("Bob", 20, createScores(5, 9, 8));
  console.log(student1.displayInfo());
  //destructuring assignment
  const [score1, ...score2] = student1.scores;
  console.log(`First score: ${score1}`);
  console.log(`Remaining scores: ${score2.join(", ")}`);
  //spread operator
  const newScores = [...student1.scores, 10];
  console.log(`New scores: ${newScores.join(", ")}`);
  //array methods: passed >=8
  //filter method
  const passedScores = student1.scores.filter((score) => score >= 8);
  console.log(`Passed scores: ${passedScores.join(", ")}`);
  //map() add 0.5 to each score
  const updatedScores = student1.scores.map((score) => score + 0.5);
  console.log(`Updated scores: ${updatedScores.join(", ")}`);
  //redure() : average score
  const total = student1.scores.reduce((sum, score) => sum + score, 0);
  const average = total / student1.scores.length;
  //promist: average score >= 8 - Excellent Student
  function evaluateStudent(average) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (average >= 8) {
          resolve("Excellent Student!");
        } else {
          resolve("Need Improvement");
        }
      });
    }, 1000);
  }
  evaluateStudent(average).then((result) => {
    console.log("Result: ", result);
  });
  return (
    <div>
      <h2>DEMO ES6</h2>
    </div>
  );
}

export default DemoES6;
