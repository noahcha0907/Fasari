from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="Vasari API",
    description="AI-powered art evaluation and portfolio management",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to Vasari API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# TODO: Import and include routers
# from api.routes import artwork, portfolio, auth
# app.include_router(artwork.router, prefix="/api/v1/artwork", tags=["artwork"])
# app.include_router(portfolio.router, prefix="/api/v1/portfolio", tags=["portfolio"])
# app.include_router(auth.router, prefix="/api/v1/auth", tags=["authentication"])
