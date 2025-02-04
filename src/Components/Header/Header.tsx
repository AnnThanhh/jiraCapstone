import React from "react";
import { NavLink } from "react-router-dom";
import { Dropdown, Avatar, Breadcrumb, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { USER_LOGIN, clearStorage, getStoreJson } from "../../Util/config";
import { openModalAction } from "../../Redux/reducers/taskReducer";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../Redux/configStore";

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  const dispatch: DispatchType = useDispatch();

  // Định nghĩa interface cho người dùng đã đăng nhập
  interface UserLogin {
    name: string;
    avatar: string;
  }

  // Khởi tạo đối tượng userLogin
  let userLogin: UserLogin = {
    name: "",
    avatar: "",
  };

  // Lấy thông tin người dùng từ localStorage nếu có
  if (localStorage.getItem(USER_LOGIN)) {
    userLogin = getStoreJson(USER_LOGIN);
  }

  // Định nghĩa các mục cho menu dropdown
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <NavLink
          rel="noopener noreferrer"
          to="/login"
          className="t-dec"
          onClick={() => {
            clearStorage(USER_LOGIN);
          }}
        >
          <i className="fa fa-sign-out-alt me-2"></i>
          Đăng xuất
        </NavLink>
      ),
    },
  ];

  return (
    <div className="header mt-4">
      {/* Đường dẫn dẫn đến các mục */}
      <Breadcrumb
        className="text-dark"
        items={[
          {
            title: "Dự án",
          },
          {
            title: "Jira Clone",
          },
          {
            title: title,
          },
        ]}
      />
      <div>
        {/* Dropdown cho thông tin người dùng */}
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space className="g-2">
              <Avatar
                src={userLogin.avatar}
                style={{ width: 30, height: 30 }}
              />
              <span className="p-1">{userLogin.name.toLocaleUpperCase()}</span>
              <DownOutlined className="fs-10 ver-mid" />
            </Space>
          </a>
        </Dropdown>
        {/* Nút mở menu dạng offcanvas */}
        <button
          className="btn-menu"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#AsideOffcanvasMenu"
          aria-controls="AsideOffcanvasMenu"
        >
          <i className="fa fa-bars fs-icon" />
        </button>
      </div>
      {/* Offcanvas menu */}
      <div
        className="off-canvas-wrapper offcanvas offcanvas-start"
        tabIndex={-1}
        id="AsideOffcanvasMenu"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <button
            className="btn-menu-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            Menu Jira <i className="fa fa-chevron-left" />
          </button>
        </div>
        <div className="offcanvas-body">
          {/* Các mục menu cho thiết bị di động */}
          <div className="mobile-menu-items">
            <ul className="nav-menu">
              <li className="menu-item-has-children">
                <NavLink to="/project">Project Management</NavLink>
              </li>
              <li>
                <NavLink to="/usermanagement">User Management</NavLink>
              </li>
              <li className="menu-item-has-children">
                <NavLink to="/createproject">Create Project</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
