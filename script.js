// Datos de ejemplo de jugadores
const sampleData = [
    { name: "Jugador1", goals: 45, games: 100, assists: 20, wins: 75, cleanSheets: 15, winRate: 75 },
    { name: "Jugador2", goals: 38, games: 95, assists: 25, wins: 70, cleanSheets: 12, winRate: 73.68 },
    { name: "Jugador3", goals: 35, games: 90, assists: 30, wins: 65, cleanSheets: 10, winRate: 72.22 },
    { name: "Jugador4", goals: 32, games: 88, assists: 22, wins: 60, cleanSheets: 8, winRate: 68.18 },
    { name: "Jugador5", goals: 30, games: 85, assists: 18, wins: 58, cleanSheets: 14, winRate: 68.23 },
    { name: "Jugador6", goals: 28, games: 82, assists: 15, wins: 55, cleanSheets: 9, winRate: 67.07 },
    { name: "Jugador7", goals: 25, games: 80, assists: 28, wins: 52, cleanSheets: 11, winRate: 65 },
    { name: "Jugador8", goals: 22, games: 78, assists: 16, wins: 50, cleanSheets: 7, winRate: 64.10 },
    { name: "Jugador9", goals: 20, games: 75, assists: 12, wins: 48, cleanSheets: 6, winRate: 64 },
    { name: "Jugador10", goals: 18, games: 72, assists: 10, wins: 45, cleanSheets: 5, winRate: 62.5 },
    { name: "Jugador11", goals: 15, games: 70, assists: 8, wins: 42, cleanSheets: 4, winRate: 60 },
    { name: "Jugador12", goals: 12, games: 68, assists: 6, wins: 40, cleanSheets: 3, winRate: 58.82 }
];

// Función para obtener los datos
function getPlayerStats() {
    // Primero intentamos obtener datos del localStorage
    let players = [];
    try {
        for(let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if(!['player_name', 'view_mode', 'geo', 'avatar', 'player_auth_key'].includes(key)) {
                const data = JSON.parse(localStorage.getItem(key));
                players.push({
                    name: data[11],
                    goals: data[5],
                    games: data[0],
                    assists: data[6],
                    wins: data[1],
                    cleanSheets: data[8],
                    winRate: data[4]
                });
            }
        }
    } catch (error) {
        console.log("Usando datos de ejemplo");
    }

    // Si no hay datos en localStorage, usamos los datos de ejemplo
    if (players.length === 0) {
        players = sampleData;
    }

    return players;
}

// Generar lista de jugadores
function generateList(players, stat, elementId) {
    const sorted = players.sort((a, b) => b[stat] - a[stat]).slice(0, 10);
    const list = document.getElementById(elementId);
    
    // Limpiar lista antes de agregar nuevos elementos
    list.innerHTML = '';
    
    sorted.forEach((player, index) => {
        const li = document.createElement('li');
        li.className = 'player-item';
        const statValue = stat === 'winRate' ? 
            player[stat].toFixed(1) + '%' : 
            player[stat].toString();
            
        li.innerHTML = `
            <span class="player-name">${index + 1}. ${player.name}</span>
            <span class="player-stat">${statValue}</span>
        `;
        list.appendChild(li);
    });
}

// Cargar todos los tops
function loadAllStats() {
    const players = getPlayerStats();
    
    generateList(players, 'goals', 'goals-list');
    generateList(players, 'games', 'games-list');
    generateList(players, 'assists', 'assists-list');
    generateList(players, 'wins', 'wins-list');
    generateList(players, 'cleanSheets', 'clean-sheets-list');
    generateList(players, 'winRate', 'accuracy-list');
}

// Cargar cuando esté listo el DOM
document.addEventListener('DOMContentLoaded', loadAllStats);