export const CATEGORIES = [
  'All',
  '3D Simulation',
  'Brand Identity',
  'Product Viz',
  'Typography',
  'CGI',
  'Broadcast'
];

export const PROJECTS = [
  {
    id: 'quantum-dynamics',
    title: 'Quantum Dynamics',
    category: '3D Simulation',
    videoUrl: 'https://cdn.coverr.co/videos/coverr-abstract-neon-waves-4383/1080p.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    description: 'A gorgeous fluid simulator showcasing procedural particles reacting to sound waves.',
    longDescription: 'Quantum Dynamics is an ultra-fine abstract simulation project pushing the limits of Houdini’s Vellum solver. By mapping specific harmonic resonance from ambient synthesizers to force vector fields, we generated interactive micro-wave structures that mimic physical fluid flows in deep neon-light spaces.',
    tags: ['Procedural Particles', 'Vellum Solver', 'Audio Reactivity', 'Spectral Fields'],
    software: ['Houdini', 'Octane Render', 'After Effects'],
    client: 'Spectral Synthesis Inc.',
    year: '23/24',
    role: 'Lead Dynamicist & Animator',
    challenges: 'Perfectly mapping high-frequency audio bands to particle velocities without causing erratic movements or breaking the fluid consistency.',
    solution: 'Developed a custom band-pass noise filter vector within Houdini VOPS to constrain particle velocity vectors with smooth interpolation offsets.'
  },
  {
    id: 'neon-genesis',
    title: 'Neon Genesis',
    category: 'Brand Identity',
    videoUrl: 'https://cdn.coverr.co/videos/coverr-retro-wave-grid-5244/1080p.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-square',
    description: 'Interactive neon grid representing infinite electronic network landscapes.',
    longDescription: 'Synthesizing cyberpunk tropes with sleek, luxury design. Neon Genesis functions as a high-fidelity retro synth landscape created for the launch of a new cyber-security protocol. The visuals utilize glowing retro grids and responsive lasers to signal absolute data integrity and futuristic grid networks.',
    tags: ['WebGL Style', 'Vaporwave Grid', 'Displacement', 'Glow Shading'],
    software: ['Cinema 4D', 'Redshift', 'After Effects'],
    client: 'Sovereign Grid Systems',
    year: '2024',
    role: '3D Motion Specialist',
    challenges: 'Achieving a flawless, continuous looping grid displacement that looks extremely crisp and lightweight when running on high-refresh-rate displays.',
    solution: 'Built a modular math texture hierarchy using infinite noise functions offset by exact frame counts divided by the frame rate.'
  },
  {
    id: 'aura-audio',
    title: 'Aura Audio',
    category: 'Product Viz',
    videoUrl: 'https://cdn.coverr.co/videos/coverr-abstract-liquid-background-5154/1080p.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-video',
    description: 'Breathtaking conceptual advertisement of liquid gold and sound design.',
    longDescription: 'Aura Audio showcases luxury fluid sound visualization for an elite audiophile speaker manufacturer. By animating abstract liquid gold currents that wrap around precise metallic speaker cones, we visualised acoustic clarity and structural density.',
    tags: ['Liquid Gold Simulation', 'Product Visualisation', 'Refractive Glass', 'Luxury Hardware'],
    software: ['Cinema 4D', 'Octane Render', 'DaVinci Resolve'],
    client: 'AURA Electronics',
    year: '2023',
    role: 'Art Director',
    challenges: 'Replicating the true high-viscosity surface tension of molten metal while maintaining high refractive indexes in complex dark environments.',
    solution: 'Fine-tuned active surface tension, vorticity scale, and dual-layer materials with thin-film coatings inside the Octane render settings.'
  },
  {
    id: 'kinetic-type',
    title: 'Kinetic Type',
    category: 'Typography',
    videoUrl: 'https://cdn.coverr.co/videos/coverr-particles-in-motion-5245/1080p.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-square',
    description: 'Dynamic kinetic text rendering in response to virtual particle collisions.',
    longDescription: 'An experimental typographic installation that merges custom font matrices with high-density physical forces. In this piece, individual text parameters act as rigid bodies, getting shattered and re-assembled by floating procedural particles.',
    tags: ['Kinetic Layouts', 'Rigid Body Physics', 'Variable Fonts', 'Interactive Matrix'],
    software: ['After Effects', 'Unreal Engine 5', 'Cavity Studio'],
    client: 'Metropolitan Art Initiative',
    year: '2024',
    role: 'Creative Developer',
    challenges: 'Rendering 10,000 text character particles simultaneously in real-time engine mode without dropping frames.',
    solution: 'Utilized Niagara particle instancing with vertex shader offset maps inside Unreal Engine 5 to offload computation entirely to the GPU.'
  },
  {
    id: 'monolith',
    title: 'Monolith CGI',
    category: 'CGI',
    videoUrl: 'https://cdn.coverr.co/videos/coverr-abstract-geometric-shapes-4384/1080p.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[4/5]',
    description: 'Monolithic alien architecture responding to mathematical coordinate displacement.',
    longDescription: 'Monolith explores monumental brutalist visual structures and procedural geometry generation. An ancient geometric structure shifts, slices, and realigns itself under parametric control, communicating timelessness, raw material strength, and digital mystery.',
    tags: ['Mathematical Slicing', 'Brutalist Vibe', 'Granite Micro-Structures', 'Atmospheric Fog'],
    software: ['Houdini', 'Redshift', 'Nuke'],
    client: 'Nexus Architectural Council',
    year: '2023',
    role: 'Principal CGI Designer',
    challenges: 'Creating an atmospheric sense of massive scale and micro-texture realism under high-contrast dramatic spotlight rays.',
    solution: 'Designed multi-scale normal maps combined with dense VDB fog scattering inside Redshift, simulating humid, heavy light-shafts.'
  },
  {
    id: 'network-rebrand',
    title: 'Network Rebrand',
    category: 'Broadcast',
    videoUrl: 'https://cdn.coverr.co/videos/coverr-flowing-gradient-waves-5155/1080p.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[16/10]',
    description: 'Flowing vibrant gradient waves crafted for global lifestyle network relaunch.',
    longDescription: 'A complete broadcast design overhaul featuring dynamic, ribbon-like silk threads. The waves flow with incredible flexibility and luxury color transitions, providing fluid transitions for lower thirds, bumper spots, and program idents.',
    tags: ['Broadcast Patterns', 'Vibrant Gradients', 'Spline Animation', 'Silk Shading'],
    software: ['Cinema 4D', 'Redshift', 'After Effects'],
    client: 'Velo Network Global',
    year: '2024',
    role: 'Lead Motion Designer',
    challenges: 'Delivering multiple flexible animation loops that color-coordinate instantly across daylight sports, premium film, and late-night talk show briefs.',
    solution: 'Designed procedural custom gradient shader nodes in Redshift tied to user data parameters, enabling the marketing crew to shift hues on-the-fly.'
  }
];

