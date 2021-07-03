var dsnv = new DanhSachNhanVien();
var validator = new Validator();

function getEle(id) {
    return document.getElementById(id);
}

getEle('btnThem').addEventListener('click', function () {
    getEle('btnCapNhat').style.display = 'none';
})

var hienThiDanhSachNV = function (DSNV) {
    var content = "";
    DSNV.map(function (nv, index) {
        content += `
            <tr>
                <td>${nv.maNV}</td>
                <td>${nv.hoTenNV}</td>
                <td>${nv.emailNV}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tongLuong}</td>
                <td>${nv.loaiNV}</td>
                <td>
                    <button class="btn btn-info" onclick="_capNhatNV('${nv.maNV}')">Cập Nhật</button>
                    <button class="btn btn-danger" onclick="_xoaNhanVien('${nv.maNV}')">Xoá</button>
                </td>
            </tr>
        `
    });
    getEle('tableDanhSach').innerHTML = content;
}

var setLocalStorage = function () {
    localStorage.setItem('DSNV', JSON.stringify(dsnv.DSNV));
}

var getLocalStorage = function () {
    if (localStorage.getItem('DSNV')) {
        dsnv.DSNV = JSON.parse(localStorage.getItem('DSNV'));
        hienThiDanhSachNV(dsnv.DSNV);
    }
}

getLocalStorage();

/**
 * Cập nhật nhân viên
 */
function _capNhatNV(maNV) {
    clearTb();
    var DSNV = dsnv.DSNV;
    var viTri = dsnv.timViTri(maNV);
    getEle('tknv').value = DSNV[viTri].maNV;
    getEle('name').value = DSNV[viTri].hoTenNV;
    getEle('email').value = DSNV[viTri].emailNV;
    getEle('password').value = DSNV[viTri].matKhau;
    getEle('datepicker').value = DSNV[viTri].ngayLam;
    getEle('luongCB').value = DSNV[viTri].luongCoBan;
    getEle('chucvu').value = DSNV[viTri].chucVu;
    getEle('gioLam').value = DSNV[viTri].gioLam;
    getEle('btnThem').click();
    getEle('btnCapNhat').style.display = 'block';
    getEle('btnThemNV').style.display = 'none';
    getEle('btnCapNhat').addEventListener('click', function nhanVien() {
        /**
         * Lấy giá trị người cập nhật vào.
         */
        var maNV = getEle('tknv').value;
        var hoTenNV = getEle('name').value;
        var emailNV = getEle('email').value;
        var matKhau = getEle('password').value;
        var ngayLam = getEle('datepicker').value;
        var luongCoBan = getEle('luongCB').value;
        var chucVu = getEle('chucvu').value;
        var gioLam = getEle('gioLam').value;

        /**
         * Validate input
         */
        // validatorTK();
        var isValid = true;
        var isValid = validation(isValid, maNV, hoTenNV, emailNV, matKhau, ngayLam, luongCoBan, chucVu, gioLam);
        if (!isValid) {
            return;
        }
        /**
         * Tính lương nhân viên
         */
        var tongLuong = dsnv.tinhLuongNhanVien(luongCoBan, chucVu);
        /**
         * Xếp loại nhân viên
         */
        var loaiNV = dsnv.xepLoaiNV(gioLam);
        /**
        * Khởi tạo đối tượng dsnv từ lớp đối tượng DanhSachNhanVien
        */
        var nhanVien = new NhanVien(maNV, hoTenNV, emailNV, matKhau, ngayLam, luongCoBan, chucVu, gioLam, tongLuong, loaiNV);
        dsnv.capNhatNV(nhanVien, viTri);
        hienThiDanhSachNV(dsnv.DSNV);
        setLocalStorage();
        getEle('formNV').reset();
        getEle('btnDong').click();
    })
}

/**
 * Xoá nhân viên
 */
function _xoaNhanVien(maNV) {
    dsnv.xoaNhanVien(maNV);
    hienThiDanhSachNV(dsnv.DSNV);
    setLocalStorage();
}

