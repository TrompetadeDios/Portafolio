// =========================================
// 1. SCROLL SUAVE PARA LA NAVEGACIÓN
// =========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Evita el comportamiento de salto predeterminado del navegador
        e.preventDefault();

        // Obtiene el destino del enlace (ej. #inicio, #proyectos)
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Realiza el scroll suave hacia el elemento de destino
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
        // Alterna la clase 'active' para mostrar/ocultar el menú (definida en CSS)
        menuPrincipal.classList.toggle('active');
        
        // Cambia el ícono de hamburguesa a una 'X' al abrirlo
        const icon = menuToggle.querySelector('i');
        if (menuPrincipal.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times'); // fa-times es el ícono de la 'X'
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // CERRAR MENÚ después de hacer clic en un enlace (para móviles)
    menuPrincipal.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            // Solo cerramos el menú si estamos en modo móvil (ancho <= 768px)
            if (window.innerWidth <= 768) {
                // Si se hace clic en un elemento del menú principal (que no es el desplegable)
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

// Si la pantalla es pequeña, al hacer clic en 'Juegos', abrimos/cerramos el submenú.
const dropdownLink = document.querySelector('.dropdown > a');

if (dropdownLink) {
    dropdownLink.addEventListener('click', function(e) {
        const content = this.nextElementSibling; 

        if (window.innerWidth <= 768) {
            e.preventDefault(); // Evita que salte directamente a #proyectos
            
            // Alternar la visibilidad del submenú
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        }
    });
}

// =========================================
// 4. (OPCIONAL) CERRAR MENÚ DESPLEGABLE AL CLICKEAR FUERA
// =========================================
document.addEventListener('click', function(e) {
    // Si estamos en modo móvil y el menú principal está abierto, al hacer clic fuera se cierra.
    if (window.innerWidth <= 768 && menuPrincipal && menuPrincipal.classList.contains('active')) {
        const isClickInsideMenu = menuPrincipal.contains(e.target);
        const isClickOnToggle = menuToggle.contains(e.target);

        if (!isClickInsideMenu && !isClickOnToggle) {
            menuPrincipal.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
            
            // También aseguramos que el submenú se cierre
            document.querySelectorAll('.dropdown-content').forEach(subContent => {
                subContent.style.display = 'none';
            });
        }
    }
});