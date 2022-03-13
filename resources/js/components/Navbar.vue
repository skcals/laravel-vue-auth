<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <div class="container">
      <router-link to="/" class="navbar-brand">Laravel Vue Auth</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        </div>
        <div class="mx-auto"></div>
        <div class="dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ user.name }}
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li
              class="dropdown-item"
              role="button"
              @click="logout"
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";

const store = useStore();
const router = useRouter();

function logout() {
  store.dispatch("logout").then(() => {
    router.push({ name: "Login" });
  });
}

store.dispatch("getUser");

let user = computed(() => store.state.user.data);
</script>

<style scoped>
.router-link-active {
  font-weight: bold;
}
</style>