// Declarar variáveis globalmente
let funMode = false;
let funInterval;

document.addEventListener('DOMContentLoaded', () => {
    // Definir tema padrão
    if (!document.documentElement.getAttribute('data-theme')) {
        document.documentElement.setAttribute('data-theme', 'classic');
    }

    // Selecionar todos os botões de tema
    const themeButtons = document.querySelectorAll('.theme-btn');

    // Adicionar evento de clique para cada botão
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-theme');
            document.documentElement.setAttribute('data-theme', theme);
            
            // Atualizar classe active
            themeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Salvar preferência do usuário
            localStorage.setItem('preferred-theme', theme);
        });
    });

    // Carregar tema preferido do usuário
    const preferredTheme = localStorage.getItem('preferred-theme');
    if (preferredTheme) {
        document.documentElement.setAttribute('data-theme', preferredTheme);
        const activeButton = document.querySelector(`[data-theme="${preferredTheme}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }

    // Verificar se o botão existe antes de adicionar o evento
    const funButton = document.getElementById('funModeBtn');
    if (funButton) {
        funButton.addEventListener('click', toggleFunMode);
        console.log('Modo diversão inicializado'); // Debug
    }
});

function toggleFunMode() {
    funMode = !funMode;
    console.log('Modo diversão:', funMode ? 'ativado' : 'desativado'); // Debug
    
    if (funMode) {
        startFunMode();
        document.getElementById('funModeBtn').innerHTML = '<i class="fas fa-stop me-2"></i>Parar Diversão';
    } else {
        stopFunMode();
        document.getElementById('funModeBtn').innerHTML = '<i class="fas fa-magic me-2"></i>Modo Diversão!';
    }
}

function startFunMode() {
    // Adiciona classes de animação
    document.querySelectorAll('.card').forEach(card => {
        card.classList.add('dancing');
    });
    
    document.querySelectorAll('h1, h2').forEach(heading => {
        heading.classList.add('glowing');
    });

    // Inicia mudança de cores aleatórias
    funInterval = setInterval(() => {
        const randomColor = () => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };
        
        const color1 = randomColor();
        const color2 = randomColor();
        
        document.documentElement.style.setProperty('--secondary-color', color1);
        document.documentElement.style.setProperty('--bg-gradient-start', color1);
        document.documentElement.style.setProperty('--bg-gradient-end', color2);
        
    }, 1500);

    // Adiciona efeito de dança nos ícones
    document.querySelectorAll('.fas, .fab').forEach(icon => {
        icon.classList.add('dancing');
    });
}

function stopFunMode() {
    clearInterval(funInterval);
    
    // Remove todas as classes de animação
    document.querySelectorAll('.card, .fas, .fab').forEach(element => {
        element.classList.remove('dancing');
        element.style.transform = '';
    });
    
    document.querySelectorAll('h1, h2').forEach(heading => {
        heading.classList.remove('glowing');
    });

    // Restaura as cores originais do tema atual
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'classic';
    setThemeColors(currentTheme);
}

function setThemeColors(theme) {
    const themes = {
        classic: {
            secondary: '#c8a45c',
            gradientStart: '#2b2b2b',
            gradientEnd: '#1a1a1a'
        },
        dark: {
            secondary: '#bb86fc',
            gradientStart: '#121212',
            gradientEnd: '#2d2d2d'
        },
        light: {
            secondary: '#2196f3',
            gradientStart: '#f5f5f5',
            gradientEnd: '#ffffff'
        }
    };

    const colors = themes[theme];
    document.documentElement.style.setProperty('--secondary-color', colors.secondary);
    document.documentElement.style.setProperty('--bg-gradient-start', colors.gradientStart);
    document.documentElement.style.setProperty('--bg-gradient-end', colors.gradientEnd);
} 