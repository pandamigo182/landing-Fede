document.addEventListener('DOMContentLoaded', function() {
    // Función para detectar la sección activa durante el scroll
    const activateMenuByScroll = () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        // Obtener la posición actual del scroll
        const scrollPosition = window.scrollY + 100; // Offset para mejor detección
        
        // Verificar qué sección está actualmente visible
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remover la clase active de todos los enlaces
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Añadir la clase active al enlace correspondiente
                const activeLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };
    
    // Ejecutar la función al cargar la página y durante el scroll
    activateMenuByScroll();
    window.addEventListener('scroll', activateMenuByScroll);
    
    // Manejar el envío del formulario de empleo
    const empleoForm = document.getElementById('empleo-form');
    
    if (empleoForm) {
        empleoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores del formulario
            const nombreCompleto = document.getElementById('nombre-completo').value;
            const telefono = document.getElementById('telefono-empleo').value;
            const direccion = document.getElementById('direccion').value;
            const puesto = document.getElementById('puesto').value;
            const sucursal = document.getElementById('sucursal-empleo').value;
            const experiencia = document.getElementById('experiencia').value;
            const educacion = document.getElementById('educacion').value;
            const mensajeAdicional = document.getElementById('mensaje-adicional').value;
                        
            // Número de WhatsApp fijo
            const numeroWhatsApp = "50370398156";
            
            // Crear el mensaje para WhatsApp
            let mensajeWhatsApp = `Buen día, quisiera aplicar al proceso de reclutamiento para formar parte de su equipo de trabajo:\n\n`;
            mensajeWhatsApp += `*Nombre:* ${nombreCompleto}\n`;
            mensajeWhatsApp += `*Teléfono:* ${telefono}\n`;
            mensajeWhatsApp += `*Dirección:* ${direccion}\n`;
            mensajeWhatsApp += `*Puesto al que aplica:* ${puesto}\n`;
            mensajeWhatsApp += `*Sucursal de interés:* ${sucursal}\n\n`;
            mensajeWhatsApp += `*Experiencia Laboral:*\n${experiencia}\n\n`;
            mensajeWhatsApp += `*Educación:*\n${educacion}\n\n`;
            mensajeWhatsApp += `*Información Adicional:*\n${mensajeAdicional}\n\n`;
            
            // Crear el enlace de WhatsApp
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeWhatsApp)}`;
            
            // Mostrar mensaje de confirmación
            alert('¡Gracias por tu solicitud! Serás redirigido a WhatsApp para completar el envío. Por favor, no olvides enviar tu hoja de vida con foto.');
            
            // Abrir WhatsApp en una nueva ventana
            window.open(urlWhatsApp, '_blank');
            
            // Opcional: Limpiar el formulario después del envío
            empleoForm.reset();
        });
    }
    
    // Manejar el envío del formulario de WhatsApp
    const whatsappForm = document.getElementById('whatsapp-form');
    
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores del formulario
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefono').value;
            const sucursal = document.getElementById('sucursal').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Números de WhatsApp por sucursal (estos son ejemplos, debes usar los números reales)
            const numerosPorSucursal = {
                'Santa Ana': '50377434459',
                'Sonsonate': '50370398156',                
            };
            
            // Obtener el número de WhatsApp según la sucursal seleccionada
            const numeroWhatsApp = numerosPorSucursal[sucursal] || numerosPorSucursal['Santa Ana'];
            
            // Crear el mensaje para WhatsApp
            let mensajeWhatsApp = `Hola, soy ${nombre}.\n`;
            mensajeWhatsApp += `Email: ${email}\n`;
            mensajeWhatsApp += `Teléfono: ${telefono}\n`;
            mensajeWhatsApp += `Sucursal seleccionada: ${sucursal}\n\n`;
            mensajeWhatsApp += `Mensaje: ${mensaje}`;
            
            // Crear el enlace de WhatsApp
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeWhatsApp)}`;
            
            // Abrir WhatsApp en una nueva ventana
            window.open(urlWhatsApp, '_blank');
        });
    }
    
    // Manejar el menú móvil con animación
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    
    if (menuToggle && nav) {
        // Asignar índices a los elementos del menú para animación secuencial
        const navItems = nav.querySelectorAll('li');
        navItems.forEach((item, index) => {
            item.style.setProperty('--item-index', index);
        });
        
        // Asegurarse de que el menú esté cerrado al cargar la página
        nav.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar que el evento se propague
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Cambiar el icono del menú
            const icon = this.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fi-br-menu-burger');
                icon.classList.add('fi-br-x');
            } else {
                icon.classList.remove('fi-br-x');
                icon.classList.add('fi-br-menu-burger');
            }
        });
        
        // Cerrar el menú al hacer clic fuera de él
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fi-br-x');
                icon.classList.add('fi-br-menu-burger');
            }
        });
        
        // Cerrar el menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fi-br-x');
                icon.classList.add('fi-br-menu-burger');
            });
        });
    }
    
    // Crear y manejar el botón de volver arriba
    const createBackToTopButton = () => {
        // Crear el botón
        const backToTopButton = document.createElement('div');
        backToTopButton.className = 'back-to-top';
        backToTopButton.innerHTML = '<i class="fi fi-sr-angle-up"></i>';
        document.body.appendChild(backToTopButton);
        
        // Mostrar/ocultar el botón según el scroll
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroSection = document.getElementById('inicio');
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            
            if (scrollY > heroBottom) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Funcionalidad de scroll suave al hacer clic
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    
    createBackToTopButton();
});