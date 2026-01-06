/* --- Variáveis Globais (Modal) --- */
const modal = document.getElementById('orderModal');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const wppForm = document.getElementById('wppForm');
let currentService = "";

/* --- Variáveis Globais (Menu Lateral) --- */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const sideMenu = document.getElementById('side-menu');

// Links Específicos do Menu
const linkPersonal = document.getElementById('link-personal');
const linkTutoria = document.getElementById('link-tutoria');
const linkMarmitas = document.getElementById('link-marmitas');
const menuContactBtns = document.querySelectorAll('.menu-contact-btn');

/* --- Lógica do Menu Lateral --- */
function openMenu() {
    sideMenu.classList.add('active');
}

function closeMenu() {
    sideMenu.classList.remove('active');
}

// Eventos de Abertura/Fechamento
if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMenu);
if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);

/* --- Lógica de Ação dos Links do Menu --- */

if (linkPersonal) {
    linkPersonal.addEventListener('click', (e) => {
        e.preventDefault(); 
        closeMenu();
        openModal('Personal Chef');
    });
}

if (linkTutoria) {
    linkTutoria.addEventListener('click', (e) => {
        e.preventDefault(); 
        closeMenu();
        openModal('Tutoria Gastronômica');
    });
}

if (linkMarmitas) {
    linkMarmitas.addEventListener('click', () => {
        closeMenu();
    });
}

menuContactBtns.forEach(btn => {
    btn.addEventListener('click', closeMenu);
});

/* --- Lógica do Modal --- */

function openModal(serviceName) {
    currentService = serviceName;

    // Lógica para corrigir o acento "ô" da fonte Lena no Popup
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
    
    modal.classList.add('show');
}

function closeModal() {
    modal.classList.remove('show');
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

/* --- Máscara de Telefone --- */
const phoneInput = document.getElementById('telefone');

if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
}

/* --- Envio para WhatsApp --- */
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
        } else if (currentService === "Tutoria Gastronômica") {
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

        closeModal();
        wppForm.reset();
    });
}