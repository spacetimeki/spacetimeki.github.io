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
<span style="color: #1793d1; font-weight: bold;">┌─ available commands</span>

<span style="color: #5fd700;">│ portfolio:</span>
  about       - learn about me
  skills      - view my technical skills
  experience  - see my work experience
  projects    - view my github projects
  contact     - get my contact information
  social      - view my social media links
  resume      - download my resume

<span style="color: #5fd700;">│ system:</span>
  whoami      - display current user
  date        - show current date/time
  ls          - list available sections
  clear       - clear the terminal
  banner      - display ascii art banner

<span style="color: #5fd700;">│ network & security:</span>
  ip          - show your ip and location info
  echo [text] - print text to terminal

<span style="color: #666;">└─ tip: use ↑/↓ arrow keys for command history</span>
        `);
      }
    },

    "about": {
      exec: () => {
        print(`
<span style="color: #1793d1; font-weight: bold;">$ cat ~/about.txt</span>

hey! i'm <span style="color: #5fd700; font-weight: bold;">spacetimeki</span>

i'm a soc analyst with a passion for cybersecurity and building things.
i enjoy creating real-world hacking labs, security tools, and breaking 
things to understand how they work (ethically, of course).

when i'm not analyzing security events or researching vulnerabilities,
i'm probably tinkering with new tech, automating workflows, or 
contributing to open-source projects.
        `);
      }
    },

    "skills": {
      exec: () => {
        print(`
<span style="color: #1793d1; font-weight: bold;">$ cat ~/skills.txt</span>

<span style="color: #5fd700;">security tools</span>
  • soc operations & threat analysis
  • incident response & investigation
  • siem (splunk, qradar, elk)
  • vulnerability assessment
  • network security & monitoring

<span style="color: #5fd700;">programming</span>
  • python (automation, scripting)
  • javascript (react, node.js)
  • bash/shell scripting
  • html/css

<span style="color: #5fd700;">tools</span>
  • wireshark, tcpdump
  • metasploit, burp suite
  • nmap, nessus
  • git, docker
  • linux system administration
        `);
      }
    },

    "experience": {
      exec: () => {
        print(`
<span style="color: #1793d1; font-weight: bold;">$ cat /var/log/experience.log</span>

check my linkedin: <a href="https://linkedin.com/in/ki-antic" target="_blank" style="color: #1793d1;">linkedin.com/in/ki-antic</a>
        `);
      }
    },

    "projects": {
      exec: () => {
        print("<span style='color: #1793d1;'>→ opening projects page...</span>");
        setTimeout(() => {
          window.open("spacetimeki-blog/index.html", "_blank");
        }, 500);
      }
    },

    "contact": {
      exec: () => {
        print(`
<span style="color: #1793d1; font-weight: bold;">$ cat ~/.config/contact.conf</span>

<span style="color: #5fd700;">linkedin:</span>   <a href="https://linkedin.com/in/ki-antic" target="_blank" style="color: #1793d1;">linkedin.com/in/ki-antic</a>
<span style="color: #5fd700;">github:</span>     <a href="https://github.com/spacetimeki" target="_blank" style="color: #1793d1;">github.com/spacetimeki</a>
<span style="color: #5fd700;">location:</span>   available for remote work
        `);
      }
    },

    "social": {
      exec: () => {
        print(`
<span style="color: #1793d1; font-weight: bold;">$ ls -l ~/social/</span>

<span style="color: #1793d1;">github</span>     → <a href="https://github.com/spacetimeki" target="_blank" style="color: #c5c8c6;">github.com/spacetimeki</a>
<span style="color: #1793d1;">linkedin</span>   → <a href="https://linkedin.com/in/ki-antic" target="_blank" style="color: #c5c8c6;">linkedin.com/in/ki-antic</a>
        `);
      }
    },

    "ip": {
      exec: async () => {
        print("<span style='color: #1793d1;'>fetching network information...</span>");
        try {
          const response = await fetch('https://api.ipify.org?format=json');
          const data = await response.json();
          const geoResponse = await fetch(`https://ipapi.co/${data.ip}/json/`);
          const geoData = await geoResponse.json();
          
          print(`
<span style='color: #5fd700;'>network configuration:</span>

ipv4 address: ${data.ip}
location: ${geoData.city}, ${geoData.region}, ${geoData.country_name}
isp: ${geoData.org}
timezone: ${geoData.timezone}

<span style='color: #666;'>👀 i know where you are... (just kidding, this is public info!)</span>
          `);
        } catch (error) {
          print(`
<span style='color: #5fd700;'>network configuration:</span>

ipv4 address: unable to fetch
location: unknown
status: <span style='color: #ffaa00;'>using vpn? smart! 🛡️</span>
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
        s p a c e t i m e k i
</span>
<span style='color: #5fd700; font-weight: bold;'>all things cybersecurity</span>

<span style='color: #af87ff;'>type 'help' to see available commands</span>
        `);
      }
    },

    "resume": {
      exec: () => {
        print(`
<span style='color: #1793d1;'>📄 resume</span>

<span style='color: #ffaa00;'>download link coming soon!</span>

in the meantime, check out:
  • <span style='color: #5fd700;'>experience</span> - view my work history
  • <span style='color: #5fd700;'>skills</span> - see my technical skills
  • <span style='color: #5fd700;'>projects</span> - browse my github projects
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
        print(`<span style="color: #1793d1;">type 'help' to see available commands</span>`);
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
<span style="color: #1793d1; font-weight: bold;">┌─ welcome to spacetimeki@archlinux</span>
<span style="color: #1793d1; font-weight: bold;">│</span>
<span style="color: #1793d1; font-weight: bold;">│</span>  all things cybersecurity
<span style="color: #1793d1; font-weight: bold;">└─</span>

type <span style="color: #5fd700;">help</span> to see available commands or <span style="color: #5fd700;">about</span> to learn more about me.

<span style="color: #666;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
  `;
  
  print(welcomeMessage);
  
  // Store command list HTML to preserve on clear
  commandListHTML = term.innerHTML;

  // Auto-focus input on page load
  cmdInput.focus();
});
