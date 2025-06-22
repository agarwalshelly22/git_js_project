//Data
const account1 = {
  owner: "Nitin Shrivastav",
  movements: [200, 450, -400, 3000, 650, -130, 70, 1300],
  interest: 6,
  pin: 1111,
  //username:"ns"      add new key in all dynamically
};
const account2 = {
  owner: "Ravi Baliyan",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interest: 6,
  pin: 1234,
};
const account3 = {
  owner: "Rahul Sharma",
  movements: [200, -200, -340, -300, -20, 50, 400, 460],
  interest: 5.5,
  pin: 1212,
};
const account4 = {
  owner: "Kaushal singh",
  movements: [430, 1000, 700, 50, 90],
  interest: 7,
  pin: 1234,
};

const accounts = [account1, account2, account3, account4];
// console.log(account1.owner);
//console.log(account1.pin);

//Elements

const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance-value");
const labelSumIn = document.querySelector(".summary-value-in");
const labelSumOut = document.querySelector(".summary-value-out");
const labelSumInterest = document.querySelector(".summary-value-interest");
const labelTimer = document.querySelector(".timer");
const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements"); // for Account-1

const btnLogin = document.querySelector(".login-btn");
const btnTransfer = document.querySelector(".form-btn-transfer");
const btnLoan = document.querySelector(".form-btn-loan");
const btnClose = document.querySelector(".form-btn-close");
const btnSort = document.querySelector(".btn-sort");
const inputLoginUsername = document.querySelector(".login-input-user");
const inputLoginPin = document.querySelector(".login-input-pin");
const inputTransferTo = document.querySelector(".form-input-to");
const inputTransferAmount = document.querySelector(".form-input-amount");
const inputLoanAmount = document.querySelector(".form-input-loan-amount");
const inputCloseUsername = document.querySelector(".form-input-user");
const inputClosePin = document.querySelector(".form-input-pin");

//logic

//  <div class="movements">
//             <div class="movements-row">
//                 <div class="movements-type movements-type-deposit">2 deposit</div>
//                 <div class="movements-date">3 days ago</div>
//                 <div class="movements-value">4 000€</div>
//             </div>
//             <div class="movements-row">
//                 <div class="movements-type movements-type-withdrawal">
//                     1 withdrawal
//                 </div>
//                 <div class="movements-date">24/01/2037</div>
//                 <div class="movements-value">-378€</div>
//             </div>
//         </div>

//*********Add new key**********
console.log("====Create User name====");

const createusername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((el) => el[0])
      .join("");
  });
};
createusername(accounts);
console.log(accounts);

//const movements = [200, 450, -400, 3000, 650, -130, 70, 1300];

console.log("=======Bind elements=======");

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";
  //add sort logic using ternery operator--
  const movs = sort
    ? movements.slice().sort(function (a, b) {
        if (a > b) return -1;
        if (a < b) return 1;
      })
    : movements;

  movs.forEach(function (mov, i) {
    const row = `<div class= "movements-row">
            <div class="movements-type movements-type-deposit"> 2 deposit</div>
                <div class="movements-date">3 days ago</div>
                <div class="movements-value">${mov}</div>
            </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", row);
  });
};
//displayMovements(account1.movements);   //  Row Data Bind in array for account1 only

//------sort---------
console.log("=======Sort==========");
let sorted=false;
btnSort.addEventListener("click", function (e) {
e.preventDefault();
displayMovements(currentAccount.movements , !sorted)
sorted= !sorted
});

console.log("========Calculate Balance(right)========");

const calDisplayBalance = function (cur_acc) {
  // let balance = movements.reduce(function (acc, mov) {  for temp variable in balance
  cur_acc.balance = cur_acc.movements.reduce(function (acc, mov) {
    //for temp variable in balance
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${cur_acc.balance}Rs`;
};
//calDisplayBalance(account1.movements)

console.log("=======In/Out/Interest========");

const CalcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}Rs`;

  const outcome = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${outcome}Rs`;

  const SumInterest = acc.movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * acc.interest) / 100)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumInterest.textContent = `${SumInterest}Rs`;
};
//CalcDisplaySummary(account1.movements);

// ---------------------Login User--------------

console.log("====Login User====");

let currentAccount;
btnLogin.addEventListener("click", function (e) {
  //Prevent form from submitting
  e.preventDefault();
  // console.log("Hello");
  //const username = inputLoginUsername.value;
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  // checking condition with Pin
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log("Logged in");

    labelWelcome.textContent = `Welcome back, ${currentAccount.owner}`;
    containerApp.style.opacity = 1;
    inputLoginPin.value = inputLoginUsername.value = "";
    inputLoginPin.blur();

    //Update UI bind data for current user account
    displayMovements(currentAccount.movements);
    //calDisplayBalance(currentAccount.movements);
    calDisplayBalance(currentAccount);
    //CalcDisplaySummary(currentAccount.movements); remove array to generate dynamic PIN
    CalcDisplaySummary(currentAccount);
  } else {
    console.log("error");
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const Trans_amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  ); // to find username which it will be sent
  inputTransferTo.value = inputTransferAmount.value = "";

  if (
    Trans_amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= Trans_amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-Trans_amount);
    receiverAcc.movements.push(Trans_amount);
    displayMovements(currentAccount.movements);
    calDisplayBalance(currentAccount);
    CalcDisplaySummary(currentAccount);
  }
});



