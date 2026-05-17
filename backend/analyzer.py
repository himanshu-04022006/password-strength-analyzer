import re
import math
import string
import hashlib

COMMON = ["password", "admin", "qwerty", "1234", "welcome", "india"]

BREACHED_SHA1 = {
    hashlib.sha1("password123".encode()).hexdigest().upper(),
    hashlib.sha1("admin123".encode()).hexdigest().upper(),
    hashlib.sha1("qwerty123".encode()).hexdigest().upper(),
}

def entropy_bits(password):
    pool = 0

    if any(c.islower() for c in password):
        pool += 26
    if any(c.isupper() for c in password):
        pool += 26
    if any(c.isdigit() for c in password):
        pool += 10
    if any(c in string.punctuation for c in password):
        pool += 32

    if pool == 0:
        return 0

    return round(len(password) * math.log2(pool), 1)

def analyze(password, username_hint=None):
    reasons = []
    suggestions = []
    score = 0

    password_hash = hashlib.sha1(password.encode()).hexdigest().upper()
    breached = password_hash in BREACHED_SHA1

    if breached:
        return {
            "score": 0,
            "bits": entropy_bits(password),
            "crack_time": "Compromised",
            "breached": True,
            "reasons": ["Password found in demo breached-password list"],
            "suggestions": ["Change this password immediately", "Never reuse breached passwords"]
        }

    if len(password) >= 8:
        score += 1
    if len(password) >= 12:
        score += 1
    if re.search(r"[A-Z]", password) and re.search(r"[a-z]", password):
        score += 1
    if re.search(r"\d", password) and re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        score += 1

    lower = password.lower()

    for word in COMMON:
        if word in lower:
            reasons.append("Common password pattern detected")
            suggestions.append("Avoid common passwords")
            score = min(score, 1)

    if username_hint and username_hint.lower() in lower:
        reasons.append("Contains username/email")
        suggestions.append("Do not include username or email in password")
        score = min(score, 2)

    if len(password) < 8:
        reasons.append("Password too short")
        suggestions.append("Use at least 12 characters")

    bits = entropy_bits(password)

    crack = "Very Weak"
    if bits > 40:
        crack = "Moderate"
    if bits > 60:
        crack = "Strong"

    return {
        "score": min(score, 4),
        "bits": bits,
        "crack_time": crack,
        "breached": False,
        "reasons": reasons,
        "suggestions": suggestions
    }