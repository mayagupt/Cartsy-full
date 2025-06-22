# llm.py

from langchain_huggingface.chat_models import ChatHuggingFace
from langchain_huggingface.llms import HuggingFaceEndpoint
import os


def get_mistral_llm():
    """
    Initializes and returns a ChatHuggingFace instance using the Mistral-7B-Instruct-v0.2 model.
    Ensure you have HUGGINGFACEHUB_API_TOKEN set as an environment variable.
    """

    if "HUGGINGFACEHUB_API_TOKEN" not in os.environ:
        raise EnvironmentError("Missing HUGGINGFACEHUB_API_TOKEN in environment.")

    # Instantiate the base endpoint with correct parameter passing
    hf_llm = HuggingFaceEndpoint(
        repo_id="mistralai/Mistral-7B-Instruct-v0.2",
        temperature=0.3,
        max_new_tokens=100
    )

    # Wrap in a chat model
    return ChatHuggingFace(llm=hf_llm)

