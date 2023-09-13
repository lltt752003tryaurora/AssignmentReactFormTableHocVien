import React, { Component } from "react";
import TableUser from "./TableUser";
import { connect } from "react-redux";

class Form extends Component {
  // vì dữ liệu luôn thay đổi khi được user nhập vào các form nên ta cần một state để lưu trữ lại
  state = {
    values: {
      id: "",
      name: "",
      sdt: "",
      email: "",
    },
    // thông báo lỗi
    errors: {
      id: "",
      name: "",
      sdt: "",
      email: "",
    },
    isSubmit: true,
  };

  // các sự kiện liên quan ta nên đặt chữ handle
  handleSubmit = (event) => {
    console.log(this.props);
    // gọi preventDefault để ngăn chặn reload lại trang khi submit
    event.preventDefault();
    // dispatch thêm học viên
    this.props.setArrHocVien(this.state.values);
    document.getElementById("hocvienForm").reset();
    this.setState({
      isSubmit: true,
    });
  };

  // những hàm định dạng check định dạng sẽ bỏ riêng ra ở file Utility
  checkDinhDangSdt = (phone) => {
    const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    return regexPhoneNumber.test(phone) ? true : false;
  };

  checkDinhDangEmail = (email) => {
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regexEmail.test(email) ? true : false;
  };

  /*CÁCH 3: sự kiện dùng chung cho các sự kiện onChange dựa vào việc sử dụng event.target */
  handleChange = (event) => {
    // bóc tách phần tử các thẻ value, name từ đó lợi dụng giá trị của 2 thẻ này
    const { value, name } = event.target;
    /* ta gán clone như vậy để khi muốn thay đổi this.state.values thì ta chỉ cần thay đổi newValues
    do tính chất tham chiếu, và clone như vậy để giữ lại các dữ liệu cũ khác
    */
    const newValues = { ...this.state.values };
    // cập nhật dữ liệu mới name ở trong newValues[name] mang giá trị trùng với các thuộc tính
    newValues[name] = value;

    // kiểm tra xem dữ liệu có rỗng hay không
    // kiểm tra xem đúng định dang sđt,email
    // kiểm tra không có lỗi nào hết thì mở nút thêm

    // Nơi xử lí các lỗi
    const newErrors = { ...this.state.errors };

    // check đk không bị lỗi gì cắt thì mở nút
    // sử dụng vòng lặp for...in để kiểm tra hết các thuộc tính trong values
    // for...in trả về tên những thuộc tính trong obj được xét
    let isActive = true;
    //  check phát hiện lỗi ở newValues có rỗng ko
    let phathienLoi = false;
    for (let key in newValues) {
      if (newValues[key] === "") {
        /* check phát hiện lỗi qua từng key thì nếu thấy 1 lỗi thì trả về true 
        coi như là đã có lỗi
        */
        // nếu input rỗng thì ko làm gì cả
        phathienLoi = true;
        break;
      }
    }

    // dùng newValues để kiểm tra xem input đã có dữ liệu hay chưa ?
    if (newValues[name] === "") {
      newErrors[name] = "Vui lòng không để trống";
    } else if (newValues[name] !== "") {
      newErrors[name] = "";
    }

    // check sđt đúng hay sai, nhớ bọc ngoài trường hợp khác rỗng
    if (newValues[name] !== "") {
      if (name === "sdt" && !this.checkDinhDangSdt(newValues[name])) {
        newErrors.sdt = "Định dạng sđt không đúng";
        phathienLoi = true;
      } else {
        // khi đúng thì ta trả về chuỗi rỗng để khi sai ko bị đè nội dung
        newErrors.sdt = "";
      }
      if (name === "email" && !this.checkDinhDangEmail(newValues[name])) {
        newErrors.email = "Định dạng email không đúng";
        phathienLoi = true;
      } else {
        newErrors.email = "";
      }
    }

    // nếu true thì nút ko mở được
    isActive = isActive && phathienLoi;
    this.setState({
      values: newValues,
      errors: newErrors,
      isSubmit: isActive,
    });
  };

  render() {
    // console.log("props: ", this.props);
    // console.log(this.state.values);
    return (
      <div>
        {/* id,name,sdt,email,diemToan,diemLy,diemHoa */}
        {/* onClick ==> Dom tới và lấy dữ liệu
        - Trên react ta ko dùng oninput để lấy dữ liệu user nhập đến đâu 
        lấy đến đó mà sử dụng onChange để lấy dữ liệu user nhập 
        đến đâu lấy đến đó. (onChange ở javascript thì khi user ko còn focus,
        hay click chuột ra bên ngoài thì mới lấy dữ liệu từ input được)
        */}
        <h1 className="container bg-secondary text-white p-3">
          Thông tin sinh viên
        </h1>
        <div className="container">
          <form id="hocvienForm" onSubmit={this.handleSubmit}>
            {/* Để onSubmit ở form, để khi user nhập xong có thói quen ấn nút enter thì lấy dữ liệu luôn */}
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">
                    Mã số sinh viên
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="id"
                    aria-describedby="helpId"
                    onChange={this.handleChange}
                    id="id"
                  />
                  <p className="text-danger mt-2">{this.state.errors.id}</p>
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">
                    Họ tên
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    aria-describedby="helpId"
                    onChange={this.handleChange}
                    id="name"
                  />
                  <p className="text-danger mt-2">{this.state.errors.name}</p>
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">
                    Số điện thoại
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="sdt"
                    aria-describedby="helpId"
                    onChange={this.handleChange}
                    id="sdt"
                  />
                  <p className="text-danger mt-2">{this.state.errors.sdt}</p>
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    aria-describedby="helpId"
                    onChange={this.handleChange}
                    id="email"
                  />
                  <p className="text-danger mt-2">{this.state.errors.email}</p>
                </div>
              </div>
              <div className="text-center">
                {/* những button ko liên quan đến sự kiện onSubmit thì cho type là button
                disabled mang giá trị true sẽ ngăn user bấm nút
                */}
                <button
                  disabled={this.state.isSubmit}
                  type="submit"
                  className="btn btn-success me-3"
                >
                  Thêm học viên
                </button>
              </div>
            </div>
          </form>
        </div>
        <TableUser />
      </div>
    );
  }
}

/*
type bắt buộc phải có 
payload có thể có hoặc ko, phụ thuộc vài bài toán, dựa vào payload để handle lên store của redux

*/
const mapDispatchToProps = (dispatch) => {
  return {
    setArrHocVien: (payload) => {
      const action = {
        type: "SET_ARR_HOCVIEN",
        payload: payload,
      };
      dispatch(action);
    },
  };
};

// // lấy dữ liệu về từ store của redux
// const mapStateToProps = (state) => {
//   return {
//     hocVienEdit: state.baiTapFormReducer.hocVienEdit,
//   };
// };

export default connect(null, mapDispatchToProps)(Form);
// hàm connect là higher order component
