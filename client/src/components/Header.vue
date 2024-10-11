<template>
  <div>
    <!-- Enhanced Navbar with better layout and spacing -->
    <nav class="navbar navbar-dark navbar-expand-lg">
      <div class="container">
        <!-- Brand logo and name -->
        <a class="navbar-brand d-flex align-items-center" href="#" @click.prevent="navigateTo('/dashboard')">
          <img src="../assets/logo.png" id="logo" alt="Logo" class="mr-3">
          <span class="brand-name">MyHome</span>
        </a>

        <!-- Toggler for mobile view -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar links -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'blogs' }">Blogs</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'users' }">Users</router-link>
            </li>
            <li class="nav-item" v-if="!isLogin()">
              <router-link class="nav-link" :to="{ name: 'login' }">Login</router-link>
            </li>
            <li class="nav-item" v-if="isLogin()">
              <a class="nav-link" href="#" @click="logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    isLogin() {
      return this.$store.getters.isUserLoggedIn; // ใช้ getter จาก Vuex เพื่อเช็คสถานะล็อกอิน
    },
    logout() {
      this.$store.dispatch('setToken', null); // ลบ token
      this.$store.dispatch('setUser', null); // ลบ user
      localStorage.removeItem("isLoggedIn"); // ลบสถานะล็อกอินใน local storage
      this.$router.push({ name: 'login' }); // ส่งผู้ใช้ไปที่หน้า login
    },
    navigateTo(route) {
      this.$router.push(route); // นำทางไปยัง route ที่กำหนด
    }
  }
};
</script>

<style scoped>
/* Navbar container */
.navbar {
  background-color: #343a40; /* Darker background */
  padding: 1rem 2rem;
  border-bottom: 4px solid #ffc107; /* Golden border for luxury */
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

/* Brand styling */
.navbar-brand {
  font-weight: bold;
  font-size: 1.8rem;
  color: #ffc107;
  display: flex;
  align-items: center;
}

.navbar-brand .brand-name {
  margin-left: 10px;
  font-size: 1.5rem;
  text-transform: uppercase;
}

/* Logo styling */
.navbar-brand>img {
  width: 50px;
  height: 50px;
  border-radius: 50%; /* Rounded logo */
  border: 2px solid #ffc107; /* Golden border */
}

/* Navbar links */
.navbar-nav .nav-link {
  font-size: 1.2rem;
  color: #f8f9fa; /* Light color */
  padding: 10px 15px;
  transition: all 0.3s ease;
  text-transform: uppercase; /* Uppercase for links */
}

.navbar-nav .nav-link:hover {
  color: #ffc107 !important;
  background-color: rgba(255, 193, 7, 0.1);
  border-radius: 5px; /* Soft rounded corners */
}

.navbar-nav .router-link-active {
  color: #ffc107 !important;
  font-weight: bold;
  border-bottom: 2px solid #ffc107;
}

/* Toggler button for mobile view */
.navbar-toggler {
  border-color: #ffc107;
}

.navbar-toggler-icon {
  background-color: #ffc107;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .navbar-nav .nav-link {
    font-size: 1.5rem;
    padding: 15px;
  }

  .navbar-brand {
    font-size: 1.8rem;
  }

  .navbar-brand img {
    width: 40px;
    height: 40px;
  }
}
</style>
