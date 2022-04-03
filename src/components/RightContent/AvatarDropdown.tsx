import React, { useCallback, useEffect, useState } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Menu, message, Spin } from 'antd';
import { history, useModel } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { getUserInfo } from '@/services/api';
import type { MenuInfo } from 'rc-menu/lib/interface';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const [avatar, setAvatar] = useState<string>();
  const { username, setUsername } = useModel('user');

  useEffect(() => {
    getUserInfo(username).then((res) => {
      if (res.error) {
        message.error(res.error);
      } else {
        setAvatar(res.data?.avatar);
      }
    });
  });

  const loginOut = async () => {
    setUsername('');
    localStorage.removeItem('user');
    localStorage.removeItem('userInfo');
    history.push('/user/login');
  };

  const onMenuClick = useCallback((event: MenuInfo) => {
    const { key } = event;
    if (key === 'logout') {
      loginOut();
      return;
    }
    history.push(`/account/${key}`);
  }, []);

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!avatar) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={avatar} alt="avatar" />
        <span className={`${styles.name} anticon`}>{username}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
