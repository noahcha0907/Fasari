# Vasari Backend

AI-powered backend for art evaluation and portfolio management.

## Setup

1. Create virtual environment:     
```bash
python -m venv venv
source venv/bin/activate

Install dependencies:           

pip install -r requirements.txt
Copy .env.example to .env and fill in your values   
Run the server:                

uvicorn api.main:app --reload
API Documentation
Once running, visit http://localhost:8000/docs for interactive API documentation.

