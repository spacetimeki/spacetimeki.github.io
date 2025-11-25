# Quick Start Guide

## 🎯 Overview
This is a terminal-themed portfolio website with two main components:
1. **Main Terminal** (`index.html`) - Interactive command-line portfolio
2. **Projects Blog** (`spacetimeki-blog/`) - React app displaying GitHub repos

## 🚀 Getting Started

### View Main Terminal (No setup needed)
Simply open `index.html` in any web browser.

### Run Blog in Development Mode
```bash
./dev.sh
```
Or manually:
```bash
cd spacetimeki-blog
npm install
npm run dev
```

### Build for Production
```bash
./build.sh
```

## 📝 Available Terminal Commands

Type these commands in the terminal:

| Command | Description |
|---------|-------------|
| `help` | Show all available commands |
| `about` | Learn about me |
| `skills` | View technical skills |
| `experience` | See work experience |
| `projects` | Open GitHub projects page |
| `contact` | Get contact information |
| `social` | View social media links |
| `resume` | Download resume |
| `clear` | Clear the terminal |
| `ls` | List available sections |
| `whoami` | Display current user |
| `date` | Show current date/time |
| `echo [text]` | Print text to terminal |
| `banner` | Display ASCII banner |
| `ipconfig` | Show your IP and location info |

**Tips:**
- Use ↑/↓ arrow keys for command history
- Press Tab for command completion
- Commands are case-sensitive

## 🎨 Customization

### Change Your GitHub Username
Edit `spacetimeki-blog/src/components/Terminal.jsx`:
```javascript
// Line ~16
const response = await fetch('https://api.github.com/users/YOUR-USERNAME/repos...');
```

### Update Personal Info
Edit `script.js` and modify the command outputs in the `commands` object.

### Change Colors
- **Main terminal:** Edit CSS variables in `styles.css`
- **Blog:** Edit `tailwind.config.js` theme colors

### Add New Commands
Edit `script.js`:
```javascript
commands["new-command"] = {
  desc: "description",
  exec: () => {
    print("Your output here");
  }
};
```

## 🌐 Deploying to GitHub Pages

### Step 1: Create Repository
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to repository Settings
2. Navigate to Pages
3. Source: Deploy from a branch
4. Branch: Select `main` (or the workflow will create `gh-pages`)
5. Folder: `/ (root)`

### Step 3: Wait for Deployment
The GitHub Action will automatically build and deploy your site.
Visit: `https://YOUR-USERNAME.github.io/YOUR-REPO/`

## 🐛 Troubleshooting

### Blog not loading?
- Make sure you ran `npm install` in the `spacetimeki-blog/` directory
- Check that Node.js version is 16 or higher: `node --version`

### GitHub API not working?
- Check your internet connection
- GitHub API rate limits: 60 requests/hour unauthenticated
- Make sure the username in `Terminal.jsx` is correct

### Commands not working?
- Check browser console for JavaScript errors (F12)
- Ensure `script.js` is properly loaded

### Deployment issues?
- Verify GitHub Pages is enabled in repository settings
- Check GitHub Actions tab for build errors
- Make sure all paths are relative (not absolute)

## 📱 Testing

### Test Locally
```bash
# Main terminal
open index.html

# Blog
cd spacetimeki-blog
npm run dev
```

### Test Production Build
```bash
cd spacetimeki-blog
npm run build
npm run preview
```

## 🔧 Project Structure Details

```
.
├── index.html              # Main terminal HTML
├── script.js               # Terminal logic (commands, history, etc.)
├── styles.css              # Terminal styling
├── favicon.svg             # Site favicon
├── README.md              # Full documentation
├── QUICKSTART.md          # This file
├── dev.sh                 # Development script
├── build.sh               # Build script
├── .gitignore             # Git ignore rules
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions deployment
└── spacetimeki-blog/      # React blog
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── src/
        ├── App.jsx
        ├── index.jsx
        ├── components/
        │   ├── Terminal.jsx    # Main blog component
        │   └── RepoCard.jsx    # Individual repo card
        └── styles/
            └── globals.css      # Global styles
```

## 💡 Tips & Best Practices

1. **Update content regularly** - Keep your GitHub repos active
2. **Test on mobile** - Ensure responsive design works
3. **Monitor API limits** - GitHub allows 60 requests/hour
4. **Add analytics** - Consider Google Analytics for tracking
5. **Keep it simple** - Terminal UX should be intuitive

## 📞 Need Help?

- Check the main `README.md` for detailed documentation
- Review GitHub Actions logs if deployment fails
- Test locally before pushing to production
- Open DevTools console (F12) to debug JavaScript issues

---

**Happy coding! 🚀**
