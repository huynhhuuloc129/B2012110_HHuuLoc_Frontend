<template>
    <div class="flex items-center justify-center" style="flex-direction: column;">
        <div style="width: 40%; margin-bottom: 100px; margin-top: 100px;">
            <label for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input v-model="searchKhachHang" type="search" id="default-search"
                    class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Tìm kiếm khách hàng" required>
            </div>
        </div>

        <button type="button" style="padding: 20px; margin-bottom: 30px;" @click="enableAddKhachHang = true"
            class="text-white bg-gradient-to-r from-cyan-400 via-   cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Thêm
            khách hàng</button>


        <div class="flex items-center justify-center" style="flex-direction: column;">
            <h1
                class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-5xl dark:text-white">
                Danh sách khách hàng</h1>
            <div class="flex items-center justify-center " style="flex-wrap: wrap;">
                <div v-for="khachhang in filteredKhachHangs"
                    style="align-items: center; display: flex;  justify-content: center; flex-direction: column;">
                    <div class="border-solid border-2 border-sky-500"
                        style="padding: 40px; margin: 0 20px 20px 0; border-radius: 20px;">
                        <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{{ khachhang.HoTenKH }}</h2>
                        <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                            <li>
                                Mã số khách hàng: {{ khachhang.MSKH }}
                            </li>
                            <li>
                                Mật khẩu: {{ khachhang.Password }}
                            </li>
                            <li>
                                Địa chỉ: {{ khachhang.DiaChi }}
                            </li>
                            <li>
                                Số điện thoại: {{ khachhang.SoDienThoai }}
                            </li>
                        </ul>
                        <div>
                            <button type="button" @click="enableEditKhachHang = true; selectedKhachHang = khachhang"
                                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Chỉnh
                                sửa</button>
                            <button type="button" @click="enableDeleteModal = true; selectedKhachHang = khachhang"
                                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Xóa</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div id="popup-modal" tabindex="-1" v-if="enableDeleteModal"
        class="flex items-center justify-center h-screen overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button" @click="enableDeleteModal = false"
                    class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="popup-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="p-4 md:p-5 text-center">
                    <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Bạn có chắc chắn muốn xóa người
                        dùng
                        này?
                    </h3>
                    <button data-modal-hide="popup-modal" type="button" @click="removeKhachHang"
                        class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                        Xóa
                    </button>
                    <button data-modal-hide="popup-modal" type="button" @click="enableDeleteModal = false"
                        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Không,
                        hủy bỏ</button>
                </div>
            </div>
        </div>
    </div>

    <div id="addKhachHangModal" v-if="enableAddKhachHang" tabindex="-1" aria-hidden="true"
        class="flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Thêm khách hàng mới
                    </h3>
                    <button type="button" @click="enableAddKhachHang = false"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-toggle="crud-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <form action="#" class="p-4 md:p-5">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ
                                tên</label>
                            <input type="text" name="name" id="name" v-model="khachHangReq.HoTenKH"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Nhập họ và tên" required="">
                        </div>

                        <div class="col-span-2">
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật
                                khẩu</label>
                            <input type="password" name="password" id="password" v-model="khachHangReq.Password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Nhập mật khẩu" required="">
                        </div>

                        <div class="col-span-2">
                            <label for="description"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
                            <input type="text" id="description" rows="4" v-model="khachHangReq.DiaChi"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Nhập địa chỉ" required />
                        </div>

                        <div class="col-span-2">
                            <label for="Tel" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện
                                thoại</label>
                            <input type="text" name="Tel" id="Tel" v-model="khachHangReq.SoDienThoai"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Nhập số điện thoại" required="">
                        </div>




                    </div>
                    <button type="button" @click="AddKhachHang"
                        class="text-white inline-flex items-center bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                        Thêm khách hàng
                    </button>
                </form>
            </div>
        </div>
    </div>

    <div id="editKhachHangModal" v-if="enableEditKhachHang" tabindex="-1" aria-hidden="true"
        class="flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Chỉnh sửa khách hàng
                    </h3>
                    <button type="button" @click="enableEditKhachHang = false"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-toggle="crud-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <form action="#" class="p-4 md:p-5">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ
                                tên</label>
                            <input type="text" name="name" id="name" v-model="selectedKhachHang.HoTenKH"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Nhập họ và tên" required="">
                        </div>

                        <div class="col-span-2">
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật
                                khẩu</label>
                            <input type="password" name="password" id="password" v-model="selectedKhachHang.Password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Nhập mật khẩu" required="">
                        </div>

                        <div class="col-span-2">
                            <label for="description"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
                            <input type="text" id="description" rows="4" v-model="selectedKhachHang.DiaChi"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Nhập địa chỉ" required />
                        </div>

                        <div class="col-span-2">
                            <label for="Tel" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện
                                thoại</label>
                            <input type="text" name="Tel" id="Tel" v-model="selectedKhachHang.SoDienThoai"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Nhập số điện thoại" required="">
                        </div>




                    </div>
                    <button type="button" @click="EditKhachHang"
                        class="text-white inline-flex items-center bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                        Cập nhật khách hàng
                    </button>
                </form>
            </div>
        </div>
    </div>


    <div class="w-full h-full" v-if="enableSuccessMessage">
        <div id="modal-bg" class="w-full h-full bg-[#848A97] top-0 absolute hidden"></div>
        <div id="modal-box"
            class="sm:w-[385px] sm:min-w-[40vw] min-w-[80vw] min-h-[20vh] flex flex-col items-center gap-2 -translate-y-1/2 p-6 bg-[#FFFFFF] rounded-lg top-1/2 left-1/2 -translate-x-1/2 absolute">
            <svg xmlns="http://www.w3.org/2000/svg" class="text-[#059669] mx-auto h-11 rounded-full bg-[#D1FAE5] w-11"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-2xl font-medium">{{ message }}</span>
        </div>
    </div>
