<template>
  <div class="text-center mt-4">
    <h1>Register</h1>
  </div>
  <div class="card-body text">
    <div class="mb-3" v-if="errors">
      <span class="text-danger d-block" v-for="(error, i) of errors" :key="i"
        >*{{ error }}</span
      >
    </div>
    <form @submit.prevent="register">
      <div class="form-group mb-3">
        <label>Name</label>
        <input type="text" class="form-control" v-model="user.name" required />
      </div>
      <div class="form-group mb-3">
        <label>Email</label>
        <input
          type="email"
          class="form-control"
          v-model="user.email"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label>Password</label>
        <input
          type="password"
          class="form-control"
          v-model="user.password"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label>Password Confirmation</label>
        <input
          type="password"
          class="form-control"
          v-model="user.password_confirmation"
          required
        />
      </div>
      <div class="form-group mt-4 text-center">
        <button type="submit" class="w-100 btn btn-primary" :disabled="loading">
          <span
            v-if="loading"
            class="spinner-border spinner-border-sm mx-3"
            role="status"
            aria-hidden="true"
          ></span>
          <span>Register</span>
        </button>
      </div>
      <div class="text-center mt-4">
        <p>
          Already have an account? <router-link to="/login">Login</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const loading = ref(false);
const errors = ref();

const user = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

function register() {
  loading.value = true;
  store
    .dispatch("register", user)
    .then(() => {
      loading.value = false;
      router.push({
        name: "Dashboard",
      });
    })
    .catch((err) => {
      errors.value = Object.values(err.response.data.errors).flat();
      loading.value = false;
    });
}
</script>