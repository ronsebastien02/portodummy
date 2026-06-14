export function initBriefGenerator() {
  // States
  let clientName = '';
  let industry = 'Tech';
  let style = 'Simulation';
  let duration = 15;
  let complexity = 'Premium Studio';
  let additionalRequest = '';
  let isGenerated = false;
  let isSubmitSuccess = false;

  // DOM Elements
  const form = document.getElementById('brief-generator-form');
  const inputName = document.getElementById('brief-client-name');
  const selIndustry = document.getElementById('brief-industry');
  const selStyle = document.getElementById('brief-style');
  const inputDetails = document.getElementById('brief-request-details');
  const viewWaiting = document.getElementById('brief-view-waiting');
  const viewGenerated = document.getElementById('brief-view-generated');
  const btnApply = document.getElementById('btn-apply-brief');
  const successBox = document.getElementById('brief-success');

  // Calculations
  function calculateBudget() {
    let base = 1200;
    const durationMultiplier = duration * 80;
    let styleCost = 0;
    if (style === 'Simulation') styleCost = 600;
    else if (style === 'Complex CGI') styleCost = 800;
    else if (style === 'Kinetic Typography') styleCost = 300;
    else if (style === 'Brand System') styleCost = 500;
    else if (style === 'UI Interaction') styleCost = 400;

    let complexityMultiplier = 1;
    if (complexity === 'Premium Studio') complexityMultiplier = 1.8;
    else if (complexity === 'Masterclass Advanced') complexityMultiplier = 2.5;

    return Math.round((base + durationMultiplier + styleCost) * complexityMultiplier);
  }

  function calculateTimelineDays() {
    let days = 10;
    if (duration > 15) days += 5;
    if (duration > 30) days += 10;
    if (complexity === 'Premium Studio') days += 12;
    if (complexity === 'Masterclass Advanced') days += 25;
    if (style === 'Simulation' || style === 'Complex CGI') days += 6;
    return days;
  }

  function getRecommendedSoftware() {
    if (style === 'Simulation') return ['Houdini', 'Octane / Redshift', 'After Effects'];
    if (style === 'Complex CGI') return ['Houdini', 'Cinema 4D', 'Redshift'];
    if (style === 'Kinetic Typography') return ['After Effects', 'Cinema 4D'];
    if (style === 'Brand System') return ['Cinema 4D', 'After Effects', 'DaVinci Resolve'];
    return ['Unreal Engine 5', 'After Effects'];
  }

  // Update UI helpers
  function updateDurations() {
    const isDarkMode = document.documentElement.classList.contains('dark');
    document.getElementById('brief-duration-display').innerText = duration + ' seconds';
    
    [5, 15, 30, 60].forEach(dur => {
      const btn = document.getElementById(`brief-duration-${dur}`);
      if (!btn) return;
      btn.className = 'flex-1 py-2 text-xs font-mono rounded-lg border cursor-pointer transition-all';
      if (duration === dur) {
        btn.className += ' bg-blue-600 border-blue-600 text-white font-bold shadow-sm';
      } else {
        if (isDarkMode) btn.className += ' bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700';
        else btn.className += ' bg-zinc-50 text-zinc-600 border-zinc-200 hover:border-zinc-300';
      }
    });
  }

  function updateComplexities() {
    const isDarkMode = document.documentElement.classList.contains('dark');
    const comps = ['Standard', 'Premium Studio', 'Masterclass Advanced'];
    
    comps.forEach(comp => {
      const id = `brief-complexity-${comp.toLowerCase().replace(/ /g, '-')}`;
      const btn = document.getElementById(id);
      if (!btn) return;
      
      const isSel = (complexity === comp);
      btn.className = `p-3.5 rounded-xl border text-left cursor-pointer transition-all`;
      
      if (isSel) {
        if(isDarkMode) btn.className += ' bg-white text-zinc-950 border-white font-bold';
        else btn.className += ' bg-zinc-950 text-white border-zinc-950 font-bold';
      } else {
        if(isDarkMode) btn.className += ' bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700';
        else btn.className += ' bg-zinc-50 border-zinc-200 text-zinc-600 hover:border-zinc-300';
      }
    });
  }

  function populateGeneratedSheet() {
    document.getElementById('brief-out-name').innerText = clientName || 'Interactive Draft';
    document.getElementById('brief-out-budget').innerText = calculateBudget().toLocaleString();
    document.getElementById('brief-out-days').innerText = calculateTimelineDays();
    document.getElementById('brief-out-industry').innerText = industry;
    document.getElementById('brief-out-style').innerText = style;
    document.getElementById('brief-out-duration').innerText = duration + ' seconds';
    document.getElementById('brief-out-complexity').innerText = complexity;
    
    const swContainer = document.getElementById('brief-out-software');
    swContainer.innerHTML = '';
    getRecommendedSoftware().forEach(sw => {
      const span = document.createElement('span');
      span.className = 'px-2 py-0.5 bg-zinc-500/10 text-zinc-400 border border-zinc-500/10 rounded font-mono text-[10px]';
      span.innerText = sw;
      swContainer.appendChild(span);
    });
  }

  // Bind Events
  if(form) {
    inputName.addEventListener('input', e => clientName = e.target.value);
    selIndustry.addEventListener('change', e => industry = e.target.value);
    selStyle.addEventListener('change', e => style = e.target.value);
    inputDetails.addEventListener('input', e => additionalRequest = e.target.value);

    [5, 15, 30, 60].forEach(dur => {
      document.getElementById(`brief-duration-${dur}`)?.addEventListener('click', () => {
        duration = dur;
        updateDurations();
      });
    });

    ['Standard', 'Premium Studio', 'Masterclass Advanced'].forEach(comp => {
      const id = `brief-complexity-${comp.toLowerCase().replace(/ /g, '-')}`;
      document.getElementById(id)?.addEventListener('click', () => {
        complexity = comp;
        updateComplexities();
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!clientName.trim()) {
        alert('Kindly supply your name or company identifier.');
        return;
      }
      isGenerated = true;
      isSubmitSuccess = false;
      
      // Toggle Views with simple classes
      viewWaiting.classList.add('hidden');
      viewGenerated.classList.remove('hidden');
      viewGenerated.classList.add('flex');
      
      successBox.classList.add('hidden');
      btnApply.classList.remove('hidden');
      
      populateGeneratedSheet();
    });

    btnApply.addEventListener('click', () => {
      const briefSummary = `PROJECT BRIEF PROPOSAL / ESTIMATE
Client/Company: ${clientName}
Industry Sector: ${industry}
Creative Style: ${style}
Duration Target: ${duration} seconds
Complexity Tier: ${complexity}
Estimated Budget: ~$${calculateBudget().toLocaleString()}
Est. Production Timeline: ${calculateTimelineDays()} calendar days
Recommended Pipeline: ${getRecommendedSoftware().join(', ')}
Special Notes: ${additionalRequest || 'None provided'}`;
      
      const contactMsg = document.getElementById('contact-message');
      if (contactMsg) {
        contactMsg.value = briefSummary;
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      }
      
      isSubmitSuccess = true;
      btnApply.classList.add('hidden');
      successBox.classList.remove('hidden');
      successBox.classList.add('flex');
    });

    // Theme changes updates
    window.addEventListener('theme-changed', () => {
      updateDurations();
      updateComplexities();
    });

    // Init UI
    updateDurations();
    updateComplexities();
  }
}