</template>
<script>
import chitietDatHangService from '@/services/chitietdathang.service'
import khachHangService from '@/services/khachhang.service';
import nhanVienService from '@/services/nhanvien.service'
import datHangService from '@/services/dathang.service'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            khachHangReq: {
                "MSKH": Math.ceil(Math.random() * 99999),
                "HoTenKH": "",
                "Password": "",
                "DiaChi": "",
                "SoDienThoai": ""
            },
            enableDeleteModal: false,
            enableAddKhachHang: false,
            enableEditKhachHang: false,
            enableSuccessMessage: false,
            message: "",
            searchKhachHang: "",
            selectedKhachHang: {},
            khachhangs: [],
            dathangs: [],
        }
    },
    components: {
    },
    computed: {
        filteredKhachHangs() {
            return this.khachhangs.filter(p => {
                return p.HoTenKH.toLowerCase().indexOf(this.searchKhachHang.toLowerCase()) != -1;
            });
        },
    },
    methods: {
        async getAllDatHangs() {
            try {
                this.dathangs = await datHangService.getAll();
            } catch (err) {
                console.log(err)
                this.displayError(err)
            }
        },
        async getAllKhachHang() {
            try {
                this.khachhangs = await khachHangService.getAll();
            } catch (err) {
                console.log(err)
                this.displayError(err)
            }
        },
        async removeDatHang(id, mshh) {
            try {
                await chitietDatHangService.delete(id, mshh)
                await datHangService.delete(id)
            } catch (error) {
                console.log(error)
                this.displayError(error)
            }
        },
        async removeKhachHang() {
            try {
                var id = this.selectedKhachHang.MSKH
                for (let i = 0; i < this.dathangs.length; i++) {
                    if (this.dathangs[i].MSKH == id) {
                        let ctdh = await chitietDatHangService.getOneById(this.dathangs[i].SoDonDH)
                        await datHangService.delete(this.dathangs[i].SoDonDH)
                        if (ctdh != null) {
                            let mshh = ctdh.MSHH
                            await this.removeDatHang(this.dathangs[i].SoDonDH, mshh)
                        }
                    }
                }
                await khachHangService.delete(id)
                this.message = 'Xóa khách hàng thành công'
                this.enableDeleteModal = false
                this.enableSuccessMessage = true
                await this.sleep(1000)
                this.$router.go()
            } catch (error) {
                console.log(error)
                this.displayError(error)
            }
        },
        async AddKhachHang() {
            try {
                this.validateAddKhachHang()
                await khachHangService.create(this.khachHangReq)
                this.message = 'Tạo khách hàng thành công'
                this.enableAddKhachHang = false
                this.enableSuccessMessage = true
                await this.sleep(1000)
                this.$router.go()
            } catch (error) {
                console.log(error)
                this.displayError(error)
            }
        },
        async EditKhachHang() {
            try {
                await khachHangService.update(this.selectedKhachHang, this.selectedKhachHang.MSKH)
                this.message = 'Cập nhật khách hàng thành công'
                this.enableEditKhachHang = false
                this.enableSuccessMessage = true
                await this.sleep(1000)
                this.enableSuccessMessage = false
            } catch (error) {
                console.log(error)
                this.displayError(error)
            }
        },
        async checkLogin() {
            try {
                var msnv = this.$cookies.get("MSNV");
                this.nhanvien = await nhanVienService.getOne(msnv);
                if (this.nhanvien.Password == '') throw new Error(this.nhanvien.Password)
            } catch (error) {
                this.$router.push({ name: "login" });
            }
        },
        validateAddKhachHang() {
            if (this.khachHangReq.HoTenKH == '') throw new Error('Họ tên khách hàng không được trống')
            if (this.khachHangReq.Password == 0) throw new Error('Mật khẩu khách hàng không được trống')
            if (this.khachHangReq.DiaChi == '') throw new Error('Địa chỉ khách hàng không được trống')
            if (this.khachHangReq.SoDienThoai == '') throw new Error('Số điện thoại khách hàng không được trống')
        },
        displayError(message) {
            Swal.fire({
                title: 'Lỗi!',
                text: message,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        },
        showHeaderAndFooter() {
            this.$emit("isShowHeaderAndFooter", true);
        },
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
    },
    mounted() {
        this.showHeaderAndFooter();
        this.checkLogin();
        this.getAllDatHangs()
        this.getAllKhachHang()
    }
}
</script>
<style></style>