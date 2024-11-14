from anthropic import Anthropic
import os
from dotenv import load_dotenv
from typing import List, Dict, Optional
from anthropic import AsyncAnthropic

load_dotenv()

class ClaudeHandler:
    """Handler for Claude AI interactions using Anthropic's API."""
    
    def __init__(self):
        """Initialize the Claude handler with API credentials."""
        api_key = os.getenv('ANTHROPIC_API_KEY')
        if not api_key:
            raise ValueError("ANTHROPIC_API_KEY not found in environment variables")
            
        self.client = AsyncAnthropic(api_key=api_key)
        self.model = "claude-3-sonnet-20240229"
        
    async def get_response(self, 
                          message: str, 
                          conversation_history: Optional[List[Dict[str, str]]] = None) -> str:
        """
        Get a response from Claude AI.
        
        Args:
            message: The user's message to Claude
            conversation_history: Optional list of previous messages in the conversation
            
        Returns:
            str: Claude's response
            
        Raises:
            Exception: If there's an error communicating with the API
        """
        try:
            messages = []
            if conversation_history:
                messages.extend(conversation_history)
            
            messages.append({"role": "user", "content": message})
            
            response = await self.client.messages.create(
                model=self.model,
                max_tokens=4096,
                messages=messages
            )
            
            return response.content[0].text
        except Exception as e:
            return f"Error: {str(e)}"
