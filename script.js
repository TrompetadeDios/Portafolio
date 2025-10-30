// =========================================
// 1. SCROLL SUAVE PARA LA NAVEGACIÓN
// =========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// =========================================
// 2. FUNCIONALIDAD DEL MENÚ HAMBURGUESA (MOBILE RESPONSIVE)
// =========================================

const menuToggle = document.getElementById('menu-toggle');
const menuPrincipal = document.getElementById('menu-principal');

if (menuToggle && menuPrincipal) {
    menuToggle.addEventListener('click', () => {
        menuPrincipal.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (menuPrincipal.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // CERRAR MENÚ después de hacer clic en un enlace (para móviles)
    menuPrincipal.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                if (!link.closest('.dropdown')) { 
                    menuPrincipal.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });
}


// =========================================
// 3. FUNCIONALIDAD DEL MENÚ DESPLEGABLE (MEJORA TÁCTIL EN MÓVILES)
// =========================================

const dropdownLink = document.querySelector('.dropdown > a');

if (dropdownLink) {
    dropdownLink.addEventListener('click', function(e) {
        const content = this.nextElementSibling; 

        if (window.innerWidth <= 768) {
            e.preventDefault(); 
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        }
    });
}

// =========================================
// 4. (OPCIONAL) CERRAR MENÚS AL CLICKEAR FUERA
// =========================================
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && menuPrincipal && menuPrincipal.classList.contains('active')) {
        const isClickInsideMenu = menuPrincipal.contains(e.target);
        const isClickOnToggle = menuToggle.contains(e.target);

        if (!isClickInsideMenu && !isClickOnToggle) {
            menuPrincipal.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
            
            document.querySelectorAll('.dropdown-content').forEach(subContent => {
                subContent.style.display = 'none';
            });
        }
    }
});


// =========================================
// 5. LÓGICA DE ÁREA PRIVADA CON CONTRASEÑA
// =========================================

// !!! CONFIGURACIÓN DE LA CONTRASEÑA (¡Cámbiala aquí!) !!!
const CONTRASEÑA_SECRETA = "RespaldoWord23"; 
const URL_PRIVADA = "privado.html";

const enlacePrivado = document.getElementById('enlace-privado');
const modalPrivado = document.getElementById('modal-privado');
const btnCerrarModal = document.getElementById('btn-cerrar-modal');
const btnAcceder = document.getElementById('btn-acceder');
const inputPassword = document.getElementById('input-password');
const mensajeError = document.getElementById('mensaje-error');

if (enlacePrivado) {
    // 1. Abrir el modal al hacer clic en el enlace "Área Privada"
    enlacePrivado.addEventListener('click', function(e) {
        e.preventDefault();
        modalPrivado.style.display = 'block';
        inputPassword.value = ''; 
        mensajeError.style.display = 'none'; 
    });

    // 2. Cerrar el modal
    btnCerrarModal.addEventListener('click', function() {
        modalPrivado.style.display = 'none';
    });

    // 3. Manejar el clic del botón "Acceder"
    btnAcceder.addEventListener('click', function() {
        verificarContraseña();
    });
    
    // 4. Permitir Acceso con la tecla ENTER
    inputPassword.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            verificarContraseña();
        }
    });
    
    // 5. Lógica de Verificación
    function verificarContraseña() {
        if (inputPassword.value === CONTRASEÑA_SECRETA) {
            window.location.href = URL_PRIVADA;
        } else {
            mensajeError.style.display = 'block';
        }
    }
}