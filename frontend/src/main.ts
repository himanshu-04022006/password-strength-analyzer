const API_BASE = "https://password-strength-analyzer-qshx.onrender.com"

async function analyzePassword() {
  const password = document.querySelector<HTMLInputElement>('#password')!

  const res = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password.value,
    }),
  })

  const data = await res.json()

  document.querySelector('#score')!.textContent = `Score: ${data.score}/4`
  document.querySelector('#entropy')!.textContent = `Entropy: ${data.entropy} bits`
  document.querySelector('#crack')!.textContent = `Crack Time: ${data.crack_time}`
  document.querySelector('#breach')!.textContent = `Breach Status: ${data.breached ? "Breached" : "Safe"}`

  document.querySelector('#reasons')!.innerHTML =
    data.reasons.map((r: string) => `<li>${r}</li>`).join("")

  document.querySelector('#suggestions')!.innerHTML =
    data.suggestions.map((s: string) => `<li>${s}</li>`).join("")
}

document.querySelector<HTMLInputElement>('#password')!
  .addEventListener('input', analyzePassword)

document.querySelector<HTMLButtonElement>('#complex')!
  .addEventListener('click', async () => {

    const res = await fetch(`${API_BASE}/generate?mode=complex`)
    const data = await res.json()

    const password = document.querySelector<HTMLInputElement>('#password')!
    password.value = data.password

    analyzePassword()
})

document.querySelector<HTMLButtonElement>('#copy')!
  .addEventListener('click', async () => {

    const password = document.querySelector<HTMLInputElement>('#password')!
    await navigator.clipboard.writeText(password.value)

    alert("Password copied!")
})