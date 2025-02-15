// Función para obtener los datos del localStorage
function getPlayerStats() {
    try {
        // Intentar obtener datos del localStorage
        const players = JSON.parse(localStorage.getItem('haxballStats')) || {
            players: [
                // Datos de ejemplo si no hay datos guardados
                {"name": "NombreReal1", "goals": 45, "games": 100, "assists": 20, "wins": 75, "cleanSheets": 15, "winRate": 75},
                {"name": "NombreReal2", "goals": 38, "games": 95, "assists": 25, "wins": 70, "cleanSheets": 12, "winRate": 73.68}
            ]
        };
        return players.players;
    } catch (error) {
        console.log("Error cargando datos:", error);
        return [];
    }
}

// Función para guardar datos en localStorage
function savePlayerStats(players) {
    try {
        localStorage.setItem('haxballStats', JSON.stringify({ players }));
        return true;
    } catch (error) {
        console.log("Error guardando datos:", error);
        return false;
    }
}

// Función para actualizar estadísticas de un jugador
function updatePlayerStats(playerName, stats) {
    const players = getPlayerStats();
    let player = players.find(p => p.name === playerName);
    
    if (!player) {
        // Si el jugador no existe, créalo
        player = {
            name: playerName,
            goals: 0,
            games: 0,
            assists: 0,
            wins: 0,
            cleanSheets: 0,
            winRate: 0
        };
        players.push(player);
    }

    // Actualizar estadísticas
    player.goals += (stats.goals || 0);
    player.games += (stats.games || 0);
    player.assists += (stats.assists || 0);
    player.wins += (stats.wins || 0);
    player.cleanSheets += (stats.cleanSheets || 0);
    player.winRate = (player.wins / player.games) * 100;

    // Guardar cambios
    savePlayerStats(players);
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

// Ejemplo de cómo usar en HaxBall:
/*
room.onGameEnd = function(scores) {
    // Actualizar estadísticas para el jugador 1
    updatePlayerStats("NombreJugador1", {
        goals: 2,        // número de goles en este partido
        assists: 1,      // número de asistencias
        games: 1,        // contador de partido
        wins: 1,         // 1 si ganó, 0 si no
        cleanSheets: 1   // 1 si no recibió goles, 0 si recibió
    });
};
*/