const form = document.getElementById("expense-form");
const textInput = document.getElementById("text");
const amountInput = document.getElementById("amount");
const expenseList = document.getElementById("expense-list");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense(description, amount) {
  if (description.trim() === "" || amount === "") {
    alert("Please provide description and amount.");
    return;
  }

  const expense = {
    id: Math.floor(Math.random() * 1000000),
    description,
    amount: +amount,
  };

  expenses.push(expense);
  updateLocalStorage();
  renderExpenses();
  textInput.value = "";
  amountInput.value = "";
}

function removeExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);
  updateLocalStorage();
  renderExpenses();
}

function updateLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function renderExpenses() {
  expenseList.innerHTML = "";
  expenses.forEach((expense) => {
    
    const li = document.createElement("li");
    li.innerHTML = `${expense.description} <span>${expense.amount}</span> <button onclick="removeExpense(${expense.id})">X</button>`;
    expenseList.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addExpense(textInput.value, amountInput.value);
});

renderExpenses();
