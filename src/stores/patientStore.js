import { defineStore } from 'pinia'

export const usePatientStore = defineStore('patient', {
  state: () => ({
    // Reactive Variables: State Variables for queue management
    queueNumber: 1,
    isRegistered: false,
    
    // Arrays and Data Storage: Patient List and Queue Management
    patients: [],
    currentPatient: null,
    
    // Symptom Collection: Array for symptom selection
    availableSymptoms: [
      { id: 1, name: 'Fever', checked: false },
      { id: 2, name: 'Cough', checked: false },
      { id: 3, name: 'Headache', checked: false },
      { id: 4, name: 'Fatigue', checked: false },
      { id: 5, name: 'Nausea', checked: false },
      { id: 6, name: 'Sore Throat', checked: false }
    ]
  }),
  
  getters: {
    // Get current queue status
    getCurrentQueue: (state) => state.queueNumber,
    
    // Get registered patients count
    getPatientsCount: (state) => state.patients.length,
    
    // Get selected symptoms
    getSelectedSymptoms: (state) => {
      return state.availableSymptoms.filter(symptom => symptom.checked)
    }
  },
  
  actions: {
    // Functions and Methods: State Mutations
    submitCheckIn(patientData) {
      // Create new patient object
      const newPatient = {
        id: Date.now(),
        queueNumber: this.queueNumber,
        ...patientData,
        symptoms: this.getSelectedSymptoms.map(s => s.name),
        checkInTime: new Date().toLocaleString(),
        status: 'Waiting'
      }
      
      // Push new patient data into the array
      this.patients.push(newPatient)
      this.currentPatient = newPatient
      
      // Increment the queue counter
      this.queueNumber++
      
      // Update registration status
      this.isRegistered = true
      
      // Save to session storage
      this.saveToSession()
      
      return newPatient
    },
    
    cancelRegistration() {
      this.currentPatient = null
      this.isRegistered = false
      this.resetSymptoms()
      this.saveToSession()
    },
    
    resetSymptoms() {
      this.availableSymptoms.forEach(symptom => {
        symptom.checked = false
      })
    },
    
    toggleSymptom(symptomId) {
      const symptom = this.availableSymptoms.find(s => s.id === symptomId)
      if (symptom) {
        symptom.checked = !symptom.checked
      }
    },
    
    updatePatientStatus(patientId, newStatus) {
      const patient = this.patients.find(p => p.id === patientId)
      if (patient) {
        patient.status = newStatus
        this.saveToSession()
      }
    },
    
    // Session data management
    saveToSession() {
      sessionStorage.setItem('patientData', JSON.stringify({
        patients: this.patients,
        queueNumber: this.queueNumber,
        currentPatient: this.currentPatient,
        isRegistered: this.isRegistered
      }))
    },
    
    loadFromSession() {
      const sessionData = sessionStorage.getItem('patientData')
      if (sessionData) {
        const data = JSON.parse(sessionData)
        this.patients = data.patients || []
        this.queueNumber = data.queueNumber || 1
        this.currentPatient = data.currentPatient || null
        this.isRegistered = data.isRegistered || false
      }
    },
    
    clearAllData() {
      this.patients = []
      this.queueNumber = 1
      this.currentPatient = null
      this.isRegistered = false
      this.resetSymptoms()
      sessionStorage.removeItem('patientData')
    }
  }
})
