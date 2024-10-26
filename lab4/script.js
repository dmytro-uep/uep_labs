(function () {
  console.log("Current URL:", window.location.href);
})();

const numbers = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

const doubledNumbers = numbers.map((num) => num * 2);
console.log("Doubled numbers:", doubledNumbers);

const filteredNumbers = numbers.filter((num) => num > 25);
console.log("Numbers greater than 25:", filteredNumbers);

const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log("Sum of all numbers:", sum);

function multiply(a, b) {
  return a * b;
}

const numbersForMultiply = [5, 10];
const result = multiply(...numbersForMultiply);
console.log("Multiplication result:", result);

const mySet = new Set();
mySet.add(1);
mySet.add(2);
mySet.add(2);
mySet.add(3);
mySet.add(3);
mySet.add(4);

console.log("Set elements:");
for (let item of mySet) {
  console.log(item);
}

const user = {
  name: "John",
  getName: function () {
    return `User name is: ${this.name}`;
  },
};

const admin = {
  name: "Admin",
};

const getAdminName = user.getName.bind(admin);
console.log(getAdminName());

function createAdvancedCounter() {
  let count = 0;

  return {
    increment: function () {
      count++;
      return count;
    },
    decrement: function () {
      count--;
      return count;
    },
    getCount: function () {
      return count;
    },
  };
}

const counter = createAdvancedCounter();
console.log("Initial count:", counter.getCount());
console.log("After increment:", counter.increment());
console.log("After increment:", counter.increment());
console.log("After decrement:", counter.decrement());
