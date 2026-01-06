/* --- BASE DE DADOS DOS ITENS (Para o Modal de Detalhes) --- */
const itemsData = {
    'personal': {
        title: 'Personal Chef',
        img: 'img/personal.png',
        // HTML copiado do card original
        desc: '<p class="service-desc">Leve a alta gastronomia para o conforto da sua casa. Jantares exclusivos, eventos intimistas e uma experiência inesquecível preparada especialmente para você e seus convidados.</p>',
        btnText: 'Solicitar Personal'
    },
    'tutoria': {
        title: 'Tutoria Gastron<span class="fake-accent">o</span>mica',
        img: 'img/tutoria.png',
        desc: '<p class="service-desc">Aprenda técnicas exclusivas e desenvolva suas habilidades culinárias com acompanhamento personalizado do Chef. Ideal para quem deseja dominar a cozinha com segurança e criatividade.</p>',
        btnText: 'Solicitar Tutoria'
    },
    'fdc': {
        title: 'Combo Favoritos do Chef',
        img: 'img/FDC.png',
        desc: `
            <p class="combo-desc font-lena">
                Para aqueles dias em que <span class="no-break">voc<span class="fake-accent">e</span></span> quer transformar o <span class="no-break">almo<span class="fake-cedilla">c</span>o</span> de rotina em uma <span class="no-break">experi<span class="fake-accent">e</span>ncia</span> <span class="no-break">gastron<span class="fake-accent">o</span>mica</span>.
            </p>
            <ul class="combo-list">
                <li>Filé ao molho de gorgonzola, purê de batatas e legumes salteados</li>
                <li>Lasanha de ragu de ossobuco</li>
                <li>Salmão grelhado, legumes ao perfume cítrico e purê de batata-doce</li>
                <li>Camarões grelhados ao perfume cítrico, massa ao molho sugo</li>
                <li>Frango ao molho de mostarda, arroz jasmine e legumes</li>
            </ul>
        `,
        btnText: 'Pedir este Combo'
    },
    'odn': {
        title: 'Combo Orgulho da Nutri',
        img: 'img/ODN.png',
        desc: `
            <p class="combo-desc font-lena">
                Manter a dieta on nunca foi <span class="no-break">t<span class="fake-tilde">a</span>o</span> gostoso. Pratos leves e equilibrados, pensados para quem quer manter o foco com a <span class="no-break">sa<span class="fake-acute">u</span>de</span>.
            </p>
            <ul class="combo-list">
                <li>Yakissoba de frango com espaguete de legumes</li>
                <li>Escondidinho de carne com purê de jerimum</li>
                <li>Peixe ao perfume de ervas, purê de batata-doce e legumes</li>
                <li>Iscas de frango ao pesto, massa integral e legumes</li>
                <li>Frango com salada de grão-de-bico (legumes e grão-de-bico)</li>
            </ul>
        `,
        btnText: 'Pedir este Combo'
    },
    'dad': {
        title: 'Combo Dia a Dia',
        img: 'img/DAD.png',
        desc: `
            <p class="combo-desc font-lena">
                Aquela comida que <span class="no-break">abra<span class="fake-cedilla">c</span>a</span> e alimenta. <span class="no-break">Cl<span class="fake-acute">a</span>ssicos</span> rotineiros com o toque do chef.
            </p>
            <ul class="combo-list">
                <li>Strogonoff de carne ou frango, arroz branco e batatas coradas</li>
                <li>Frango suculento, arroz, feijão e legumes</li>
                <li>Peixe ao molho de tomate, arroz, purê e legumes</li>
                <li>Bife acebolado, arroz, feijão e legumes</li>
                <li>Carne de panela, arroz e legumes</li>
            </ul>
        `,
        btnText: 'Pedir este Combo'
    }
};

/* --- Variáveis Globais --- */
const orderModal = document.getElementById('orderModal');
const detailsModal = document.getElementById('detailsModal');

// Elementos do Modal de Detalhes
const detailImg = document.getElementById('detail-img');
const detailTitle = document.getElementById('detail-title');
const detailDesc = document.getElementById('detail-desc');
const btnProceedOrder = document.getElementById('btn-proceed-order');

// Elementos do Modal de Pedido
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const wppForm = document.getElementById('wppForm');
let currentService = "";

/* --- Variáveis Menu --- */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const sideMenu = document.getElementById('side-menu');
const menuContactBtns = document.querySelectorAll('.menu-contact-btn');

// Links Menu
const menuPersonal = document.getElementById('menu-personal');
const menuTutoria = document.getElementById('menu-tutoria');
const menuFdc = document.getElementById('menu-fdc');
const menuOdn = document.getElementById('menu-odn');
const menuDad = document.getElementById('menu-dad');

const marmitasToggle = document.getElementById('link-marmitas-toggle');
const marmitasSubmenu = document.getElementById('marmitas-submenu');
const dropdownItem = document.querySelector('.dropdown-item');

/* --- Lógica Menu Lateral --- */
function openMenu() { sideMenu.classList.add('active'); }
function closeMenu() { 
    sideMenu.classList.remove('active');
    if(marmitasSubmenu) {
        marmitasSubmenu.classList.remove('show');
        dropdownItem.classList.remove('open');
    }
}

