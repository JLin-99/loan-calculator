document.getElementById("loan-form").addEventListener("submit", function (e) {
  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "block";

  setTimeout(() => {
    document.getElementById("loading").style.display = "none";
    calculateResults();
  }, 500);

  e.preventDefault();
})

function calculateResults() {
  document.getElementById("loading").style.display = "none";
  // UI elements
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthlyValue = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthlyValue)) {
    monthlyPayment.value = monthlyValue.toFixed(2);
    totalPayment.value = (monthlyValue * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthlyValue * calculatedPayments) - principal).toFixed(2);
    document.getElementById("results").style.display = "block";
  } else {
    showError("Please check your numbers")
  }
}

function showError(error) {
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  const errorDiv = document.createElement("div");

  errorDiv.className = "alert alert-danger";
  errorDiv.textContent = error;

  card.insertBefore(errorDiv, heading);

  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 2000);
}