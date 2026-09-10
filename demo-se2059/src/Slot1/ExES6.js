class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    console.log(`Xin chào, tôi là ${this.name}, ${this.age} tuổi.`);
  }
}

class Student extends Person {
  constructor(name, age, scores = []) {
    super(name, age);
    this.scores = scores;
  }

  calculateAverage() {
    if (this.scores.length === 0) return 0;
    const total = this.scores.reduce((sum, score) => sum + score, 0);
    return total / this.scores.length;
  }

  displayInfo() {
    console.log(`Tên: ${this.name}`);
    console.log(`Tuổi: ${this.age}`);
    console.log(`Điểm: ${this.scores}`);
    console.log(`Điểm trung bình: ${this.calculateAverage().toFixed(2)}`);
  }
}

function createScores(...scores) {
  return scores;
}

function evaluatePerformance(avgScore) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (avgScore >= 8) {
        resolve("Excellent Student");
      } else {
        resolve("Need Improvement");
      }
    }, 1000);
  });
}

const p = new Person("Nguyen Van A", 20);
p.introduce();

const scores = createScores(8, 9, 10, 4, 7);
console.log(scores);

const s = new Student("Tran Thi B", 21, scores);
s.introduce();
s.displayInfo();

const { name, age } = s;
console.log(name, age);

const newScores = [9, 8.5];
s.scores = [...s.scores, ...newScores];
console.log(s.scores);

const passed = s.scores.filter((score) => score >= 5);
console.log(passed);

const boosted = s.scores.map((score) => score + 0.5);
console.log(boosted);

const total = s.scores.reduce((sum, score) => sum + score, 0);
console.log(total);

const avg = s.calculateAverage();
evaluatePerformance(avg).then((result) => {
  console.log(result);
});

function ExES6() {
  return null;
}

export default ExES6;
