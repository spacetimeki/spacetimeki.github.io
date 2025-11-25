# spacetimeki • terminal portfolio

A unique GitHub Pages portfolio website that mimics a Linux terminal interface, featuring custom commands and a dynamic blog page that pulls repositories from GitHub.

![Terminal Portfolio](https://img.shields.io/badge/portfolio-terminal-00ff00?style=for-the-badge)
![GitHub Pages](https://img.shields.io/badge/deployed-GitHub%20Pages-181717?style=for-the-badge&logo=github)

## 🚀 Live Demo

Visit: `https://spacetimeki.github.io/[repo-name]`

## 📁 Project Structure

```
spacetimeki-site/
├── index.html              # Main terminal page
├── script.js               # Terminal logic & commands
├── styles.css              # Terminal styling
├── README.md              # This file
├── .gitignore             # Git ignore rules
└── spacetimeki-blog/      # React blog app
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── package.json
    └── src/
        ├── App.jsx
        ├── index.jsx
        ├── components/
        │   ├── Terminal.jsx
        │   └── RepoCard.jsx
        └── styles/
            └── globals.css
```

## ✨ Features

### Main Terminal Page
- **Linux-style terminal interface** with green-on-black aesthetic
- **Custom commands:**
  - `help` - Display all available commands
  - `about` - Learn about me
  - `skills` - View technical skills
  - `experience` - See work experience
  - `projects` - Open GitHub projects page
  - `contact` - Get contact information
  - `social` - View social media links
  - `resume` - Download resume
  - `clear` - Clear terminal
  - `ls` - List available sections
  - `whoami` - Display current user
  - `date` - Show current date/time
  - `echo [text]` - Print text
  - `banner` - Display ASCII art

- **Interactive features:**
  - Command history (↑/↓ arrow keys)
  - Tab completion
  - ASCII art banner
  - Syntax highlighting
  - Responsive design

### Blog/Projects Page
- **Dynamic GitHub integration** - Automatically fetches repos via GitHub API
- **Real-time updates** - Refresh button to pull latest repos
- **Rich repo information:**
  - Repository name & description
  - Stars, forks, and language
  - Topics/tags
  - Last updated timestamp
  - Homepage links
- **Terminal aesthetic** - Consistent green terminal styling
- **Smooth animations** - Using Framer Motion
- **Responsive design** - Mobile-friendly

## 🛠️ Technologies

### Main Terminal
- Vanilla JavaScript
- HTML5/CSS3
- Custom terminal emulation

### Blog/Projects Page
- React 18
- Vite (build tool)
- Tailwind CSS
- Framer Motion (animations)
- GitHub REST API

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Git

### Clone the Repository
```bash
git clone https://github.com/spacetimeki/[repo-name].git
cd spacetimeki-site
```

### Main Terminal Page
The main terminal page (`index.html`) is pure HTML/CSS/JS and works without any build step. Simply open `index.html` in a browser.

### Blog/Projects Page Setup
```bash
cd spacetimeki-blog
npm install
npm run dev
```

The blog will be available at `http://localhost:5173`

### Build for Production
```bash
cd spacetimeki-blog
npm run build
```

This creates a `dist/` folder with optimized production files.

## 🌐 Deployment to GitHub Pages

### Option 1: Manual Deployment

1. **Build the blog:**
```bash
cd spacetimeki-blog
npm run build
```

2. **Create a new branch for GitHub Pages:**
```bash
git checkout -b gh-pages
```

3. **Copy files to root:**
```bash
# Copy main terminal files (already in root)
# Copy blog dist files to spacetimeki-blog/
```

4. **Push to GitHub:**
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

5. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Select `gh-pages` branch
   - Save

### Option 2: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        working-directory: ./spacetimeki-blog
        run: npm install
      
      - name: Build blog
        working-directory: ./spacetimeki-blog
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## 🎨 Customization

### Change Color Scheme
Edit `styles.css` (main terminal):
```css
:root {
    --bg-color: #000000;
    --accent-color: #003300;
    --border-color: #00ff00;
    --shadow-color: rgba(0, 255, 0, 0.3);
}
```

Edit `tailwind.config.js` (blog):
```js
colors: {
  terminal: {
    green: '#00ff00',
    'dark-green': '#003300',
    // ... add your colors
  },
}
```

### Add New Commands
Edit `script.js`:
```javascript
commands["your-command"] = {
  desc: "description",
  exec: () => {
    print("Your output here");
  }
};
```

### Modify GitHub Username
Edit `src/components/Terminal.jsx`:
```javascript
const response = await fetch('https://api.github.com/users/YOUR-USERNAME/repos?sort=updated&per_page=10');
```

## 📝 TODO / Future Enhancements

- [ ] Add typing animation effect for command responses
- [ ] Implement resume download functionality
- [ ] Add project filtering by language/topic on blog page
- [ ] Create custom 404 page
- [ ] Add Google Analytics integration
- [ ] Implement dark/light theme toggle (if desired)
- [ ] Add search functionality for commands
- [ ] Create downloadable PDF resume
- [ ] Add blog post section (separate from repos)

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio! If you have suggestions or improvements, open an issue or pull request.

## 📄 License

MIT License - feel free to use this project for your own portfolio.

## 📬 Contact

- **LinkedIn:** [linkedin.com/in/ki-antic](https://linkedin.com/in/ki-antic)
- **GitHub:** [github.com/spacetimeki](https://github.com/spacetimeki)

---

**Built with ❤️ by spacetimeki**

*"Building real-world hacking labs without hurting anyone :)"*
