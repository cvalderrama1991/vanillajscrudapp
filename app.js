// Submit Dialog and Submit Form Start
const openSubmitDialogBtn = document.querySelector("#open-submit-dialog-btn")
const submitDialog = document.querySelector("#submit-dialog")
const closeSubmitDialogBtn = document.querySelector("#close-submit-dialog-btn")
const submitForm = document.querySelector("#submit-form")
const firstNameInput = document.querySelector("#first-name-input")
const lastNameInput = document.querySelector("#last-name-input")
const emailInput = document.querySelector("#email-input")
const table = document.querySelector("#customer-table")
const template = document.querySelector("#template-table-row")
const LOCAL_STORAGE_PREFIX = "CUSTOMER_DATA"
const CUSTOMERS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-customer-storage`
let customers = loadCustomers()
customers.forEach((customer) => {
  renderCustomer(customer)
})

openSubmitDialogBtn.addEventListener("click", () => {
  submitDialog.showModal()
  
})
closeSubmitDialogBtn.addEventListener("click", () => {
  submitDialog.close()
})

// Submit Form Start
submitForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const customerFirstName = firstNameInput.value
  const customerLastName = lastNameInput.value
  const customerEmail = emailInput.value

  if (customerFirstName === "" && customerLastName === "" && customerEmail === "") return

  const newCustomer = {
    first: customerFirstName,
    last: customerLastName,
    email: customerEmail,
    id: new Date().valueOf().toString()
  }
  customers.push(newCustomer)
  renderCustomer(newCustomer)
  saveCustomers()
  firstNameInput.value = ""
  lastNameInput.value = ""
  emailInput.value = ""
  submitDialog.close()
})
// Submit Form End

// Delete Customer Start
table.addEventListener("click", (e) => {
  if (!e.target.matches("[data-button-delete]")) return

  const parent = e.target.closest(".table-row")
  const customerId = parent.dataset.customerId
  parent.remove()
  customers = customers.filter(customer => customer.id !== customerId)
  saveCustomers()
})
// Delete Customer End
// Submit Dialog and Submit Form End

// Update Dialog and Update Form Start
const updateDialog = document.querySelector("#update-dialog")
const updateDialogCloseBtn = document.querySelector("#close-update-dialog-btn")
const updateForm = document.querySelector("#update-form")
const updateFirstNameInput = document.querySelector("#update-first-name-input")
const updateLastNameInput = document.querySelector("#update-last-name-input")
const updateEmailInput = document.querySelector("#update-email-input")

updateDialogCloseBtn.addEventListener("click", () => {
  updateDialog.close()
})
// Update Dialog and Update Form End

// Update Customer Start
table.addEventListener("click", (e) => {
  if(!e.target.matches("[data-button-update]")) return

  const parent = e.target.closest(".table-row")
  const currentFirstName = parent.querySelector("[data-first-name-text]").innerText
  const currentLastName = parent.querySelector("[data-last-name-text]").innerText
  const currentEmail = parent.querySelector("[data-email-text]").innerText
  const customerId = parent.dataset.customerId
  const customer = customers.find(c => c.id === customerId)
  
  updateDialog.showModal()

  updateFirstNameInput.value = currentFirstName
  updateLastNameInput.value = currentLastName
  updateEmailInput.value = currentEmail
  // Update Form Start
  updateForm.addEventListener("change", (e) => {
    e.preventDefault()
    
    if (updateFirstNameInput.value === "" && updateLastNameInput.value === "" && updateEmailInput.value === "") return

    const updatedCustomer = {
      first: customer.first = updateFirstNameInput.value,
      last: customer.last = updateLastNameInput.value,
      email: customer.email = updateEmailInput.value,
    }
    saveCustomers()
    renderCustomer()
    updateFirstNameInput.value = ""
    updateLastNameInput.value = ""
    updateEmailInput.value = ""
    updateDialog.close()
  })
  // Update Form End
})
// Update Customer End

function renderCustomer(customer) {
  const templateClone = template.content.cloneNode(true)
  const tableRow = templateClone.querySelector(".table-row")
  tableRow.dataset.customerId = customer.id
  const firstName = templateClone.querySelector("[data-first-name-text]")
  firstName.innerText = customer.first
  const lastName = templateClone.querySelector("[data-last-name-text]")
  lastName.innerText = customer.last
  const email = templateClone.querySelector("[data-email-text]")
  email.innerText = customer.email
  table.appendChild(templateClone)
}

function loadCustomers() {
  const customersString = localStorage.getItem(CUSTOMERS_STORAGE_KEY)
  return JSON.parse(customersString) || []
}

function saveCustomers() {
  localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(customers))
}