//*******Tutorial*********

// **********Map method - return Array using mathmatical(*) operations and can mutate*********

const movements = [200, 450, -400, 3000, 650, -130, 70, 1300];

console.log("========Map Method and mutate with new array=========");
const rsToDollar = 86.25;
const newMov = movements.map(function (el, i, arr) {
  return el * rsToDollar;
  // return "hello";
});
console.log(newMov);

//OR

//********By Arrow function****** => One linear function, remove return with braces

console.log("========Map using Arrow Method========");
const rsToDollar1 = 86.25;
const newMov1 = movements.map((el, i, arr) => el * rsToDollar);
console.log(newMov1);

//*******Filter - Return Array using operator >, < ***********

console.log("=========filter Method=========");
const deposits = movements.filter(function (el, i, arr) {
  return el > 0;
});
console.log(deposits);

//OR

// By Arrow function => One linear function, remove braces with return values

console.log("==========Filter using Arrow Method=========");
const withdrawals = movements.filter((mov) => mov < 0);
console.log(withdrawals);

//**********Reduce Method- return SUM ********** */
console.log("========reduce Method (Accumulator)=======");
const balance = movements.reduce(function (acc, curr, currI, arr) {
  return acc + curr;
}, 0);
console.log(balance);

// *************Find Method -- Return element *****************
console.log("========find Method =======");

const firstWithdrawal = movements.find((mov) => mov < 0); // movements is array
console.log(firstWithdrawal); //-400 --> return single element(num, array, object, any type)

// ---accounts is an array an object using foreach method---
accounts.forEach(function (element) {
  console.log(element); // return all object elements using foreach help
});

// find returns - true or false (store in variable) --
const account = accounts.find(function (el) {
  //console.log(accounts);
  return true; // return first account of object
});
console.log(account); //{owner: 'Nitin Shrivastav', movements: Array(8), interest: 6, pin: 1111}

//return an account whose owner name is Rahul srivastva using "Find Method"
const acc1 = accounts.find(function (el) {
  //console.log(accounts);
  return el.owner === "Rahul Sharma"; // return first account of object
});
console.log(acc1);

// ************Some and Every Method-- return boolean ***************
console.log("========Some and Every Method===========");

console.log(movements);
[200, 450, -400, 3000, 650, -130, 70, 1300];
console.log(movements.includes(250)); //false  (returns boolean, SOME checking "atleast one true" )

console.log(movements.some((mov) => mov >= 200)); //true
console.log(movements.some((mov) => mov >= 4000)); //false
console.log(movements.some((mov) => mov >= 0)); //True

// ------------------Every--------------
console.log(movements.every((mov) => mov >= 0)); // false--- (Every elements should be true)
console.log(movements.every((mov) => typeof mov >= "number")); //true

// ***********Differences between Some,Every,Filter***************

console.log("========Diff Some and Every and Filter===========");

const deposit = function (el) {
  return el > 0;
};
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

// --------------------Flat and FlatMap------------------------------

console.log("========Flat and FlatMap=========");
const Nest_arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(Nest_arr); // [Array(3), Array(3), 7, 8]
// Will use Flat Method working as spreader
console.log(Nest_arr.flat()); // [1, 2, 3, 4, 5, 6, 7, 8]

const arrDeep = [[1, [2, 3]], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat()); // [1, Array(2), 4, Array(2), 7, 8]
console.log(arrDeep.flat(2)); // [1, 2, 3, 4, 5, 6, 7, 8]  -- for 2 level deep

//Flat
const overallBalance = accounts
  .map((acc) => acc.movements) // [Array(8), Array(8), Array(8), Array(5)]
  .flat() // [200, 450, -400, 3000, 650, -130, 70, 1300, 5000, 3400, -150, -790, -3210, -1000, 8500, -30, 200, -200, -340, -300, -20, 50, 400, 460, 430, 1000, 700, 50, 90]
  .reduce((acc, el) => acc + el, 0); //19380
console.log(overallBalance);

//FlatMap
const overallBalance1 = accounts.flatMap((acc) => acc.movements); // [200, 450, -400, 3000, 650, -130, 70, 1300, 5000, 3400, -150, -790, -3210, -1000, 8500, -30, 200, -200, -340, -300, -20, 50, 400, 460, 430, 1000, 700, 50, 90]
console.log(overallBalance1);

//--------------------String-------------------------

