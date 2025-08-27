// EasyDevelop – interações básicas
(function(){
  const $ = (sel, el=document) => el.querySelector(sel);
  const $$ = (sel, el=document) => Array.from(el.querySelectorAll(sel));

  // Ano no rodapé
  $('#year').textContent = new Date().getFullYear();

  // Menu mobile
  const toggle = $('.nav-toggle');
  const menu = $('#nav-menu');
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Tema (dark/light)
  const themeToggle = $('#themeToggle');
  const stored = localStorage.getItem('ed-theme');
  if(stored === 'light') document.body.classList.add('light');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('ed-theme', document.body.classList.contains('light') ? 'light' : 'dark');
  });

  // Alternância de preços
  const billingSwitch = $('#billingSwitch');
  billingSwitch.addEventListener('change', () => {
    const yearly = billingSwitch.checked;
    $$('.price-value').forEach(el => {
      el.textContent = el.dataset[yearly ? 'yearly' : 'monthly'];
    });
  });

  // Validação simples de formulário de contato
  const formContato = $('#formContato');
  formContato.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = $$('input[required], textarea[required]', formContato);
    let ok = true;
    fields.forEach(f => {
      const msg = f.parentElement.querySelector('.error');
      if(!f.value.trim()){
        ok = false; msg.textContent = 'Campo obrigatório.';
      }else if(f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value)){
        ok = false; msg.textContent = 'E-mail inválido.';
      }else{
        msg.textContent = '';
      }
    });
    if(ok){
      formContato.reset();
      $('.form-success', formContato).hidden = false;
      setTimeout(()=>{$('.form-success', formContato).hidden = true;}, 4000);
    }
  });

  // Modal de cadastro
  const modal = $('#modalCadastro');
  const abrir = $('#btnAbrirCadastro');
  const fechar = $('#btnFecharModal');
  abrir.addEventListener('click', () => modal.showModal());
  fechar.addEventListener('click', () => modal.close());
  modal.addEventListener('click', (e) => {
    const rect = modal.getBoundingClientRect();
    const inDialog = rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
                     rect.left <= e.clientX && e.clientX <= rect.left + rect.width;
    if(!inDialog) modal.close();
  });

  // Acessibilidade: fechar com ESC já é nativo para <dialog>
  // Navegação suave já via CSS (scroll-behavior)
})();