<template>
  <div class="help-container">
    <div class="row">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header bg-secondary text-white">
            <h4 class="mb-0">Help & Support</h4>
          </div>
          <div class="card-body">
            <div class="accordion" id="helpAccordion">
              <div class="accordion-item" v-for="section in helpSections" :key="section.id">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#' + section.id">
                    {{ section.title }}
                  </button>
                </h2>
                <div :id="section.id" class="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                  <div class="accordion-body">
                    <div v-html="section.content"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Quick Links</h5>
          </div>
          <div class="list-group list-group-flush">
            <router-link to="/" class="list-group-item list-group-item-action">
              <i class="bi bi-house"></i> Check-in
            </router-link>
            <router-link to="/profile" class="list-group-item list-group-item-action">
              <i class="bi bi-person"></i> My Profile
            </router-link>
            <router-link to="/health-guide" class="list-group-item list-group-item-action">
              <i class="bi bi-gamepad"></i> Health Guide Game
            </router-link>
          </div>
        </div>

        <div class="card mt-3">
          <div class="card-header">
            <h5 class="mb-0">Contact Information</h5>
          </div>
          <div class="card-body">
            <p><strong>Clinic Phone:</strong> +0799999999</p>
            <p><strong>Emergency:</strong> +1 911</p>
            <p><strong>Email:</strong> saintfamille@gmail.com</p>
            <p><strong>Hours:</strong> 24/7</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Help',
  setup() {
    const helpSections = ref([
      {
        id: 'section1',
        title: 'How to Check-in',
        content: `
          <ol>
            <li>Fill in your personal information (name, national ID, phone)</li>
            <li>Select your symptoms from the checklist</li>
            <li>Add any additional notes if needed</li>
            <li>Click "Submit Check-in" to register</li>
            <li>You will receive a queue number</li>
            <li>Wait for your turn to be called</li>
          </ol>
        `
      },
      {
        id: 'section2',
        title: 'National ID Requirements',
        content: `
          <ul>
            <li>Your National ID must be exactly 13 digits</li>
            <li>No spaces or special characters allowed</li>
            <li>Make sure the ID matches your official documents</li>
            <li>If you don't have a National ID, contact clinic staff</li>
          </ul>
        `
      },
      {
        id: 'section3',
        title: 'Symptom Selection',
        content: `
          <p>Select all symptoms that apply to you:</p>
          <ul>
            <li><strong>Fever:</strong> High body temperature</li>
            <li><strong>Cough:</strong> Persistent coughing</li>
            <li><strong>Headache:</strong> Severe or persistent headaches</li>
            <li><strong>Fatigue:</strong> Unusual tiredness</li>
            <li><strong>Nausea:</strong> Feeling sick to your stomach</li>
            <li><strong>Sore Throat:</strong> Pain or irritation in throat</li>
          </ul>
        `
      },
      {
        id: 'section4',
        title: 'Queue Management',
        content: `
          <p>Understanding the queue system:</p>
          <ul>
            <li>You will receive a queue number after check-in</li>
            <li>The queue list shows all registered patients</li>
            <li>Status changes: Waiting → In Progress → Completed</li>
            <li>You can check your status in the Profile section</li>
            <li>Wait for staff to call your queue number</li>
          </ul>
        `
      },
      {
        id: 'section5',
        title: 'Health Guide Game',
        content: `
          <p>Learn about health through our interactive game:</p>
          <ul>
            <li>Navigate through the clinic environment</li>
            <li>Interact with health guide NPCs</li>
            <li>Learn about different medical procedures</li>
            <li>Complete health-related challenges</li>
            <li>Earn points and achievements</li>
          </ul>
        `
      }
    ])

    return {
      helpSections
    }
  }
}
</script>

<style scoped>
.help-container {
  max-width: 1000px;
  margin: 0 auto;
}

.accordion-button:not(.collapsed) {
  background-color: #0d6efd;
  color: white;
}

.card {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
