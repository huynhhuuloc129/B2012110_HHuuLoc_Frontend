import { createWebHistory, createRouter } from "vue-router";


const routes = [
    {
        path: "/",
        name: "home_page",
        component: () => import("@/views/UserHomePage.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/Login.vue"),
    },
    {
        path: "/khachhang",
        name: "khach hang",
        component: () => import("@/views/KhachHang.vue"),
    },
    {
        path: "/donhang",
        name: "dat hang",
        component: () => import("@/views/DatHang.vue"),
    },
    {
        path: "/admin",
        name: "admin",
        component: () => import("@/views/Admin.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;