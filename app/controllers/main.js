// crud <=> create read update delete

// console.log(axios());
console.log("http://loremflickr.com/640/480/technics");

const BASE_URL = "https://6271e18825fed8fcb5ec0d68.mockapi.io";

document.getElementById("btn_update").style.display = "none";

////////////////////////////////////////// Loading

const turnOnLoading = function () {
  document.getElementById("loading").style.display = "flex";
};

const turnOffLoading = function () {
  document.getElementById("loading").style.display = "none";
};

////////////////////////////////////////// Lay danh sach san pham
const renderDanhSachSanPhamService = function () {
  turnOnLoading();
  axios({
    // url: "https://6271e18825fed8fcb5ec0d68.mockapi.io/san-pham",
    url: `${BASE_URL}/san-pham`,
    method: "GET",
  })
    .then(function (response) {
      xuatDanhSachSanPham(response.data);
      turnOffLoading();
    })
    .catch(function (error) {
      turnOffLoading();
    });
};
renderDanhSachSanPhamService();

////////////////////////////////////////// Xoa san pham
const xoaSanPhamService = function (id) {
  console.log("id", id);
  turnOnLoading();
  axios({
    // url: `https://6271e18825fed8fcb5ec0d68.mockapi.io/san-pham/${id}`,
    url: `${BASE_URL}/san-pham/${id}`,
    method: "DELETE",
  })
    .then(function (response) {
      renderDanhSachSanPhamService();
      turnOffLoading();
    })
    .catch(function (error) {});
};

const xuatDanhSachSanPham = function (dssp) {
  var contentHTML = "";
  dssp.forEach(function (item) {
    var contentTr = /* html */ `<tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td><img src="${item.imgUrl}" alt="" style="width:150px"></td>
        <td>${item.type ? "Laptop" : "Điện thoại"}</td>
        <td><button type="button" class="btn btn-success" data-toggle="modal"
        data-target="#myModal"
        onClick=layThongTinSanPham(${item.id})
        >Sửa</button>
        <button type="button" class="btn btn-danger" onClick=xoaSanPhamService(${
          item.id
        })>Xóa</button></td>
        </tr>`;
    contentHTML += contentTr;
  });
  document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
};

//then -> xử lý thành công
//catch -> xử lý thất bại

const layThongTinTuForm = function () {
  var tenSp = document.getElementById("TenSP").value;
  var giaSp = document.getElementById("GiaSP").value * 1;
  var hinhAnhSp = document.getElementById("HinhSP").value;
  var loaiSp = document.getElementById("loaiSP").value * 1;
  loaiSp = loaiSp == 1 ? true : false;
  return new SanPham(tenSp, giaSp, hinhAnhSp, loaiSp == 1 ? true : false);
};

//Thêm mới sản phẩm
const themMoiSp = function () {
  turnOnLoading();
  var newSp = layThongTinTuForm();
  axios({
    url: `${BASE_URL}/san-pham`,
    method: "POST",
    data: newSp,
  })
    .then(function (response) {
      $("#myModal").modal("hide");
      renderDanhSachSanPhamService();
      turnOffLoading();
    })
    .catch(function (error) {
      turnOffLoading();
    });
};

//Lấy thông tin sản phẩm theo ID

var layThongTinSanPham = function (id) {
  document.getElementById("btn_add").style.display = "none";
  document.getElementById("btn_update").style.display = "block";

  axios({
    url: `${BASE_URL}/san-pham/${id}`,
    method: "GET",
  })
    .then(function (response) {
      renderThongTinLenForm(response.data);
      document.querySelector("#idSp span").innerHTML = response.data.id;
    })
    .catch(function (err) {
      console.log(err);
    });
  console.log("id", { id });
};

//cập nhật sản phẩm

const capNhatSp = function () {
  turnOnLoading();
  var updatedSp = layThongTinTuForm();
  var idSp = document.querySelector("#idSp span").innerHTML * 1;
  axios({
    url: `${BASE_URL}/san-pham/${idSp}`,
    method: "PUT",
    data: updatedSp,
  })
    .then(function (response) {
      $("#myModal").modal("hide");
      renderDanhSachSanPhamService();
      turnOffLoading();
    })
    .catch(function (err) {
      console.log(err);
    });
};

var renderThongTinLenForm = function (sanPham) {
  document.getElementById("TenSP").value = sanPham.name;
  document.getElementById("GiaSP").value = sanPham.price;
  document.getElementById("HinhSP").value = sanPham.imgUrl;
  document.getElementById("loaiSP").value = sanPham.type ? 1 : 0;
};
