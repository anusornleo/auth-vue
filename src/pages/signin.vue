<template>
  <div class="img-background py-20 sm:py-20 md:py-20 lg:py-48 lg:py-48">
    <div class="container mx-auto px-4">
      <form
        :model="SignInForm"
        class="w-full sm:w-4/5 md:w-1/3 lg:w-1/3 xl:w-1/3 mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
      
        <div class="mb-4">
          <label
            v-if="!usernameValidate"
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >Username</label>
          <label
            v-else
            class="block text-red-500 text-sm font-bold mb-2"
            for="username"
          >{{usernameError}}</label>
          <!-- <p v-if="usernameValidate" class="text-red-500 text-xs italic">Please input a Username.</p> -->
          <input
            v-model="SignInForm.username"
            v-bind:class="{'border-red-500':usernameValidate}"
            @change="useranmeEvent"
            @input="useranmeEvent"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
          />
        </div>
          <div class="mb-4">
          <label
            v-if="!emailValidate"
            class="block text-gray-700 text-sm font-bold mb-2"
            for="email"
          >E-mail</label>
          <label v-else class="block text-red-500 text-sm font-bold mb-2" for="email">{{emailError}}</label>
          <!-- <p v-if="emailValidate" class="text-red-500 text-xs italic">Please input a email.</p> -->
          <input
            v-model="SignInForm.email"
            v-bind:class="{'border-red-500':emailValidate}"
            @change="emailEvent"
            @input="emailEvent"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
          />
        </div>
        <div class="mb-6">
          <label
            v-if="!passwordValidate"
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >Password</label>
          <label
            v-else
            class="block text-red-500 text-sm font-bold mb-2"
            for="password"
          >{{passwordError}}</label>
          <!-- <p v-if="passwordValidate" class="text-red-500 text-xs italic">Please input a password.</p> -->
          <input
            v-model="SignInForm.password"
            v-bind:class="{'border-red-500':passwordValidate}"
            @change="passwordEvent"
            @input="passwordEvent"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="text"
          />
          <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
        </div>
        <div class="flex items-center justify-between">
          <button
            v-if="SignInForm.username.length != 0  && SignInForm.password.length != 0 && SignInForm.email.length != 0"
            @click="submitForm()"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >Sign In</button>

          <button
            v-else
            disabled
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
          >Sign In</button>

          <!-- <a
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
          >Forgot Password?</a>-->
        </div>
      </form>
      <h2>{{data}}</h2>
    </div>
    <div v-if="isLoading" class="opacity_bg">
      <div class="loading">
        <div class="lds-css ng-scope">
          <div style="width:100%;height:100%;" class="lds-rolling">
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignIn",
  data() {
    return {
      SignInForm: {
        email: "",
        username: "",
        password: ""
      },
      data: [],
      usernameValidate: false,
      emailValidate: false,
      passwordValidate: false,
      usernameError: "",
      emailError: "",
      passwordError: "",
      isLoading: false
    };
  },
  methods: {
    emailEvent({ type, target }) {
      const event = {
        type,
        target: {
          value: target.value
        }
      };
      if (event.target.value == 0) {
        this.emailValidate = true;
        this.emailError = "E-mail is required";
      } else {
        this.emailValidate = false;
        this.emailError = "";
      }
    },
    useranmeEvent({ type, target }) {
      const event = {
        type,
        target: {
          value: target.value
        }
      };
      if (event.target.value == 0) {
        this.usernameValidate = true;
        this.usernameError = "Username is required";
      } else {
        this.usernameValidate = false;
        this.usernameError = "";
      }
    },
    passwordEvent({ type, target }) {
      const event = {
        type,
        target: {
          value: target.value
        }
      };
      if (event.target.value == 0) {
        this.passwordValidate = true;
        this.passwordError = "Password is required";
      } else {
        this.passwordValidate = false;
        this.passwordError = "";
      }
    },
    submitForm() {
      this.isLoading = true;
      axios
        .post("https://test-node-js-by-leo.herokuapp.com/users/register", {
          email: this.SignInForm.email,
          username: this.SignInForm.username,
          password: this.SignInForm.password
        })
        .then(res => {
          this.data = res.data;
          this.isLoading = false;
          if (this.data.data === "login") {
            this.goLogin();
          } else {
            if (this.data.message == "Username has exists") {
              this.usernameValidate = true;
              this.usernameError = "Username has exists";
            } else if (this.data.message == "E-mail has exists") {
              this.emailValidate = true;
              this.emailError = "E-mail has exists";
            }
          }
        });
    },
    goLogin() {
      this.$router.push({
        name: "Login"
      });
    }
  }
};
</script>

<style scoped>
@keyframes lds-rolling {
  0% {
    -webkit-transform: translate(-50%, -50%) rotate(0deg);
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotate(360deg);
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
@-webkit-keyframes lds-rolling {
  0% {
    -webkit-transform: translate(-50%, -50%) rotate(0deg);
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotate(360deg);
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.lds-rolling {
  position: relative;
}
.lds-rolling div,
.lds-rolling div:after {
  position: absolute;
  width: 198px;
  height: 198px;
  border: 30px solid #0089d0;
  border-top-color: transparent;
  border-radius: 50%;
}
.lds-rolling div {
  -webkit-animation: lds-rolling 1s linear infinite;
  animation: lds-rolling 1s linear infinite;
  top: 100px;
  left: 100px;
}
.lds-rolling div:after {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
.lds-rolling {
  width: 60px !important;
  height: 60px !important;
  -webkit-transform: translate(-30px, -30px) scale(0.3) translate(30px, 30px);
  transform: translate(-30px, -30px) scale(0.3) translate(30px, 30px);
}
</style>