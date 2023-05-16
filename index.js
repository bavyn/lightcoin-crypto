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
    this.time = new Date();
    this.account.addTransaction(this);
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");
console.log('Starting balance: ', myAccount.balance);

const t1 = new Deposit(500, myAccount);
t1.commit();
console.log('New balance: ', myAccount.balance);

const t2 = new Withdrawal(200, myAccount);
t2.commit();

console.log('Ending balance:', myAccount.balance);