export const CAPABILITIES = [
  {
    name: '3D Animation & Modeling',
    level: 'Expert',
    percentage: 95,
    description: 'Expertise in procedural topology, keyframes, rigid/soft body simulation, complex parenting hierarchies, and spatial camera choreographies.'
  },
  {
    name: 'Motion Graphics (2D & 3D)',
    level: 'Expert',
    percentage: 98,
    description: 'Flawless execution of custom typographic layouts, responsive kinetic graphics, vector morphing, and promotional brand loops.'
  },
  {
    name: 'Product Visualisation',
    level: 'Expert',
    percentage: 92,
    description: 'Delivering highly detailed glass, chrome, and realistic physical substance visualizations for luxurious gadgets, spirits, and vehicles.'
  },
  {
    name: 'Procedural Simulation',
    level: 'Advanced',
    percentage: 88,
    description: 'Harnessing Vellum, Pyro, and FLIP systems in Houdini to produce smoke, dust clouds, liquid surges, and complex cell-division mechanics.'
  },
  {
    name: 'Octane & Redshift Render',
    level: 'Expert',
    percentage: 96,
    description: 'Master of light transport, subsurface scattering, material layering, custom LUT setups, volume grids, and maximum GPU baking efficiency.'
  },
  {
    name: 'Creative Coding & WebGL',
    level: 'Intermediate',
    percentage: 75,
    description: 'Bridging motion parameters with web-native interactivity using Canvas API, math shaders, vector math, and customized physics setups.'
  }
];

export const PLATFORMS_SOFTWARE = [
  { name: 'Cinema 4D', level: 'Expert', type: 'software' },
  { name: 'After Effects', level: 'Expert', type: 'software' },
  { name: 'Houdini', level: 'Advanced', type: 'software' },
  { name: 'Octane / Redshift', level: 'Expert', type: 'software' },
  { name: 'Unreal Engine 5', level: 'Intermediate', type: 'software' },
  { name: 'DaVinci Resolve', level: 'Expert', type: 'software' }
];
