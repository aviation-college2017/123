
const webhookURL = "PASTE_YOUR_WEB_APP_URL_HERE";

const hospitals = [
  "Yekatit Hospital",
  "St. Peter’s Specialized Hospital",
  "Minilk Hospital",
  "Ras Desta Hospital",
  "Torhayloch Hospital"
];

function filterChoices(level) {
  const selected = [
    document.getElementById('choice1').value,
    document.getElementById('choice2').value,
    document.getElementById('choice3').value
  ].slice(0, level);

  for (let i = level; i < 4; i++) {
    const select = document.getElementById('choice' + (i + 1));
    const used = new Set(selected);
    select.innerHTML = '<option value="">--Choose--</option>';
    hospitals.forEach(h => {
      if (!used.has(h)) {
        select.innerHTML += `<option value="${h}">${h}</option>`;
      }
    });
  }
}

document.getElementById("hospitalForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const form = e.target;
  const data = {
    name: form.name.value,
    id: form.id.value,
    address: form.address.value,
    choice1: form.choice1.value,
    choice2: form.choice2.value,
    choice3: form.choice3.value,
    choice4: form.choice4.value
  };

  fetch(webhookURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.text())
  .then(response => {
    document.getElementById("message").innerText = "✅ Submitted Successfully!";
    form.reset();
    filterChoices(0);
  })
  .catch(err => {
    document.getElementById("message").innerText = "❌ Network Error. Try again.";
  });
});

filterChoices(0);
