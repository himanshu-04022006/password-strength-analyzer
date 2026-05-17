from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import secrets
import string

from analyzer import analyze

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
   allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    password: str
    username_hint: str | None = None

@app.post("/analyze")
def analyze_password(req: AnalyzeRequest):
    return analyze(req.password, req.username_hint)

@app.get("/generate")
def generate_password(mode: str = "passphrase"):
    words = ["river", "candle", "galaxy", "orchid", "saffron", "velvet"]
    
    if mode == "complex":
        chars = string.ascii_letters + string.digits + "!@#$%^&*"
        return {"password": "".join(secrets.choice(chars) for _ in range(16))}
    
    return {"password": "-".join(secrets.choice(words) for _ in range(4))}