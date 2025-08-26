/* === INTERNAL CONFIGURATION ===
   You can swap bg to image or color above in styles.css */
const term = document.getElementById('terminal');
const cmdInput = document.getElementById('cmd');

const commands = {
  'ki -help': () => print(`
Available commands:
  ki -help                       (help)
  ki -hello                      (say hello)
  ki -blog                       (my blog)
  ki -ki                         (my background info)
  ki -contact                    (contact & social links)
  `),
  'ki -hello': () => print("hello to you too. i'm spacetimeki. i build and break stuff sometimes."),
  'ki -blog': () => {
    print("opening blog in a new tab...");
    window.open('blog.html','_blank');
  },
  'ki -ki': () => print(`
– SOC Analyst T1 (with T2/T3 task exposure) (1 year)
– IT Support (2 years)
– Freelance IT & Web projects (3+ years)
– AAS in Networking (in progress), CompTIA Security+ (prep)
  `),
  'ki -contact': () => print(`
Email: kristina.antic@example.com
LinkedIn: https://linkedin.com/in/ki-antic
GitHub:   https://github.com/spacetimeki
Instagram: https://instagram.com/spacetimeki
  `)
};

function print(text = '') {
  term.innerHTML += text.replace(/\n/g,'<br>') + '<br>';
  term.scrollTop = term.scrollHeight;
}

cmdInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const cmd = cmdInput.value.trim();
    print(`<span class="prompt">user@spacetimeki:~$</span> ${cmd}`);
    if (commands[cmd]) {
      commands[cmd]();
    } else {
      print(`bash: ${cmd}: command not found`);
    }
    cmdInput.value = '';
  }
});

// initial greeting
print("Welcome! Type ki -help for a list of commands.");
