//let balance = 500.00;

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let ik of this.transactions) {
      balance += ik.value
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("Karma");

console.log('Starting balance: ', myAccount.balance);
console.log("------------------------------------");

// attempt to withdraw when balance is zero to test commit isAllowed
console.log('Testing withdrawal amount that exceeds account balance');
const t1 = new Withdrawal(10, myAccount);
console.log('Commit possible?', t1.commit());
console.log('Account balance: ', myAccount.balance);
console.log("------------------------------------");

// deposit
console.log('Testing deposit');
const t2 = new Deposit(1000000000, myAccount);
console.log('Commit possible?', t2.commit());
console.log('Account balance: ', myAccount.balance);
console.log("------------------------------------");

// withdrawal that should now be possible
console.log('Testing withdrawal');
const t3 = new Withdrawal(200, myAccount);
console.log('Commit possible?', t3.commit());
console.log('Account balance: ', myAccount.balance);
console.log("------------------------------------");

// print transaction history
console.log('Transaction history: ', myAccount.transactions);
