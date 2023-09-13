// bước đầu tiên tạo initialState
const initialState = {
  // tham chiếu: object, array,function
  // tham trị: string, số nguyên,...
  arrHocVien: [], // tham chiếu, lưu cái giá trị là địa chỉ ô nhớ
  hocVienEdit: undefined,
};

/* Mỗi lần action được gửi đi thì tất cả action đều được gọi, và dựa vào type để biết action nào dùng để thực hiện sau khi duyệt qua các case (type nào trùng với case được định ra thì hoạt động)
 */

/* Muốn thay đổi bất kỳ một dữ liệu store của redux thì phải bắt buộc sử dụng dispatch lên action của store redux
- dựa vào action của dispatch lên để thay đổi dữ liệu
- arrHocVien thay đổi khi ta bấm vào nút "Thêm học viên" -> mà nút đó ở trong DemoForm.jsx nên ta vào đó để tạo mapDispatchToProps 
*/
// gán giá trị mặc định state là initialState, còn tham số thứ 2 là action thì dùng để dispatch lên trên store của redux
export const baiTapFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ARR_HOCVIEN": {
      // spread operator copy lại data từ arrHocVien, và thêm action vào cái newArr
      const newArrHocVien = [...state.arrHocVien, action.payload];
      // shallow copy (copy nông), copy lại các học học viên và thêm học viên mới
      return { ...state, arrHocVien: newArrHocVien };
    }
    case "DELETE_HOCVIEN": {
      // Cách 1:
      // tìm kiếm vị trí cần xóa
      // const newArrHocVien = [...state.arrHocVien];
      // const index = newArrHocVien.findIndex(
      //   (item) => item.id === action.payload
      // );
      // newArrHocVien.splice(index, 1);

      // Cách 2: đi làm hay dùng - sử dụng phương thức filter
      // duyệt qua tất cả học viên và trả về những học viên mà có id khác với id truyền lên (id truyền lên là id cần xóa)
      // filter sẽ trả cho ta một mảng mới
      const newArrHocVien = state.arrHocVien.filter(
        (item) => item.id !== action.payload
      );
      return { ...state, arrHocVien: newArrHocVien };
    }
    case "LAY_HOCVIEN": {
      // find: lấy ra item mà thỏa mãn đk
      let hocVienCapNhat = state.arrHocVien.find(
        (item) => item.id === action.payload
      );
      console.log(hocVienCapNhat);
      if (hocVienCapNhat) {
        // chạy vòng lặp để fill data lên giao diện
        let arrField = document.querySelectorAll("#hocvienForm input");
        console.log(arrField);
        for (let field of arrField) {
          // do field.id = "id"
          field.value = hocVienCapNhat[field.id];
        }
        document.getElementById("id").readOnly = true;
      }
      console.log(state);
      return { ...state };
    }
    case "EDIT_HOCVIEN": {
      const newArrHocVien = [...state.arrHocVien];
      console.log(newArrHocVien);
      let arrField = document.querySelectorAll("#hocvienForm input");
      let newHocVien = newArrHocVien[0];
      console.log(newHocVien);
      for (let field of arrField) {
        let { value, id } = field;
        newHocVien[id] = value;
        console.log(id);
        console.log(value);
      }
      const index = newArrHocVien.findIndex(
        (item) => item.id === newHocVien.id
      );
      if (index !== -1) {
        newArrHocVien[index] = newHocVien;
      }
      console.log(newArrHocVien);
      return { ...state, arrHocVien: newArrHocVien };
    }
    default:
      return state;
  }
};
