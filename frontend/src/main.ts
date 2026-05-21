import './style.css'

const API_BASE = "https://password-strength-analyzer-qshx.onrender.com"

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main class="page">
    <section class="card">
      <div class="badge">🔐 Cyber Security Project</div>

      <h1>Password Strength Analyzer</h1>
      <p class="subtitle">
        Analyze password strength, entropy, breach risk, crack time and generate stronger passwords.
      </p>

      <div class="input-group">
        <label>Username / Email</label>
        <input id="username" type="text" placeholder="Enter username or email" />
      </div>

      <div class="input-group">
        <label>Password</label>
        <div class="password-row">
          <input id="password" type="password" placeholder="Type or generate password" />
          <button id="toggle" class="small-btn">Show</button>
        </div>
      </div>

      <div class="buttons">
        <button id="passphrase">Generate Passphrase</button>
        <button id="complex">Generate Complex</button>
        <button id="copy">Copy Password</button>
      </div>

      <section class="result-card">
        <div class="score-head">
          <h2 id="score">Score: 0/4</h2>
          <span id="statusBadge" class="status weak">Weak</span>
        </div>

        <div class="meter">
          <div id="bar"></div>
        </div>

        <div class="grid">
          <p><strong>Entropy:</strong> <span id="entropy">0 bits</span></p>
          <p><strong>Crack Time:</strong> <span id="crack">-</span></p>
          <p><strong>Breach Status:</strong> <span id="breach">Not checked</span></p>
        </div>

        <div class="lists">
          <div>
            <h3>Reasons</h3>
            <ul id="reasons"><li>Start typing to analyze password.</li></ul>
          </div>
          <div>
            <h3>Suggestions</h3>
            <ul id="suggestions"><li>Use a long password with mixed characters.</li></ul>
          </div>
        </div>
      </section>
    </section>
  </main>
`

const passwordInput = document.querySelector<HTMLInputElement>('#password')!
const scoreText = document.querySelector('#score')!
const entropyText = document.querySelector('#entropy')!
const crackText = document.querySelector('#crack')!
const breachText = document.querySelector('#breach')!
const reasonsList = document.querySelector('#reasons')!
const suggestionsList = document.querySelector('#suggestions')!
const bar = document.querySelector<HTMLDivElement>('#bar')!
const statusBadge = document.querySelector<HTMLSpanElement>('#statusBadge')!

function updateUI(data: any) {
  const score = data.score ?? 0

  scoreText.textContent = `Score: ${score}/4`
  entropyText.textContent = `${data.entropy ?? 0} bits`
  crackText.textContent = data.crack_time ?? "-"
  breachText.textContent = data.breached ? "Breached / Found" : "Safe / Not found"

  reasonsList.innerHTML = (data.reasons?.length ? data.reasons : ["No major issue found."])
    .map((item: string) => `<li>${item}</li>`)
    .join("")

  suggestionsList.innerHTML = (data.suggestions?.length ? data.suggestions : ["Password looks good."])
    .map((item: string) => `<li>${item}</li>`)
    .join("")

  const width = Math.min(score * 25, 100)
  bar.style.width = `${width}%`

  statusBadge.className = "status"
  if (score <= 1) {
    statusBadge.textContent = "Weak"
    statusBadge.classList.add("weak")
  } else if (score <= 2) {
    statusBadge.textContent = "Medium"
    statusBadge.classList.add("medium")
  } else {
    statusBadge.textContent = "Strong"
    statusBadge.classList.add("strong")
  }
}

async function analyzePassword() {
  if (!passwordInput.value.trim()) return

  const res = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: passwordInput.value,
    }),
  })

  const data = await res.json()
  updateUI(data)
}

async function generatePassword(mode: string) {
  const res = await fetch(`${API_BASE}/generate?mode=${mode}`)
  const data = await res.json()

  passwordInput.value = data.password
  await analyzePassword()
}

passwordInput.addEventListener('input', analyzePassword)

document.querySelector('#passphrase')!.addEventListener('click', () => {
  generatePassword("passphrase")
})

document.querySelector('#complex')!.addEventListener('click', () => {
  generatePassword("complex")
})

document.querySelector('#copy')!.addEventListener('click', async () => {
  await navigator.clipboard.writeText(passwordInput.value)
  alert("Password copied successfully!")
})

document.querySelector('#toggle')!.addEventListener('click', () => {
  const btn = document.querySelector<HTMLButtonElement>('#toggle')!
  passwordInput.type = passwordInput.type === "password" ? "text" : "password"
  btn.textContent = passwordInput.type === "password" ? "Show" : "Hide"
})

const footer = document.createElement("footer")

footer.innerHTML = `
  Built by <strong>Himanshu Sahu</strong> · B.Tech Cyber Security, Pune ·
  <a href="https://github.com/himanshu-04022006" target="_blank">GitHub</a> ·
  <a href="https://www.linkedin.com/in/himanshu-sahu-a134a0283" target="_blank">LinkedIn</a>
`

footer.style.textAlign = "center"
footer.style.padding = "12px"
footer.style.fontSize = "13px"
footer.style.color = "#888"
footer.style.marginTop = "20px"

document.body.appendChild(footer)