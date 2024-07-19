import React from "react";
import { Drawer } from "antd";
import EditProject from "./EditProject";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../Redux/configStore";
import { closeEditProjectAction } from "../../Redux/reducers/editProjectReducer";

type Props = {};

export default function EditProjectDrawer({}: Props) {
  // Sử dụng useSelector để lấy trạng thái visible của Drawer từ Redux store
  const visible = useSelector(
    (state: RootState) => state.editProjectReducer.visibleDrawer
  );

  const dispatch: DispatchType = useDispatch();

  // Xử lý khi đóng Drawer
  const onClose = () => {
    const actionClose = closeEditProjectAction(0); // Tạo action để đóng Drawer và không lưu thay đổi
    dispatch(actionClose);
  };

  return (
    <>
      <div>
        <Drawer
          title="Edit Project"
          width={720}
          placement="right"
          onClose={onClose}
          visible={visible}
          style={{ paddingBottom: 80 }}
        >
          <EditProject />
        </Drawer>
      </div>
    </>
  );
}
