// Cat Pet Animation System
class CatPet {
  constructor() {
    this.cats = [];
    this.spriteSheet = 'assets/Copilot_20251123_140359.png';
    this.frameWidth = 341.33;  // 1024 / 3 columns
    this.frameHeight = 307.2;  // 1536 / 5 rows
    this.scale = 0.15; // Scale down for reasonable size
    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;
    this.lastMouseX = this.mouseX;
    this.lastMouseY = this.mouseY;
    this.mouseIdleTime = 0;
    this.mouseMoved = false;
    this.isDragging = false;
    this.draggedCat = null;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
    // Tribute to Richie ❤️
    console.log('🐱 This cat is inspired by Richie, a very special and loved cat!');
    this.animations = {
      idle_right: { frames: [1], speed: 1000 },      // r1c2: standing right, confused
      idle_left: { frames: [13], speed: 1000 },      // r5c2: standing left, confused
      walk_right: { frames: [0, 7], speed: 200 },    // r1c1, r3c2: walking right
      walk_left: { frames: [8], speed: 200 },        // r3c3: walking left
      run_right: { frames: [6, 0], speed: 120 },     // r3c1, r1c1: running right
      sit_right: { frames: [10], speed: 500 },       // r4c2: sitting facing right
      sit_front: { frames: [2, 14], speed: 800 },    // r1c3, r5c3: sitting facing front
      lie_right: { frames: [9], speed: 1000 },       // r4c1: laying facing right
      lie_left: { frames: [5], speed: 1000 },        // r2c3: laying facing left
      sleep: { frames: [12], speed: 2000 },          // r5c1: sleeping
      curious_right: { frames: [7], speed: 500 },    // r3c2: walking right, curious
      interested_left: { frames: [11], speed: 500 }  // r4c3: standing left, interested
    };
    this.init();
  }

