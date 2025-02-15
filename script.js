// Función para obtener los datos
async function getPlayerStats() {
    try {
        // Intenta cargar los datos desde data.json
        const response = await fetch('data.json');
        const data = await response.json();
        return data.players;
    } catch (error) {
        console.log("Error cargando datos, usando datos de ejemplo", error);
        // Si hay error, usa los datos de ejemplo
        return sampleData;
    }
}

// Generar lista de jugadores
function generateList(players, stat, elementId) {
    const sorted = players.sort((a, b) => b[stat] - a[stat]).slice(0, 10);
    const list = document.getElementById(elementId);
    
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
async function loadAllStats() {
    const players = await getPlayerStats();
    
    generateList(players, 'goals', 'goals-list');
    generateList(players, 'games', 'games-list');
    generateList(players, 'assists', 'assists-list');
    generateList(players, 'wins', 'wins-list');
    generateList(players, 'cleanSheets', 'clean-sheets-list');
    generateList(players, 'winRate', 'accuracy-list');
}

// Cargar cuando esté listo el DOM
document.addEventListener('DOMContentLoaded', loadAllStats);