function validation(isValid, maNV, hoTenNV, emailNV, matKhau, ngayLam, luongCoBan, chucVu, gioLam) {
    // Tài khoản nhân viên
    isValid &= validator.kiemTraRong(maNV, 'tbTKNV', '(*) Tài khoản nhân viên không được trống')
        && validator.kiemTraKySo(maNV, 'tbTKNV', '(*) Bạn chỉ được nhập số ở đây')
        && validator.kiemTraDoDaiKyTu(maNV, 'tbTKNV', '(*) Vui lòng nhập từ 4 &#151; 6 ký số', 4, 6)
        && validator.kiemTraSo(Number(maNV), 'tbTKNV', '(*) Bạn không được nhập số thập phân');
    // Họ và tên
    isValid &= validator.kiemTraRong(hoTenNV, 'tbTen', '(*) Họ tên nhân viên không được để trống')
        && validator.kiemTraChuoi(hoTenNV, 'tbTen', '(*) Vui lòng nhập vào chuỗi');
    // Email
    isValid &= validator.kiemTraRong(emailNV, 'tbEmail', '(*) Email không được để trống')
        && validator.kiemTraEmail(emailNV, 'tbEmail', '(*) Email sai định dạng. Vui lòng nhập lại');
    // Mật khẩu
    isValid &= validator.kiemTraRong(matKhau, 'tbMatKhau', '(*) Mật khẩu không được để trống')
        && validator.kiemTraDoDaiKyTu(matKhau, 'tbMatKhau', '(*) Mật khẩu phải từ 6 &#151; 10 ký tự', 6, 10)
        && validator.kiemTraMatKhau(matKhau, 'tbMatKhau', '(*) Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặt biệt');
    // Ngày làm
    isValid &= validator.kiemTraRong(ngayLam, 'tbNgay', '(*) Ngày làm không được để trống (mm/dd/yyyy)')
    // Lương cơ bản
    isValid &= validator.kiemTraRong(luongCoBan, 'tbLuongCB', '(*) Bạn không được để lương trống')
        && validator.kiemTraKySo(luongCoBan, 'tbLuongCB', '(*) Bạn không được nhập chuỗi ở đây')
        && validator.kiemTraSo(Number(luongCoBan), 'tbLuongCB', '(*) Bạn không được nhập số thập phân')
        && validator.kiemTraDoDaiKyTu(luongCoBan, 'tbLuongCB', '(*) Bản phải nhập Lương trong khoảng 1 000 000 &#151; 20 000 000', 7, 8);
    // Chức vụ
    isValid &= validator.kiemTraRong(chucVu, 'tbChucVu', '(*) Bạn chưa chọn chức vụ');
    // Giờ làm
    isValid &= validator.kiemTraRong(gioLam, 'tbGiolam', '(*) Giờ làm không được dể trống')
        && validator.kiemTraKySo(gioLam, 'tbGiolam', '(*) Bạn không được nhập ký tự ở đây')
        && validator.kiemTraSo(Number(gioLam), 'tbGiolam', '(*) Bạn không được nhập số thập phân')
        && validator.kiemTraGioLam(Number(gioLam), 'tbGiolam', '(*) Vui lòng nhập giờ làm từ 80 &#151; 200');
    if (!isValid)
        return false;
    else
        return true;
}

/**
 * Kiểm tra tài khoản bị trùng
 */


getEle('btnThemNV').addEventListener('click', function nhanVien() {
    /**
     * clear thông báo.
     */
    clearTb();
    /**
     * Lấy giá trị người dùng nhập vào.
     */
    var maNV = getEle('tknv').value;
    var hoTenNV = getEle('name').value;
    var emailNV = getEle('email').value;
    var matKhau = getEle('password').value;
    var ngayLam = getEle('datepicker').value;
    var luongCoBan = getEle('luongCB').value;
    var chucVu = getEle('chucvu').value;
    var gioLam = getEle('gioLam').value;

    /**
     * Kiểm tra TKNV xem có bị trùng không.
     */
    // var taiKhoanNhanVien = dsnv.kiemTraTKNV(maNV);


    /**
     * Validate input
     */
    // validatorTK();
    var isValid = true;
    var isValid = validation(isValid, maNV, hoTenNV, emailNV, matKhau, ngayLam, luongCoBan, chucVu, gioLam);
    if (!isValid) {
        return;
    }
    /**
     * Tính lương nhân viên
     */
    var tongLuong = dsnv.tinhLuongNhanVien(luongCoBan, chucVu);
    /**
     * Xếp loại nhân viên
     */
    var loaiNV = dsnv.xepLoaiNV(gioLam);
    /**
    * Khởi tạo đối tượng dsnv từ lớp đối tượng DanhSachNhanVien
    */
    var nhanVien = new NhanVien(maNV, hoTenNV, emailNV, matKhau, ngayLam, luongCoBan, chucVu, gioLam, tongLuong, loaiNV);
    dsnv.themNhanVien(nhanVien);
    hienThiDanhSachNV(dsnv.DSNV);
    setLocalStorage();
    getEle('formNV').reset();
})

/**
 * Tìm kiếm nhân viên theo loại và hiển thị
 */
getEle('searchName').addEventListener('keyup', function () {
    var mangDSNV = dsnv.DSNV;
    var chuoiTK = getEle('searchName').value;
    var mangDSNVTimKiem = dsnv.timKiemNV(mangDSNV, chuoiTK);
    hienThiDanhSachNV(mangDSNVTimKiem);
})

/**
 * Clear thông báo
 */

var clearTb = function () {
    getEle('tbTKNV').innerHTML = '';
    getEle('tbTen').innerHTML = '';
    getEle('tbEmail').innerHTML = '';
    getEle('tbMatKhau').innerHTML = '';
    getEle('tbNgay').innerHTML = '';
    getEle('tbLuongCB').innerHTML = '';
    getEle('tbChucVu').innerHTML = '';
    getEle('tbGiolam').innerHTML = '';
}

// getEle('tknv').addEventListener('keyup', function validatorTK() {
//     var maNV = getEle('tknv').value;
//     var isValid = true;
//     isValid &= validator.kiemTraRong(maNV, 'tbTKNV', '(*) Tài khoản nhân viên không được trống')
//         && validator.kiemTraKySo(maNV, 'tbTKNV', '(*) Bạn chỉ được nhập số ở đây')
//         && validator.kiemTraDoDaiKyTu(maNV, 'tbTKNV', '(*) Vui lòng nhập từ 4 &#151; 6 ký số', 4, 6)
//         && validator.kiemTraSo(maNV, 'tbTKNV', '(*) Bạn không được nhập số thập phân');
// })