if(mobileMenuBtn) mobileMenuBtn.addEventListener('click', (e) => { e.stopPropagation(); openMenu(); });
if(closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);

document.addEventListener('click', (e) => {
    if (sideMenu.classList.contains('active') && !sideMenu.contains(e.target) && e.target !== mobileMenuBtn) {
        closeMenu();
    }
});

/* --- Eventos dos Links do Menu (Abrem Modal de Detalhes) --- */
if(menuPersonal) menuPersonal.addEventListener('click', (e) => { e.preventDefault(); closeMenu(); openItemDetails('personal'); });
if(menuTutoria) menuTutoria.addEventListener('click', (e) => { e.preventDefault(); closeMenu(); openItemDetails('tutoria'); });
if(menuFdc) menuFdc.addEventListener('click', (e) => { e.preventDefault(); closeMenu(); openItemDetails('fdc'); });
if(menuOdn) menuOdn.addEventListener('click', (e) => { e.preventDefault(); closeMenu(); openItemDetails('odn'); });
if(menuDad) menuDad.addEventListener('click', (e) => { e.preventDefault(); closeMenu(); openItemDetails('dad'); });

// Toggle Marmitas
if(marmitasToggle) {
    marmitasToggle.addEventListener('click', (e) => {
        e.preventDefault();
        marmitasSubmenu.classList.toggle('show');
        dropdownItem.classList.toggle('open');
    });
}

menuContactBtns.forEach(btn => btn.addEventListener('click', closeMenu));

/* --- Lógica Modal de Detalhes --- */
function openItemDetails(key) {
    const data = itemsData[key];
    if(!data) return;

    detailImg.src = data.img;
    detailTitle.innerHTML = data.title; // innerHTML para aceitar acentos fake
    detailDesc.innerHTML = data.desc;   // innerHTML para aceitar listas e HTML
    btnProceedOrder.innerText = data.btnText;

    // Configura o botão "Solicitar" para abrir o formulário
    btnProceedOrder.onclick = function() {
        closeDetailsModal();
        // Passa o título limpo (sem tags HTML se possível, ou trata no openOrderModal)
        // Aqui usaremos o texto do botão ou uma string limpa baseada na chave
        let cleanName = data.title.replace(/<[^>]*>?/gm, '').replace("Gastronomica", "Gastronômica"); 
        
        // Ajuste manual para Tutoria ficar bonito no texto do Zap
        if(key === 'tutoria') cleanName = "Tutoria Gastronômica";
        if(key === 'personal') cleanName = "Personal Chef";
        
        openOrderModal(cleanName);
    };

    detailsModal.classList.add('show');
}

function closeDetailsModal() {
    detailsModal.classList.remove('show');
}

/* --- Lógica Modal de Pedido (Formulário) --- */
function openOrderModal(serviceName) {
    currentService = serviceName;

    // Tratamento visual do título no formulário
    if (serviceName === "Tutoria Gastronômica") {
        modalTitle.innerHTML = 'Tutoria Gastron<span class="fake-accent">o</span>mica';
    } else {
        modalTitle.innerText = serviceName;
    }
    
    if (serviceName.includes("Combo")) {
        modalSubtitle.innerText = "Preencha seus dados para verificar a disponibilidade desta marmita.";
    } else {
        modalSubtitle.innerText = `Preencha seus dados para solicitar o serviço de ${serviceName}.`;
    }
    
    orderModal.classList.add('show');
}

function closeOrderModal() {
    orderModal.classList.remove('show');
}

// Fechar modais ao clicar fora
window.onclick = function(event) {
    if (event.target == orderModal) closeOrderModal();
    if (event.target == detailsModal) closeDetailsModal();
}

/* --- Máscara e Envio --- */
const phoneInput = document.getElementById('telefone');
if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
}

if (wppForm) {
    wppForm.addEventListener('submit', function(e) {
        e.preventDefault(); 

        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const endereco = document.getElementById('endereco').value;
        const data = document.getElementById('data').value.split('-').reverse().join('/'); 
        const horario = document.getElementById('horario').value;
        const obs = document.getElementById('obs').value;

        let textStart = "";
        if (currentService.includes("Combo")) {
            const comboName = currentService.replace("Combo ", ""); 
            textStart = `Olá, Chef. Gostaria de verificar sobre a disponibilidade da produção de combo de marmita *${comboName}*.`;
        } else if (currentService.includes("Tutoria")) {
            textStart = `Olá, Chef. Gostaria de verificar sobre o serviço de *Tutoria Gastronômica*.`;
        } else if (currentService === "Personal Chef") {
            textStart = `Olá, Chef. Gostaria de verificar sobre o serviço de *personal chefe*.`;
        }

        const finalMessage = `${textStart}
        
*Meus Dados:*
Nome: ${nome}
Telefone: ${telefone}
Endereço: ${endereco}
Data desejada: ${data}
Horário: ${horario}
Observações: ${obs ? obs : 'Nenhuma'}`;

        const encodedMessage = encodeURIComponent(finalMessage);
        const whatsappNumber = "558196104597";

        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');

        closeOrderModal();
        wppForm.reset();
    });
}