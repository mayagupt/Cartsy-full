from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from llm import get_mistral_llm
from langchain_core.messages import HumanMessage

app = FastAPI()

# Allow frontend access (open CORS for now)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatInput(BaseModel):
    message: str

llm = get_mistral_llm()

@app.post("/chat")
async def chat(input: ChatInput):
    user_message = f"Reply concisely in not more than 3 bullet points. {input.message}"
    response = await llm.ainvoke([HumanMessage(content=user_message)])
    return {"response": response.content}
