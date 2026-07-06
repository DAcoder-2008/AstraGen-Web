document.addEventListener('DOMContentLoaded', () => {
    // --- ROUTING ---
    const navLinks = document.querySelectorAll('.nav-link');
    const views = document.querySelectorAll('.app-view');

    function switchView(viewId) {
        views.forEach(view => {
            if (view.id === viewId) {
                view.classList.add('view-active');
            } else {
                view.classList.remove('view-active');
            }
        });

        navLinks.forEach(link => {
            if (link.getAttribute('data-target') === viewId) {
                link.classList.add('nav-link-active');
                // Customize borders for specific styling matching the screens
                link.classList.remove('text-slate-500', 'text-neutral-400');
            } else {
                link.classList.remove('nav-link-active');
                link.classList.add('text-slate-500');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            switchView(target);
        });
    });

    // --- PHYSICS PARAMETERS SLIDERS ---
    const gravitySlider = document.getElementById('gravity-slider');
    const gravityValue = document.getElementById('gravity-value');
    if (gravitySlider && gravityValue) {
        gravitySlider.addEventListener('input', (e) => {
            const val = e.target.value;
            // Map 0-100 to G constant representation
            const gCoeff = (val * 0.133 + 0.1).toFixed(3);
            gravityValue.textContent = `${gCoeff}×10⁻¹¹ N⋅m²/kg²`;
        });
    }

    const curvatureSlider = document.getElementById('curvature-slider');
    const curvatureValue = document.getElementById('curvature-value');
    if (curvatureSlider && curvatureValue) {
        curvatureSlider.addEventListener('input', (e) => {
            const val = e.target.value;
            const omega = (val * 0.04).toFixed(1);
            curvatureValue.textContent = `${omega} Ω`;
        });
    }

    const decoherenceSlider = document.getElementById('decoherence-slider');
    const decoherenceValue = document.getElementById('decoherence-value');
    if (decoherenceSlider && decoherenceValue) {
        decoherenceSlider.addEventListener('input', (e) => {
            const val = e.target.value;
            let level = "LOW";
            if (val > 70) level = "HIGH";
            else if (val > 30) level = "MODERATE";
            decoherenceValue.textContent = `${level} (${val}%)`;
            if (val > 70) {
                decoherenceValue.className = "font-mono text-label-sm text-error";
            } else if (val > 30) {
                decoherenceValue.className = "font-mono text-label-sm text-tertiary";
            } else {
                decoherenceValue.className = "font-mono text-label-sm text-primary";
            }
        });
    }

    // --- REALITY PROBE LOGS ---
    const probeLog = document.getElementById('probe-log-container');
    if (probeLog) {
        const logTemplates = [
            "Syncing neural metrics with L0 Gemini layer...",
            "Validating simulation bounds against Planck length...",
            "Metric tensor anomaly corrected at coord [x:{x}, y:{y}, z:{z}]",
            "Solana blockchain pulse check: Block height {block} verified.",
            "Gravitational wave interference detected in sector 4C.",
            "WASM Core speed check: {fps} FPS nominal.",
            "Analyzing DNA mutation vector tp53 in simulated zero gravity.",
            "Refactoring GLSL shader matrices for quantum refraction.",
            "A-SIM physics state successfully cached to local storage."
        ];

        setInterval(() => {
            const index = Math.floor(Math.random() * logTemplates.length);
            let template = logTemplates[index];
            template = template.replace('{x}', Math.floor(Math.random() * 100))
                               .replace('{y}', Math.floor(Math.random() * 100))
                               .replace('{z}', Math.floor(Math.random() * -100))
                               .replace('{block}', Math.floor(Math.random() * 1000000 + 42000000))
                               .replace('{fps}', Math.floor(Math.random() * 10 + 138));

            const logDiv = document.createElement('div');
            const time = new Date().toLocaleTimeString();
            const isWarn = template.includes("anomaly") || template.includes("interference") || template.includes("TP53");
            logDiv.className = `flex gap-4 hover:bg-white/5 p-1 rounded transition-colors ${isWarn ? 'text-error animate-pulse' : ''}`;
            logDiv.innerHTML = `<span class="text-secondary-fixed opacity-70">[T-${time}]</span> <span>${template}</span> <span class="ml-auto ${isWarn ? 'text-error' : 'text-primary'}">${isWarn ? 'WARN' : 'OK'}</span>`;
            
            probeLog.appendChild(logDiv);
            probeLog.scrollTop = probeLog.scrollHeight;

            // Keep log size clean
            if (probeLog.children.length > 25) {
                probeLog.removeChild(probeLog.firstChild);
            }
        }, 3000);
    }

    // --- SEMANTIC VECTOR SEARCH ---
    const searchInput = document.getElementById('vector-search-input');
    const searchResults = document.getElementById('search-results-container');
    
    const sampleResults = [
        {
            source: 'NASA',
            title: 'Anomalous Trajectories in Kuiper Belt Objects',
            desc: 'Analysis of perturbations suggests massive perturber in outer solar system. Vector aligns with user query regarding non-standard orbital mechanics.',
            conf: '92%',
            ref: 'ASTRO-2023-X',
            keywords: ['nasa', 'trajectory', 'kuiper', 'orbit', 'astrophysics']
        },
        {
            source: 'ArXiv',
            title: 'Theoretical Implications of Primordial Black Holes',
            desc: 'Revisiting hawking radiation models in the context of early universe formation and dark matter candidate viability.',
            conf: '88%',
            ref: '2310.15091',
            keywords: ['arxiv', 'black hole', 'hawking', 'radiation', 'dark matter']
        },
        {
            source: 'NASA',
            title: 'Zero-G Cellular Mutation Profiles',
            desc: 'Investigating DNA single and double strand breaks in ionizing radiation environments during long-term Martian transit.',
            conf: '95%',
            ref: 'BIO-SPACE-4',
            keywords: ['nasa', 'mutation', 'cell', 'dna', 'genetics', 'radiation']
        },
        {
            source: 'ArXiv',
            title: 'Solana Smart Contracts for Peer-to-Peer Computing Grid',
            desc: 'Proposing a proof-of-work validation schema using Anchor blockchain framework to coordinate federated physics simulations.',
            conf: '85%',
            ref: '2603.9018',
            keywords: ['blockchain', 'solana', 'anchor', 'ledger', 'computing', 'arxiv']
        }
    ];

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query === '') {
                renderSearchResults(sampleResults);
                return;
            }

            const filtered = sampleResults.filter(item => {
                return item.title.toLowerCase().includes(query) || 
                       item.desc.toLowerCase().includes(query) ||
                       item.keywords.some(kw => kw.includes(query));
            });

            renderSearchResults(filtered);
        });

        function renderSearchResults(results) {
            searchResults.innerHTML = '';
            if (results.length === 0) {
                searchResults.innerHTML = `
                    <div class="text-center py-8 text-on-surface-variant font-body">
                        No conceptual vectors match your search criteria.
                    </div>
                `;
                return;
            }

            results.forEach(res => {
                const isNasa = res.source === 'NASA';
                const tagColor = isNasa ? 'text-primary' : 'text-secondary-fixed';
                const html = `
                    <div class="flex gap-4 items-start border-b border-outline-variant/10 pb-4 last:border-b-0">
                        <div class="w-12 h-12 rounded bg-surface-container-high flex items-center justify-center shrink-0 border border-outline-variant/20">
                            <span class="font-label text-[10px] ${tagColor}">${res.source}</span>
                        </div>
                        <div>
                            <h4 class="font-body text-base font-semibold text-on-surface hover:text-primary cursor-pointer transition-colors mb-1">${res.title}</h4>
                            <p class="font-body text-sm text-on-surface-variant line-clamp-2">${res.desc}</p>
                            <div class="flex gap-2 mt-2">
                                <span class="font-label text-[10px] text-outline">CONFIDENCE: ${res.conf}</span>
                                <span class="font-label text-[10px] text-outline">REF: ${res.ref}</span>
                            </div>
                        </div>
                    </div>
                `;
                searchResults.insertAdjacentHTML('beforeend', html);
            });
        }
    }

    // --- IMMUTABLE LEDGER & RESEARCH MINT FORM ---
    const ledgerContainer = document.getElementById('ledger-container');
    const mintForm = document.getElementById('mint-ledger-form');

    if (mintForm && ledgerContainer) {
        mintForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const titleInput = document.getElementById('mint-title');
            const authorInput = document.getElementById('mint-author');

            const title = titleInput.value.trim();
            const author = authorInput.value.trim() || 'Observer';

            if (!title) return;

            // Faux transaction hash generator
            const hex = '0123456789abcdef';
            let hash = '0x';
            for (let i = 0; i < 16; i++) {
                hash += hex[Math.floor(Math.random() * hex.length)];
            }

            const item = document.createElement('div');
            item.className = 'bg-surface-container-low p-4 rounded-lg flex flex-col gap-2 hover:bg-surface-container transition-colors cursor-pointer group animate-[pulse_1s]';
            item.innerHTML = `
                <div class="flex justify-between items-start">
                    <span class="font-label text-[10px] text-secondary-fixed bg-secondary-fixed/10 px-2 py-0.5 rounded">MINTED NOW</span>
                    <span class="font-label text-[10px] text-on-surface-variant">Just now</span>
                </div>
                <h4 class="font-body text-sm font-medium text-on-surface group-hover:text-primary transition-colors">${title}</h4>
                <div class="font-label text-xs text-on-surface-variant flex justify-between">
                    <span>HASH: ${hash}</span>
                    <span class="text-primary">${author}</span>
                </div>
            `;

            // Insert at the top of the list
            ledgerContainer.insertBefore(item, ledgerContainer.firstChild);

            // Reset inputs
            titleInput.value = '';
            authorInput.value = '';

            // Optional notice
            const notice = document.createElement('div');
            notice.className = 'text-[10px] font-mono text-secondary-fixed text-right pr-2 animate-bounce';
            notice.textContent = `Solana transaction finalized: ${hash}`;
            mintForm.appendChild(notice);
            setTimeout(() => notice.remove(), 4000);
        });
    }

    // --- MENTORSHIP CHAT SESSION ---
    const chatContainer = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input-text');
    const chatSubmit = document.getElementById('chat-send-btn');

    const nexusResponses = [
        "Analyzing your query relative to the Kuiper Belt anomaly. Wave collapse verified. Recommendation: initiate simulation run.",
        "Your theory aligns perfectly with quantum space-time curvature calculations. I am logging this hypothesis to the Solana Ledger.",
        "I detect elevated computational loads in sector 7G. Heuristic correction filters applied. Stay calm, Operator.",
        "DNA degradation analysis in Zero-G is complete. TP53 markers showing baseline levels. Resistance synth AX-7 looks promising.",
        "Anomalous telemetry from outer planetary sensors. Initiating mathematical validation sequence. Keep monitoring the dashboard."
    ];

    if (chatContainer && chatInput && (chatSubmit || chatInput)) {
        function sendUserMessage() {
            const text = chatInput.value.trim();
            if (!text) return;

            // Render User message
            const userMsg = document.createElement('div');
            userMsg.className = 'flex gap-4 flex-row-reverse';
            userMsg.innerHTML = `
                <div class="w-8 h-8 rounded-full bg-secondary-container/20 flex items-center justify-center shrink-0 border border-secondary-fixed/30">
                    <span class="material-symbols-outlined text-secondary-fixed text-sm">account_circle</span>
                </div>
                <div class="text-right max-w-[80%]">
                    <p class="text-xs font-mono text-secondary-fixed mb-1"><span class="text-outline-variant mr-2">${new Date().toLocaleTimeString()}</span> Operator</p>
                    <p class="text-sm leading-relaxed text-on-surface bg-surface-container-high p-3 rounded-lg rounded-tr-none inline-block text-left">${text}</p>
                </div>
            `;
            chatContainer.appendChild(userMsg);
            chatContainer.scrollTop = chatContainer.scrollHeight;
            chatInput.value = '';

            // Typing Indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'flex gap-4 typing-indicator';
            typingIndicator.innerHTML = `
                <div class="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center shrink-0 border border-primary/30">
                    <span class="material-symbols-outlined text-primary text-sm">smart_toy</span>
                </div>
                <div>
                    <p class="text-xs font-mono text-primary mb-1">Nexus AI</p>
                    <p class="text-sm leading-relaxed text-on-surface-variant animate-pulse font-mono">Typing transmission...</p>
                </div>
            `;
            chatContainer.appendChild(typingIndicator);
            chatContainer.scrollTop = chatContainer.scrollHeight;

            // Delay Response
            setTimeout(() => {
                typingIndicator.remove();
                
                const responseText = nexusResponses[Math.floor(Math.random() * nexusResponses.length)];
                const aiMsg = document.createElement('div');
                aiMsg.className = 'flex gap-4';
                aiMsg.innerHTML = `
                    <div class="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center shrink-0 border border-primary/30">
                        <span class="material-symbols-outlined text-primary text-sm">smart_toy</span>
                    </div>
                    <div class="max-w-[80%]">
                        <p class="text-xs font-mono text-primary mb-1">Nexus AI <span class="text-outline-variant ml-2">${new Date().toLocaleTimeString()}</span></p>
                        <p class="text-sm leading-relaxed text-on-surface bg-[#131313] border border-outline-variant/30 p-3 rounded-lg rounded-tl-none">${responseText}</p>
                    </div>
                `;
                chatContainer.appendChild(aiMsg);
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 1500);
        }

        if (chatSubmit) {
            chatSubmit.addEventListener('click', sendUserMessage);
        }
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendUserMessage();
            }
        });
    }

    // --- IGNITION HYPERSPACE MODE CANVAS ---
    const ignitionBtn = document.getElementById('ignition-button');
    const hsCanvas = document.getElementById('hyperspace-canvas');
    if (ignitionBtn && hsCanvas) {
        ignitionBtn.addEventListener('click', () => {
            hsCanvas.classList.add('hyperspace-active');
            startHyperspaceEffect(hsCanvas);
        });
    }

    function startHyperspaceEffect(canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const stars = [];
        const numStars = 400;
        let speed = 1;

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width - canvas.width / 2,
                y: Math.random() * canvas.height - canvas.height / 2,
                z: Math.random() * canvas.width,
                color: i % 2 === 0 ? '#dcb8ff' : '#ffe16d'
            });
        }

        let animationFrameId;
        const startTime = Date.now();

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            // Speed up phase
            const elapsed = Date.now() - startTime;
            if (elapsed < 1500) {
                speed += 0.8;
            } else if (elapsed > 2500) {
                speed = Math.max(1, speed - 1.2);
            }

            stars.forEach(star => {
                star.z -= speed;
                if (star.z <= 0) {
                    star.z = canvas.width;
                    star.x = Math.random() * canvas.width - canvas.width / 2;
                    star.y = Math.random() * canvas.height - canvas.height / 2;
                }

                const px = (star.x / star.z) * cx + cx;
                const py = (star.y / star.z) * cy + cy;

                if (px >= 0 && px < canvas.width && py >= 0 && py < canvas.height) {
                    const size = (1 - star.z / canvas.width) * 5;
                    ctx.beginPath();
                    ctx.fillStyle = star.color;
                    ctx.arc(px, py, size, 0, Math.PI * 2);
                    ctx.fill();

                    // Draw velocity streak line
                    ctx.beginPath();
                    ctx.strokeStyle = star.color + '55'; // half transparent
                    ctx.lineWidth = size / 2;
                    ctx.moveTo(px, py);
                    // Point towards center-back
                    const prevX = (star.x / (star.z + speed)) * cx + cx;
                    const prevY = (star.y / (star.z + speed)) * cy + cy;
                    ctx.lineTo(prevX, prevY);
                    ctx.stroke();
                }
            });

            // Text overlay
            ctx.fillStyle = '#ffe16d';
            ctx.font = 'bold 32px "Space Grotesk"';
            ctx.textAlign = 'center';
            ctx.shadowColor = '#8a2be2';
            ctx.shadowBlur = 15;
            ctx.fillText('HYPERSPACE mode: ACTIVE', cx, cy - 80);

            ctx.fillStyle = '#e2e2e2';
            ctx.font = '16px "JetBrains Mono"';
            ctx.shadowBlur = 0;
            ctx.fillText(`NEURAL INTEGRATION CORE SPEED: ${speed.toFixed(1)} GB/s`, cx, cy + 120);
            ctx.fillText(`SOLANA LEDGER BROADCAST SECURE`, cx, cy + 150);

            if (elapsed < 3500) {
                animationFrameId = requestAnimationFrame(draw);
            } else {
                cancelAnimationFrame(animationFrameId);
                canvas.classList.remove('hyperspace-active');
            }
        }

        draw();

        // Responsive resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
});
