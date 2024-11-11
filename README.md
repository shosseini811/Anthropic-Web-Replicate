# Anthropic-Web-Replicate

A real-time chat application that integrates with Anthropic's Claude AI, built with React Native (Expo) and Flask. This application provides a clean, intuitive interface for conversing with Claude AI while maintaining full conversation history.

## Features

- Real-time chat interface with Claude AI
- Full conversation history preservation
- Auto-scrolling message view
- Visual distinction between user and assistant messages
- Error handling and recovery
- Mobile-responsive design
- Support for long-form conversations

## Tech Stack

### Frontend
- React Native (Expo)
- React Hooks for state management
- Native components for UI elements

### Backend
- Flask (Python)
- Anthropic API integration
- CORS support
- Environment-based configuration

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- Expo CLI
- pip (Python package manager)

## Installation

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/anthropic-web-replicate

2. Set up Python virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the backend directory:
```
ANTHROPIC_API_KEY=your_api_key_here
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Start the Backend Server

1. Activate the virtual environment (if not already activated):
```bash
cd backend
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

2. Start the Flask server:
```bash
python app/app.py
```

The backend server will start on `http://127.0.0.1:5000`

### Start the Frontend Application

1. In a new terminal, navigate to the frontend directory:
```bash
cd frontend
```

2. Start the Expo development server:
```bash
npx expo start
```

3. Choose your preferred platform:
- Press `w` for web
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app for physical device

## Usage

1. The application will open to a chat interface
2. Type your message in the input field at the bottom
3. Press "Send" or hit enter to send your message
4. Claude AI will respond in real-time
5. Scroll through the conversation history as needed

## Development Notes

- The frontend uses React Native's `FlatList` for efficient message rendering
- Messages are stored in state and persisted during the session
- The backend maintains conversation context for accurate responses
- Error handling is implemented on both frontend and backend
- The application supports long conversations with a 4096 token limit

## Error Handling

The application includes comprehensive error handling:
- Network connectivity issues
- API failures
- Invalid responses
- User input validation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments

- Anthropic for providing the Claude AI API
- React Native and Expo teams
- Flask development team

This README provides:
1. Clear project description
2. Setup instructions
3. Usage guidelines
4. Technical details
5. Contributing guidelines
6. License information
7. Contact details


