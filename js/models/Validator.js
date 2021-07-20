function Validator() {
    // Validator theo đề bài câu 4
    this.kiemTraRong = function (value, showPlace, mess) {
        if (!value) {
            debugger;
            getEle(showPlace).style.display = 'block';
            getEle(showPlace).innerHTML = mess;
            return false;
        }
        else {
            getEle(showPlace).style.display = 'none';
            getEle(showPlace).innerHTML = '';
            return true;
        }
    }
    this.kiemTraKySo = function (value, showPlace, mess) {
        if (!isNaN(value)) {
            getEle(showPlace).style.display = 'none';
            getEle(showPlace).innerHTML = '';
            return true;
        }
        else {
            getEle(showPlace).style.display = 'block';
            getEle(showPlace).innerHTML = mess;
            return false;
        }
    }
    this.kiemTraDoDaiKyTu = function (value, showPlace, mess, min, max) {
        if (value.length >= min && value.length <= max) {
            getEle(showPlace).style.display = 'none';
            getEle(showPlace).innerHTML = '';
            return true;
        }
        else {
            getEle(showPlace).style.display = 'block';
            getEle(showPlace).innerHTML = mess;
            return false;
        }
    }
    this.kiemTraChuoi = function (value, showPlace, mess) {
        var patternString = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +

            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +

            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$");
        if (patternString.test(value)) {
            getEle(showPlace).style.display = 'none';
            getEle(showPlace).innerHTML = '';
            return true;
        }
        else {
            getEle(showPlace).style.display = 'block';
            getEle(showPlace).innerHTML = mess;
            return false;
        }
    }
    this.kiemTraEmail = function (value, showPlace, mess) {
        var patternEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        if (patternEmail.test(value)) {
            getEle(showPlace).style.display = 'none';
            getEle(showPlace).innerHTML = '';
            return true;
        }
        else {
            getEle(showPlace).style.display = 'block';
            getEle(showPlace).innerHTML = mess;
            return false;
        }
    }
    this.kiemTraMatKhau = function (value, showPlace, mess) {
        var patternPass = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])");
        if (patternPass.test(value)) {
            getEle(showPlace).style.display = 'none';
            getEle(showPlace).innerHTML = '';
            return true;
        }
        else {
            getEle(showPlace).style.display = 'block';
            getEle(showPlace).innerHTML = mess;
            return false;
        }
    }
    this.kiemTraGioLam = function (value, showPlace, mess) {
        if (value >= 80 && value <= 200) {
            getEle(showPlace).style.display = 'none';
            getEle(showPlace).innerHTML = '';
            return true;
        }
        else {
            getEle(showPlace).style.display = 'block';
            getEle(showPlace).innerHTML = mess;
            return false;
        }
    }

    // Validator thêm
    this.kiemTraSo = function (value, showPlace, mess) {
        if (Number.isInteger(value)) {
            getEle(showPlace).style.display = 'none';
            getEle(showPlace).innerHTML = '';
            return true;
        }
        else {
            getEle(showPlace).style.display = 'block';
            getEle(showPlace).innerHTML = mess;
            return false;
        }
    }
    // this.kiemTraTaiKhoan = function (value, showPlace, mess) {
    //     if (value) {
    //         getEle(showPlace).style.display = 'none';
    //         getEle(showPlace).innerHTML = '';
    //         return true;
    //     }
    //     else {
    //         getEle(showPlace).style.display = 'block';
    //         getEle(showPlace).innerHTML = mess;
    //         return false;
    //     }
    // }

}