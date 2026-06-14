export function initSandbox() {
  const canvas = document.getElementById('playground-canvas');
  const container = document.getElementById('sandbox-viewport');
  if (!canvas || !container) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // State
  let currentType = 'waves';
  let speed = 1.5;
  let gravity = 0;
  let count = 120;
  let primaryColor = '#3b82f6';
  let secondaryColor = '#ec4899';
  let isPlaying = true;
  let interactionMode = 'attract';
  let mousePos = { x: -1000, y: -1000 };

  let animationId;
  let particles = [];

  const PRESETS = [
    { name: 'Quantum Wave', type: 'waves', speed: 1.5, gravity: 0, count: 120, primaryColor: '#3b82f6', secondaryColor: '#ec4899' },
    { name: 'Cyber Grid', type: 'particles', speed: 0.8, gravity: 0, count: 80, primaryColor: '#10b981', secondaryColor: '#06b6d4' },
    { name: 'Gravity Sparks', type: 'gravity', speed: 2.2, gravity: 0.15, count: 150, primaryColor: '#f59e0b', secondaryColor: '#ef4444' },
    { name: 'Matrix Stream', type: 'matrix', speed: 1.8, gravity: 0.05, count: 100, primaryColor: '#22c55e', secondaryColor: '#a3e635' }
  ];

  // Resize handler
  function handleResize() {
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = Math.max(380, rect.height);
    initParticles();
  }

  function getRandomColor(c1, c2) {
    return Math.random() > 0.5 ? c1 : c2;
  }

  function initParticles() {
    particles = [];
    const binaryString = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed * 4,
        vy: (Math.random() - 0.5) * speed * 4,
        radius: Math.random() * 4 + 1.5,
        color: getRandomColor(primaryColor, secondaryColor),
        phase: Math.random() * Math.PI * 2,
        char: binaryString[Math.floor(Math.random() * binaryString.length)]
      });
    }
  }

  let time = 0;
  function render() {
    if (!isPlaying) {
      animationId = requestAnimationFrame(render);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    time += 0.02 * speed;

    particles.forEach((p, idx) => {
      p.vy += gravity;

      if (mousePos.x > -500 && mousePos.y > -500) {
        const dx = mousePos.x - p.x;
        const dy = mousePos.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const force = (150 - dist) / 150 * 0.15 * speed;
          if (interactionMode === 'attract') {
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          } else if (interactionMode === 'repel') {
            p.vx -= (dx / dist) * force;
            p.vy -= (dy / dist) * force;
          }
        }
      }

      if (currentType === 'waves') {
        p.x += Math.cos(time + p.phase) * speed * 0.5;
        p.y += Math.sin(time * 0.5 + p.phase) * speed * 0.8 + ((idx % 2 === 0 ? 0.2 : -0.2) * speed);
      } else if (currentType === 'matrix') {
        p.y += (p.vy + p.radius + speed) * 1.5;
        p.x += Math.sin(time + p.phase * 2) * 0.4;
      } else {
        p.x += p.vx;
        p.y += p.vy;
      }

      p.vx *= 0.98;
      p.vy *= 0.98;

      if (p.x < 0) { p.x = canvas.width; p.vx *= -1; }
      if (p.x > canvas.width) { p.x = 0; p.vx *= -1; }
      if (p.y < 0) { p.y = canvas.height; p.vy *= -1; }
      if (p.y > canvas.height) {
        p.y = 0;
        if (currentType === 'gravity') {
          p.vy = -Math.abs(p.vy) * 0.82;
        } else {
          p.vy *= -1;
        }
      }

      ctx.beginPath();
      if (currentType === 'matrix') {
        ctx.fillStyle = p.color;
        ctx.font = `${p.radius * 2.8 + 6}px monospace`;
        if (idx % 8 === 0 && Math.random() > 0.98) {
          const symbols = '0101XYZ';
          p.char = symbols[Math.floor(Math.random() * symbols.length)];
        }
        ctx.fillText(p.char || '0', p.x, p.y);
      } else if (currentType === 'particles') {
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dst = Math.sqrt(dx * dx + dy * dy);
          if (dst < 75) {
            ctx.beginPath();
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (75 - dst) / 75 * 0.28;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }
      } else {
        ctx.arc(p.x, p.y, p.radius + Math.sin(time + idx) * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
    });

    if (mousePos.x > -500 && mousePos.y > -500 && interactionMode !== 'none') {
      ctx.beginPath();
      ctx.arc(mousePos.x, mousePos.y, 150, 0, Math.PI * 2);
      ctx.strokeStyle = primaryColor;
      ctx.globalAlpha = 0.06;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.globalAlpha = 1.0;

      ctx.beginPath();
      ctx.arc(mousePos.x, mousePos.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = interactionMode === 'attract' ? primaryColor : secondaryColor;
      ctx.fill();
    }

    animationId = requestAnimationFrame(render);
  }

  // Event Listeners
  window.addEventListener('resize', handleResize);
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  });
  canvas.addEventListener('mouseleave', () => {
    mousePos = { x: -1000, y: -1000 };
  });

  // UI Event Listeners
  document.getElementById('btn-toggle-play').addEventListener('click', (e) => {
    isPlaying = !isPlaying;
    const playIconStr = '<i data-lucide="play" class="ml-0.5" style="width:15px; height:15px;"></i>';
    const pauseIconStr = '<i data-lucide="pause" style="width:15px; height:15px;"></i>';
    e.currentTarget.innerHTML = isPlaying ? pauseIconStr : playIconStr;
    if (window.lucide) window.lucide.createIcons();
    
    document.getElementById('sandbox-indicator').classList.toggle('animate-ping', isPlaying);
    document.getElementById('sandbox-indicator').classList.toggle('bg-emerald-500', isPlaying);
    document.getElementById('sandbox-indicator').classList.toggle('bg-zinc-500', !isPlaying);
  });

  function updateActiveClasses(selectorPrefix, currentValue, prefixLen) {
    document.querySelectorAll(`[id^="${selectorPrefix}"]`).forEach(btn => {
      const mode = btn.id.substring(prefixLen);
      const isDarkMode = document.documentElement.classList.contains('dark');
      
      // reset classes
      btn.className = `flex-1 py-1.5 text-xs font-mono rounded-lg border transition-all cursor-pointer text-center`;
      
      if (mode === currentValue) {
        if(isDarkMode) btn.className += ' bg-blue-500/20 text-blue-400 border-blue-500/50 font-bold';
        else btn.className += ' bg-blue-50 text-blue-600 border-blue-200 font-bold';
      } else {
        if(isDarkMode) btn.className += ' bg-zinc-900 text-zinc-400 border-zinc-850 hover:border-zinc-800';
        else btn.className += ' bg-zinc-50 text-zinc-600 border-zinc-200 hover:border-zinc-300';
      }
    });
  }

  function updatePresetUI() {
    const isDarkMode = document.documentElement.classList.contains('dark');
    document.querySelectorAll(`[id^="preset-"]`).forEach(btn => {
      const presetName = btn.id.substring(7).replace(/-/g, ' '); // simple conversion
      const isActive = PRESETS.find(p => p.type === currentType && p.primaryColor === primaryColor && p.name.toLowerCase() === presetName);
      
      btn.className = `px-3 py-2 text-xs rounded-xl font-medium text-left border transition-all cursor-pointer flex flex-col`;
      if (isActive) {
        if(isDarkMode) btn.className += ' bg-white text-black border-white shadow-lg';
        else btn.className += ' bg-zinc-950 text-white border-zinc-950 shadow-md';
      } else {
        if(isDarkMode) btn.className += ' bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850';
        else btn.className += ' bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-100';
      }
    });
    
    document.getElementById('mesh-type-display').innerText = `MESH_TYPE: ${currentType.toUpperCase()}`;
  }

  // Bind interaction mode
  ['attract', 'repel', 'none'].forEach(mode => {
    document.getElementById(`interaction-${mode}`).addEventListener('click', () => {
      interactionMode = mode;
      updateActiveClasses('interaction-', mode, 12);
    });
  });

  // Bind presets
  PRESETS.forEach(p => {
    const id = `preset-${p.name.toLowerCase().replace(/ /g, '-')}`;
    document.getElementById(id).addEventListener('click', () => {
      currentType = p.type;
      speed = p.speed;
      gravity = p.gravity;
      count = p.count;
      primaryColor = p.primaryColor;
      secondaryColor = p.secondaryColor;
      
      // Update sliders
      document.getElementById('slider-speed').value = speed;
      document.getElementById('slider-gravity').value = gravity;
      document.getElementById('slider-count').value = count;
      document.getElementById('speed-display').innerText = speed.toFixed(1) + 'x';
      document.getElementById('gravity-display').innerText = gravity.toFixed(2);
      document.getElementById('count-display').innerText = count + ' active';
      
      // Update color pickers
      document.getElementById('picker-primary-color').value = primaryColor;
      document.getElementById('picker-secondary-color').value = secondaryColor;

      updatePresetUI();
      initParticles();
    });
  });

  // Sliders
  document.getElementById('slider-speed').addEventListener('input', (e) => {
    speed = parseFloat(e.target.value);
    document.getElementById('speed-display').innerText = speed.toFixed(1) + 'x';
  });
  document.getElementById('slider-gravity').addEventListener('input', (e) => {
    gravity = parseFloat(e.target.value);
    document.getElementById('gravity-display').innerText = gravity.toFixed(2);
  });
  document.getElementById('slider-count').addEventListener('input', (e) => {
    count = parseInt(e.target.value);
    document.getElementById('count-display').innerText = count + ' active';
    initParticles();
  });

  // Colors
  document.getElementById('picker-primary-color').addEventListener('input', (e) => {
    primaryColor = e.target.value;
    updatePresetUI();
    initParticles();
  });
  document.getElementById('picker-secondary-color').addEventListener('input', (e) => {
    secondaryColor = e.target.value;
    updatePresetUI();
    initParticles();
  });

  // Initial call
  handleResize();
  updateActiveClasses('interaction-', interactionMode, 12);
  updatePresetUI();
  render();
  
  // Re-run theme UI updates when dark mode changes globally
  window.addEventListener('theme-changed', () => {
    updateActiveClasses('interaction-', interactionMode, 12);
    updatePresetUI();
  });
}
