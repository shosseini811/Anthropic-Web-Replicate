from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# Retrieve the API key from environment variables
client_api_key = os.getenv('ANTHROPIC_API_KEY')

# Initialize the Anthropics client with the API key
client = anthropic.Anthropic(
    api_key=client_api_key
)

@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_message = request.json.get('message')
        conversation_history = request.json.get('history', [])

        print(f"Received message: {user_message}")
        print(f"Conversation history: {conversation_history}")

        if not user_message:
            return jsonify({"error": "No message provided."}), 400

        # Convert conversation history to Messages API format
        messages = []
        for entry in conversation_history:
            role = 'user' if entry['user'] == 'user' else 'assistant'
            messages.append({
                "role": role,
                "content": entry['text']
            })

        # Append the new user message
        messages.append({
            "role": "user",
            "content": user_message
        })

        # Create the message using the Messages API with increased max_tokens
        response = client.messages.create(
            model="claude-2.1",
            messages=messages,
            max_tokens=4096,  # Increased token limit for longer responses
            temperature=0.7
        )
        
        bot_reply = response.content[0].text.strip()
        print(f"Bot reply: {bot_reply}")

        # Update conversation history with the assistant's reply
        conversation_history.append({"text": bot_reply, "user": "assistant"})

        return jsonify({
            "message": bot_reply,
            "history": conversation_history
        })
    
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)