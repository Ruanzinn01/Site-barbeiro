document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Header Scroll Effect
  // ==========================================
  const header = document.querySelector('header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.remove('bg-transparent');
        header.classList.add('bg-onyx/90', 'backdrop-blur-md', 'border-b', 'border-white/5', 'shadow-lg');
      } else {
        header.classList.add('bg-transparent');
        header.classList.remove('bg-onyx/90', 'backdrop-blur-md', 'border-b', 'border-white/5', 'shadow-lg');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on load
  }

  // ==========================================
  // 2. Mobile Menu Navigation
  // ==========================================
  const menuButton = document.querySelector('button[aria-label="Abrir menu"]');
  if (menuButton) {
    // Create mobile menu dynamically
    const mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobile-nav-drawer';
    mobileMenu.className = 'fixed inset-0 z-[100] bg-onyx/95 backdrop-blur-lg flex flex-col justify-center items-center gap-8 transition-all duration-500 opacity-0 pointer-events-none translate-y-[-10px]';
    mobileMenu.innerHTML = `
      <button id="close-mobile-nav" class="absolute top-6 right-6 p-2 text-foreground" aria-label="Fechar menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
      <nav class="flex flex-col items-center gap-6 text-xl font-medium">
        <a href="#inicio" class="text-foreground hover:text-gold transition">Início</a>
        <a href="#sobre" class="text-foreground hover:text-gold transition">Sobre</a>
        <a href="#servicos" class="text-foreground hover:text-gold transition">Serviços</a>
        <a href="#agendamento-ia" class="text-foreground hover:text-gold transition">Agendamento IA</a>
        <a href="#galeria" class="text-foreground hover:text-gold transition">Galeria</a>
        <a href="#avaliacoes" class="text-foreground hover:text-gold transition">Avaliações</a>
        <a href="#contato" class="text-foreground hover:text-gold transition">Contato</a>
      </nav>
      <a href="https://wa.me/5571983484522" target="_blank" rel="noopener noreferrer" class="mt-4 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle h-4 w-4"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/></svg>
        Agendar Agora
      </a>
    `;
    document.body.appendChild(mobileMenu);

    const openMenu = () => {
      mobileMenu.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
      mobileMenu.classList.add('opacity-100', 'translate-y-0');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      mobileMenu.classList.add('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
      mobileMenu.classList.remove('opacity-100', 'translate-y-0');
      document.body.style.overflow = '';
    };

    menuButton.addEventListener('click', openMenu);
    mobileMenu.querySelector('#close-mobile-nav').addEventListener('click', closeMenu);

    // Close menu when clicking nav link
    mobileMenu.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // ==========================================
  // 3. FAQ Accordion logic
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const button = item.querySelector('button');
    const content = item.querySelector('.faq-content');
    const iconContainer = button.querySelector('span');

    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      
      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          const otherBtn = otherItem.querySelector('button');
          const otherContent = otherItem.querySelector('.faq-content');
          const otherIcon = otherBtn.querySelector('span');
          otherBtn.setAttribute('aria-expanded', 'false');
          otherContent.style.maxHeight = '0px';
          otherContent.style.opacity = '0';
          otherIcon.className = 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition border-white/15 text-muted-foreground';
          otherIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus h-4 w-4"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>`;
        }
      });

      // Toggle current item
      if (isExpanded) {
        button.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = '0px';
        content.style.opacity = '0';
        iconContainer.className = 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition border-white/15 text-muted-foreground';
        iconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus h-4 w-4"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>`;
      } else {
        button.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = '200px';
        content.style.opacity = '1';
        iconContainer.className = 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition border-gold bg-gold text-primary-foreground';
        iconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus h-4 w-4"><path d="M5 12h14"></path></svg>`;
      }
    });
  });

  // ==========================================
  // 4. AI Scheduling Simulator
  // ==========================================
  const form = document.querySelector('#agendar form');
  if (form) {
    // Enable form opacity and transition
    form.style.opacity = '1';
    form.style.transition = 'opacity 0.5s ease';

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Collect values
      const name = form.querySelector('input[type="text"]').value;
      const phone = form.querySelector('input[type="tel"]').value;
      const service = form.querySelector('select:nth-of-type(1)').value;
      const barber = form.querySelector('select:nth-of-type(2)').value;

      if (!name || !phone) {
        alert('Por favor, preencha seu nome e telefone.');
        return;
      }

      // Hide form
      form.style.opacity = '0';
      setTimeout(() => {
        form.classList.add('hidden');

        // Create loader elements
        const loaderContainer = document.createElement('div');
        loaderContainer.id = 'ai-loader';
        loaderContainer.className = 'flex flex-col items-center justify-center py-10 text-center';
        
        // Dynamic loading steps
        loaderContainer.innerHTML = `
          <div class="relative mb-6 flex h-20 w-20 items-center justify-center">
            <span class="absolute inset-0 rounded-full border-4 border-gold/20 animate-ping"></span>
            <span class="absolute inset-0 rounded-full border-4 border-t-gold border-r-transparent border-b-transparent border-l-transparent animate-spin"></span>
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-gold animate-pulse"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M9 13a4.5 4.5 0 0 0 3-4"/><circle cx="16" cy="13" r=".5"/><circle cx="18" cy="3" r=".5"/><circle cx="20" cy="21" r=".5"/><circle cx="20" cy="8" r=".5"/></svg>
          </div>
          <p id="loader-status" class="font-accent text-xs uppercase tracking-[0.3em] text-gold mb-2">🤖 Conectando ao Assistente IA...</p>
          <div class="h-1 w-48 bg-white/5 rounded-full overflow-hidden">
            <div id="loader-bar" class="h-full bg-gold-gradient transition-all duration-500" style="width: 10%"></div>
          </div>
        `;
        form.parentNode.appendChild(loaderContainer);

        const statusText = loaderContainer.querySelector('#loader-status');
        const loaderBar = loaderContainer.querySelector('#loader-bar');

        const steps = [
          { text: "⚡ Analisando estilo e preferências de corte...", width: "35%" },
          { text: "📅 Buscando horários disponíveis...", width: "70%" },
          { text: "🎯 Selecionando os melhores profissionais...", width: "95%" }
        ];

        let currentStep = 0;
        const interval = setInterval(() => {
          if (currentStep < steps.length) {
            statusText.innerText = `🤖 ${steps[currentStep].text}`;
            loaderBar.style.width = steps[currentStep].width;
            currentStep++;
          } else {
            clearInterval(interval);
            showSlots(loaderContainer, name, phone, service, barber);
          }
        }, 1200);

      }, 500);
    });
  }

  // Show AI Slots
  function showSlots(loader, name, phone, service, barber) {
    loader.classList.add('opacity-0', 'transition-all', 'duration-500');
    setTimeout(() => {
      loader.remove();

      // Mock slots recommendation based on selected barber
      const selectedBarberName = barber === 'none' ? 'Felipe Alves' : barber;
      const suggestions = [
        { time: "Hoje às 15:30", barber: selectedBarberName, match: "98% Match" },
        { time: "Hoje às 17:00", barber: barber === 'none' ? 'Ricardo Nunes' : selectedBarberName, match: "91% Match" },
        { time: "Amanhã às 10:00", barber: selectedBarberName, match: "86% Match" }
      ];

      const slotsContainer = document.createElement('div');
      slotsContainer.id = 'ai-slots';
      slotsContainer.className = 'flex flex-col items-center py-6 text-center animate-fade-in';
      slotsContainer.innerHTML = `
        <h3 class="font-display text-2xl font-bold text-white mb-2">Horários Recomendados</h3>
        <p class="text-sm text-muted-foreground mb-8">Nossa IA selecionou as melhores opções com base no seu perfil.</p>
        
        <div class="w-full max-w-md flex flex-col gap-4 mb-8">
          ${suggestions.map((s, idx) => `
            <label class="group relative flex items-center justify-between p-5 rounded-2xl border border-white/5 bg-surface/30 cursor-pointer hover:border-gold/40 transition">
              <input type="radio" name="ai-slot-select" value="${s.time} com ${s.barber}" ${idx === 0 ? 'checked' : ''} class="absolute opacity-0">
              <div class="flex flex-col text-left">
                <span class="font-display font-semibold text-white group-hover:text-gold transition text-lg">${s.time}</span>
                <span class="text-xs text-muted-foreground">Profissional: ${s.barber}</span>
              </div>
              <span class="font-accent text-[10px] uppercase tracking-wider text-gold-gradient bg-gold/10 px-2.5 py-1 rounded-full border border-gold/25">${s.match}</span>
            </label>
          `).join('')}
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
          <button id="btn-confirm-slot" class="group inline-flex items-center gap-3 rounded-full bg-gold-gradient px-8 py-4 text-sm font-semibold tracking-wide text-primary-foreground shadow-lg hover:translate-y-[-2px] transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            Confirmar e Enviar no WhatsApp
          </button>
          <button id="btn-reset-form" class="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-4 text-sm text-muted-foreground hover:bg-white/5 transition">
            Refazer Agendamento
          </button>
        </div>
      `;

      const sectionWrapper = document.querySelector('#agendar > div > div.relative');
      sectionWrapper.appendChild(slotsContainer);

      // Confirm slot and open WhatsApp
      slotsContainer.querySelector('#btn-confirm-slot').addEventListener('click', () => {
        const selectedSlot = slotsContainer.querySelector('input[name="ai-slot-select"]:checked').value;
        const textMsg = `Olá Felipe! Realizei o agendamento inteligente pelo site:\n\n👤 Nome: ${name}\n📞 Telefone: ${phone}\n✂️ Serviço: ${service}\n📅 Horário Selecionado: ${selectedSlot}`;
        const encoded = encodeURIComponent(textMsg);
        window.open(`https://wa.me/5571983484522?text=${encoded}`, '_blank');
      });

      // Reset form
      slotsContainer.querySelector('#btn-reset-form').addEventListener('click', () => {
        slotsContainer.remove();
        form.classList.remove('hidden');
        form.reset();
        form.style.opacity = '1';
      });

    }, 500);
  }

  // ==========================================
  // 5. Scroll Animations (Simple Reveal)
  // ==========================================
  const scrollElements = document.querySelectorAll('[style*="opacity:0"], [style*="opacity: 0"]');
  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  const displayScrollElement = (element) => {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0) translateX(0)';
    element.style.transition = 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.32, 1)';
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.15)) {
        displayScrollElement(el);
      }
    });
  };

  window.addEventListener('scroll', handleScrollAnimation);
  // Trigger initial check
  setTimeout(handleScrollAnimation, 100);
});
