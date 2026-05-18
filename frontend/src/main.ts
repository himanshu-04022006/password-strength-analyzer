import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <main class="container">
    <section class="login-card">
      <h1>Password Strength Analyzer</h1>
      <p class="subtitle">Check password strength, detect weak patterns, and generate secure passwords.</p>

      <input id="username" placeholder="Username or email (optional)" />
      <input id="password" type="password" placeholder="Type password..." />

      <div class="card">
        <h2>Score: <span id="score">0</span>/4</h2>

        <div class="meter">
          <div id="bar"></div>
        </div>

        <p><b>Entropy:</b> <span id="bits">0</span> bits</p>
        <p><b>Crack Time:</b> <span id="crack">-</span></p>
        <p><b>Breach Status:</b> <span id="breach">Not checked</span></p>

        <h3>Reasons</h3>
        <ul id="reasons"></ul>

        <h3>Suggestions</h3>
        <ul id="suggestions"></ul>
      </div>

      <button id="passphrase">Generate Passphrase</button>
      <button id="complex">Generate Complex</button>
      <button id="copy">Copy Password</button>
    </section>
  </main>
`

const password = document.querySelector<HTMLInputElement>('#password')!
const username = document.querySelector<HTMLInputElement>('#username')!
const score = document.querySelector<HTMLSpanElement>('#score')!
const bits = document.querySelector<HTMLSpanElement>('#bits')!
const crack = document.querySelector<HTMLSpanElement>('#crack')!
const breach = document.querySelector<HTMLSpanElement>('#breach')!
const bar = document.querySelector<HTMLDivElement>('#bar')!
const reasons = document.querySelector<HTMLUListElement>('#reasons')!
const suggestions = document.querySelector<HTMLUListElement>('#suggestions')!

function meterColor(score: number) {
  if (score === 0) return '#ef4444'
  if (score === 1) return '#f97316'
  if (score === 2) return '#eab308'
  if (score === 3) return '#22c55e'
  return '#10b981'
}

async function analyzePassword() {
  const res = await https://password-strength-analyzer-qshx.onrender.com, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password.value,
      username_hint: username.value
    })
  })

  const data = await res.json()

  score.textContent = data.score
  bits.textContent = data.bits
  crack.textContent = data.crack_time
  breach.textContent = data.breached ? 'Breached / Unsafe' : 'Safe in demo list'

  bar.style.width = `${(data.score + 1) * 20}%`
  bar.style.background = meterColor(data.score)

  reasons.innerHTML = data.reasons
    .map((r: string) => `<li>${r}</li>`)
    .join('')

  suggestions.innerHTML = data.suggestions
    .map((s: string) => `<li>${s}</li>`)
    .join('')
}

password.addEventListener('input', analyzePassword)
username.addEventListener('input', analyzePassword)

document.querySelector<HTMLButtonElement>('#passphrase')!
  .addEventListener('click', async () => {
    const res = await https://password-strength-analyzer-qshx.onrender.com
    const data = await res.json()
    password.value = data.password
    analyzePassword()
  })

document.querySelector<HTMLButtonElement>('#complex')!
  .addEventListener('click', async () => {
    const res = await https://password-strength-analyzer-qshx.onrender.com
    const data = await res.json()
    password.value = data.password
    analyzePassword()
  })

document.querySelector<HTMLButtonElement>('#copy')!
  .addEventListener('click', async () => {
    await navigator.clipboard.writeText(password.value)
    alert('Password copied to clipboard')
  })