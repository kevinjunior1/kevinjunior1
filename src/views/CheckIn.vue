<template>
  <div class="check-in-container">
    <div class="row">
      <div class="col-md-8">
        <!-- Conditional Statements: Dynamic UI Rendering -->
        <div v-if="!isRegistered" class="card">
          <div class="card-header bg-primary text-white">
            <h4 class="mb-0">Patient Registration Form</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <!-- Variables and Data Binding: Input Binding with v-model -->
              <div class="mb-3">
                <label for="name" class="form-label">Full Name *</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="name"
                  v-model="formData.name"
                  :class="{ 'is-invalid': errors.name }"
                  required
                >
                <div class="invalid-feedback" v-if="errors.name">
                  {{ errors.name }}
                </div>
              </div>

              <div class="mb-3">
                <label for="nationalID" class="form-label">National ID *</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="nationalID"
                  v-model="formData.nationalID"
                  :class="{ 'is-invalid': errors.nationalID }"
                  placeholder="e.g., 1234567890123"
                  required
                >
                <div class="invalid-feedback" v-if="errors.nationalID">
                  {{ errors.nationalID }}
                </div>
              </div>

              <div class="mb-3">
                <label for="phone" class="form-label">Phone Number</label>
                <input 
                  type="tel" 
                  class="form-control" 
                  id="phone"
                  v-model="formData.phone"
                >
              </div>

              <!-- Arrays and Data Storage: Symptom Collection -->
              <div class="mb-3">
                <label class="form-label">Symptoms (select all that apply)</label>
                <div class="row">
                  <div 
                    v-for="symptom in availableSymptoms" 
                    :key="symptom.id"
                    class="col-md-6 mb-2"
                  >
                    <div class="form-check">
                      <input 
                        class="form-check-input" 
                        type="checkbox" 
                        :id="'symptom-' + symptom.id"
                        :checked="symptom.checked"
                        @change="toggleSymptom(symptom.id)"
                      >
                      <label class="form-check-label" :for="'symptom-' + symptom.id">
                        {{ symptom.name }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="notes" class="form-label">Additional Notes</label>
                <textarea 
                  class="form-control" 
                  id="notes"
                  v-model="formData.notes"
                  rows="3"
                ></textarea>
              </div>

              <!-- Functions and Methods: Event Handling -->
              <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary">
                  Submit Check-in
                </button>
                <button type="button" class="btn btn-secondary" @click="resetForm">
                  Clear Form
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Queue Status View -->
        <div v-else class="card">
          <div class="card-header bg-success text-white">
            <h4 class="mb-0">Queue Status</h4>
          </div>
          <div class="card-body text-center">
            <div class="alert alert-success" role="alert">
              <h5 class="alert-heading">Registration Successful!</h5>
              <p>Your queue number is: <strong>{{ currentPatient?.queueNumber }}</strong></p>
              <hr>
              <p class="mb-0">Please wait for your turn to be called.</p>
            </div>
            
            <div class="patient-info mt-4">
              <h6>Patient Information:</h6>
              <p><strong>Name:</strong> {{ currentPatient?.name }}</p>
              <p><strong>National ID:</strong> {{ currentPatient?.nationalID }}</p>
              <p><strong>Check-in Time:</strong> {{ currentPatient?.checkInTime }}</p>
              <p v-if="currentPatient?.symptoms.length">
                <strong>Symptoms:</strong> {{ currentPatient.symptoms.join(', ') }}
              </p>
            </div>

            <button class="btn btn-warning mt-3" @click="cancelRegistration">
              Cancel Registration
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <!-- Dynamic Menus: Sidebar Navigation -->
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Quick Actions</h5>
          </div>
          <div class="list-group list-group-flush">
            <a 
              v-for="navItem in navigationItems" 
              :key="navItem.path"
              :href="navItem.path"
              class="list-group-item list-group-item-action"
            >
              <i :class="navItem.icon"></i> {{ navItem.name }}
            </a>
          </div>
        </div>

        <!-- Current Queue Display -->
        <div class="card mt-3">
          <div class="card-header">
            <h5 class="mb-0">Current Queue</h5>
          </div>
          <div class="card-body">
            <p class="text-center">
              <span class="badge bg-primary fs-4">{{ queueNumber - 1 }}</span>
              <br>
              <small>Patients Registered</small>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Looping (Iteration): Table Rendering -->
    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Current Queue List</h5>
          </div>
          <div class="card-body">
            <div v-if="patients.length === 0" class="text-center text-muted">
              No patients in queue
            </div>
            <div v-else class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Queue #</th>
                    <th>Name</th>
                    <th>National ID</th>
                    <th>Symptoms</th>
                    <th>Check-in Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="patient in patients" :key="patient.id">
                    <td>{{ patient.queueNumber }}</td>
                    <td>{{ patient.name }}</td>
                    <td>{{ patient.nationalID }}</td>
                    <td>
                      <span v-if="patient.symptoms.length" class="badge bg-info">
                        {{ patient.symptoms.length }} symptom(s)
                      </span>
                      <span v-else class="text-muted">None</span>
                    </td>
                    <td>{{ patient.checkInTime }}</td>
                    <td>
                      <span :class="getStatusClass(patient.status)">
                        {{ patient.status }}
                      </span>
                    </td>
                    <td>
                      <button 
                        class="btn btn-sm btn-outline-primary"
                        @click="updateStatus(patient.id, 'In Progress')"
                        v-if="patient.status === 'Waiting'"
                      >
                        Call
                      </button>
                      <button 
                        class="btn btn-sm btn-outline-success"
                        @click="updateStatus(patient.id, 'Completed')"
                        v-if="patient.status === 'In Progress'"
                      >
                        Complete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { usePatientStore } from '../stores/patientStore'

export default {
  name: 'CheckIn',
  setup() {
    const patientStore = usePatientStore()
    
    // Reactive Variables: Data Properties
    const formData = ref({
      name: '',
      nationalID: '',
      phone: '',
      notes: ''
    })
    
    const errors = ref({})
    
    // Dynamic Menus: Navigation Array
    const navigationItems = ref([
      { name: 'Check-in', path: '/', icon: 'bi bi-house' },
      { name: 'My Profile', path: '/profile', icon: 'bi bi-person' },
      { name: 'Help', path: '/help', icon: 'bi bi-question-circle' },
      { name: 'Health Guide Game', path: '/health-guide', icon: 'bi bi-gamepad' }
    ])

    // Computed properties for store data
    const patients = computed(() => patientStore.patients)
    const queueNumber = computed(() => patientStore.queueNumber)
    const isRegistered = computed(() => patientStore.isRegistered)
    const currentPatient = computed(() => patientStore.currentPatient)
    const availableSymptoms = computed(() => patientStore.availableSymptoms)

    // Lifecycle Methods: Initialize clinic environment
    onMounted(() => {
      patientStore.loadFromSession()
    })

    // Functions and Methods: Event Handling
    const validateForm = () => {
      errors.value = {}
      
      // Conditional Statements: Form Validation
      if (!formData.value.name.trim()) {
        errors.value.name = 'Name is required'
      }
      
      if (!formData.value.nationalID.trim()) {
        errors.value.nationalID = 'National ID is required'
      } else if (!/^\d{13}$/.test(formData.value.nationalID)) {
        errors.value.nationalID = 'National ID must be exactly 13 digits'
      }
      
      return Object.keys(errors.value).length === 0
    }

    const handleSubmit = () => {
      if (validateForm()) {
        const patientData = {
          name: formData.value.name,
          nationalID: formData.value.nationalID,
          phone: formData.value.phone,
          notes: formData.value.notes
        }
        
        patientStore.submitCheckIn(patientData)
        resetForm()
      }
    }

    const resetForm = () => {
      formData.value = {
        name: '',
        nationalID: '',
        phone: '',
        notes: ''
      }
      errors.value = {}
      patientStore.resetSymptoms()
    }

    const cancelRegistration = () => {
      patientStore.cancelRegistration()
      resetForm()
    }

    const toggleSymptom = (symptomId) => {
      patientStore.toggleSymptom(symptomId)
    }

    const updateStatus = (patientId, newStatus) => {
      patientStore.updatePatientStatus(patientId, newStatus)
    }

    const getStatusClass = (status) => {
      // Conditional Logic: Game Logic for status display
      switch (status) {
        case 'Waiting':
          return 'badge bg-warning'
        case 'In Progress':
          return 'badge bg-info'
        case 'Completed':
          return 'badge bg-success'
        default:
          return 'badge bg-secondary'
      }
    }

    return {
      formData,
      errors,
      navigationItems,
      patients,
      queueNumber,
      isRegistered,
      currentPatient,
      availableSymptoms,
      handleSubmit,
      resetForm,
      cancelRegistration,
      toggleSymptom,
      updateStatus,
      getStatusClass
    }
  }
}
</script>

<style scoped>
.check-in-container {
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.patient-info {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
}

.table-responsive {
  max-height: 400px;
  overflow-y: auto;
}
</style>