  init() {
    // Create cats container
    const container = document.createElement('div');
    container.id = 'cats-container';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 999;
      overflow: visible;
    `;
    document.body.insertBefore(container, document.body.firstChild);

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
      if (Math.abs(e.clientX - this.mouseX) > 5 || Math.abs(e.clientY - this.mouseY) > 5) {
        this.mouseMoved = true;
        this.mouseIdleTime = 0;
      }
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      
      // Handle dragging
      if (this.isDragging && this.draggedCat) {
        this.draggedCat.x = e.clientX - this.dragOffsetX;
        this.draggedCat.y = e.clientY - this.dragOffsetY;
        this.draggedCat.element.style.left = this.draggedCat.x + 'px';
        this.draggedCat.element.style.top = this.draggedCat.y + 'px';
      }
    });

    // Release cat when mouse up
    document.addEventListener('mouseup', () => {
      if (this.isDragging && this.draggedCat) {
        this.isDragging = false;
        this.draggedCat.element.style.cursor = 'pointer';
        this.draggedCat.stateTimer = 0; // Trigger state change
        this.draggedCat = null;
      }
    });

    // Track mouse idle time
    setInterval(() => {
      if (!this.mouseMoved) {
        this.mouseIdleTime += 100;
      }
      this.mouseMoved = false;
    }, 100);

    // Spawn one cat
    this.spawnCat();
  }

  spawnCat() {
    const cat = {
      id: Date.now() + Math.random(),
      x: Math.random() * (window.innerWidth - 150),
      y: Math.random() * (window.innerHeight - 150), // Can spawn anywhere vertically
      velocityX: 0,
      velocityY: 0,
      state: 'idle_right',
      stateTimer: 0,
      direction: Math.random() > 0.5 ? 1 : -1,
      currentFrame: 0,
      frameTimer: 0,
      element: null
    };

    // Create DOM element
    const catEl = document.createElement('div');
    catEl.className = 'cat-pet';
    catEl.style.cssText = `
      position: fixed;
      width: ${this.frameWidth * this.scale}px;
      height: ${this.frameHeight * this.scale}px;
      background-image: url(${this.spriteSheet});
      background-size: ${1024 * this.scale}px ${1536 * this.scale}px;
      background-repeat: no-repeat;
      image-rendering: pixelated;
      image-rendering: -moz-crisp-edges;
      image-rendering: crisp-edges;
      left: ${cat.x}px;
      top: ${cat.y}px;
      transform: scaleX(${cat.direction});
      transition: transform 0.3s ease;
      cursor: grab;
      pointer-events: auto;
      z-index: 999;
    `;

    // Click interaction
    catEl.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.isDragging = true;
      this.draggedCat = cat;
      this.dragOffsetX = e.clientX - cat.x;
      this.dragOffsetY = e.clientY - cat.y;
      cat.velocityX = 0;
      cat.velocityY = 0;
      cat.state = 'curious_right';
      catEl.style.cursor = 'grabbing';
    });

    document.getElementById('cats-container').appendChild(catEl);
    cat.element = catEl;
    this.cats.push(cat);

    // Start animation loop for this cat
    this.updateCat(cat);
  }

  onCatClick(cat) {
    // Show curious behavior when clicked
    const reactions = ['curious_right', 'interested_left', 'sit_front'];
    cat.state = reactions[Math.floor(Math.random() * reactions.length)];
    cat.stateTimer = 2000;
    cat.velocityX = 0;
    cat.direction = cat.state === 'curious_right' ? 1 : -1;
  }

  getFramePosition(frameIndex) {
    const col = frameIndex % 3;
    const row = Math.floor(frameIndex / 3);
    return {
      x: -col * this.frameWidth * this.scale,
      y: -row * this.frameHeight * this.scale
    };
  }

  updateCat(cat) {
    const update = () => {
      if (!cat.element.parentNode) {
        // Cat was removed
        this.cats = this.cats.filter(c => c.id !== cat.id);
        return;
      }

      const deltaTime = 16; // ~60fps
      cat.stateTimer -= deltaTime;
      cat.frameTimer += deltaTime;

      // State machine
      if (cat.stateTimer <= 0 && !this.isDragging) {
        this.chooseNewState(cat);
      }

      // Animate sprite
      const anim = this.animations[cat.state];
      if (cat.frameTimer >= anim.speed) {
        cat.frameTimer = 0;
        cat.currentFrame = (cat.currentFrame + 1) % anim.frames.length;
      }

      const frameIndex = anim.frames[cat.currentFrame];
      const framePos = this.getFramePosition(frameIndex);
      cat.element.style.backgroundPosition = `${framePos.x}px ${framePos.y}px`;

      // Only flip for right-direction animations when going left
      const isRightAnimation = cat.state.includes('_right') || cat.state.includes('run_right');
      if (isRightAnimation) {
        cat.element.style.transform = `scaleX(${cat.direction})`;
      } else {
        cat.element.style.transform = 'scaleX(1)';
      }

      // Movement
      if (!this.isDragging && (cat.state === 'walk_right' || cat.state === 'walk_left' || cat.state === 'run_right')) {
        cat.x += cat.velocityX;
        cat.y += cat.velocityY;
        
        // Bounce off edges
        if (cat.x < 0) {
          cat.x = 0;
          cat.velocityX = Math.abs(cat.velocityX);
          cat.direction = 1;
        } else if (cat.x > window.innerWidth - 100) {
          cat.x = window.innerWidth - 100;
          cat.velocityX = -Math.abs(cat.velocityX);
          cat.direction = -1;
        }
        
        if (cat.y < 0) {
          cat.y = 0;
          cat.velocityY = Math.abs(cat.velocityY);
        } else if (cat.y > window.innerHeight - 100) {
          cat.y = window.innerHeight - 100;
          cat.velocityY = -Math.abs(cat.velocityY);
        }
        
        cat.element.style.left = cat.x + 'px';
        cat.element.style.top = cat.y + 'px';
      }

      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }

  chooseNewState(cat) {
    // Calculate distance to mouse
    const dx = this.mouseX - cat.x;
    const dy = this.mouseY - cat.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const targetDirection = dx > 0 ? 1 : -1;

    // If cursor moved recently and cat is not too close, run to it!
    if (this.mouseIdleTime < 2000 && distance > 20) {
      const speed = 5; // Run fast to cursor
      
      // Normalize direction vector
      const magnitude = Math.sqrt(dx * dx + dy * dy);
      cat.velocityX = (dx / magnitude) * speed;
      cat.velocityY = (dy / magnitude) * speed;
      
      cat.direction = targetDirection;
      cat.state = targetDirection > 0 ? 'run_right' : 'walk_left';
      cat.stateTimer = 100; // Very short timer to keep following
    }
    // Reached cursor or very close - sit down and STOP moving
    else if (distance <= 20 && this.mouseIdleTime < 5000) {
      cat.state = 'sit_front';
      cat.velocityX = 0;
      cat.velocityY = 0;
      cat.stateTimer = 1500;
      cat.direction = 1;
    }
    // Cursor has been idle for a while - lay down
    else if (this.mouseIdleTime >= 5000 && this.mouseIdleTime < 15000) {
      const lieStates = ['lie_right', 'lie_left'];
      cat.state = lieStates[Math.floor(Math.random() * lieStates.length)];
      cat.direction = cat.state === 'lie_right' ? 1 : -1;
      cat.velocityX = 0;
      cat.velocityY = 0;
      cat.stateTimer = 3000;
    }
    // Cursor has been idle for a long time - sleep
    else if (this.mouseIdleTime >= 15000) {
      cat.state = 'sleep';
      cat.velocityX = 0;
      cat.velocityY = 0;
      cat.stateTimer = 5000;
      cat.direction = 1;
    }
    // Fallback to random behavior
    else {
      const behaviors = [
        { state: 'idle_right', dir: 1, velX: 0, velY: 0, weight: 30 },
        { state: 'idle_left', dir: -1, velX: 0, velY: 0, weight: 30 },
        { state: 'sit_right', dir: 1, velX: 0, velY: 0, weight: 20 },
        { state: 'sit_front', dir: 1, velX: 0, velY: 0, weight: 20 }
      ];
      
      const totalWeight = behaviors.reduce((sum, b) => sum + b.weight, 0);
      let random = Math.random() * totalWeight;
      
      let chosen = behaviors[0];
      for (const behavior of behaviors) {
        random -= behavior.weight;
        if (random <= 0) {
          chosen = behavior;
          break;
        }
      }

      cat.state = chosen.state;
      cat.direction = chosen.dir;
      cat.velocityX = chosen.velX;
      cat.velocityY = chosen.velY;
      cat.stateTimer = 3000;
    }

    cat.currentFrame = 0;
  }

  // Clean up when needed
  removeAllCats() {
    this.cats.forEach(cat => {
      if (cat.element && cat.element.parentNode) {
        cat.element.parentNode.removeChild(cat.element);
      }
    });
    this.cats = [];
  }
}

// Initialize cats when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.catPets = new CatPet();
  });
} else {
  window.catPets = new CatPet();
}