console.log("=====String======");

//string (Mutate original array)

const owners = ["Rahul", "Vishal", "Nitin", "Ravi"];
console.log(owners.sort()); //['Nitin', 'Rahul', 'Ravi', 'Vishal']
console.log(owners); // ['Nitin', 'Rahul', 'Ravi', 'Vishal']

//Numbers (doesn't work )

console.log(movements); //200, 450, -400, 3000, 650, -130, 70, 1300]
console.log(movements.sort()); // [-130, -400, 1300, 200, 3000, 450, 650, 70]

//return < 0, A, B (keep order)
//return >0, B,A (Switch Order)

//Ascending
console.log(
  movements.sort(function (a, b) {
    if (a > b) return 1; //[200, 450, -400, 3000, 650, -130, 70, 1300]
    if (a < b) return -1; // [-130, -400, 1300, 200, 3000, 450, 650, 70]
  })
);

//Decending
console.log(
  movements.sort(function (a, b) {
    if (a > b) return -1; //[-400, -130, 70, 200, 450, 650, 1300, 3000]
    if (a < b) return 1; //  [3000, 1300, 650, 450, 200, 70, -130, -400]
  })
);

//************Foreach****************

//const movements = [200, 450, -400, 3000, 650, -130, 70, 1300];

//Simple "Array method"

//use slice instead (non-mutating): If you only need a shallow "copy"  .
// Use splice : when you need to "edit" the original array directly.

//  1. Slice Method-- make a photocopy, and leave the original intact.
// slice (startIndex, endIndex) returns a new array containing elements
//  from startIndex up to—but not including—endIndex.

let arr = ["a", "b", "c", "d", "e"];

console.log("========Slice========");
console.log(arr.slice(2)); // ---->not include last index ['c', 'd', 'e']
console.log(arr.slice(2, 4)); //  ['c', 'd']
console.log(arr.slice(-2)); //   <---all elements ['d', 'e']
console.log(arr.slice(1, -2)); //['b', 'c']
//console.log(arr) //['a', 'b', 'c', 'd', 'e']
console.log(arr.slice());
console.log([...arr]);

//  2 . Splice Method--is a mutating method that lets you remove, replace, and/or insert elements in an array at a specified index.
console.log("=======Splice========");
console.log(arr.splice(-1));
console.log(arr); // ["a", "b", "c", "d"]
console.log(arr.splice(1, 2)); //1 index and 2 emement  ["b", "c"]
console.log(arr);

//  3. Reverse Method--

arr = ["a", "b", "c", "d", "e"];
const arr2 = ["j", "i", "h", "g", "f"];
console.log(arr2.reverse()); // ['f', 'g', 'h', 'i', 'j']
console.log(arr2); // ['f', 'g', 'h', 'i', 'j'] Reverse effect oroginal array

// 4. Concat Method
const letters = arr.concat(arr2);
console.log(letters);
console.log(arr2);

// 5. Join Method
console.log(letters.join(" ")); //join array as a string
console.log(arr.join(",")); // join array into a string in comma sep

// 6. New at Method
const arr3 = [23, 11, 64];
console.log(arr3[0]); //  23
console.log(arr3.at(0)); // 23
console.log(arr3[-1]); // undefined
console.log(arr3.at(-1)); // 64

console.log("Rahul"[0]); // R
console.log("Rahul".at(0)); // R
console.log("Rahul".at(-1)); // l

//Looping array: ForEach

// const movements = [200, 450, -400, 3000, 650, -130, 70, 1300];

console.log("=========For Loop===========");
for (let i = 0; i < movements.length; i++) {
  if (movements[i] > 0) {
    console.log(`Movement ${i + 1}: you deposited ${movements[i]}`);
  } else {
    console.log(`Movement ${i + 1}: you withdrew ${Math.abs(movements[i])}`);
  }
}

console.log("=======For of loop=======");

for (let [i, el] of movements.entries()) {
  console.log(i, el); //as movement
  if (el > 0) {
    console.log(`Movement ${i + 1}: You deposited ${el}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(el)}`);
  }
}

// OR

// for (let movement of movements.entries()) {
//     console.log(movement[0], movement[1]);
// }

// for (let movement of movements) {
//     if (movement > 0) {
//         console.log(`Movement: You deposited ${movement}`);
//     }
//     else {
//         console.log(`movement: You withdrew ${Math.abs(movement)}`);
//     }
// }

console.log(movements);
console.log(movements.entries());

console.log("=======For Each (no return- void)========");

movements.forEach(function (mov, i, array) {
  //mov = value, i= Index
  // console.log(mov, i);
  // console.log(array);
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});

// ================================================================================================================

// 200 0,
// 450 1,
// -400 2...so on

//------Map using ForEach loop------

// const person= new Map();
// person.set("name","shally");

// person.forEach(function(value,key,array){

// console.log(key,value);
// });
