# Digital Patient Check-in System

A comprehensive Vue.js application that demonstrates core programming concepts through a patient clinic management system with interactive health guide game.

## Features

### Core Programming Concepts Implemented

#### 1. Variables and Data Binding
- **Reactive Variables**: Vue's reactivity system stores patient input (name, nationalID, symptoms)
- **Input Binding**: Two-way binding with `v-model` between UI fields and internal variables
- **State Variables**: Pinia store manages `queueNumber` and `isRegistered` status

#### 2. Conditional Statements
- **Form Validation**: Checks National ID format and required fields before submission
- **Dynamic UI Rendering**: Toggles between "Registration Form" and "Queue Status" views
- **Game Logic**: Determines success/failure messages based on user interactions

#### 3. Arrays and Data Storage
- **Patient List**: Primary local storage array for patient objects
- **Symptom Collection**: Array binds multiple checkboxes for symptom selection
- **Queue Management**: Maintains organized sequence of arriving patients

#### 4. Looping (Iteration)
- **Table Rendering**: Uses `v-for` to display current queue in Bootstrap-styled table
- **Dynamic Menus**: Iterates through navigation objects to generate sidebar menu links
- **NPC Movements**: Handles repeatable actions in health guide game component

#### 5. Functions and Methods
- **Event Handling**: Functions for `submitCheckIn()` and `cancelRegistration()` events
- **State Mutations**: Functions to push patient data and increment queue counter
- **Lifecycle Methods**: `created()` and `mounted()` hooks for initialization

## Project Structure

```
patient-check-in-system/
├── src/
│   ├── components/
│   ├── views/
│   │   ├── CheckIn.vue          # Main registration form with all concepts
│   │   ├── Profile.vue          # Patient profile display
│   │   ├── Help.vue            # Help and support section
│   │   └── HealthGuide.vue     # Interactive health game with NPCs
│   ├── stores/
│   │   └── patientStore.js     # Pinia store for state management
│   ├── router/
│   │   └── index.js           # Vue Router configuration
│   ├── App.vue                # Main application component
│   └── main.js               # Application entry point
├── index.html                 # HTML template
├── package.json              # Dependencies and scripts
├── vite.config.js           # Vite configuration
└── README.md               # This file
```

## Installation

1. Clone or download the project
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### Patient Check-in Process
1. Fill in personal information (name, national ID, phone)
2. Select symptoms from the checklist
3. Add additional notes if needed
4. Submit to receive queue number
5. Monitor queue status and wait for your turn

### Health Guide Game
1. Navigate to the Health Guide page
2. Use arrow controls to move your character
3. Click on NPCs to interact and learn
4. Click on objects to gain knowledge points
5. Complete achievements and level up

### Queue Management
- View all registered patients in the queue table
- Update patient status (Waiting → In Progress → Completed)
- Monitor current queue number and patient count

## Technologies Used

- **Vue 3**: Progressive JavaScript framework
- **Pinia**: State management
- **Vue Router**: Client-side routing
- **Bootstrap 5**: UI framework and styling
- **Vite**: Build tool and development server

## Key Components

### CheckIn.vue
- Main registration form demonstrating all core concepts
- Form validation with conditional statements
- Dynamic UI rendering based on registration status
- Table rendering with v-for loops
- Event handling and state management

### patientStore.js
- Centralized state management with Pinia
- Reactive variables for queue management
- Arrays for patient data and symptoms
- Functions for state mutations
- Session storage integration

### HealthGuide.vue
- Interactive game component
- NPC movements with looping animations
- Game logic with conditional statements
- Achievement system
- Interactive objects and character movement

## Browser Compatibility

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes to demonstrate core programming concepts.
