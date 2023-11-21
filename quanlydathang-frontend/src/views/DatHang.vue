<template>
    <div class="flex items-center justify-center" style="flex-direction: column;">

        <div style="width: 40%; margin: auto; margin-top: 100px; margin-bottom: 100px;">
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
                <input v-model="searchChiTietDatHang" type="search" id="default-search"
                    class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Tìm kiếm đơn hàng" required>
            </div>
        </div>

        <button type="button" style="padding: 20px; margin-bottom: 30px;" @click="enableAddDatHang = true"
            :disabled="khachhangs.length == 0"
            class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Thêm
            đơn hàng</button>


        <div class="flex items-center justify-center" style="flex-direction: column;">
            <h1
                class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-5xl dark:text-white">
                Danh sách đơn hàng</h1>
            <div class="flex items-center justify-center ">
                <div v-for="ctdh in filteredChiTietDatHangs"
                    style="align-items: center; display: flex; flex-direction: column; justify-content: center; margin-bottom: 20px;">
                    <a href="#"
                        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ ctdh.SoDonDH }}
                        </h5>

                        <p v-if="dathangs.get(ctdh.SoDonDH) != null" class="font-normal text-gray-700 dark:text-gray-400">Mã
                            số khách hàng:
                            {{ dathangs.get(ctdh.SoDonDH).MSKH }}</p>

                        <p v-if="dathangs.get(ctdh.SoDonDH) != null" class="font-normal text-gray-700 dark:text-gray-400">
                            Mã
                            số nhân viên:
                            {{ dathangs.get(ctdh.SoDonDH).MSNV }} </p>

                        <p v-if="dathangs.get(ctdh.SoDonDH) != null" class="font-normal text-gray-700 dark:text-gray-400">
                            Ngày đặt:
                            {{ dathangs.get(ctdh.SoDonDH).NgayDH }}</p>

                        <p v-if="dathangs.get(ctdh.SoDonDH) != null" class="font-normal text-gray-700 dark:text-gray-400">
                            Ngày giao:
                            {{ dathangs.get(ctdh.SoDonDH).NgayGH }}</p>

                        <p class="font-normal text-gray-700 dark:text-gray-400">Mã số hàng hóa: {{ ctdh.MSHH }}</p>
                        <p class="font-normal text-gray-700 dark:text-gray-400">Số lượng: {{ ctdh.SoLuong }}</p>
                        <p class="font-normal text-gray-700 dark:text-gray-400">Giá Đặt Hàng: {{ ctdh.GiaDatHang }}</p>
                        <p class="font-normal text-gray-700 dark:text-gray-400">Giảm giá: {{ ctdh.GiamGia }}</p>
                        <p v-if="dathangs.get(ctdh.SoDonDH) != null" class="font-normal text-gray-700 dark:text-gray-400">
                            Trạng thái:
                            <span style="color: red;">{{ dathangs.get(ctdh.SoDonDH).TrangThaiDH }}</span>
                        </p>


                        <div>
                            <button type="button"
                                @click="enableEditDatHang = true; selectedDathang = dathangs.get(ctdh.SoDonDH);"
                                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Chỉnh
                                sửa</button>
                            <button type="button" @click="enableDeleteModal = true; selectedCTDH = ctdh;"
                                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Xóa</button>
                        </div>
                    </a>
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
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Bạn có chắc chắn muốn xóa đơn hàng
                        này?
                    </h3>
                    <button data-modal-hide="popup-modal" type="button" @click="removeDatHang()"
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

    <div id="addDatHangModal" v-if="enableAddDatHang" tabindex="-1" aria-hidden="true"
        class="flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Thêm đơn hàng mới
                    </h3>
                    <button type="button" @click="enableAddDatHang = false"
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
                            <label for="mshh" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã số
                                hàng hóa</label>
                            <select id="mshh" v-model="ctdhReq.MSHH"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option v-for="hanghoa in hanghoas" :value="hanghoa.MSHH">{{ hanghoa.MSHH }} - {{
                                    hanghoa.TenHangHoa }}</option>
                            </select>
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                            <label for="mskh" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã số
                                khách hàng</label>
                            <select id="mskh" v-model="datHangReq.MSKH"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option v-for="khachhang in khachhangs" :value="khachhang.MSKH">{{ khachhang.MSKH }} - {{
                                    khachhang.HoTenKH }}</option>
                            </select>
                        </div>


                        <div class="col-span-2 sm:col-span-1">
                            <label for="soluong" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số
                                lượng</label>
                            <input type="number" name="soluong" id="soluong" v-model="ctdhReq.SoLuong"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Nhập số lượng" required="">
                        </div>

                        <div class="col-span-2 sm:col-span-1">
                            <label for="Gia" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá đặt
                                hàng</label>
                            <input type="number" name="Gia" id="Gia" v-model="ctdhReq.GiaDatHang"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="$2999" required="">
                        </div>


                        <div class="col-span-2 sm:col-span-1">
                            <label for="giam" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giảm
                                giá</label>
                            <input type="number" name="giam" id="giam" v-model="ctdhReq.GiamGia"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="$2999" required="">
                        </div>

                        <div class="col-span-2">
                            <label for="ngaydh" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày
                                đặt hàng: </label>
                            <input type="date" name="ngaydh" id="ngaydh" v-model="datHangReq.NgayDH"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Nhập đặt" required="">
                        </div>

                        <div class="col-span-2">
                            <label for="ngaygh" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày
                                giao hàng: </label>
                            <input type="date" name="ngaygh" id="ngaygh" v-model="datHangReq.NgayGH"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Ngày giao" required="">
                        </div>

                        <div>
                            <label for="countries"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trạng thái</label>
                            <select id="countries" v-model="datHangReq.TrangThaiDH"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option v-for="ttdh in TTDH" :value="ttdh">{{ ttdh }}</option>
                            </select>

                        </div>

                    </div>
                    <button type="button" @click="AddDatHang"
                        class="text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                        Thêm đơn hàng
                    </button>
                </form>
            </div>
        </div>
    </div>

    <div id="editDatHangModal" v-if="enableEditDatHang" tabindex="-1" aria-hidden="true"
        class="flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Chỉnh sửa đơn hàng
                    </h3>
                    <button type="button" @click="enableEditDatHang = false"
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
                            <label for="ngaygh" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày
                                giao hàng: </label>
                            <input type="date" name="ngaygh" id="ngaygh" v-model="selectedDathang.NgayGH"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Ngày giao" required="">
                        </div>

                        <div>
                            <label for="countries"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trạng thái</label>
                            <select id="countries" v-model="selectedDathang.TrangThaiDH"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option v-for="ttdh in TTDH" :value="ttdh">{{ ttdh }}</option>
                            </select>

                        </div>

                    </div>
                    <button type="button" @click="EditDatHang"
                        class="text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                        Cập nhật đơn hàng
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
import chiTietDatHangService from '@/services/chitietdathang.service';
import khachHangService from '@/services/khachhang.service';
import nhanVienService from '@/services/nhanvien.service';
import hangHoaService from '@/services/hanghoa.service';
import datHangService from '@/services/dathang.service';
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
            TTDH: [
                "Đã đặt",
                "Đã giao",
                "Đã hủy",
            ],
            ctdhReq: {
                "SoDonDH": 0,
                "MSHH": 0,
                "SoLuong": 0,
                "GiaDatHang": 0,
                "GiamGia": 0,
            },
            datHangReq: {
                "SoDonDH": Math.ceil(Math.random() * 99999),
                "MSKH": 0,
                "MSNV": 0,
                "NgayDH": new Date(),
                "NgayGH": new Date(),
                "TrangThaiDH": "Đã đặt"
            },
            message: "",
            ctdhs: [],
            dathangs: new Map(),
            enableDeleteModal: false,
            searchChiTietDatHang: "",
            selectedCTDH: {},
            khachhangs: [],
            enableAddDatHang: false,
            enableEditDatHang: false,
            enableSuccessMessage: false,
        }
    },
    components: {
    },
    computed: {
        filteredChiTietDatHangs() {
            return this.ctdhs.filter(p => {
                return p.SoDonDH.toString().toLowerCase().indexOf(this.searchChiTietDatHang.toLowerCase()) != -1;
            });
        },
    },
    methods: {
        async getAllKhachHang() {
            try {
                this.khachhangs = await khachHangService.getAll();
                this.datHangReq.MSKH = this.khachhangs[0].MSKH
            } catch (err) {
                console.log(err)
                this.displayError(err)
            }
        },
        async getAllDatHang() {
            try {
                this.ctdhs = await chiTietDatHangService.getAll();
                this.ctdhs.forEach(async (element) => {
                    let dathang = await datHangService.getOne(element.SoDonDH);
                    this.dathangs.set(element.SoDonDH, dathang)
                });
            } catch (err) {
                console.log(err)
                this.displayError(err)
            }
        },
        async removeDatHang() {
            try {
                var id = this.selectedCTDH.SoDonDH;
                var mshh = this.selectedCTDH.MSHH;
                await chiTietDatHangService.delete(id, mshh)
                await datHangService.delete(id)
                this.message = 'Xóa đặt hàng thành công'
                this.enableDeleteModal = false
                this.enableSuccessMessage = true
                await this.sleep(1000)
                this.$router.go()
            } catch (error) {
                console.log(error)
                this.displayError(error)
            }
        },
        async AddDatHang() {
            try {
                this.validateAddDatHang()
                this.datHangReq.NgayGH = this.datHangReq.NgayGH.slice(0, 10)
                this.datHangReq.NgayDH = this.datHangReq.NgayDH.slice(0, 10)

                let hanghoa = await hangHoaService.getOne(this.ctdhReq.MSHH)
                if (hanghoa.SoLuongHang < this.ctdhReq.SoLuong)
                    throw new Error("Số lượng hàng hóa đặt phải nhỏ hơn hoặc bằng số lượng hàng hóa trong kho")
                else {
                    hanghoa.SoLuongHang = hanghoa.SoLuongHang - this.ctdhReq.SoLuong
                    await hangHoaService.update(hanghoa, hanghoa.MSHH)
                }
                this.datHangReq.MSNV = this.nhanvien.MSNV
                await datHangService.create(this.datHangReq)

                this.ctdhReq.SoDonDH = this.datHangReq.SoDonDH
                await chiTietDatHangService.create(this.ctdhReq)

                this.message = "Tạo đơn đặt hàng thành công"
                this.enableAddDatHang = false
                this.enableSuccessMessage = true
                await this.sleep(1000)
                this.$router.go()
            } catch (error) {
                console.log(error)
                this.displayError(error)
            }
        },
        async EditDatHang() {
            try {
                if (this.selectedDathang.NgayDH > this.selectedDathang.NgayGH) throw new Error("Ngày giao hàng phải lớn hơn ngày đặt hàng")
                this.selectedDathang.NgayGH = this.selectedDathang.NgayGH.slice(0, 10)
                await datHangService.update(this.selectedDathang, this.selectedDathang.SoDonDH)

                this.message = "Cập nhật đặt hàng thành công"
                this.enableEditDatHang = false
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
        async getAllHangHoa() {
            try {
                this.hanghoas = await hangHoaService.getAll();
                if (this.hanghoas.length > 0) this.ctdhReq.MSHH = this.hanghoas[0].MSHH
            } catch (err) {
                console.log(err)
                this.displayError(err)
            }
        },
        validateAddDatHang() {
            if (this.ctdhReq.SoLuong == 0) throw new Error('Số lượng phải lớn hơn 0')
            if (this.ctdhReq.GiaDatHang == 0) throw new Error('Giá phải lớn hơn 0')
            if (this.datHangReq.NgayDH > this.datHangReq.NgayGH) throw new Error('Ngày đặt hàng phải nhỏ hơn ngày giao hàng')
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
        this.getAllDatHang();
        this.getAllKhachHang();
        this.getAllHangHoa();
    }
}
</script>
<style></style>