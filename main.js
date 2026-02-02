
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const scoreElement = document.getElementById('score');
        const modal = document.getElementById('birthdayModal');
        
        const TILE_SIZE = 24;
        const COLS = 28;
        const ROWS = 31;
        
        // Classic Pac-Man maze layout (1=wall, 0=path, 2=heart spawn point)
        const maze = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
            [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
            [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
            [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
            [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,0,1,1,1,0,0,1,1,1,0,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,1,1],
            [0,0,0,0,0,0,2,0,0,0,1,0,0,0,0,0,0,1,0,0,0,2,0,0,0,0,0,0],
            [1,1,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
            [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
            [1,2,2,2,1,1,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,1,1,2,2,2,1],
            [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
            [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
            [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
            [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];
        
        let pacman = {
            x: 14,
            y: 23,
            direction: 'left',
            nextDirection: 'left',
            speed: 4, // pixels per frame
            pixelX: 14 * TILE_SIZE,
            pixelY: 23 * TILE_SIZE,
            mouthAngle: 0
        };
        
        let hearts = [];
        let heartsCollected = 0;
        let gameWon = false;
        let lives = 3;
        let isRespawning = false;
        
        // Generate 17 hearts at valid positions
        function generateHearts() {
            hearts = [];
            const validPositions = [];
            
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLS; col++) {
                    if (maze[row][col] === 2) {
                        validPositions.push({x: col, y: row});
                    }
                }
            }
            
            // Shuffle and pick 17 positions
            for (let i = validPositions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [validPositions[i], validPositions[j]] = [validPositions[j], validPositions[i]];
            }
            
            hearts = validPositions.slice(0, 17).map(pos => ({
                x: pos.x,
                y: pos.y,
                pulse: Math.random() * Math.PI * 2
            }));
        }
        
        generateHearts();
        
        // Draw the maze
        function drawMaze() {
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLS; col++) {
                    const x = col * TILE_SIZE;
                    const y = row * TILE_SIZE;
                    
                    if (maze[row][col] === 1) {
                        // Draw wall
                        ctx.strokeStyle = '#b537f2';
                        ctx.lineWidth = 3;
                        ctx.strokeRect(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4);
                    }
                }
            }
        }
        
        // Draw hearts
        function drawHearts() {
            hearts.forEach(heart => {
                const x = heart.x * TILE_SIZE + TILE_SIZE / 2;
                const y = heart.y * TILE_SIZE + TILE_SIZE / 2;
                
                heart.pulse += 0.08;
                const scale = 0.8 + Math.sin(heart.pulse) * 0.2;
                
                ctx.save();
                ctx.translate(x, y);
                ctx.scale(scale, scale);
                
                ctx.fillStyle = '#ff1493';
                
                // Draw pixel heart
                const s = 2.5;
                ctx.fillRect(-3*s, -2*s, s, s);
                ctx.fillRect(-s, -2*s, s, s);
                ctx.fillRect(s, -2*s, s, s);
                ctx.fillRect(3*s, -2*s, s, s);
                
                ctx.fillRect(-4*s, -s, s, s);
                ctx.fillRect(-3*s, -s, s, s);
                ctx.fillRect(-2*s, -s, s, s);
                ctx.fillRect(-s, -s, s, s);
                ctx.fillRect(0, -s, s, s);
                ctx.fillRect(s, -s, s, s);
                ctx.fillRect(2*s, -s, s, s);
                ctx.fillRect(3*s, -s, s, s);
                ctx.fillRect(4*s, -s, s, s);
                
                ctx.fillRect(-3*s, 0, s, s);
                ctx.fillRect(-2*s, 0, s, s);
                ctx.fillRect(-s, 0, s, s);
                ctx.fillRect(0, 0, s, s);
                ctx.fillRect(s, 0, s, s);
                ctx.fillRect(2*s, 0, s, s);
                ctx.fillRect(3*s, 0, s, s);
                
                ctx.fillRect(-2*s, s, s, s);
                ctx.fillRect(-s, s, s, s);
                ctx.fillRect(0, s, s, s);
                ctx.fillRect(s, s, s, s);
                ctx.fillRect(2*s, s, s, s);
                
                ctx.fillRect(-s, 2*s, s, s);
                ctx.fillRect(0, 2*s, s, s);
                ctx.fillRect(s, 2*s, s, s);
                
                ctx.fillRect(0, 3*s, s, s);
                
                ctx.restore();
            });
        }
        
        // Draw Pac-Man
        function drawPacman() {
            const centerX = pacman.pixelX + TILE_SIZE / 2;
            const centerY = pacman.pixelY + TILE_SIZE / 2;
            const radius = TILE_SIZE / 2 - 2;
            
            ctx.fillStyle = '#ff10f0';
            
            // Animate mouth opening and closing
            const maxMouth = 0.2; // Max mouth opening angle
            const mouthOpen = Math.abs(Math.sin(pacman.mouthAngle)) * maxMouth;
            
            let rotation = 0;
            
            // Set rotation based on direction
            switch(pacman.direction) {
                case 'right':
                    rotation = 0;
                    break;
                case 'down':
                    rotation = Math.PI / 2;
                    break;
                case 'left':
                    rotation = Math.PI;
                    break;
                case 'up':
                    rotation = Math.PI * 1.5;
                    break;
            }
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, rotation + mouthOpen, rotation + (Math.PI * 2) - mouthOpen);
            ctx.lineTo(centerX, centerY);
            ctx.closePath();
            ctx.fill();
            
            pacman.mouthAngle += 0.2;
        }
        
        // Ghosts
        let ghosts = [
            { x: 12, y: 14, pixelX: 12 * TILE_SIZE, pixelY: 14 * TILE_SIZE, direction: 'left', color: '#FF0000', name: 'red' },
            { x: 13, y: 14, pixelX: 13 * TILE_SIZE, pixelY: 14 * TILE_SIZE, direction: 'up', color: '#FFB8FF', name: 'pink' },
            { x: 14, y: 14, pixelX: 14 * TILE_SIZE, pixelY: 14 * TILE_SIZE, direction: 'down', color: '#00FFFF', name: 'cyan' },
            { x: 15, y: 14, pixelX: 15 * TILE_SIZE, pixelY: 14 * TILE_SIZE, direction: 'right', color: '#FFB852', name: 'orange' }
        ];
        
        // Check if a tile coordinate is valid (not a wall)
        function isValidTile(tileX, tileY) {
            if (tileX < 0 || tileX >= COLS || tileY < 0 || tileY >= ROWS) {
                return false;
            }
            return maze[tileY][tileX] !== 1;
        }
        
        // Check if position in pixels is valid (checking all corners)
        function isValidMove(pixelX, pixelY) {
            const margin = 2;
            const size = TILE_SIZE - margin * 2;
            
            // Check all four corners
            const topLeft = isValidTile(
                Math.floor((pixelX + margin) / TILE_SIZE),
                Math.floor((pixelY + margin) / TILE_SIZE)
            );
            const topRight = isValidTile(
                Math.floor((pixelX + size) / TILE_SIZE),
                Math.floor((pixelY + margin) / TILE_SIZE)
            );
            const bottomLeft = isValidTile(
                Math.floor((pixelX + margin) / TILE_SIZE),
                Math.floor((pixelY + size) / TILE_SIZE)
            );
            const bottomRight = isValidTile(
                Math.floor((pixelX + size) / TILE_SIZE),
                Math.floor((pixelY + size) / TILE_SIZE)
            );
            
            return topLeft && topRight && bottomLeft && bottomRight;
        }
        
        // Check if Pac-Man is centered on tile
        function isCentered() {
            return pacman.pixelX % TILE_SIZE === 0 && pacman.pixelY % TILE_SIZE === 0;
        }
        
        // Update Pac-Man position
        function updatePacman() {
            // Try to change direction if centered on tile
            if (isCentered() && pacman.nextDirection !== pacman.direction) {
                let testX = pacman.pixelX;
                let testY = pacman.pixelY;
                
                switch(pacman.nextDirection) {
                    case 'up': testY -= pacman.speed; break;
                    case 'down': testY += pacman.speed; break;
                    case 'left': testX -= pacman.speed; break;
                    case 'right': testX += pacman.speed; break;
                }
                
                if (isValidMove(testX, testY)) {
                    pacman.direction = pacman.nextDirection;
                }
            }
            
            // Move in current direction
            let newX = pacman.pixelX;
            let newY = pacman.pixelY;
            
            switch(pacman.direction) {
                case 'up': newY -= pacman.speed; break;
                case 'down': newY += pacman.speed; break;
                case 'left': newX -= pacman.speed; break;
                case 'right': newX += pacman.speed; break;
            }
            
            // Check if move is valid
            if (isValidMove(newX, newY)) {
                pacman.pixelX = newX;
                pacman.pixelY = newY;
            }
            
            // Update grid position
            pacman.x = Math.floor((pacman.pixelX + TILE_SIZE / 2) / TILE_SIZE);
            pacman.y = Math.floor((pacman.pixelY + TILE_SIZE / 2) / TILE_SIZE);
            
            // Wrap around tunnel
            if (pacman.pixelX < -TILE_SIZE) {
                pacman.pixelX = COLS * TILE_SIZE;
            } else if (pacman.pixelX > COLS * TILE_SIZE) {
                pacman.pixelX = -TILE_SIZE;
            }
        }
        
        // Draw a ghost
        function drawGhost(ghost) {
            const x = ghost.pixelX;
            const y = ghost.pixelY;
            
            ctx.fillStyle = ghost.color;
            
            // Ghost body (rounded top, wavy bottom)
            ctx.beginPath();
            ctx.arc(x + TILE_SIZE / 2, y + TILE_SIZE / 2, TILE_SIZE / 2 - 2, Math.PI, 0, false);
            ctx.lineTo(x + TILE_SIZE - 2, y + TILE_SIZE - 2);
            
            // Wavy bottom
            const waveWidth = (TILE_SIZE - 4) / 3;
            for (let i = 0; i < 3; i++) {
                ctx.lineTo(x + 2 + waveWidth * i + waveWidth / 2, y + TILE_SIZE - 6);
                ctx.lineTo(x + 2 + waveWidth * (i + 1), y + TILE_SIZE - 2);
            }
            
            ctx.lineTo(x + 2, y + TILE_SIZE - 2);
            ctx.closePath();
            ctx.fill();
            
            // Eyes
            ctx.fillStyle = '#FFF';
            const eyeSize = 4;
            ctx.fillRect(x + 6, y + 8, eyeSize, eyeSize);
            ctx.fillRect(x + TILE_SIZE - 10, y + 8, eyeSize, eyeSize);
            
            // Pupils
            ctx.fillStyle = '#0000FF';
            const pupilSize = 2;
            let pupilOffsetX = 1;
            let pupilOffsetY = 1;
            
            switch(ghost.direction) {
                case 'up': pupilOffsetY = 0; break;
                case 'down': pupilOffsetY = 2; break;
                case 'left': pupilOffsetX = 0; break;
                case 'right': pupilOffsetX = 2; break;
            }
            
            ctx.fillRect(x + 6 + pupilOffsetX, y + 8 + pupilOffsetY, pupilSize, pupilSize);
            ctx.fillRect(x + TILE_SIZE - 10 + pupilOffsetX, y + 8 + pupilOffsetY, pupilSize, pupilSize);
        }
        
        // Simple ghost AI
        function updateGhost(ghost) {
            const ghostIsCentered = ghost.pixelX % TILE_SIZE === 0 && ghost.pixelY % TILE_SIZE === 0;
            
            if (ghostIsCentered) {
                const currentTileX = Math.floor(ghost.pixelX / TILE_SIZE);
                const currentTileY = Math.floor(ghost.pixelY / TILE_SIZE);
                
                // Get valid directions
                const validDirections = [];
                const oppositeDir = {
                    'up': 'down',
                    'down': 'up',
                    'left': 'right',
                    'right': 'left'
                };
                
                if (isValidTile(currentTileX, currentTileY - 1) && ghost.direction !== 'down') {
                    validDirections.push('up');
                }
                if (isValidTile(currentTileX, currentTileY + 1) && ghost.direction !== 'up') {
                    validDirections.push('down');
                }
                if (isValidTile(currentTileX - 1, currentTileY) && ghost.direction !== 'right') {
                    validDirections.push('left');
                }
                if (isValidTile(currentTileX + 1, currentTileY) && ghost.direction !== 'left') {
                    validDirections.push('right');
                }
                
                // Choose direction based on distance to Pac-Man
                if (validDirections.length > 0) {
                    let bestDir = ghost.direction;
                    let bestDist = Infinity;
                    
                    validDirections.forEach(dir => {
                        let testX = currentTileX;
                        let testY = currentTileY;
                        
                        switch(dir) {
                            case 'up': testY--; break;
                            case 'down': testY++; break;
                            case 'left': testX--; break;
                            case 'right': testX++; break;
                        }
                        
                        const dist = Math.abs(testX - pacman.x) + Math.abs(testY - pacman.y);
                        
                        if (dist < bestDist) {
                            bestDist = dist;
                            bestDir = dir;
                        }
                    });
                    
                    ghost.direction = bestDir;
                }
            }
            
            // Move ghost
            const ghostSpeed = 3;
            switch(ghost.direction) {
                case 'up': ghost.pixelY -= ghostSpeed; break;
                case 'down': ghost.pixelY += ghostSpeed; break;
                case 'left': ghost.pixelX -= ghostSpeed; break;
                case 'right': ghost.pixelX += ghostSpeed; break;
            }
            
            // Update grid position
            ghost.x = Math.floor((ghost.pixelX + TILE_SIZE / 2) / TILE_SIZE);
            ghost.y = Math.floor((ghost.pixelY + TILE_SIZE / 2) / TILE_SIZE);
            
            // Wrap around tunnel
            if (ghost.pixelX < -TILE_SIZE) {
                ghost.pixelX = COLS * TILE_SIZE;
            } else if (ghost.pixelX > COLS * TILE_SIZE) {
                ghost.pixelX = -TILE_SIZE;
            }
        }
        
        // Check collision with ghosts
        function checkGhostCollision() {
            if (isRespawning) return;
            
            ghosts.forEach(ghost => {
                const dx = Math.abs(pacman.pixelX - ghost.pixelX);
                const dy = Math.abs(pacman.pixelY - ghost.pixelY);
                
                if (dx < TILE_SIZE * 0.7 && dy < TILE_SIZE * 0.7) {
                    lives--;
                    scoreElement.textContent = `HEARTS: ${heartsCollected} / 17 | LIVES: ${lives}`;
                    
                    if (lives > 0) {
                        // Respawn
                        isRespawning = true;
                        
                        setTimeout(() => {
                            pacman.pixelX = 14 * TILE_SIZE;
                            pacman.pixelY = 23 * TILE_SIZE;
                            pacman.x = 14;
                            pacman.y = 23;
                            pacman.direction = 'left';
                            pacman.nextDirection = 'left';
                            
                            // Reset ghosts
                            ghosts[0].pixelX = 12 * TILE_SIZE;
                            ghosts[0].pixelY = 14 * TILE_SIZE;
                            ghosts[1].pixelX = 13 * TILE_SIZE;
                            ghosts[1].pixelY = 14 * TILE_SIZE;
                            ghosts[2].pixelX = 14 * TILE_SIZE;
                            ghosts[2].pixelY = 14 * TILE_SIZE;
                            ghosts[3].pixelX = 15 * TILE_SIZE;
                            ghosts[3].pixelY = 14 * TILE_SIZE;
                            
                            isRespawning = false;
                        }, 1000);
                    } else {
                        // Game over
                        alert('Game Over! You collected ' + heartsCollected + ' hearts!');
                        location.reload();
                    }
                }
            });
        }
        
        // Check collision with hearts
        function checkHeartCollision() {
            if (isCentered()) {
                for (let i = hearts.length - 1; i >= 0; i--) {
                    if (hearts[i].x === pacman.x && hearts[i].y === pacman.y) {
                        hearts.splice(i, 1);
                        heartsCollected++;
                        scoreElement.textContent = `HEARTS: ${heartsCollected} / 17 | LIVES: ${lives}`;
                        
                        if (heartsCollected === 17) {
                            gameWon = true;
                            setTimeout(() => {
                                modal.style.display = 'flex';
                            }, 500);
                        }
                    }
                }
            }
        }
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (gameWon) return;
            
            switch(e.key) {
                case 'ArrowUp':
                    pacman.nextDirection = 'up';
                    e.preventDefault();
                    break;
                case 'ArrowDown':
                    pacman.nextDirection = 'down';
                    e.preventDefault();
                    break;
                case 'ArrowLeft':
                    pacman.nextDirection = 'left';
                    e.preventDefault();
                    break;
                case 'ArrowRight':
                    pacman.nextDirection = 'right';
                    e.preventDefault();
                    break;
            }
        });
        
        // Game loop
        function gameLoop() {
            // Clear screen
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            drawMaze();
            drawHearts();
            
            // Draw and update ghosts
            ghosts.forEach(ghost => {
                drawGhost(ghost);
                if (!gameWon) {
                    updateGhost(ghost);
                }
            });
            
            drawPacman();
            
            if (!gameWon && !isRespawning) {
                updatePacman();
                checkHeartCollision();
                checkGhostCollision();
            }
            
            requestAnimationFrame(gameLoop);
        }
        
        gameLoop();
   