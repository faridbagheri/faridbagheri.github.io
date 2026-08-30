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

  // Classic Windows 95 Start logo.
  const windowsMark = document.querySelector('.windows-mark');
  if (windowsMark) {
    const startLogo = document.createElement('img');
    startLogo.src = 'assets/win95-start-logo.png';
    startLogo.alt = '';
    startLogo.width = 28;
    startLogo.height = 23;
    startLogo.style.cssText = 'display:block;width:28px;height:23px;object-fit:contain;image-rendering:auto;';
    windowsMark.replaceChildren(startLogo);
    windowsMark.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;width:29px;height:24px;flex:0 0 29px;transform:none;';
  }

  // Keep the browser-tab icon aligned with the AI icon stored in /assets.
  let favicon = document.querySelector('link[rel="icon"]');
  if (!favicon) {
    favicon = document.createElement('link');
    favicon.rel = 'icon';
    document.head.appendChild(favicon);
  }
  favicon.type = 'image/png';
  favicon.href = 'assets/pngtree-ai-icon-png-image_15382528.png?v=20260830-cv2';

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

  // Synchronize visible portfolio content with the latest CV uploaded as
  // assets/Farid-Bagheri-CV.pdf while keeping the Windows 95 desktop design.
  function syncCvContent() {
    const about = getWindow('about');
    if (about) {
      // About window size and scroll behavior.
      about.style.setProperty('--left', '7%');
      about.style.setProperty('--top', '3%');
      about.style.setProperty('--width', '950px');
      about.style.setProperty('--height', '650px');
      const aboutContent = about.querySelector('.window-content');
      if (aboutContent) {
        aboutContent.classList.add('scrollable');
        aboutContent.style.overflowY = 'scroll';
        aboutContent.style.overflowX = 'hidden';
        aboutContent.style.scrollbarColor = '#c0c0c0 #dfdfdf';
        aboutContent.style.scrollbarGutter = 'stable';
      }

      const summary = about.querySelector('.about-copy > p:not(.win-subtitle)');
      if (summary) summary.innerHTML = 'PhD AI engineer specializing in <strong>LLMs, agentic AI, RAG and knowledge-enhanced systems</strong>. Experienced in designing multi-model LLM pipelines, auditable evaluation workflows, semantic retrieval systems and knowledge-graph-based AI using Python, PyTorch, Hugging Face and LangChain. Built and evaluated scalable AI systems for real-world data and engineering-oriented workflows, combining research rigor with prior manufacturing quality and data-analysis experience.';
      const info = about.querySelectorAll('.info-grid > div');
      if (info[3]) info[3].innerHTML = '<span class="field-label">Evaluation</span><span>LLM Evaluation · LLM-as-a-Judge</span>';
    }

    const experience = getWindow('experience');
    if (experience) {
      const list = experience.querySelector('.classic-list');
      if (list) list.innerHTML = `
        <article class="classic-item"><div class="classic-date">2025 – Present</div><div><h3>AI & Prompt Engineer | LLM Evaluation — Mercor</h3><p>Evaluate and compare LLM outputs for factual accuracy, relevance, coherence and instruction compliance. Identify hallucinations, reasoning/response-quality failures and gaps between expected and generated outputs. Refine prompts and provide structured evaluation feedback to improve model reliability and response quality.</p></div></article>
        <article class="classic-item"><div class="classic-date">2023 – Present</div><div><h3>Research Associate | LLMs, Agents & Knowledge-Enhanced AI — LIPN, Sorbonne Paris Nord University</h3><p>Design modular agentic-AI workflows with multi-model producer/judge architectures, structured JSON outputs, deterministic post-processing and auditable intermediate artifacts. Develop knowledge-enhanced retrieval and semantic-matching workflows using LLMs, knowledge graphs, SBERT, TF-IDF, graph embeddings and hybrid reranking/similarity methods. Benchmark multiple LLM families for output quality, robustness and downstream retrieval performance using automated and task-specific evaluation metrics. Build reproducible experiments on a real-world corpus of <strong>663 submissions and 524 expert profiles</strong> sourced from linked structured and unstructured data.</p></div></article>
        <article class="classic-item"><div class="classic-date">2022 – Feb 2026</div><div><h3>PhD Researcher — Artificial Intelligence — University of Cagliari</h3><p>Developed scalable AI pipelines combining LLMs, knowledge graphs, NLP, semantic retrieval and recommender systems for explainable expert matching. Fine-tuned T5 on the SciTLDR scientific summarization dataset and integrated generated summaries into downstream LLM and retrieval experiments. Implemented research workflows in Python with PyTorch, Hugging Face, Ollama/OpenAI APIs, NetworkX/Node2Vec and reproducible JSON-based data pipelines.</p></div></article>
        <article class="classic-item"><div class="classic-date">2024 – Present</div><div><h3>Graduate Lecturer — Sorbonne Paris Nord University</h3><p>Teach NLP, Knowledge Graphs, Machine Learning and Deep Learning courses.</p></div></article>
        <article class="classic-item"><div class="classic-date">2019 – 2022</div><div><h3>Quality Control Engineer & Data Analyst — Sanem Plastik Company</h3><p>Analyzed production-line quality data to identify performance issues, estimate production costs and quantify potential savings. Collaborated with manufacturing and management teams to improve quality, production and design standards.</p></div></article>
        <article class="classic-item"><div class="classic-date">2009 – 2013</div><div><h3>Earlier Experience — Industrial Engineering & Marketing, Iran</h3><p>Earlier roles across industrial engineering and marketing.</p></div></article>`;
      const status = experience.querySelector('.statusbar > span:first-child');
      if (status) status.textContent = '6 experience entries';
    }

    const research = getWindow('research');
    if (research) {
      const hero = research.querySelector('.research-image-panel img');
      if (hero) hero.src = 'assets/ai-hero.png';
      const groups = research.querySelectorAll('.retro-groupbox');
      if (groups[0]) groups[0].innerHTML = '<span class="legend">Core research</span><ul><li>Large Language Models, prompt engineering and LLM evaluation</li><li>Retrieval-Augmented Generation (RAG) and vector databases</li><li>AI agents with LangChain / LangGraph workflows</li><li>Multi-model producer/judge architectures and LLM-as-a-Judge</li><li>Knowledge Graphs, graph embeddings and semantic retrieval</li><li>Semantic matching, reranking and task-specific evaluation</li></ul>';
      if (groups[1]) groups[1].innerHTML = '<span class="legend">Evaluation</span><p>Output quality · robustness · downstream retrieval performance · factuality · hallucination analysis · instruction compliance · MRR · MAP · Precision@K</p>';
      const status = research.querySelector('.statusbar > span:last-child');
      if (status) status.textContent = 'Python · PyTorch · Hugging Face · LangChain · LangGraph';
    }

    const publications = getWindow('publications');
    if (publications) {
      publications.querySelectorAll('.pub-row').forEach(row => {
        const title = row.querySelector('strong');
        const venue = row.querySelector('small');
        if (title && venue && title.textContent.includes('Leveraging Knowledge Graphs and LLMs')) {
          venue.textContent = 'Intelligent Information Systems (Springer)';
        }
      });
      // Existing DOI links are intentionally preserved.
    }

    const projects = getWindow('projects');
    if (projects) {
      const projectCards = projects.querySelectorAll('.project-folder');
      if (projectCards[1]) {
        const p = projectCards[1].querySelector('p');
        if (p) p.textContent = 'Agentic-AI workflows with multi-model producer/judge architectures, structured JSON outputs, deterministic post-processing and auditable intermediate artifacts.';
      }
    }

    const resume = getWindow('resume');
    if (resume) {
      const education = resume.querySelector('.retro-groupbox');
      if (education) education.innerHTML = '<span class="legend">Education</span><p><strong>PhD, Mathematics & Computer Science</strong><br>University of Cagliari · 2022–Feb 2026</p><p>M.Sc. Industrial Engineering · Dokuz Eylül University · 2019–2022</p>';

      // Keep only two clear actions: formatted web CV and direct PDF download.
      const buttons = resume.querySelector('.button-row');
      if (buttons) buttons.innerHTML = '<a class="win-button primary-win" href="cv.html">View</a><a class="win-button" href="assets/Farid-Bagheri-CV.pdf" download="Farid-Bagheri-CV.pdf">Download</a>';

      // Remove the right-side “Updated CV” status text.
      const statusParts = resume.querySelectorAll('.statusbar > span');
      if (statusParts[0]) statusParts[0].textContent = 'Farid_Bagheri.cv';
      if (statusParts[1]) statusParts[1].remove();
    }

    const skills = getWindow('skills');
    if (skills) {
      const groups = skills.querySelectorAll('.retro-groupbox');
      if (groups[0]) groups[0].innerHTML = '<span class="legend">GenAI & Agents</span><div class="skill-chips"><span>LLMs</span><span>RAG</span><span>AI Agents</span><span>LangChain</span><span>LangGraph</span><span>LLM-as-a-Judge</span><span>Prompt Engineering</span><span>LLM Evaluation</span><span>Multi-Model Pipelines</span><span>LoRA / PEFT familiarity</span></div>';
      if (groups[1]) groups[1].innerHTML = '<span class="legend">ML / NLP</span><div class="skill-chips"><span>PyTorch</span><span>Hugging Face Transformers</span><span>scikit-learn</span><span>SBERT</span><span>T5</span><span>NLTK</span></div>';
      if (groups[2]) groups[2].innerHTML = '<span class="legend">Knowledge & Retrieval</span><div class="skill-chips"><span>Knowledge Graphs</span><span>Vector Databases (ChromaDB)</span><span>Embeddings</span><span>Semantic Search</span><span>Reranking</span><span>NetworkX</span><span>Node2Vec</span><span>OpenIE</span><span>GLiNER</span><span>CSO Classifier</span><span>TF-IDF</span></div>';
      if (groups[3]) groups[3].innerHTML = '<span class="legend">Engineering</span><div class="skill-chips"><span>Python</span><span>FastAPI</span><span>Flask</span><span>REST APIs</span><span>OpenAI API</span><span>Ollama</span><span>OpenRouter</span><span>SQL</span><span>JSON</span><span>Git</span><span>CI/CD</span></div>';
      if (groups[4]) groups[4].innerHTML = '<span class="legend">Languages</span><p>English — Fluent · Turkish — Fluent · Azeri — Native · Persian — Native · French — Basic · Italian — Basic</p>';
    }
  }

  syncCvContent();

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
