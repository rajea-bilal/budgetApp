// Global variables
const incomeBtn = document.querySelector('.incomeBtn')
const incomeNameInput = document.querySelector('.incomeName')
const incomeAmountInput = document.querySelector('.incomeAmount')

const expenseBtn = document.querySelector('.expenseBtn')
const expenseNameInput = document.querySelector('.expenseName')
const expenseAmountInput = document.querySelector('.expenseAmount')

const expenseDisplayArea = document.querySelector('.expenseDisplay')

// User adds income
incomeBtn.addEventListener('click', async(event) => {
    event.preventDefault()
   
    const incName = incomeNameInput.value
    const incAmount = incomeAmountInput.value
    console.log(incAmount)
    const incomeObject = {
        name: incName,
        amount: incAmount,
    }

    const route = 'income'
    talkToBackend(incomeObject, route)
    
})
  

// User adds expense
expenseBtn.addEventListener('click', async(event) => {
    event.preventDefault()
   
    const exName = expenseNameInput.value
    const exAmount = expenseAmountInput.value
   
    const expenseObject = {
        name: exName,
        amount: exAmount,
    }

    const route = 'expense'
    const result = await talkToBackend(expenseObject, route)
   
}) 

// talking to the backend
async function talkToBackend(data, route) {
    console.log(data)
    try {
    const response = await fetch(`http://localhost:5000/${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Adjust the content type if necessary
        // Add any other headers as needed
      },
      body: JSON.stringify(data), // Convert the data to a JSON string
    });

    const responseData = await response.json();
    // Handle the response data here
    console.log('Success:', responseData);
    const result = responseData.data
    populateData(result)
  } catch (error) {
    // Handle any errors here
    console.error('Error:', error);
  }

}


// display expenses
function populateData(data) {
   
    const card = document.createElement('div')
    card.textContent = data.amount
    expenseDisplayArea.appendChild(card)
}



// export async function calculateTotal() {
//   // Reset Balance
//   let balance = 0;

//   // Get all income
//   const incomes = await fetch("http://localhost:5000/income");
//   const incomeResult = await incomes.json();
//   const incomeData = incomeResult.data;

//   // console.log(incomeData);

//   for (let i = 0; i < incomeData.length; i++) {
//     const item = incomeData[i];
//     const amount = parseInt(item.amount); // Convert amount to a number
//     balance += amount;
//   }

//   // Get all expenses
//   const expenses = await fetch("http://localhost:5000/expense");
//   const expensesResult = await expenses.json();
//   const expenseData = expensesResult.data;

//   // console.log(expenseData);

//   for (let i = 0; i < expenseData.length; i++) {
//     const item = expenseData[i];
//     const amount = parseInt(item.amount); // Convert amount to a number
//     balance -= amount;
//   }

//   // return balance
//   console.log(balance);
//   return balance;
// }

// calculateTotal();

