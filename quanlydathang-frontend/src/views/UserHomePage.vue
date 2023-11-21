<template>
  <div class="flex items-center justify-center "
    style="align-items: center; justify-content: center; text-align: center; flex-direction: column;">
    <div style="width: 40%; margin: auto; margin-top: 100px; margin-bottom: 100px;">
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input v-model="searchHangHoa" type="search" id="default-search"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Tìm kiếm hàng hóa" required>
      </div>
    </div>
    <button type="button" style="padding: 20px" @click="enableAddHangHoa = true"
      class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Thêm
      hàng hóa</button>

    <div class="flex items-center justify-center " style="display: flex; width: 100%; flex-wrap: wrap;">

      <div v-for="hanghoa in filteredHangHoas" style="margin: 50px;"
        class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div style="cursor: pointer; height: 250px; width: 250px;" href="#">
          <img style="height: 250px; width: 250px;" cldivss="rounded-t-lg" v-if="rawImg.get(hanghoa.MSHH) != null"
            :src="rawImg.get(hanghoa.MSHH).TenHinh" alt="" />
        </div>
        <div class="p-5">
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ hanghoa.TenHangHoa }}</h5>
          </a>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Mã số hàng hóa: {{ hanghoa.MSHH }}</p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ hanghoa.MoTaHH }}</p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Số lượng: {{ hanghoa.SoLuongHang }}</p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Ghi chú: {{ hanghoa.GhiChu }}</p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Giá: <span style="color: red;">{{ hanghoa.Gia
          }}</span></p>

          <div v-if="nhanvien != null">
            <button type="button" @click="enableEditHangHoa = true; selectedHangHoa = hanghoa"
              class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Chỉnh
              sửa</button>
            <button type="button" @click="enableDeleteModal = true; selectedHangHoa = hanghoa"
              class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Xóa</button>
          </div>
          <a v-else href="#"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Đặt hàng
            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div id="popup-modal" tabindex="-1" v-if="enableDeleteModal"
      class="flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button type="button" @click="enableDeleteModal = false"
            class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
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
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Bạn có chắc chắn muốn xóa sản phẩm này?
            </h3>
            <button data-modal-hide="popup-modal" type="button" @click="removeHangHoa(selectedHangHoa.MSHH)"
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
  </div>

  <div id="addHangHoaModal" v-if="enableAddHangHoa" tabindex="-1" aria-hidden="true"
    class="flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Thêm hàng hóa mới
          </h3>
          <button type="button" @click="enableAddHangHoa = false"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="crud-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
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
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên hàng hóa</label>
              <input type="text" name="name" id="name" v-model="hangHoaReq.TenHangHoa"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Nhập tên hàng hóa" required="">
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá</label>
              <input type="number" name="price" id="price" v-model="hangHoaReq.Gia"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$2999" required="">
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label for="soluong" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số lượng</label>
              <input type="number" name="price" id="soluong" v-model="hangHoaReq.SoLuongHang"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Nhập số lượng" required="">
            </div>
            <div class="col-span-2">
              <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả</label>
              <textarea id="description" rows="4" v-model="hangHoaReq.MoTaHH"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập mô tả hàng hóa" required></textarea>
            </div>

            <div class="col-span-2">
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Thêm
                hình</label>
              <input @change="uploadImage()"
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input" type="file" required>
            </div>

            <div class="col-span-2">
              <label for="GhiChu" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ghi chú</label>
              <input type="text" name="GhiChu" id="GhiChu" v-model="hangHoaReq.GhiChu"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Nhập ghi chú nếu có" required="">
            </div>


          </div>
          <button type="button" @click="AddHangHoa"
            class="text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
            <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd"></path>
            </svg>
            Thêm hàng hóa
          </button>
        </form>
      </div>
    </div>
  </div>


  <div id="editHangHoaModal" v-if="enableEditHangHoa" tabindex="-1" aria-hidden="true"
    class="flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Cập nhật hàng hóa
          </h3>
          <button type="button" @click="enableEditHangHoa = false"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="crud-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
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
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên hàng hóa</label>
              <input type="text" name="name" id="name" v-model="selectedHangHoa.TenHangHoa"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Nhập tên hàng hóa" required="">
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá</label>
              <input type="number" name="price" id="price" v-model="selectedHangHoa.Gia"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$2999" required="">
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label for="soluong" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số lượng</label>
              <input type="number" name="price" id="soluong" v-model="selectedHangHoa.SoLuongHang"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Nhập số lượng" required="">
            </div>
            <div class="col-span-2">
              <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả</label>
              <textarea id="description" rows="4" v-model="selectedHangHoa.MoTaHH"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập mô tả hàng hóa" required></textarea>
            </div>

            <div class="col-span-2">
              <label for="GhiChu" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ghi chú</label>
              <input type="text" name="GhiChu" id="GhiChu" v-model="selectedHangHoa.GhiChu"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Nhập ghi chú nếu có" required="">
            </div>


          </div>
          <button type="button" @click="EditHangHoa"
            class="text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
            <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd"></path>
            </svg>
            Cập nhật hàng hóa
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
import hinhHangHoaService from '@/services/hinhhanghoa.service';
import nhanVienService from '@/services/nhanvien.service';
import hangHoaService from '@/services/hanghoa.service';
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      message: "",
      enableSuccessMessage: false,
      enableDeleteModal: false,
      enableAddHangHoa: false,
      enableEditHangHoa: false,
      rawImg: new Map(),
      result: "",
      buttonDisabled: false,
      selectedHangHoa: {},
      selectedHinhHangHoa: {},
      nhanvien: {},
      hanghoas: [],
      hangHoaReq: {
        "MSHH": Math.ceil(Math.random() * 99999),
        "TenHangHoa": "",
        "MoTaHH": "",
        "Gia": 0,
        "SoLuongHang": 0,
        "GhiChu": "",
      },
      hinhHangHoaReq: {
        "MaHinh": Math.ceil(Math.random() * 99999),
        "MSHH": 0,
        "TenHinh": "",
      },
      searchHangHoa: "",
    }
  },
  components: {
  },
  computed: {
    filteredHangHoas() {
      return this.hanghoas.filter(p => {
        return p.TenHangHoa.toLowerCase().indexOf(this.searchHangHoa.toLowerCase()) != -1;
      });
    },

  },
  methods: {
    uploadImage() {
      const file = document.querySelector('#file_input').files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        this.result = reader.result;
      }
      reader.readAsDataURL(file);
    },
    async AddHangHoa() {
      try {
        this.validateAddHangHoa()
        await hangHoaService.create(this.hangHoaReq)
        this.hinhHangHoaReq.MSHH = this.hangHoaReq.MSHH
        this.hinhHangHoaReq.TenHinh = this.result
        await hinhHangHoaService.create(this.hinhHangHoaReq)
        this.message = 'Tạo hàng hóa thành công'
        this.enableAddHangHoa = false
        this.enableSuccessMessage = true
        await this.sleep(1000)
        this.$router.go()
      } catch (err) {
        console.log(err)
        this.displayError(err)
      }
    },
    async EditHangHoa() {
      try {
        await hangHoaService.update(this.selectedHangHoa, this.selectedHangHoa.MSHH)
        this.message = 'Cập nhật hàng hóa thành công'
        this.enableEditHangHoa = false
        this.enableSuccessMessage = true
        await this.sleep(1000)
        this.enableSuccessMessage = false
      } catch (error) {
        console.log(error)
        this.displayError(error)
      }
    },
    async EditHinhHangHoa() {
      try {
        this.selectedHinhHangHoa.TenHinh = this.result
        await hinhHangHoaService.update(this.selectedHinhHangHoa, this.selectedHinhHangHoa.MaHinh)
        this.displaySuccess("Cập nhật hình hàng hóa thành công")
        this.enableDeleteModal = false
        this.enableSuccessMessage = true
        await this.sleep(1000)
        this.$router.go()
      } catch (error) {
        console.log(error)
        this.displayError(error)
      }
    },
    async removeHangHoa(id) {
      try {
        this.message = 'Xóa hàng hóa thành công'
        await chiTietDatHangService.deleteByMSHH(id)
        await hinhHangHoaService.deleteByMSHH(id)
        await hangHoaService.delete(id)
        this.enableDeleteModal = false
        this.enableSuccessMessage = true
        await this.sleep(1000)
        this.$router.go()
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
        this.hanghoas.forEach(async (hanghoa) => {
          var img = await this.getHinhHangHoa(hanghoa.MSHH)
          this.rawImg.set(hanghoa.MSHH, img)
        })
      } catch (err) {
        console.log(err)
        this.displayError(err)
      }
    },
    async getHinhHangHoa(MSHH) {
      try {
        let hinh = await hinhHangHoaService.getAllByMSHH(MSHH)
        return hinh[0]
      } catch (error) {
        return null
      }
    },
    validateAddHangHoa() {
      if (this.hangHoaReq.TenHangHoa == '') throw new Error('Tên hàng hóa không được trống')
      if (this.hangHoaReq.Gia == 0) throw new Error('Giá hàng hóa phải lớn hơn 0')
      if (this.hangHoaReq.SoLuongHang == '') throw new Error('Số lượng hàng hóa phải lớn hơn 0')
      if (this.hangHoaReq.MoTaHH == '') throw new Error('Mô tả hàng hóa không được trống')
      if (this.result == '') throw new Error('Hình hàng hóa không được trống')

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
    this.getAllHangHoa();
  }
}
</script>

<style></style>