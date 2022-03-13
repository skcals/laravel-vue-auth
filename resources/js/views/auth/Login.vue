<template>
  <div class="text-center mt-4">
    <h1>Login</h1>
  </div>
  <div class="card-body text">
    <div class="mb-3" v-if="errors">
      <span class="text-danger">Wrong email or password</span>
    </div>
    <form @submit.prevent="login">
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
      <div class="form-group mt-4 text-center">
        <button type="submit" class="w-100 btn btn-primary" :disabled="loading">
          <span
            v-if="loading"
            class="spinner-border spinner-border-sm mx-3"
            role="status"
            aria-hidden="true"
          ></span>
          <span>Login</span>
        </button>
      </div>
      <div class="text-center mt-4">
        <p>
          Don't have an account yet?
          <router-link to="/register">Sign Up</router-link>
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
  email: "",
  password: "",
};

function login() {
  loading.value = true;
  store
    .dispatch("login", user)
    .then(() => {
      loading.value = false;
      router.push({
        name: "Dashboard",
      });
    })
    .catch((err) => {
      errors.value = err.response.data.errors;
      loading.value = false;
    });
}
</script>