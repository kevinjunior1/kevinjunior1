<template>
  <div class="health-guide-container">
    <div class="row">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header bg-success text-white">
            <h4 class="mb-0">Health Guide Game</h4>
          </div>
          <div class="card-body">
            <!-- Game Area -->
            <div class="game-area" ref="gameArea">
              <!-- Player Character -->
              <div 
                class="character player" 
                :style="{ left: playerPosition.x + 'px', top: playerPosition.y + 'px' }"
              >
                <i class="bi bi-person-fill"></i>
              </div>

              <!-- Looping: NPC Movements -->
              <div 
                v-for="npc in npcs" 
                :key="npc.id"
                class="character npc"
                :class="npc.type"
                :style="{ left: npc.position.x + 'px', top: npc.position.y + 'px' }"
                @click="interactWithNPC(npc)"
              >
                <i :class="npc.icon"></i>
                <div class="npc-name">{{ npc.name }}</div>
              </div>

              <!-- Interactive Objects -->
              <div 
                v-for="obj in interactiveObjects" 
                :key="obj.id"
                class="interactive-object"
                :style="{ left: obj.position.x + 'px', top: obj.position.y + 'px' }"
                @click="interactWithObject(obj)"
              >
                <i :class="obj.icon"></i>
              </div>
            </div>

            <!-- Game Controls -->
            <div class="game-controls mt-3">
              <div class="row">
                <div class="col-md-6">
                  <h5>Movement Controls</h5>
                  <div class="movement-grid">
                    <div></div>
                    <button class="btn btn-primary" @click="movePlayer('up')">
                      <i class="bi bi-arrow-up"></i>
                    </button>
                    <div></div>
                    <button class="btn btn-primary" @click="movePlayer('left')">
                      <i class="bi bi-arrow-left"></i>
                    </button>
                    <button class="btn btn-secondary" @click="movePlayer('center')">
                      <i class="bi bi-house"></i>
                    </button>
                    <button class="btn btn-primary" @click="movePlayer('right')">
                      <i class="bi bi-arrow-right"></i>
                    </button>
                    <div></div>
                    <button class="btn btn-primary" @click="movePlayer('down')">
                      <i class="bi bi-arrow-down"></i>
                    </button>
                    <div></div>
                  </div>
                </div>
                <div class="col-md-6">
                  <h5>Game Stats</h5>
                  <div class="game-stats">
                    <p><strong>Health Points:</strong> {{ gameStats.health }}</p>
                    <p><strong>Knowledge Points:</strong> {{ gameStats.knowledge }}</p>
                    <p><strong>Interactions:</strong> {{ gameStats.interactions }}</p>
                    <p><strong>Level:</strong> {{ gameStats.level }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Conditional Statements: Game Logic for messages -->
            <div v-if="gameMessage" class="alert mt-3" :class="gameMessage.type">
              <h6>{{ gameMessage.title }}</h6>
              <p>{{ gameMessage.content }}</p>
              <button v-if="gameMessage.action" class="btn btn-sm" :class="gameMessage.buttonClass" @click="gameMessage.action">
                {{ gameMessage.buttonText }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Game Instructions</h5>
          </div>
          <div class="card-body">
            <h6>How to Play:</h6>
            <ol>
              <li>Use arrow buttons to move your character</li>
              <li>Click on NPCs to interact with them</li>
              <li>Click on objects to learn about them</li>
              <li>Complete challenges to earn points</li>
              <li>Level up by gaining knowledge</li>
            </ol>
            
            <h6 class="mt-3">NPC Types:</h6>
            <ul>
              <li><span class="text-primary">Doctor</span> - Medical advice</li>
              <li><span class="text-success">Nurse</span> - Health tips</li>
              <li><span class="text-info">Guide</span> - Navigation help</li>
            </ul>
          </div>
        </div>

        <div class="card mt-3">
          <div class="card-header">
            <h5 class="mb-0">Achievements</h5>
          </div>
          <div class="card-body">
            <div v-for="achievement in achievements" :key="achievement.id" class="achievement-item">
              <div class="d-flex align-items-center">
                <i :class="achievement.icon" :style="{ color: achievement.unlocked ? 'gold' : '#ccc' }"></i>
                <div class="ms-2">
                  <strong>{{ achievement.name }}</strong>
                  <br>
                  <small class="text-muted">{{ achievement.description }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card mt-3">
          <div class="card-header">
            <h5 class="mb-0">Quick Actions</h5>
          </div>
          <div class="list-group list-group-flush">
            <router-link to="/" class="list-group-item list-group-item-action">
              <i class="bi bi-house"></i> Check-in
            </router-link>
            <router-link to="/profile" class="list-group-item list-group-item-action">
              <i class="bi bi-person"></i> My Profile
            </router-link>
            <router-link to="/help" class="list-group-item list-group-item-action">
              <i class="bi bi-question-circle"></i> Help
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

export default {
  name: 'HealthGuide',
  setup() {
    // Reactive Variables: Game state
    const playerPosition = reactive({ x: 250, y: 200 })
    const gameStats = reactive({
      health: 100,
      knowledge: 0,
      interactions: 0,
      level: 1
    })
    
    const gameMessage = ref(null)

    // Arrays and Data Storage: NPCs and Interactive Objects
    const npcs = ref([
      {
        id: 1,
        name: 'Dr. Smith',
        type: 'doctor',
        icon: 'bi bi-hospital',
        position: { x: 100, y: 100 },
        dialogue: 'Hello! I can help you understand medical procedures. What would you like to know?',
        knowledge: 10
      },
      {
        id: 2,
        name: 'Nurse Johnson',
        type: 'nurse',
        icon: 'bi bi-heart-pulse',
        position: { x: 400, y: 150 },
        dialogue: 'Welcome to our clinic! Remember to wash your hands regularly and stay hydrated.',
        knowledge: 5
      },
      {
        id: 3,
        name: 'Guide Bot',
        type: 'guide',
        icon: 'bi bi-robot',
        position: { x: 300, y: 300 },
        dialogue: 'I can help you navigate the clinic. Use the arrow keys to move around!',
        knowledge: 3
      }
    ])

    const interactiveObjects = ref([
      {
        id: 1,
        name: 'Medical Chart',
        icon: 'bi bi-clipboard-data',
        position: { x: 150, y: 250 },
        info: 'Medical charts contain important patient information and treatment history.',
        knowledge: 8
      },
      {
        id: 2,
        name: 'First Aid Kit',
        icon: 'bi bi-box-seam',
        position: { x: 350, y: 200 },
        info: 'First aid kits contain essential medical supplies for emergency treatment.',
        knowledge: 6
      },
      {
        id: 3,
        name: 'Health Monitor',
        icon: 'bi bi-activity',
        position: { x: 200, y: 350 },
        info: 'Health monitors track vital signs like heart rate, blood pressure, and temperature.',
        knowledge: 7
      }
    ])

    const achievements = ref([
      {
        id: 1,
        name: 'First Interaction',
        description: 'Talk to your first NPC',
        icon: 'bi bi-chat-dots',
        unlocked: false
      },
      {
        id: 2,
        name: 'Knowledge Seeker',
        description: 'Gain 50 knowledge points',
        icon: 'bi bi-book',
        unlocked: false
      },
      {
        id: 3,
        name: 'Explorer',
        description: 'Interact with all objects',
        icon: 'bi bi-compass',
        unlocked: false
      }
    ])

    // Functions and Methods: Game Logic
    const movePlayer = (direction) => {
      const step = 50
      switch (direction) {
        case 'up':
          playerPosition.y = Math.max(0, playerPosition.y - step)
          break
        case 'down':
          playerPosition.y = Math.min(400, playerPosition.y + step)
          break
        case 'left':
          playerPosition.x = Math.max(0, playerPosition.x - step)
          break
        case 'right':
          playerPosition.x = Math.min(500, playerPosition.x + step)
          break
        case 'center':
          playerPosition.x = 250
          playerPosition.y = 200
          break
      }
    }

    const interactWithNPC = (npc) => {
      gameStats.interactions++
      gameStats.knowledge += npc.knowledge
      
      // Conditional Statements: Game Logic for level progression
      if (gameStats.knowledge >= 50 && gameStats.level === 1) {
        gameStats.level = 2
        showMessage('Level Up!', 'You reached Level 2! Keep learning!', 'success')
      } else if (gameStats.knowledge >= 100 && gameStats.level === 2) {
        gameStats.level = 3
        showMessage('Level Up!', 'You reached Level 3! You\'re a health expert!', 'success')
      }
      
      // Check achievements
      if (gameStats.interactions === 1) {
        achievements.value[0].unlocked = true
      }
      
      showMessage(`Talking to ${npc.name}`, npc.dialogue, 'info')
      checkAchievements()
    }

    const interactWithObject = (obj) => {
      gameStats.interactions++
      gameStats.knowledge += obj.knowledge
      
      showMessage(`${obj.name}`, obj.info, 'primary')
      checkAchievements()
    }

    const showMessage = (title, content, type) => {
      gameMessage.value = {
        title,
        content,
        type: `alert-${type}`,
        action: null,
        buttonText: '',
        buttonClass: ''
      }
      
      setTimeout(() => {
        gameMessage.value = null
      }, 5000)
    }

    const checkAchievements = () => {
      // Knowledge Seeker achievement
      if (gameStats.knowledge >= 50) {
        achievements.value[1].unlocked = true
      }
      
      // Explorer achievement
      const interactedObjects = interactiveObjects.value.length
      if (gameStats.interactions >= npcs.value.length + interactedObjects) {
        achievements.value[2].unlocked = true
      }
    }

    // Looping: NPC Movements
    let animationInterval = null
    
    const animateNPCs = () => {
      animationInterval = setInterval(() => {
        npcs.value.forEach(npc => {
          // Simple random movement pattern
          const moveChance = Math.random()
          if (moveChance < 0.3) {
            const direction = Math.floor(Math.random() * 4)
            const step = 20
            
            switch (direction) {
              case 0: // up
                npc.position.y = Math.max(0, npc.position.y - step)
                break
              case 1: // down
                npc.position.y = Math.min(400, npc.position.y + step)
                break
              case 2: // left
                npc.position.x = Math.max(0, npc.position.x - step)
                break
              case 3: // right
                npc.position.x = Math.min(500, npc.position.x + step)
                break
            }
          }
        })
      }, 2000)
    }

    // Lifecycle Methods: Initialize game environment
    onMounted(() => {
      animateNPCs()
      showMessage('Welcome to Health Guide!', 'Use arrow keys to move and click on characters to interact.', 'info')
    })

    onUnmounted(() => {
      if (animationInterval) {
        clearInterval(animationInterval)
      }
    })

    return {
      playerPosition,
      gameStats,
      gameMessage,
      npcs,
      interactiveObjects,
      achievements,
      movePlayer,
      interactWithNPC,
      interactWithObject
    }
  }
}
</script>

<style scoped>
.health-guide-container {
  max-width: 1200px;
  margin: 0 auto;
}

.game-area {
  position: relative;
  width: 100%;
  height: 450px;
  background: linear-gradient(135deg, #e8f5e8 0%, #f0f8ff 100%);
  border: 2px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.character {
  position: absolute;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.character.player {
  background-color: #007bff;
  color: white;
  z-index: 10;
}

.character.npc {
  background-color: #6c757d;
  color: white;
}

.character.npc.doctor {
  background-color: #dc3545;
}

.character.npc.nurse {
  background-color: #28a745;
}

.character.npc.guide {
  background-color: #17a2b8;
}

.character:hover {
  transform: scale(1.1);
}

.npc-name {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  white-space: nowrap;
  background-color: rgba(0,0,0,0.7);
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
}

.interactive-object {
  position: absolute;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffc107;
  color: #333;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
}

.interactive-object:hover {
  transform: scale(1.2);
  background-color: #ffca2c;
}

.movement-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  max-width: 150px;
}

.movement-grid button {
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-stats p {
  margin: 5px 0;
}

.achievement-item {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.achievement-item:last-child {
  border-bottom: none;
}

.card {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
