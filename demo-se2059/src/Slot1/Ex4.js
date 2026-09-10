import React from 'react';
import logo from '../logo.svg';

// ============================================================
// PART 2: USING ES6 AND JSX (Console Log Only)
// ============================================================

// 1. People Array
var people = [
  { name: 'Jack', age: 50 },
  { name: 'Michael', age: 9 },
  { name: 'John', age: 40 },
  { name: 'Ann', age: 19 },
  { name: 'Elisabeth', age: 16 }
];

console.log(people.find(p => p.age >= 10 && p.age <= 20));
console.log(people.filter(p => p.age >= 10 && p.age <= 20));
console.log(people.every(p => p.age >= 10 && p.age <= 20));
console.log(people.some(p => p.age >= 10 && p.age <= 20));

// 2. Array Reduce
var array = [1, 2, 3, 4];
console.log(array.reduce((acc, cur) => acc + cur, 0));
console.log(array.reduce((acc, cur) => acc * cur, 1));

// 3. Companies & Ages & Person
const companies = [
  { name: "Company One", category: "Finance", start: 1981, end: 2004 },
  { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
  { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
  { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
  { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
  { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
  { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
  { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
  { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
];

const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

const person = {
  name: "Costas",
  address: {
    street: "Lalaland 12"
  }
};

companies.forEach(c => console.log(c.name));
companies.filter(c => c.start > 1987).forEach(c => console.log(c.name));

const retailCompanies = companies
  .filter(c => c.category === 'Retail')
  .map(c => ({ ...c, start: c.start + 1 }));
console.log(retailCompanies);

console.log([...companies].sort((a, b) => a.end - b.end));
console.log([...ages].sort((a, b) => b - a));
console.log(ages.reduce((acc, age) => acc + age, 0));

const { name: cName, category: cCategory } = companies[0];
const newCompanyObj = {
  name: cName,
  category: cCategory,
  print() {
    console.log(this.name);
  }
};
newCompanyObj.print();

const sumUnknown = (...numbers) => numbers.reduce((sum, n) => sum + n, 0);
console.log(sumUnknown(1, 2, 3, 4, 5));

const collectArgs = (...args) => args.flat();
console.log(collectArgs(1, 'hello', [2, 3], 4));

const { address: { street } } = person;
console.log(street);

const createCounter = () => {
  let count = 0;
  return () => count++;
};
const counter = createCounter();
console.log(counter());
console.log(counter());

const getQueryParams = (url) => {
  const query = url.split('?')[1];
  return Object.fromEntries(new URLSearchParams(query));
};
console.log(getQueryParams("https://example.com?name=Costas&age=30"));

// 4. Classes
class Shape {
  constructor(color) {
    this.color = color;
  }
  getArea() {
    return 0;
  }
  toString() {
    return `Shape [color=${this.color}]`;
  }
}

class Rectangle extends Shape {
  constructor(color, length, width) {
    super(color);
    this.length = length;
    this.width = width;
  }
  getArea() {
    return this.length * this.width;
  }
  toString() {
    return `Rectangle [color=${this.color}, length=${this.length}, width=${this.width}, area=${this.getArea()}]`;
  }
}

class Triangle extends Shape {
  constructor(color, base, height) {
    super(color);
    this.base = base;
    this.height = height;
  }
  getArea() {
    return 0.5 * this.base * this.height;
  }
  toString() {
    return `Triangle [color=${this.color}, base=${this.base}, height=${this.height}, area=${this.getArea()}]`;
  }
}

const rect = new Rectangle('red', 10, 5);
console.log(rect.toString());
const tri = new Triangle('blue', 6, 4);
console.log(tri.toString());

// 5. Promises
const checkRandomNumber = () => {
  return new Promise((resolve, reject) => {
    const num = Math.floor(Math.random() * 10) + 1;
    if (num > 5) {
      resolve(num);
    } else {
      reject("Error");
    }
  });
};

checkRandomNumber()
  .then(val => console.log(val))
  .catch(err => console.log(err));

// ============================================================
// PART 1: JSX EXERCISES
// ============================================================

function Exercise1() {
  return (
    <div>
      <h1>
        Hello <span style={{ color: 'blue' }}>React</span>
      </h1>
    </div>
  );
}

function Exercise2() {
  return (
    <div style={{ textAlign: 'center', width: '300px' }}>
      <img src={logo} alt="React logo" style={{ width: '130px' }} />
      <hr style={{ width: '200px', borderColor: '#0284c7' }} />
      <p style={{ margin: '4px 0', fontStyle: 'italic', fontWeight: 'bold' }}>
        This is the React logo!
      </p>
      <p style={{ fontSize: '13px' }}>
        The library for web and native user interfaces
      </p>
    </div>
  );
}

function Exercise3() {
  return (
    <div>
      <nav style={{ backgroundColor: '#333', color: '#fff', padding: '10px' }}>
        <span style={{ backgroundColor: '#07ea16ff', padding: '2px 8px', marginRight: '15px' }}>Home</span>
        <span style={{ marginRight: '15px' }}>Search</span>
        <span style={{ marginRight: '15px' }}>Contact</span>
        <span>Login</span>
      </nav> 
    </div>
  );
}

function Exercise4() {
  return (
    <div>
      <h1 style={{ color: 'blue', fontWeight: 'bold' }}>This is JSX</h1>
    </div>
  );
}

function Exercise5() {
  const courses = ['React', 'ReactNative', 'NodeJs'];
  return (
    <div>
      <h2>Course names</h2>
      <ul style={{ fontSize: '18px', lineHeight: '1.8' }}>
        {courses.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  );
}

function Ex4() {
  return (
    <div style={{ maxWidth: '750px', margin: '20px auto', textAlign: 'left', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <Exercise1 />
      <hr style={{ margin: '24px 0' }} />
      <Exercise2 />
      <hr style={{ margin: '24px 0' }} />
      <Exercise3 />
      <hr style={{ margin: '24px 0' }} />
      <Exercise4 />
      <hr style={{ margin: '24px 0' }} />
      <Exercise5 />
    </div>
  );
}

export default Ex4;
