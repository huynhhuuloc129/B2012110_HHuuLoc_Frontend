<template>
    <div v-if="this.nhanvien.ChucVu == 'Quản lý'" class="flex items-center justify-center" style="flex-direction: column;">
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
                <input v-model="searchNhanVien" type="search" id="default-search"
                    class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Tìm kiếm nhân viên" required>
            </div>
        </div>

        <button type="button" style="padding: 20px; margin-bottom: 30px;" @click="enableAddNhanVien = true"
            class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Thêm
            nhân viên</button>


        <div class="flex items-center justify-center" style="flex-direction: column;">
            <h1
                class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-5xl dark:text-white">
                Danh sách nhân viên</h1>
            <div class="flex items-center justify-center " style="flex-wrap: wrap;">
                <div v-for="nhanvien in filteredNhanViens"
                    style="align-items: center; display: flex;  justify-content: center; flex-direction: column;">
                    <div class="border-solid border-2 border-purple-500"
                        style="padding: 40px; margin: 0 20px 20px 0; border-radius: 20px;">
                        <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{{ nhanvien.HoTenNV }}</h2>
                        <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                            <li>
                                Mã số nhân viên: {{ nhanvien.MSNV }}
                            </li>
                            <li>
                                Mật khẩu: {{ nhanvien.Password }}
                            </li>
                            <li>
                                Địa chỉ: {{ nhanvien.DiaChi }}
                            </li>
                            <li>
                                Số điện thoại: {{ nhanvien.SoDienThoai }}
                            </li>
                            <li>
                                Chức vụ: {{ nhanvien.ChucVu }}
                            </li>
                        </ul>
                        <div>
                            <button type="button" @click="enableEditNhanVien = true; selectedNhanVien = nhanvien"
                                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Chỉnh
                                sửa</button>
                            <button type="button" @click="enableDeleteModal = true; selectedNhanVien = nhanvien"
                                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Xóa</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div v-else style="text-align: center;">
        <h1
            class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
            Bạn không có quyền admin</h1>
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
                        dùng này? </h3>
                    <button data-modal-hide="popup-modal" type="button" @click="removeNhanVien"
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

    <div id="addKhachHangModal" v-if="enableAddNhanVien" tabindex="-1" aria-hidden="true"
        class="flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Thêm nhân viên mới
                    </h3>
                    <button type="button" @click="enableAddNhanVien = false"
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
                            <input type="text" name="name" id="name" v-model="NhanVienReq.HoTenNV"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Nhập họ và tên" required="">
                        </div>

                        <div class="col-span-2">
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật
                                khẩu</label>
                            <input type="password" name="password" id="password" v-model="NhanVienReq.Password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Nhập mật khẩu" required="">
                        </div>

                        <div class="col-span-2">
                            <label for="description"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
                            <input type="text" id="description" rows="4" v-model="NhanVienReq.DiaChi"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Nhập địa chỉ" required />
                        </div>

                        <div class="col-span-2">
                            <label for="Tel" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện
                                thoại</label>
                            <input type="text" name="Tel" id="Tel" v-model="NhanVienReq.SoDienThoai"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Nhập số điện thoại" required="">
                        </div>

                        <div class="col-span-2">
                            <label for="chucvu" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chức
                                vụ</label>
                            <select id="chucvu" v-model="NhanVienReq.ChucVu"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option v-for="cv in ChucVus" :value="cv">{{ cv }}</option>
                            </select>
                        </div>

                    </div>
                    <button type="button" @click="AddNhanVien"
                        class="text-white inline-flex items-center bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                        Thêm nhân viên
                    </button>
                </form>
            </div>
        </div>
    </div>

    <div id="editNhanVienModal" v-if="enableEditNhanVien" tabindex="-1" aria-hidden="true"
        class="flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Chỉnh sửa nhân viên
                    </h3>
                    <button type="button" @click="enableEditNhanVien = false"
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
                            <input type="text" name="name" id="name" v-model="selectedNhanVien.HoTenNV"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Nhập họ và tên" required="">
                        </div>

                        <div class="col-span-2">
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật
                                khẩu</label>
                            <input type="password" name="password" id="password" v-model="selectedNhanVien.Password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Nhập mật khẩu" required="">
                        </div>

                        <div class="col-span-2">
                            <label for="description"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
                            <input type="text" id="description" rows="4" v-model="selectedNhanVien.DiaChi"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Nhập địa chỉ" required />
                        </div>

                        <div class="col-span-2">
                            <label for="Tel" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện
                                thoại</label>
                            <input type="text" name="Tel" id="Tel" v-model="selectedNhanVien.SoDienThoai"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Nhập số điện thoại" required="">
                        </div>

                        <div class="col-span-2">
                            <label for="chucvu" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chức
                                vụ</label>
                            <select id="chucvu" v-model="selectedNhanVien.ChucVu"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option v-for="cv in ChucVus" :value="cv">{{ cv }}</option>
                            </select>
                        </div>

                    </div>
                    <button type="button" @click="EditNhanVien"
                        class="text-white inline-flex items-center bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                        Cập nhật nhân viên
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
import nhanVienService from '@/services/nhanvien.service'
import datHangService from '@/services/dathang.service'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            selectedNhanVien: {},
            nhanviens: [],
            nhanvien: {},
            NhanVienReq: {
                "MSNV": Math.ceil(Math.random() * 99999),
                "HoTenNV": "",
                "Password": "",
                "DiaChi": "",
                "SoDienThoai": "",
                "ChucVu": "Nhân viên",
            },
            enableDeleteModal: false,
            enableAddNhanVien: false,
            enableEditNhanVien: false,
            enableSuccessMessage: false,
            message: "",
            searchNhanVien: "",
            selectedNhanVien: {},
            dathangs: [],
            ChucVus: [
                "Nhân viên",
                "Quản lý"
            ],
        }
    },
    components: {
    },
    computed: {
        filteredNhanViens() {
            return this.nhanviens.filter(p => {
                return p.HoTenNV.toLowerCase().indexOf(this.searchNhanVien.toLowerCase()) != -1 && p.MSNV != this.nhanvien.MSNV;
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
        async removeDatHang(id, mshh) {
            try {
                await chitietDatHangService.delete(id, mshh)
                await datHangService.delete(id)
            } catch (error) {
                console.log(error)
                this.displayError(error)
            }
        },
        async removeNhanVien() {
            try {
                var id = this.selectedNhanVien.MSNV
                for (let i = 0; i < this.dathangs.length; i++) {
                    if (this.dathangs[i].MSNV == id) {
                        let ctdh = await chitietDatHangService.getOneById(this.dathangs[i].SoDonDH)
                        await datHangService.delete(this.dathangs[i].SoDonDH)
                        if (ctdh != null) {
                            let mshh = ctdh.MSHH
                            await this.removeDatHang(this.dathangs[i].SoDonDH, mshh)
                        }
                    }
                }
                await nhanVienService.delete(id)
                this.message = 'Xóa nhân viên thành công'
                this.enableDeleteModal = false
                this.enableSuccessMessage = true
                await this.sleep(1000)
                this.$router.go()
            } catch (error) {
                console.log(error)
                this.displayError(error)
            }
        },
        async getAllNhanVien() {
            try {
                this.nhanviens = await nhanVienService.getAll();
            } catch (err) {
                console.log(err)
                this.displayError(err)
            }
        },
        async AddNhanVien() {
            try {
                this.validateAddNhanVien(this.NhanVienReq)
                this.message = 'Tạo nhân viên thành công'
                await nhanVienService.create(this.NhanVienReq)
                this.enableAddNhanVien = false
                this.enableSuccessMessage = true
                await this.sleep(1000)
                this.$router.go()
            } catch (error) {
                console.log(error)
                this.displayError(error)
            }
        },
        async EditNhanVien() {
            try {
                this.validateAddNhanVien(this.selectedNhanVien)
                await nhanVienService.update(this.selectedNhanVien, this.selectedNhanVien.MSNV)
                this.message = 'Cập nhật nhân viên thành công'
                this.enableEditNhanVien = false
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
        validateAddNhanVien(NhanVienReq) {
            if (NhanVienReq.HoTenNV == '') throw new Error('Họ tên nhân viên không được trống')
            if (NhanVienReq.Password == 0) throw new Error('Mật khẩu nhân viên không được trống')
            if (NhanVienReq.DiaChi == '') throw new Error('Địa chỉ nhân viên không được trống')
            if (NhanVienReq.SoDienThoai == '') throw new Error('Số điện thoại nhân viên không được trống')
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
        this.getAllNhanVien()
    }
}
</script>
<style></style>