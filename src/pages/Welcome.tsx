import React, { useEffect, useState } from 'react';
import { PageContainer, PageLoading } from '@ant-design/pro-layout';
import { Card, Alert, Image, Form, Row, Col, message } from 'antd';
import { getUserInfo } from '@/services/api';
import { useModel, history } from 'umi';
import format from '@/utils/format';

const Welcome: React.FC = () => {
  const { username } = useModel('user');
  const [userInfo, setUserInfo] = useState<API.CurrentUser>();

  useEffect(() => {
    if (username) {
      getUserInfo(username).then((res) => {
        if (res.error) {
          message.error(res.error);
        } else {
          setUserInfo(res.data);
        }
      });
    } else {
      history.push('/user/login');
    }
  }, []);

  if (!userInfo?.username) {
    return <PageLoading />;
  }

  return (
    <PageContainer>
      <Card>
        <Alert
          message="个人资料"
          type="info"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Form>
          <Row>
            <Col span={12}>
              <Form.Item label="背景图">
                <Image height={100} src={userInfo.background} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="头像">
                <Image height={100} src={userInfo.avatar} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="用户名">{userInfo.username}</Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="个人简介">{userInfo.signature}</Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="性别">{userInfo.sex === 0 ? '男' : '女'}</Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="年龄">{userInfo.age}岁</Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="关注数">{format(userInfo.stars).length}</Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="获赞数">{userInfo.likes}</Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="粉丝数">{format(userInfo.fans).length}</Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
