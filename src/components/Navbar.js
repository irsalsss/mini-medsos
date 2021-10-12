import React from 'react';
import { Menu } from 'antd';
import { NAVBAR_CONFIG } from '../constant/navbar';
import { useMainContext } from '../context/MainContext';

const Navbar = () => {
  const { activeNavbar, handleActiveNavbar } = useMainContext();
  return (
    <Menu onClick={handleActiveNavbar} selectedKeys={[activeNavbar]} mode="horizontal">
      {NAVBAR_CONFIG.map((v) => (
        <Menu.Item key={v.key}>
          {v.label}
        </Menu.Item>
      ))}
    </Menu>
  )
}

export default Navbar
