import { CATEGORIES, PROJECTS, CAPABILITIES, PLATFORMS_SOFTWARE } from './data.js';
import { initSandbox } from './sandbox.js';
import { initBriefGenerator } from './brief.js';

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. DARK MODE TOGGLE ---
  let isDarkMode = true;
  const themeToggler = document.getElementById('theme-toggler');
  const htmlEl = document.documentElement;
  
  function applyTheme() {
    if (isDarkMode) {
      htmlEl.classList.add('dark');
      themeToggler.innerHTML = '<i data-lucide="sun" style="width:15px;height:15px;"></i>';
      themeToggler.className = 'p-2.5 rounded-xl border transition-all cursor-pointer bg-zinc-900 border-zinc-800 text-amber-400 hover:text-amber-300 hover:bg-zinc-850';
    } else {
      htmlEl.classList.remove('dark');
      themeToggler.innerHTML = '<i data-lucide="moon" style="width:15px;height:15px;"></i>';
      themeToggler.className = 'p-2.5 rounded-xl border transition-all cursor-pointer bg-white border-zinc-200 text-indigo-600 hover:text-indigo-800 hover:bg-zinc-50';
    }
    if (window.lucide) window.lucide.createIcons();
    // Dispatch event to update components (Sandbox, Brief)
    window.dispatchEvent(new CustomEvent('theme-changed'));
    renderProjects();
    renderCapabilities();
    renderCategories();
  }

  themeToggler.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    applyTheme();
  });

  // --- 2. GREETING ROTATION ---
  const GREETINGS = [
    { text: 'Sampurasun, Wilujeng Sumping!', label: 'Sundanese' },
    { text: 'Selamat Datang, Mari Berkolaborasi!', label: 'Indonesian' },
    { text: 'Welcome, Shape Reality through Motion!', label: 'English' }
  ];
  let greetingIndex = 0;
  const greetingEl = document.getElementById('greeting-text');
  
  setInterval(() => {
    greetingIndex = (greetingIndex + 1) % GREETINGS.length;
    // Simple fade transition
    greetingEl.style.opacity = '0';
    setTimeout(() => {
      greetingEl.innerHTML = `${GREETINGS[greetingIndex].text} <span class="opacity-45 text-[9px] uppercase">[${GREETINGS[greetingIndex].label}]</span>`;
      greetingEl.style.opacity = '1';
    }, 300);
  }, 4500);

  // --- 3. FILTER & RENDER PROJECTS ---
  let selectedCategory = 'All';
  const catContainer = document.getElementById('categories-container');
  const projContainer = document.getElementById('projects-grid');

  function renderCategories() {
    catContainer.innerHTML = '';
    CATEGORIES.forEach(cat => {
      const isAct = selectedCategory === cat;
      const btn = document.createElement('button');
      btn.innerText = cat;
      
      let classes = 'px-4.5 py-1.5 text-xs font-mono rounded-full border transition-all cursor-pointer ';
      if (isAct) {
        classes += 'bg-blue-600 border-blue-600 text-white font-bold';
      } else if (isDarkMode) {
        classes += 'bg-zinc-900 hover:bg-zinc-850 border-zinc-850 text-zinc-400 hover:text-white';
      } else {
        classes += 'bg-zinc-150 hover:bg-zinc-200 border-zinc-200 text-zinc-650 hover:text-black';
      }
      
      btn.className = classes;
      btn.addEventListener('click', () => {
        selectedCategory = cat;
        renderCategories();
        renderProjects();
      });
      catContainer.appendChild(btn);
    });
  }

  function renderProjects() {
    projContainer.innerHTML = '';
    const filtered = selectedCategory === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === selectedCategory);
    
    if (filtered.length === 0) {
      projContainer.innerHTML = '<div class="py-16 text-center text-zinc-500 font-mono text-xs w-full">No projects matched the selected category filter at this time.</div>';
      return;
    }

    filtered.forEach(p => {
      const cardClasses = `group relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer shadow-md border pop-enter-active ${isDarkMode ? 'bg-zinc-900 border-zinc-950/80' : 'bg-white border-zinc-200'} ${p.aspectRatio} mb-6`;
      const card = document.createElement('div');
      card.className = cardClasses;
      card.innerHTML = `
        <div class="absolute inset-0 w-full h-full bg-zinc-950">
          <video src="${p.videoUrl}" poster="${p.posterUrl}" autoPlay loop muted playsInline class="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-[1.2s] ease-out pointer-events-none"></video>
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/10 opacity-90 md:opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out flex flex-col justify-between p-6">
          <div class="flex justify-between items-center">
            <span class="px-2.5 py-0.5 bg-white/20 backdrop-blur-md text-[9px] font-mono rounded-full text-zinc-100 border border-white/10 uppercase font-semibold">${p.category}</span>
            <span class="text-[10px] font-mono text-zinc-300 font-bold">${p.year}</span>
          </div>
          <div class="space-y-2 text-left text-white">
            <h3 class="text-xl md:text-2xl font-display font-extrabold tracking-tight">${p.title}</h3>
            <p class="text-xs text-zinc-300 line-clamp-2">${p.description}</p>
            <div class="flex items-center gap-1.5 text-[10px] font-mono text-blue-400 font-bold pt-1 uppercase">
              <span>Analyse Pipeline Details</span>
              <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
            </div>
          </div>
        </div>
      `;
      card.addEventListener('click', () => openModal(p));
      projContainer.appendChild(card);
    });
    if (window.lucide) window.lucide.createIcons();
  }

  // --- 4. MODAL LOGIC ---
  const modalBackdrop = document.getElementById('case-study-backdrop');
  const modalDrawer = document.getElementById('case-study-drawer');
  const btnCloseModal = document.getElementById('btn-close-drawer');

  function openModal(project) {
    // Populate data
    document.getElementById('modal-video').src = project.videoUrl;
    document.getElementById('modal-video').poster = project.posterUrl;
    document.getElementById('modal-cat').innerText = project.category;
    document.getElementById('modal-title').innerText = project.title;
    document.getElementById('modal-client').innerText = project.client;
    document.getElementById('modal-year').innerText = project.year;
    document.getElementById('modal-role').innerText = project.role;
    document.getElementById('modal-cat2').innerText = project.category;
    document.getElementById('modal-desc').innerText = project.longDescription;
    
    const challengesWrap = document.getElementById('modal-challenges-wrap');
    if (project.challenges) {
      challengesWrap.classList.remove('hidden');
      challengesWrap.classList.add('grid');
      document.getElementById('modal-challenge-text').innerText = project.challenges;
      document.getElementById('modal-solution-text').innerText = project.solution;
    } else {
      challengesWrap.classList.add('hidden');
      challengesWrap.classList.remove('grid');
    }

    const swList = document.getElementById('modal-software-list');
    swList.innerHTML = '';
    project.software.forEach(sw => {
      const sp = document.createElement('span');
      sp.className = `inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-lg border ${isDarkMode ? 'bg-zinc-900 border-zinc-850 text-zinc-200' : 'bg-zinc-100 border-zinc-200 text-zinc-700'}`;
      sp.innerHTML = `<i data-lucide="cpu" class="text-blue-500" style="width:12px;height:12px;"></i> ${sw}`;
      swList.appendChild(sp);
    });

    const tagList = document.getElementById('modal-tags');
    tagList.innerHTML = '';
    project.tags.forEach(tag => {
      const sp = document.createElement('span');
      sp.className = "text-xs px-2.5 py-1 rounded-full bg-zinc-500/10 text-zinc-400 border border-zinc-500/10";
      sp.innerText = `#${tag}`;
      tagList.appendChild(sp);
    });

    // Show modal
    modalBackdrop.classList.remove('hidden');
    modalDrawer.classList.remove('drawer-exit-active');
    modalDrawer.classList.add('drawer-enter-active');
    
    // UI Theme overrides
    modalDrawer.className = `w-full md:max-w-3xl h-full md:h-[calc(100vh-2rem)] rounded-none md:rounded-3xl shadow-2xl overflow-y-auto relative flex flex-col drawer-enter-active ${
      isDarkMode ? 'bg-zinc-950 text-white border border-zinc-800' : 'bg-white text-zinc-900 border border-zinc-200'
    }`;
    document.getElementById('modal-top-bar').className = `sticky top-0 z-20 flex justify-between items-center px-6 py-4 border-b backdrop-blur-md ${
      isDarkMode ? 'bg-zinc-950/95 border-zinc-800' : 'bg-white/95 border-zinc-200'
    }`;
    btnCloseModal.className = `p-2 rounded-full cursor-pointer transition-colors ${
      isDarkMode ? 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-black'
    }`;
    document.getElementById('modal-specs-box').className = `grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl border ${
      isDarkMode ? 'bg-zinc-900/40 border-zinc-900' : 'bg-zinc-50 border-zinc-200'
    }`;
    document.getElementById('modal-cta-box').className = `p-6 border-t ${
      isDarkMode ? 'bg-zinc-900/40 border-zinc-900' : 'bg-zinc-50 border-zinc-200'
    } flex flex-col md:flex-row justify-between items-center gap-4`;
    document.getElementById('cta-build-brief').className = `px-5 py-2.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
      isDarkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-zinc-950 text-white hover:bg-zinc-800'
    }`;
    
    if (window.lucide) window.lucide.createIcons();
  }

  function closeModal() {
    modalDrawer.classList.remove('drawer-enter-active');
    modalDrawer.classList.add('drawer-exit-active');
    setTimeout(() => {
      modalBackdrop.classList.add('hidden');
      document.getElementById('modal-video').pause();
    }, 300);
  }

  btnCloseModal.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  modalDrawer.addEventListener('click', (e) => e.stopPropagation());
  document.getElementById('cta-build-brief').addEventListener('click', closeModal);

  // --- 5. RENDER CAPABILITIES ---
  const swContainer = document.getElementById('software-stack-container');
  function renderCapabilities() {
    swContainer.innerHTML = '';
    PLATFORMS_SOFTWARE.forEach(sw => {
      const div = document.createElement('div');
      div.className = `px-3 py-2 rounded-xl text-left border ${
        isDarkMode ? 'bg-zinc-900/60 border-zinc-850/80' : 'bg-zinc-100 border-zinc-200'
      }`;
      div.innerHTML = `
        <div class="text-xs font-bold truncate">${sw.name}</div>
        <div class="text-[9px] font-mono text-blue-500">${sw.level}</div>
      `;
      swContainer.appendChild(div);
    });

    const capContainer = document.getElementById('capabilities-grid');
    capContainer.innerHTML = '';
    CAPABILITIES.forEach(cap => {
      const div = document.createElement('div');
      div.className = `p-6 rounded-2xl border flex flex-col justify-between h-full hover:shadow-md transition-shadow ${
        isDarkMode ? 'bg-zinc-950 border-zinc-900 text-white' : 'bg-white border-zinc-200 text-zinc-900'
      }`;
      div.innerHTML = `
        <div>
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-sm font-bold uppercase tracking-wider font-mono text-blue-500">${cap.name}</h3>
            <span class="text-xs font-mono font-bold bg-blue-500/10 px-2 py-0.5 rounded text-blue-400 border border-blue-500/20">${cap.level}</span>
          </div>
          <p class="text-xs leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}">${cap.description}</p>
        </div>
        <div class="mt-6 pt-4 border-t border-zinc-900/10 dark:border-zinc-900/60">
          <div class="flex justify-between text-[10px] font-mono text-zinc-500 mb-1">
            <span>PIPELINE INTEGRITY LEVEL</span>
            <span class="font-bold">${cap.percentage}%</span>
          </div>
          <div class="w-full bg-zinc-200 dark:bg-zinc-900 h-1 rounded-full overflow-hidden">
            <div class="bg-blue-600 h-full rounded-full" style="width: ${cap.percentage}%"></div>
          </div>
        </div>
      `;
      capContainer.appendChild(div);
    });
  }

  // --- 6. CONTACT FORM ---
  const contactForm = document.getElementById('portfolio-contact-form');
  const successBox = document.getElementById('success-contact-box');
  const btnSubmitContact = document.getElementById('btn-submit-contact');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate sending
      btnSubmitContact.disabled = true;
      btnSubmitContact.innerHTML = '<span>SENDING PROTOCOLS...</span>';
      btnSubmitContact.className = 'w-full py-4.5 rounded-xl font-display font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-not-allowed opacity-70 bg-zinc-800 text-zinc-500 transition-all';
      
      setTimeout(() => {
        contactForm.classList.add('hidden');
        successBox.classList.remove('hidden');
        
        // Reset button
        btnSubmitContact.disabled = false;
        btnSubmitContact.innerHTML = '<span>Initialize Creative Brief Transmission</span><i data-lucide="arrow-right" style="width:13px;height:13px;"></i>';
        btnSubmitContact.className = 'w-full py-4.5 rounded-xl font-display font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all bg-blue-600 hover:bg-blue-500 text-white shadow-md active:scale-98';
        if(window.lucide) window.lucide.createIcons();
      }, 1200);
    });
  }

  document.getElementById('reset-contact-btn')?.addEventListener('click', () => {
    successBox.classList.add('hidden');
    contactForm.classList.remove('hidden');
    contactForm.reset();
  });

  // --- INITIALIZE ALL ---
  applyTheme();
  initSandbox();
  initBriefGenerator();
  
  if(window.lucide) window.lucide.createIcons();
});
