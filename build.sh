#!/bin/bash

echo "🏗️  Building spacetimeki portfolio for production..."
echo ""

# Build the blog
echo "📦 Building blog/projects page..."
cd spacetimeki-blog
npm install
npm run build
cd ..

echo ""
echo "✅ Build complete!"
echo ""
echo "📁 Built files:"
echo "   • Main terminal: index.html, script.js, styles.css"
echo "   • Blog: spacetimeki-blog/dist/"
echo ""
echo "🚀 Ready to deploy to GitHub Pages!"
echo ""
echo "Next steps:"
echo "1. Commit all changes: git add . && git commit -m 'Deploy'"
echo "2. Push to GitHub: git push origin main"
echo "3. GitHub Actions will automatically deploy to Pages"
