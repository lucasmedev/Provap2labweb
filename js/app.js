// Array de tutoriais com dados completos
const tutorials = [
    {
        title: "Como Trocar o Óleo do Motor",
        category: "maintenance",
        description: "Aprenda a trocar o óleo do motor do seu carro de forma segura e econômica. Tutorial completo com lista de ferramentas e passo a passo detalhado.",
        url: "tutorials/tutorial01.html"
    },
    {
        title: "Verificação da Pressão dos Pneus",
        category: "safety",
        description: "Como verificar e calibrar os pneus corretamente. Inclui dicas sobre quando trocar pneus e como identificar desgaste irregular.",
        url: "tutorials/tutorial02.html"
    },
    {
        title: "Manutenção da Bateria Automotiva",
        category: "electrical",
        description: "Aprenda a cuidar da bateria do seu carro, como limpar os terminais e quando é hora de trocar. Evite ficar na mão!",
        url: "tutorials/tutorial04.html"
    },
    {
        title: "Troca de Lâmpadas dos Faróis",
        category: "electrical",
        description: "Tutorial simples para trocar lâmpadas queimadas dos faróis. Saiba qual tipo de lâmpada usar e como fazer a substituição.",
        url: "tutorials/tutorial04.html"
    },
];

// Função para renderizar os cards dos tutoriais
function renderCards(tutorialsList) {
    const cardsContainer = document.getElementById('cards');
    
    // Limpa o container antes de renderizar
    if (cardsContainer) {
        cardsContainer.innerHTML = '';
        
        // Se não há tutoriais para mostrar
        if (tutorialsList.length === 0) {
            cardsContainer.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                    <p style="color: #7f8c8d; font-size: 1.1rem;">
                        Nenhum tutorial encontrado com os termos de busca.
                    </p>
                </div>
            `;
            return;
        }
        
        // Renderiza cada tutorial como um card
        tutorialsList.forEach(tutorial => {
            const card = document.createElement('div');
            card.className = 'card';
            
            // Define a cor da categoria
            const categoryClass = getCategoryClass(tutorial.category);
            const categoryName = getCategoryName(tutorial.category);
            
            card.innerHTML = `
                <div class="card-content">
                    <div style="margin-bottom: 1rem;">
                        <span class="category ${categoryClass}">${categoryName}</span>
                    </div>
                    <h3>${tutorial.title}</h3>
                    <p>${tutorial.description}</p>
                    <a href="${tutorial.url}" class="card-link">
                        Ler Tutorial →
                    </a>
                </div>
            `;
            
            cardsContainer.appendChild(card);
        });
    }
}

// Função auxiliar para obter a classe CSS da categoria
function getCategoryClass(category) {
    const categoryClasses = {
        'maintenance': 'maintenance',
        'safety': 'safety',
        'electrical': 'electrical',
        'basics': 'basics'
    };
    return categoryClasses[category] || 'basics';
}

// Função auxiliar para obter o nome amigável da categoria
function getCategoryName(category) {
    const categoryNames = {
        'maintenance': 'Manutenção',
        'safety': 'Segurança',
        'electrical': 'Elétrica',
        'basics': 'Básicos'
    };
    return categoryNames[category] || 'Outros';
}

// Função para filtrar tutoriais baseado na busca
function filterTutorials(searchTerm) {
    const filteredTutorials = tutorials.filter(tutorial => {
        const titleMatch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase());
        const descriptionMatch = tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryMatch = getCategoryName(tutorial.category).toLowerCase().includes(searchTerm.toLowerCase());
        
        return titleMatch || descriptionMatch || categoryMatch;
    });
    
    return filteredTutorials;
}

// Função para configurar o menu mobile
function setupMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fecha o menu quando clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Fecha o menu quando clicar fora dele
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Função para configurar a busca em tempo real
function setupSearch() {
    const searchInput = document.getElementById('search');
    
    if (searchInput) {
        // Configura o listener para busca em tempo real
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.trim();
            const filteredTutorials = filterTutorials(searchTerm);
            renderCards(filteredTutorials);
        });
        
        // Limpa a busca quando pressionar Escape
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInput.value = '';
                renderCards(tutorials);
                searchInput.blur();
            }
        });
    }
}

// Função para configurar o formulário de contato
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Obtém os dados do formulário
            const formData = new FormData(contactForm);
            const nome = formData.get('nome');
            const email = formData.get('email');
            const assunto = formData.get('assunto');
            const mensagem = formData.get('mensagem');
            
            // Simula o envio do formulário
            alert(`Obrigado, ${nome}! Sua mensagem foi recebida e será respondida em breve no email ${email}.`);
            
            // Limpa o formulário
            contactForm.reset();
        });
    }
}

// Função para destacar a página atual no menu
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Função para adicionar animações suaves aos cards
function setupCardAnimations() {
    // Observer para animações quando os cards aparecem na tela
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observa os cards quando eles são criados
    const checkForCards = () => {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            if (!card.hasAttribute('data-animated')) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
                card.setAttribute('data-animated', 'true');
                observer.observe(card);
            }
        });
    };
    
    // Verifica periodicamente por novos cards (após busca)
    setInterval(checkForCards, 500);
}

// Função para melhorar a acessibilidade
function setupAccessibility() {
    // Adiciona navegação por teclado nos cards
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('card')) {
                const link = focusedElement.querySelector('.card-link');
                if (link) {
                    window.location.href = link.href;
                }
            }
        }
    });
    
    // Torna os cards focalizáveis
    const makeCardsFocusable = () => {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            if (!card.hasAttribute('tabindex')) {
                card.setAttribute('tabindex', '0');
                card.setAttribute('role', 'button');
                card.setAttribute('aria-label', `Abrir tutorial: ${card.querySelector('h3').textContent}`);
            }
        });
    };
    
    // Verifica periodicamente por novos cards
    setInterval(makeCardsFocusable, 500);
}

// Função principal de inicialização
function init() {
    console.log('🚗 Tutoriais de Carro - Inicializando...');
    
    // Configura o menu mobile
    setupMobileMenu();
    
    // Destaca a página atual no menu
    highlightCurrentPage();
    
    // Renderiza os cards iniciais na página de categorias
    renderCards(tutorials);
    
    // Configura a busca em tempo real
    setupSearch();
    
    // Configura o formulário de contato
    setupContactForm();
    
    // Configura animações dos cards
    setupCardAnimations();
    
    // Configura melhorias de acessibilidade
    setupAccessibility();
    
    console.log('✅ Inicialização concluída!');
}

// Aguarda o DOM estar pronto antes de inicializar
document.addEventListener('DOMContentLoaded', init);

// Também inicializa se o DOM já estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}


// Função para alternar a visibilidade do conteúdo do tutorial
function toggleContent(id) {
    const content = document.getElementById(id);
    const isVisible = content.style.display === 'block';

    // Fechar todos os outros tutoriais
    const allContents = document.querySelectorAll('.tutorial-content');
    allContents.forEach(item => {
        if (item.id !== id) {
            item.style.display = 'none';
        }
    });

    // Toggle do tutorial atual
    content.style.display = isVisible ? 'none' : 'block';

    // Scroll suave para o card se estiver abrindo
    if (!isVisible) {
        setTimeout(() => {
            content.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 100);
    }
}

// Fechar tutoriais ao clicar fora
document.addEventListener('click', function(event) {
    if (!event.target.closest('.card')) {
        const allContents = document.querySelectorAll('.tutorial-content');
        allContents.forEach(item => {
            item.style.display = 'none';
        });
    }
});
