(() => {
  const desktop = document.getElementById('desktop');
  const windows = [...document.querySelectorAll('.window')];
  const startButton = document.getElementById('start-button');
  const startMenu = document.getElementById('start-menu');
  const taskButtons = document.getElementById('task-buttons');
  const clock = document.getElementById('clock');
  const toast = document.getElementById('boot-toast');
  const toastClose = document.getElementById('toast-close');
  const runInput = document.getElementById('run-input');
  const runOk = document.getElementById('run-ok');
  const runError = document.getElementById('run-error');
  let topZ = 30;

  const titles = {
    about: '👤 About Me',
    experience: '💼 Experience',
    research: '🧠 AI Research',
    publications: '📚 Publications',
    projects: '🧪 Projects',
    resume: '📄 Resume',
    skills: '🛠️ Skills',
    contact: '✉️ Contact',
    run: '▶ Run'
  };

  function getWindow(name) {
    return document.querySelector(`[data-window="${name}"]`);
  }

  function focusWindow(win) {
    if (!win) return;
    windows.forEach(w => w.classList.remove('active-window'));
    win.classList.add('active-window');
    win.style.zIndex = String(++topZ);
    syncTaskButtons();
  }

  function openWindow(name) {
    const win = getWindow(name);
    if (!win) return false;
    win.classList.add('open');
    win.classList.remove('minimized');
    focusWindow(win);
    closeStartMenu();
    if (name === 'run') setTimeout(() => runInput?.focus(), 40);
    return true;
  }

  function closeWindow(win) {
    win.classList.remove('open', 'minimized', 'active-window', 'maximized');
    win.style.removeProperty('left');
    win.style.removeProperty('top');
    syncTaskButtons();
  }

  function minimizeWindow(win) {
    win.classList.add('minimized');
    win.classList.remove('active-window');
    syncTaskButtons();
    const remaining = windows.filter(w => w.classList.contains('open') && !w.classList.contains('minimized'));
    if (remaining.length) focusWindow(remaining[remaining.length - 1]);
  }

  function toggleMaximize(win) {
    win.classList.toggle('maximized');
    focusWindow(win);
  }

  function syncTaskButtons() {
    const openWins = windows.filter(w => w.classList.contains('open'));
    taskButtons.innerHTML = '';
    openWins.forEach(win => {
      const name = win.dataset.window;
      const btn = document.createElement('button');
      btn.className = 'task-button' + (win.classList.contains('active-window') && !win.classList.contains('minimized') ? ' active' : '');
      btn.type = 'button';
      btn.textContent = titles[name] || name;
      btn.addEventListener('click', () => {
        if (win.classList.contains('minimized')) {
          win.classList.remove('minimized');
          focusWindow(win);
        } else if (win.classList.contains('active-window')) {
          minimizeWindow(win);
        } else {
          focusWindow(win);
        }
      });
      taskButtons.appendChild(btn);
    });
  }

  function closeStartMenu() {
    startMenu.hidden = true;
    startButton.classList.remove('active');
    startButton.setAttribute('aria-expanded', 'false');
  }

  function toggleStartMenu() {
    const willOpen = startMenu.hidden;
    startMenu.hidden = !willOpen;
    startButton.classList.toggle('active', willOpen);
    startButton.setAttribute('aria-expanded', String(willOpen));
  }

  document.querySelectorAll('[data-open]').forEach(el => {
    el.addEventListener('click', event => {
      const target = el.dataset.open;
      if (!target) return;
      event.preventDefault();
      openWindow(target);
    });
  });

  windows.forEach(win => {
    win.querySelectorAll('[data-close]').forEach(btn => btn.addEventListener('click', () => closeWindow(win)));
    win.querySelectorAll('[data-minimize]').forEach(btn => btn.addEventListener('click', () => minimizeWindow(win)));
    win.querySelectorAll('[data-maximize]').forEach(btn => btn.addEventListener('click', () => toggleMaximize(win)));
    win.addEventListener('pointerdown', () => focusWindow(win));
  });

  startButton.addEventListener('click', event => {
    event.stopPropagation();
    toggleStartMenu();
  });

  startMenu.addEventListener('click', event => event.stopPropagation());
  document.addEventListener('pointerdown', event => {
    if (!startMenu.hidden && !startMenu.contains(event.target) && event.target !== startButton) closeStartMenu();
  });

  function makeDraggable(win) {
    const handle = win.querySelector('.drag-handle');
    if (!handle) return;
    let dragging = false;
    let startX = 0, startY = 0, originX = 0, originY = 0;

    handle.addEventListener('pointerdown', event => {
      if (event.target.closest('.window-controls')) return;
      if (window.matchMedia('(max-width: 800px)').matches || win.classList.contains('maximized')) return;
      dragging = true;
      focusWindow(win);
      const rect = win.getBoundingClientRect();
      startX = event.clientX;
      startY = event.clientY;
      originX = rect.left;
      originY = rect.top;
      handle.setPointerCapture?.(event.pointerId);
      event.preventDefault();
    });

    handle.addEventListener('pointermove', event => {
      if (!dragging) return;
      const maxX = window.innerWidth - 120;
      const maxY = window.innerHeight - 80;
      const nextX = Math.max(0, Math.min(maxX, originX + event.clientX - startX));
      const nextY = Math.max(0, Math.min(maxY, originY + event.clientY - startY));
      win.style.left = `${nextX}px`;
      win.style.top = `${nextY}px`;
    });

    const stop = event => {
      if (!dragging) return;
      dragging = false;
      try { handle.releasePointerCapture?.(event.pointerId); } catch (_) {}
    };
    handle.addEventListener('pointerup', stop);
    handle.addEventListener('pointercancel', stop);
    handle.addEventListener('dblclick', event => {
      if (event.target.closest('.window-controls')) return;
      toggleMaximize(win);
    });
  }
  windows.forEach(makeDraggable);

  function runCommand() {
    const raw = runInput.value.trim().toLowerCase();
    const aliases = {
      me: 'about', profile: 'about', about: 'about',
      work: 'experience', career: 'experience', experience: 'experience',
      ai: 'research', rag: 'research', llm: 'research', agents: 'research', research: 'research',
      papers: 'publications', paper: 'publications', publications: 'publications', doi: 'publications',
      projects: 'projects', project: 'projects',
      cv: 'resume', resume: 'resume',
      skills: 'skills', stack: 'skills',
      email: 'contact', contact: 'contact'
    };
    if (raw === 'github') {
      window.open('https://github.com/faridbagheri', '_blank', 'noopener');
      closeWindow(getWindow('run'));
      return;
    }
    if (raw === 'blog') {
      location.href = 'blog/';
      return;
    }
    const target = aliases[raw];
    if (target && openWindow(target)) {
      runInput.value = '';
      runError.textContent = '';
      closeWindow(getWindow('run'));
    } else {
      runError.textContent = 'Program not found. Try: about, research, publications, projects, resume, skills, contact, github or blog.';
    }
  }
  runOk?.addEventListener('click', runCommand);
  runInput?.addEventListener('keydown', event => { if (event.key === 'Enter') runCommand(); });

  function updateClock() {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    clock.title = now.toLocaleString();
  }
  updateClock();
  setInterval(updateClock, 30000);

  toastClose?.addEventListener('click', () => toast.classList.add('hide'));
  setTimeout(() => toast?.classList.add('hide'), 6500);

  desktop.addEventListener('pointerdown', event => {
    if (event.target === desktop) document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
  });
  document.querySelectorAll('.desktop-icon').forEach(icon => {
    icon.addEventListener('pointerdown', () => {
      document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
      icon.classList.add('selected');
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeStartMenu();
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'r') {
      event.preventDefault();
      openWindow('run');
    }
  });

  openWindow('about');
})();
