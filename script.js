// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  const term = document.getElementById("terminal");
  const cmdInput = document.getElementById("cmd");
  let commandHistory = [];
  let historyIndex = -1;

  // Arch Linux styled prompt
  const prompt = '<span style="color: #5fd700; font-weight: bold;">spacetimeki</span><span style="color: #c5c8c6;">@</span><span style="color: #1793d1; font-weight: bold;">archlinux</span> <span style="color: #af87ff;">~</span><span style="color: #5fd700; font-weight: bold;">$</span>';
  
  // Separate container for command list (persistent)
  let commandListHTML = "";
  
  // Print function
  function print(text = "") {
    term.innerHTML += text.replace(/\n/g, "<br>") + "<br>";
    term.scrollTop = term.scrollHeight;
  }

  // Command definitions
  const commands = {
    "help": {
      exec: () => {
        print(`
<span style="color: #1793d1; font-weight: bold;">┌─ Available Commands</span>

<span style="color: #5fd700;">│ Portfolio:</span>
  about       - learn about me
  skills      - view my technical skills
  experience  - see my work experience
  projects    - view my github projects
  contact     - get my contact information
  social      - view my social media links
  resume      - download my resume

<span style="color: #5fd700;">│ System:</span>
  whoami      - display current user
  date        - show current date/time
  ls          - list available sections
  clear       - clear the terminal
  banner      - display ASCII art banner

<span style="color: #5fd700;">│ Network & Security:</span>
  ipconfig    - show your IP and location info
  echo [text] - print text to terminal

<span style="color: #666;">└─ Tip: Use ↑/↓ arrow keys for command history</span>
        `);
      }
    },

    "about": {
      exec: () => {
        print(`
<span style="color: #1793d1; font-weight: bold;">$ cat ~/about.txt</span>

Hey! I'm <span style="color: #5fd700; font-weight: bold;">spacetimeki</span>

I'm a SOC Analyst with a passion for cybersecurity and building things.
I enjoy creating real-world hacking labs, security tools, and breaking 
things to understand how they work (ethically, of course).

When I'm not analyzing security events or researching vulnerabilities,
I'm probably tinkering with new tech, automating workflows, or 
contributing to open-source projects.
        `);
      }
    },

    "skills": {
      exec: () => {
        print(`
<span style="color: #1793d1; font-weight: bold;">$ cat ~/skills.txt</span>

<span style="color: #5fd700;">Security Tools</span>
  • SOC Operations & Threat Analysis
  • Incident Response & Investigation
  • SIEM (Splunk, QRadar, ELK)
  • Vulnerability Assessment
  • Network Security & Monitoring

<span style="color: #5fd700;">Programming</span>
  • Python (automation, scripting)
  • JavaScript (React, Node.js)
  • Bash/Shell Scripting
  • HTML/CSS

<span style="color: #5fd700;">Tools</span>
  • Wireshark, tcpdump
  • Metasploit, Burp Suite
  • Nmap, Nessus
  • Git, Docker
  • Linux System Administration
        `);
      }
    },

    "experience": {
      exec: () => {
        print(`
<span style="color: #1793d1; font-weight: bold;">$ cat /var/log/experience.log</span>

<span style="color: #5fd700;">[2024-Present]</span> <span style="color: #1793d1;">SOC Analyst T1</span> (with T2/T3 exposure)
  • Monitor security events and investigate potential threats
  • Perform log analysis and correlation using SIEM tools
  • Respond to security incidents and escalate when needed

<span style="color: #5fd700;">[2022-2024]</span> <span style="color: #1793d1;">IT Support Specialist</span>
  • Provided technical support for hardware/software issues
  • Managed user accounts and access permissions
  • Performed system maintenance and troubleshooting

<span style="color: #5fd700;">[2020-Present]</span> <span style="color: #1793d1;">Freelance IT & Web Developer</span>
  • Built custom websites and web applications
  • Provided IT consulting for small businesses
  • Automated workflows and created productivity tools
        `);
      }
    },

    "projects": {
      exec: () => {
        print("<span style='color: #1793d1;'>→ Opening projects page...</span>");
        setTimeout(() => {
          window.open("spacetimeki-blog/index.html", "_blank");
        }, 500);
      }
    },

    "contact": {
      exec: () => {
        print(`
<span style="color: #1793d1; font-weight: bold;">$ cat ~/.config/contact.conf</span>

<span style="color: #5fd700;">Email:</span>      <a href="mailto:ki.antic@example.com" style="color: #1793d1;">ki.antic@example.com</a>
<span style="color: #5fd700;">LinkedIn:</span>   <a href="https://linkedin.com/in/ki-antic" target="_blank" style="color: #1793d1;">linkedin.com/in/ki-antic</a>
<span style="color: #5fd700;">GitHub:</span>     <a href="https://github.com/spacetimeki" target="_blank" style="color: #1793d1;">github.com/spacetimeki</a>
<span style="color: #5fd700;">Location:</span>   Available for Remote Work
        `);
      }
    },

    "social": {
      exec: () => {
        print(`
<span style="color: #1793d1; font-weight: bold;">$ ls -l ~/social/</span>

<span style="color: #1793d1;">github</span>     → <a href="https://github.com/spacetimeki" target="_blank" style="color: #c5c8c6;">github.com/spacetimeki</a>
<span style="color: #1793d1;">linkedin</span>   → <a href="https://linkedin.com/in/ki-antic" target="_blank" style="color: #c5c8c6;">linkedin.com/in/ki-antic</a>
<span style="color: #1793d1;">instagram</span>  → <a href="https://instagram.com/spacetimeki" target="_blank" style="color: #c5c8c6;">instagram.com/spacetimeki</a>
        `);
      }
    },

    "ipconfig": {
      exec: async () => {
        print("<span style='color: #1793d1;'>Fetching network information...</span>");
        try {
          const response = await fetch('https://api.ipify.org?format=json');
          const data = await response.json();
          const geoResponse = await fetch(`https://ipapi.co/${data.ip}/json/`);
          const geoData = await geoResponse.json();
          
          print(`
<span style='color: #5fd700;'>Network Configuration:</span>

IPv4 Address: ${data.ip}
Location: ${geoData.city}, ${geoData.region}, ${geoData.country_name}
ISP: ${geoData.org}
Timezone: ${geoData.timezone}

<span style='color: #666;'>👀 I know where you are... (just kidding, this is public info!)</span>
          `);
        } catch (error) {
          print(`
<span style='color: #5fd700;'>Network Configuration:</span>

IPv4 Address: Unable to fetch
Location: Unknown
Status: <span style='color: #ffaa00;'>Using VPN? Smart! 🛡️</span>
          `);
        }
      }
    },

    "whoami": {
      exec: () => {
        print("spacetimeki");
      }
    },

    "date": {
      exec: () => {
        const now = new Date();
        print(now.toString());
      }
    },

    "ls": {
      exec: () => {
        print(`
<span style='color: #1793d1;'>~/portfolio/</span>
  <span style='color: #5fd700;'>about.txt</span>
  <span style='color: #5fd700;'>skills.txt</span>
  <span style='color: #5fd700;'>experience.txt</span>
  <span style='color: #5fd700;'>projects/</span>
  <span style='color: #5fd700;'>contact.txt</span>
  <span style='color: #5fd700;'>social.txt</span>
        `);
      }
    },

    "clear": {
      exec: () => {
        term.innerHTML = "";
      }
    },

    "echo": {
      exec: (args) => {
        print(args.join(" "));
      }
    },

    "banner": {
      exec: () => {
        print(`
<span style='color: #1793d1; font-size: 20px; font-weight: bold;'>
        S P A C E T I M E K I
</span>
<span style='color: #5fd700; font-weight: bold;'>SOC Analyst & Security Enthusiast</span>
<span style='color: #666;'>Building real-world hacking labs without hurting anyone :)</span>

<span style='color: #af87ff;'>Type 'help' to see available commands</span>
        `);
      }
    },

    "resume": {
      exec: () => {
        print(`
<span style='color: #1793d1;'>📄 Resume</span>

<span style='color: #ffaa00;'>Download link coming soon!</span>

In the meantime, check out:
  • <span style='color: #5fd700;'>experience</span> - View my work history
  • <span style='color: #5fd700;'>skills</span> - See my technical skills
  • <span style='color: #5fd700;'>projects</span> - Browse my GitHub projects
        `);
      }
    }

  };

  // Command input handler
  cmdInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const input = cmdInput.value.trim();
      
      if (input) {
        commandHistory.push(input);
        historyIndex = commandHistory.length;
      }
      
      print(`${prompt} ${input}`);
      
      const parts = input.split(" ");
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);
      
      if (commands[cmd]) {
        commands[cmd].exec(args);
      } else if (cmd) {
        print(`<span style="color: #cc0000;">bash: ${cmd}: command not found</span>`);
        print(`<span style="color: #1793d1;">Type 'help' to see available commands</span>`);
      }
      
      cmdInput.value = "";
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        cmdInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        cmdInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        cmdInput.value = "";
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const input = cmdInput.value.trim();
      const matches = Object.keys(commands).filter(cmd => cmd.startsWith(input));
      if (matches.length === 1) {
        cmdInput.value = matches[0];
      } else if (matches.length > 1) {
        print(`${prompt} ${input}`);
        print(matches.join("  "));
      }
    }
  });

  // Focus input when clicking anywhere in terminal
  term.addEventListener("click", () => {
    cmdInput.focus();
  });

  // Initialize terminal with welcome message and full command list
  const welcomeMessage = `
<span style="color: #1793d1; font-weight: bold;">┌─ Welcome to spacetimeki@archlinux</span>
<span style="color: #1793d1; font-weight: bold;">│</span>
<span style="color: #1793d1; font-weight: bold;">│</span>  SOC Analyst & Security Enthusiast
<span style="color: #1793d1; font-weight: bold;">│</span>  Building real-world hacking labs without hurting anyone :)
<span style="color: #1793d1; font-weight: bold;">└─</span>

Type <span style="color: #5fd700;">help</span> to see available commands or <span style="color: #5fd700;">about</span> to learn more about me.

<span style="color: #666;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
  `;
  
  print(welcomeMessage);
  
  // Store command list HTML to preserve on clear
  commandListHTML = term.innerHTML;

  // Auto-focus input on page load
  cmdInput.focus();
});
