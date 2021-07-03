function DanhSachNhanVien() {
    this.DSNV = [];

    this.themNhanVien = function (nhanVien) {
        this.DSNV.push(nhanVien);
    }
    this.tinhLuongNhanVien = function (luongCoBan, chucVu) {
        var tongLuong = 0;
        if (chucVu === 'Giám đốc') {
            tongLuong = luongCoBan * 3;
        }
        else if (chucVu === 'Trưởng phòng') {
            tongLuong = luongCoBan * 2;
        }
        else if (chucVu === 'Nhân viên') {
            tongLuong = luongCoBan * 1;
        }
        return tongLuong.toLocaleString();
    }
    this.xepLoaiNV = function (gioLam) {
        var xepLoaiNV = '';
        if (gioLam >= 192) {
            return xepLoaiNV = 'Xuất sắc';
        }
        else if (gioLam >= 172) {
            return xepLoaiNV = 'Giỏi';
        }
        else if (gioLam >= 160) {
            return xepLoaiNV = 'Khá';
        }
        else {
            return xepLoaiNV = 'Trung bình';
        }
    }
    this.timKiemNV = function (mangDSNV, chuoiTK) {
        return mangDSNV.filter(function (nv) {
            return nv.loaiNV.toLowerCase().indexOf(chuoiTK.toLowerCase()) !== - 1;
        })
    }
}

DanhSachNhanVien.prototype.timViTri = function (maNV) {
    return this.DSNV.findIndex(function (item) {
        return maNV === item.maNV;
    });
}

DanhSachNhanVien.prototype.xoaNhanVien = function (maNV) {
    var viTri = this.timViTri(maNV);
    if (viTri !== -1) {
        this.DSNV.splice(viTri, 1);
    }
}

DanhSachNhanVien.prototype.capNhatNV = function (nhanVien, viTri) {
    this.DSNV.splice(viTri, 1, nhanVien);
}

// DanhSachNhanVien.prototype.kiemTraTKNV = function (maNV) {
//     var viTri = this.timViTri(maNV);
//     if (viTri !== -1) {
//         return false;
//     }
//     else {
//         return true;
//     }
// }