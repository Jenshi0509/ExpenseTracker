let transactions = JSON.parse(localStorage.getItem("tx")) || [];

const list = document.getElementById("list");

function addTransaction() {

  const desc = document.getElementById("desc").value;
  const amount = +document.getElementById("amount").value;
  const category = document.getElementById("category").value;
  const type = document.getElementById("type").value;

  if (!desc || !amount) return;

  transactions.push({
    id: Date.now(),
    desc,
    amount,
    category,
    type
  });

  save();
  render();
}

function deleteTx(id) {
  transactions = transactions.filter(t => t.id !== id);
  save();
  render();
}

function save() {
  localStorage.setItem("tx", JSON.stringify(transactions));
}

function render() {

  list.innerHTML = "";

  let income = 0;
  let expense = 0;

  transactions.forEach(t => {

    if (t.type === "income") income += t.amount;
    else expense += t.amount;

    const div = document.createElement("div");
    div.className = "tx";

    div.innerHTML = `
      <div>
        <b>${t.desc}</b> (${t.category})<br/>
        ₹${t.amount}
      </div>
      <button class="delete" onclick="deleteTx(${t.id})">X</button>
    `;

    list.appendChild(div);
  });

  document.getElementById("income").innerText = `₹${income}`;
  document.getElementById("expense").innerText = `₹${expense}`;
  document.getElementById("balance").innerText = `₹${income - expense}`;

  updateChart(income, expense);
}

function searchTx() {
  let value = document.getElementById("search").value.toLowerCase();

  document.querySelectorAll(".tx").forEach(tx => {
    tx.style.display = tx.innerText.toLowerCase().includes(value)
      ? "flex"
      : "none";
  });
}

let chart;

function updateChart(income, expense) {

  const ctx = document.getElementById("chart").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        data: [income, expense],
        backgroundColor: ["#22c55e", "#ef4444"]
      }]
    }
  });
}

render();
