<template>
  <div class="create-user-page">
    <div class="create-user-box">
      <h2>Create New User</h2>
      <form v-on:submit.prevent="createUser">
        <div class="input-container">
          <input type="text" id="name" v-model="user.name" required />
          <label for="name">First Name</label>
          <div class="underline"></div>
        </div>
        <div class="input-container">
          <input type="text" id="lastname" v-model="user.lastname" required />
          <label for="lastname">Last Name</label>
          <div class="underline"></div>
        </div>
        <!-- เพิ่มระยะห่างระหว่างชื่อและอีเมล -->
        <div class="spacer"></div> <!-- ใช้ตัวนี้เพื่อเพิ่มระยะห่าง -->
        <div class="input-container">
          <input type="email" id="email" v-model="user.email" required />
          <label for="email">Email</label>
          <div class="underline"></div>
        </div>
        <div class="input-container">
          <input type="password" id="password" v-model="user.password" required />
          <label for="password">Password</label>
          <div class="underline"></div>
        </div>
        <button type="submit" class="create-button">Create User</button>
      </form>
    </div>
  </div>
</template>

<script>
import UsersService from '../../services/UsersService';
export default {
  data() {
    return {
      user: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        status: 'active',
      },
    };
  },
  methods: {
    async createUser() {
      try {
        await UsersService.post(this.user);
        this.$router.push('/users');
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
/* General body style */
body {
  font-family: 'Arial', sans-serif;
  background-color: #f0f2f5;
  margin: 0;
  padding: 0;
}

/* Center the form on the page */
.create-user-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.create-user-box {
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

/* Heading */
h2 {
  margin-bottom: 20px;
  color: #333;
  font-size: 28px;
  font-weight: bold;
}

/* Input container for styling */
.input-container {
  position: relative;
  margin-bottom: 30px;
  text-align: left;
}

/* Add spacer for more space between input fields */
.spacer {
  margin-bottom: 20px;
}

/* Input styles */
input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: none;
  border-bottom: 2px solid #ddd;
  font-size: 16px;
  background: none;
  outline: none;
  color: #333; /* เปลี่ยนสีตัวอักษร */
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
  border-bottom: 2px solid #007bff;
}

/* Label that moves above when typing */
label {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 14px;
  color: #aaa;
  transition: all 0.3s;
}

input:focus + label,
input:not(:placeholder-shown) + label {
  top: -20px;
  left: 0;
  font-size: 12px;
  color: #007bff;
}

/* Underline effect */
.underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #007bff;
  transition: width 0.3s;
}

input:focus ~ .underline {
  width: 100%;
}

/* Button styles */
.create-button {
  width: 100%;
  padding: 15px;
  background-color: #28a745;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.create-button:hover {
  background-color: #218838;
  transform: translateY(-2px);
}
</style>
