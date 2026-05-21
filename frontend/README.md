# 🔐 Password Strength Analyzer

A security-focused web tool that evaluates the strength of any password in real time, identifies weaknesses, and provides actionable feedback — built with React and a Python backend.

🔗 **Live Demo:** [password-strength-analyzer-jade.vercel.app](https://password-strength-analyzer-jade.vercel.app)

---

## 📌 What It Does

- Accepts a password input and evaluates it across multiple security dimensions
- Detects weak, predictable, and commonly used passwords
- Checks for character complexity, length, entropy, and pattern vulnerabilities
- Returns a **strength score** with a breakdown of what's strong and what needs improvement
- Helps users understand *why* their password is weak — not just that it is

---

## 🧠 How the Analysis Works

| Check | Detail |
|-------|--------|
| **Length** | Minimum recommended length enforcement (8–12+ chars) |
| **Complexity** | Checks for uppercase, lowercase, digits, and special characters |
| **Entropy** | Calculates randomness score based on character set size and length |
| **Pattern Detection** | Flags keyboard walks (`qwerty`, `12345`), repeated chars (`aaa`), and date patterns |
| **Common Passwords** | Checks against a list of widely-used/breached passwords |

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js |
| Backend | Python |
| Validation Logic | Custom rule engine (complexity, entropy, patterns) |
| Deployment | Vercel |

---

## 📁 Project Structure

```
password-strength-analyzer/
│
├── frontend/            # React frontend — real-time UI feedback
│   └── src/
│       ├── App.jsx
│       └── components/
│
└── backend/             # Python validation logic
    └── analyzer.py      # Core strength checking functions
```

---

## 🚀 Running Locally

### Backend
```bash
pip install -r requirements.txt
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Security Relevance

This project demonstrates understanding of real-world password security, including:
- **Entropy-based strength measurement** used in tools like KeePass and 1Password
- **Pattern vulnerability detection** that catches human-predictable password habits
- **Credential hygiene education** — the same principles behind NIST SP 800-63B password guidelines

---

## 👤 Author

**Himanshu Sahu**
3rd Year B.Tech — Cyber Security | Pune
[LinkedIn](https://www.linkedin.com/in/himanshu-sahu) • [GitHub](https://github.com/himanshu-04022006)
