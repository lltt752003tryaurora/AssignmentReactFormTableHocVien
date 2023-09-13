import React, { Component } from "react";
import { connect } from "react-redux";

class TableUser extends Component {
  render() {
    console.log("props: ", this.props);
    const { arrHocVien, deleteHocVien, layHocVien, editHocVien } = this.props;
    return (
      <div className="container mt-5">
        <div className="table-responsive">
          <table
            className="table table-striped
          table-hover	
          table-borderless
          table-primary
          align-middle"
          >
            <thead className="table-secondary">
              <tr>
                <th>Mã số</th>
                <th>Họ tên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {/* data binding */}
              {/* Tất cả những dữ liệu lấy từ ui/ux về đều là string nên cần phải chuyển đổi phù hợp */}
              {arrHocVien.map((hocVien, index) => {
                return (
                  <tr
                    className={
                      index % 2 === 0 ? "table-primary" : "table-warning"
                    }
                    key={index}
                  >
                    <td>{hocVien.id}</td>
                    <td>{hocVien.name}</td>
                    <td>{hocVien.sdt}</td>
                    <td>{hocVien.email}</td>
                    <td>
                      <button
                        className="btn btn-danger me-3"
                        onClick={() => {
                          // dispatch action xóa học viên
                          deleteHocVien(hocVien.id);
                        }}
                      >
                        Xóa
                      </button>
                      <button
                        className="btn btn-dark me-3"
                        onClick={() => {
                          // dispatch action sửa học viên
                          layHocVien(hocVien.id);
                        }}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          editHocVien(hocVien.id);
                        }}
                      >
                        Cập nhật
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

// lấy dữ liệu về từ store của redux
const mapStateToProps = (state) => {
  return {
    arrHocVien: state.baiTapFormReducer.arrHocVien,
  };
};

// bây giờ cần xóa, sửa => thay đổi => cần phải dispatch action lên store của redux
const mapDispatchToProps = (dispatch) => {
  return {
    deleteHocVien: (payload) => {
      const action = {
        type: "DELETE_HOCVIEN",
        payload,
      };
      dispatch(action);
    },
    layHocVien: (payload) => {
      const action = {
        type: "LAY_HOCVIEN",
        payload,
      };
      dispatch(action);
    },
    editHocVien: (payload) => {
      const action = {
        type: "EDIT_HOCVIEN",
        payload,
      };
      dispatch(action);
    },
  };
};

// mọi thay đổi sẽ dữ liệu ở bên reducer
export default connect(mapStateToProps, mapDispatchToProps)(TableUser);
