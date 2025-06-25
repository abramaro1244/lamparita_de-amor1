document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const audio = document.getElementById('lamp-audio');
    const desktopBtn = document.getElementById('desktop-btn');
    const mobileBtn = document.getElementById('mobile-btn');
    const lampGlow = document.getElementById('lamp-glow');
    const lampBulb = document.getElementById('lamp-bulb');
    const lampContainer = document.getElementById('lamp-container');
    const loveMessage = document.getElementById('love-message');

    // Variables de estado
    let lampOn = false;
    let lampAnimated = false;

    // Texto original del mensaje
    const originalMessage = loveMessage ? loveMessage.textContent : '';

    // Función para el efecto máquina de escribir
    function typeLoveMessage() {
        if (!loveMessage) return;
        loveMessage.textContent = '';
        loveMessage.style.opacity = '1';
        let i = 0;
        function type() {
            if (i <= originalMessage.length) {
                loveMessage.textContent = originalMessage.slice(0, i);
                i++;
                setTimeout(type, 80);
            }
        }
        setTimeout(type, 500); // Espera medio segundo antes de empezar a escribir
    }

    // Función para resetear el mensaje
    function resetLoveMessage() {
        if (!loveMessage) return;
        loveMessage.textContent = '';
        loveMessage.style.opacity = '0';
    }

    // Función principal para alternar lámpara y música
    function toggleLampAndMusic() {
        lampOn = !lampOn;

        // Sincronizar ambos botones
        const buttons = [desktopBtn, mobileBtn].filter(btn => btn);
        buttons.forEach(btn => {
            if (lampOn) {
                btn.classList.add('on');
                btn.querySelector('span').textContent = 'ON';
            } else {
                btn.classList.remove('on');
                btn.querySelector('span').textContent = 'OFF';
            }
        });

        // Control de las clases del body y lámpara
        if (lampOn) {
            document.body.classList.add('lamp-on', 'light-on');
            lampContainer.classList.add('lamp-on');
            
            // Reproducir música
            if (audio) {
                audio.currentTime = 0;
                audio.play().catch(e => console.log('Error reproduciendo audio:', e));
            }

            // Animación de la lámpara en móvil
            if (window.innerWidth <= 600) {
                if (!lampAnimated) {
                    lampAnimated = true;
                    lampContainer.classList.add('lamp-down');
                }
            }

            // Mostrar mensaje con delay
            setTimeout(() => {
                typeLoveMessage();
            }, window.innerWidth <= 600 ? 3000 : 1000);

        } else {
            document.body.classList.remove('lamp-on', 'light-on');
            lampContainer.classList.remove('lamp-on');
            
            // Pausar música
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }

            // Resetear mensaje
            resetLoveMessage();
        }
    }

    // Event listeners para ambos botones
    if (desktopBtn) {
        desktopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleLampAndMusic();
        });
    }

    if (mobileBtn) {
        // Event listener para click regular
        mobileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleLampAndMusic();
        });

        // Event listener adicional para touch en móvil
        mobileBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleLampAndMusic();
        });
    }

    // Inicializar mensaje oculto
    resetLoveMessage();
});
