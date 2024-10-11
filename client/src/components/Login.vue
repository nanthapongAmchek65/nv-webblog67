<template>
  <div class="login-page">
    <div class="login-box">
      <h2>Welcome Back!</h2>
      <p v-if="!isLoggedIn">Please login to your account</p>
      <p v-else>You are logged in!</p>

      <!-- Form จะซ่อนถ้าผู้ใช้ล็อกอินแล้ว -->
      <form v-on:submit.prevent="onLogin" v-if="!isLoggedIn">
        <div class="input-container">
          <input type="email" id="email" v-model="email" required />
          <label for="email">Email</label>
          <div class="underline"></div>
        </div>
        <div class="input-container">
          <input type="password" id="password" v-model="password" required />
          <label for="password">Password</label>
          <div class="underline"></div>
        </div>
        <button type="submit" class="login-button">Login</button>
        <div class="error" v-if="error">{{ error }}</div>
      </form>

      <!-- ปุ่ม Logout จะปรากฏเมื่อผู้ใช้ล็อกอินแล้ว -->
      <button v-if="isLoggedIn" @click="onLogout" class="logout-button">Logout</button>
    </div>
  </div>
</template>

<script>
import AuthenService from "../services/AuthenService";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
      isLoggedIn: false, // ใช้สำหรับเช็คว่าล็อกอินแล้วหรือไม่
    };
  },
  created() {
    // ตรวจสอบ localStorage เมื่อ component ถูกโหลด
    if (localStorage.getItem("isLoggedIn")) {
      this.isLoggedIn = true;
    }
  },
  methods: {
    async onLogin() {
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password,
        });

        // เก็บ token และ user ข้อมูลลง store
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);

        // ตั้งค่าเป็นล็อกอินสำเร็จ
        this.isLoggedIn = true;
        localStorage.setItem("isLoggedIn", true); // บันทึกสถานะล็อกอินใน localStorage

        // ส่งไปยังหน้าผู้ใช้
        this.$router.push({
          name: "users",
        });
      } catch (error) {
        console.log(error);
        this.error = error.response.data.error;
        this.email = "";
        this.password = "";
      }
    },
    onLogout() {
      // ลบ token และ user ออกจาก store เมื่อ logout
      this.$store.dispatch("clearToken");
      this.$store.dispatch("clearUser");

      // ตั้งค่าสถานะเป็นไม่ได้ล็อกอิน
      this.isLoggedIn = false;
      localStorage.removeItem("isLoggedIn"); // ลบสถานะจาก localStorage

      // กลับไปหน้า login
      this.email = "";
      this.password = "";
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

/* Center the login box */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.login-box {
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

/* Heading and subtext */
h2 {
  margin-bottom: 10px;
  color: #333;
  font-size: 28px;
  font-weight: bold;
}

p {
  margin-bottom: 30px;
  color: #777;
  font-size: 14px;
}

/* Input container for styling */
.input-container {
  position: relative;
  margin-bottom: 30px;
  text-align: left;
}

/* Input styles */
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: none;
  border-bottom: 2px solid #ddd;
  font-size: 16px;
  background: none;
  outline: none;
}

input[type="email"]:focus,
input[type="password"]:focus {
  border-bottom: 2px solid #007bff;
}

/* Label that stays above when typing */
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

/* The underline effect */
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
.login-button,
.logout-button {
  width: 100%;
  padding: 15px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.login-button:hover,
.logout-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

/* Error message */
.error {
  color: red;
  margin-top: 15px;
  font-size: 14px;
}
</style>
