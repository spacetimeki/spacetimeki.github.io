#!/bin/bash

echo "🚀 Starting spacetimeki portfolio development server..."
echo ""

# Check if node_modules exists
if [ ! -d "spacetimeki-blog/node_modules" ]; then
    echo "📦 Installing dependencies..."
    cd spacetimeki-blog
    npm install
    cd ..
    echo "✅ Dependencies installed!"
    echo ""
fi

# Start the blog dev server
echo "🌐 Starting blog development server on http://localhost:5173"
echo "📄 Main terminal page can be opened by opening index.html in your browser"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

cd spacetimeki-blog
npm run dev
