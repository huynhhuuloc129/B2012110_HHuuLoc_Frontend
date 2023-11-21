<template>
    <div>
        <img class="brightness-50" src="@/assets/wallpaper.jpg"
            style="position: absolute ;width: 100vw; height: 100vh; z-index: -1;" alt="">


        <div style="margin: auto; padding-top: 20vh;" class="w-full max-w-xs">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Username
                    </label>
                    <input v-model="userLocal.MSNV"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username" type="text" placeholder="Username">
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input v-model="userLocal.Password"
                        class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" placeholder="******************">
                </div>
                <div class="flex items-center justify-between">
                    <button @click="onLogin"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button">
                        Đăng nhập
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import nhanVienService from "@/services/nhanvien.service"
import { useCookies } from "vue3-cookies";
import Swal from 'sweetalert2'

export default {
    setup() {
        const { cookies } = useCookies();
        return { cookies };
    },
    data() {
        return {
            userLocal: {
                MSNV: 0,
                Password: "",
            },
            nhanvien: {},
            nhanviens: [],
        };
    },
    components: {
    },
    computed: {

    },
    methods: {
        async getAllNhanVien() {
            try {
                this.nhanviens = await nhanVienService.getAll();
            } catch (err) {
                console.log(err)
                this.displayError(err)
            }
        },
        async checkLogin() {
            try {
                var msnv = this.$cookies.get("MSNV");
                let nhanvien = await nhanVienService.getOne(msnv);
                if (nhanvien.username.length > 0) {
                    this.$router.push({ name: "home_page" });
                } else throw new Error('random error')
            } catch (error) {
                this.$router.push({ name: "login" });
            }
        },
        async onLogin() {
            try {
                var check = false
                this.nhanviens.forEach(us => {
                    if (us.MSNV === this.userLocal.MSNV && us.Password === this.userLocal.Password) check = true
                });
                if (check) {
                    this.$cookies.set("MSNV", this.userLocal.MSNV);
                    this.$router.push({ name: "home_page" });
                } else {
                    throw new Error("Sai MSNV hoặc mật khẩu!")
                }
            } catch (err) {
                console.log(err)
                this.displayError(err)
            }
        },
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        hideHeaderAndFooter() {
            this.$emit("isShowHeaderAndFooter", false);
        },
        displaySuccess(message) {
            Swal.fire({
                icon: 'success',
                title: message,
                showConfirmButton: false,
                timer: 1000
            })
        },
        delete_cookie() {
            this.$cookies.set('MSNV', '');
        },
    },
    mounted() {
        this.delete_cookie();
        this.hideHeaderAndFooter();
        this.getAllNhanVien();
    }
}
</script>

<style></style>