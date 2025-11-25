import { useState, useEffect, useRef } from "react";

export default function CatPet() {
  const [cats, setCats] = useState([]);
  const [mousePos, setMousePos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [mouseIdleTime, setMouseIdleTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const animationFrameRef = useRef({});
  const lastMouseMoveRef = useRef(Date.now());

  // Tribute to Richie ❤️
  console.log('🐱 This cat is inspired by Richie, a very special and loved cat!');

  const spriteSheet = '/assets/Copilot_20251123_140359.png';
  const frameWidth = 341.33;
  const frameHeight = 307.2;
  const scale = 0.15;

  const animations = {
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

  const getFramePosition = (frameIndex) => {
    const col = frameIndex % 3;
    const row = Math.floor(frameIndex / 3);
    return {
      x: -col * frameWidth * scale,
      y: -row * frameHeight * scale
    };
  };

  const chooseNewState = (cat) => {
    // Calculate distance to mouse
    const dx = mousePos.x - cat.x;
    const dy = mousePos.y - cat.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const updates = { currentFrame: 0 };
    const targetDirection = dx > 0 ? 1 : -1;

    // If cursor moved recently and cat is not too close, run to it!
    if (mouseIdleTime < 2000 && distance > 20) {
      const speed = 5; // Run fast to cursor
      
      // Normalize direction vector
      const magnitude = Math.sqrt(dx * dx + dy * dy);
      updates.velocityX = (dx / magnitude) * speed;
      updates.velocityY = (dy / magnitude) * speed;
      
      updates.direction = targetDirection;
      updates.state = targetDirection > 0 ? 'run_right' : 'walk_left';
      updates.stateTimer = 100; // Very short timer to keep following
    }
    // Reached cursor or very close - sit down and STOP moving
    else if (distance <= 20 && mouseIdleTime < 5000) {
      updates.state = 'sit_front';
      updates.velocityX = 0;
      updates.velocityY = 0;
      updates.stateTimer = 1500;
      updates.direction = 1;
    }
    // Cursor has been idle for a while - lay down
    else if (mouseIdleTime >= 5000 && mouseIdleTime < 15000) {
      const lieStates = ['lie_right', 'lie_left'];
      updates.state = lieStates[Math.floor(Math.random() * lieStates.length)];
      updates.direction = updates.state === 'lie_right' ? 1 : -1;
      updates.velocityX = 0;
      updates.velocityY = 0;
      updates.stateTimer = 3000;
    }
    // Cursor has been idle for a long time - sleep
    else if (mouseIdleTime >= 15000) {
      updates.state = 'sleep';
      updates.velocityX = 0;
      updates.velocityY = 0;
      updates.stateTimer = 5000;
      updates.direction = 1;
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

      updates.state = chosen.state;
      updates.direction = chosen.dir;
      updates.velocityX = chosen.velX;
      updates.velocityY = chosen.velY;
      updates.stateTimer = 3000;
    }

    return updates;
  };

  const spawnCat = () => {
    const newCat = {
      id: Date.now() + Math.random(),
      x: Math.random() * (window.innerWidth - 150),
      y: Math.random() * (window.innerHeight - 150),
      velocityX: 0,
      velocityY: 0,
      state: 'idle_right',
      stateTimer: 2000,
      direction: Math.random() > 0.5 ? 1 : -1,
      currentFrame: 0,
      frameTimer: 0
    };

    setCats(prev => [...prev, newCat]);
  };

  const handleCatClick = (catId) => {
    setCats(prev => prev.map(cat => {
      if (cat.id === catId) {
        const reactions = ['curious_right', 'interested_left', 'sit_front'];
        const chosen = reactions[Math.floor(Math.random() * reactions.length)];
        return {
          ...cat,
          state: chosen,
          stateTimer: 2000,
          velocityX: 0,
          velocityY: 0,
          direction: chosen === 'curious_right' ? 1 : -1,
          currentFrame: 0
        };
      }
      return cat;
    }));
  };

  const handleMouseDown = (e, catId) => {
    e.preventDefault();
    const cat = cats.find(c => c.id === catId);
    if (cat) {
      setIsDragging(true);
      setDragOffset({ x: e.clientX - cat.x, y: e.clientY - cat.y });
      setCats(prev => prev.map(c => 
        c.id === catId ? { ...c, velocityX: 0, velocityY: 0, state: 'curious_right' } : c
      ));
    }
  };

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    lastMouseMoveRef.current = Date.now();
    setMouseIdleTime(0);

    if (isDragging) {
      setCats(prev => prev.map(cat => ({
        ...cat,
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      })));
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      setCats(prev => prev.map(cat => ({ ...cat, stateTimer: 0 })));
    }
  };

  useEffect(() => {
    // Spawn one cat only on mount - but check if one already exists (StrictMode protection)
    if (cats.length === 0) {
      spawnCat();
    }

    // Track mouse idle time
    const idleInterval = setInterval(() => {
      const idleMs = Date.now() - lastMouseMoveRef.current;
      setMouseIdleTime(idleMs);
    }, 100);

    return () => {
      clearInterval(idleInterval);
    };
  }, []); // Empty dependency array - only run once on mount

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  useEffect(() => {
    let lastTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const deltaTime = now - lastTime;
      lastTime = now;

      setCats(prev => prev.map(cat => {
        let updates = { ...cat };
        
        updates.stateTimer -= deltaTime;
        updates.frameTimer += deltaTime;

        // Choose new state if timer expired and not being dragged
        if (updates.stateTimer <= 0 && !isDragging) {
          const newStateData = chooseNewState(updates);
          updates = { ...updates, ...newStateData };
        }

        // Animate sprite
        const anim = animations[updates.state];
        if (updates.frameTimer >= anim.speed) {
          updates.frameTimer = 0;
          updates.currentFrame = (updates.currentFrame + 1) % anim.frames.length;
        }

        // Movement
        if (!isDragging && (updates.state === 'walk_right' || updates.state === 'walk_left' || updates.state === 'run_right')) {
          updates.x += updates.velocityX;
          updates.y += updates.velocityY;
          
          // Bounce off edges
          if (updates.x < 0) {
            updates.x = 0;
            updates.velocityX = Math.abs(updates.velocityX);
            updates.direction = 1;
          } else if (updates.x > window.innerWidth - 100) {
            updates.x = window.innerWidth - 100;
            updates.velocityX = -Math.abs(updates.velocityX);
            updates.direction = -1;
          }
          
          if (updates.y < 0) {
            updates.y = 0;
            updates.velocityY = Math.abs(updates.velocityY);
          } else if (updates.y > window.innerHeight - 100) {
            updates.y = window.innerHeight - 100;
            updates.velocityY = -Math.abs(updates.velocityY);
          }
        }

        return updates;
      }));

      animationFrameRef.current.id = requestAnimationFrame(animate);
    };

    animationFrameRef.current.id = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current.id) {
        cancelAnimationFrame(animationFrameRef.current.id);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 999,
        overflow: 'hidden'
      }}
    >
      {cats.map(cat => {
        const frameIndex = animations[cat.state].frames[cat.currentFrame];
        const framePos = getFramePosition(frameIndex);
        
        // Only flip for right-direction animations when going left
        const isRightAnimation = cat.state.includes('_right') || cat.state.includes('run_right');
        const transform = isRightAnimation ? `scaleX(${cat.direction})` : 'scaleX(1)';

        return (
          <div
            key={cat.id}
            onMouseDown={(e) => handleMouseDown(e, cat.id)}
            style={{
              position: 'fixed',
              width: `${frameWidth * scale}px`,
              height: `${frameHeight * scale}px`,
              backgroundImage: `url(${spriteSheet})`,
              backgroundSize: `${1024 * scale}px ${1536 * scale}px`,
              backgroundPosition: `${framePos.x}px ${framePos.y}px`,
              backgroundRepeat: 'no-repeat',
              imageRendering: 'pixelated',
              left: `${cat.x}px`,
              top: `${cat.y}px`,
              transform: transform,
              transition: 'transform 0.3s ease',
              cursor: isDragging ? 'grabbing' : 'grab',
              pointerEvents: 'auto',
              zIndex: 999
            }}
          />
        );
      })}
    </div>
  );
}
