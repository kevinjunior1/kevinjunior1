<template>
  <div class="profile-container">
    <div class="row">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header bg-info text-white">
            <h4 class="mb-0">My Profile</h4>
          </div>
          <div class="card-body">
            <div v-if="currentPatient" class="patient-profile">
              <div class="row">
                <div class="col-md-4 text-center">
                  <div class="profile-avatar">
                    <i class="bi bi-person-circle display-1 text-primary"></i>
                  </div>
                  <h5 class="mt-3">{{ currentPatient.name }}</h5>
                  <span class="badge bg-primary">Queue #{{ currentPatient.queueNumber }}</span>
                </div>
                <div class="col-md-8">
                  <h6>Personal Information</h6>
                  <table class="table table-borderless">
                    <tr>
                      <td><strong>National ID:</strong></td>
                      <td>{{ currentPatient.nationalID }}</td>
                    </tr>
                    <tr v-if="currentPatient.phone">
                      <td><strong>Phone:</strong></td>
                      <td>{{ currentPatient.phone }}</td>
                    </tr>
                    <tr>
                      <td><strong>Check-in Time:</strong></td>
                      <td>{{ currentPatient.checkInTime }}</td>
                    </tr>
                    <tr>
                      <td><strong>Status:</strong></td>
                      <td>
                        <span :class="getStatusClass(currentPatient.status)">
                          {{ currentPatient.status }}
                        </span>
                      </td>
                    </tr>
                  </table>

                  <h6 class="mt-4">Reported Symptoms</h6>
                  <div v-if="currentPatient.symptoms.length" class="symptoms-list">
                    <span 
                      v-for="symptom in currentPatient.symptoms" 
                      :key="symptom"
                      class="badge bg-info me-2 mb-2"
                    >
                      {{ symptom }}
                    </span>
                  </div>
                  <div v-else class="text-muted">
                    No symptoms reported
                  </div>

                  <div v-if="currentPatient.notes" class="mt-4">
                    <h6>Additional Notes</h6>
                    <p class="text-muted">{{ currentPatient.notes }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center text-muted">
              <i class="bi bi-person-circle display-1"></i>
              <h5 class="mt-3">No Profile Data</h5>
              <p>Please complete the check-in process to view your profile.</p>
              <router-link to="/" class="btn btn-primary">
                Go to Check-in
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Quick Actions</h5>
          </div>
          <div class="list-group list-group-flush">
            <router-link to="/" class="list-group-item list-group-item-action">
              <i class="bi bi-house"></i> Check-in
            </router-link>
            <router-link to="/help" class="list-group-item list-group-item-action">
              <i class="bi bi-question-circle"></i> Help
            </router-link>
            <router-link to="/health-guide" class="list-group-item list-group-item-action">
              <i class="bi bi-gamepad"></i> Health Guide Game
            </router-link>
          </div>
        </div>

        <div v-if="currentPatient" class="card mt-3">
          <div class="card-header">
            <h5 class="mb-0">Actions</h5>
          </div>
          <div class="card-body">
            <button class="btn btn-warning btn-sm w-100 mb-2" @click="cancelRegistration">
              Cancel Registration
            </button>
            <button class="btn btn-info btn-sm w-100" @click="printProfile">
              <i class="bi bi-printer"></i> Print Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { usePatientStore } from '../stores/patientStore'
import { useRouter } from 'vue-router'

export default {
  name: 'Profile',
  setup() {
    const patientStore = usePatientStore()
    const router = useRouter()

    const currentPatient = computed(() => patientStore.currentPatient)

    onMounted(() => {
      patientStore.loadFromSession()
    })

    const getStatusClass = (status) => {
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

    const cancelRegistration = () => {
      patientStore.cancelRegistration()
      router.push('/')
    }

    const printProfile = () => {
      window.print()
    }

    return {
      currentPatient,
      getStatusClass,
      cancelRegistration,
      printProfile
    }
  }
}
</script>

<style scoped>
.profile-container {
  max-width: 1000px;
  margin: 0 auto;
}

.profile-avatar {
  padding: 20px;
}

.symptoms-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

@media print {
  .btn, .list-group {
    display: none !important;
  }
}
</style>
