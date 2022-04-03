import {
  createLiveRoom,
  getLiveRoom,
  hasLiveHome,
  startLive,
  stopLive,
  updateLiveRoom,
} from '@/services/api';
import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Card, message, Form, Col, Row, Button, Modal, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';

const Create: React.FC = () => {
  const { username } = useModel('user');
  const [liveId, setLiveId] = useState<number>();
  const [liveRoom, setLiveRoom] = useState<API.LiveMsg>();
  const [visible, setVisible] = useState(false);

  const init = async () => {
    const res = await hasLiveHome({ username });
    if (res.error) {
      message.error(res.error);
    } else {
      setLiveId(res.data?.liveId);
    }
  };

  const getLiveRoomInfo = async () => {
    if (liveId) {
      const res = await getLiveRoom(liveId);
      if (res.error) {
        message.error(res.error);
      } else {
        setLiveRoom(res.data);
      }
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    getLiveRoomInfo();
  }, [liveId]);

  const handleStart = async () => {
    const ret = await startLive({ liveId: liveId! });
    if (ret.error) {
      message.error(ret.error);
    } else {
      await getLiveRoomInfo();
    }
  };

  const handleStop = async () => {
    const ret = await stopLive({ liveId: liveId! });
    if (ret.error) {
      message.error(ret.error);
    } else {
      await getLiveRoomInfo();
    }
  };

  const renderLiveHome = () => {
    if (liveRoom) {
      return (
        <Form>
          <Row>
            <Col span={12}>
              <Form.Item label="直播间标题">{liveRoom.title}</Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="直播间描述">{liveRoom.description}</Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="直播间id">{liveRoom.id}</Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="直播间状态">{liveRoom.active ? '正在直播' : '未直播'}</Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              {liveRoom.active ? (
                <div>
                  <Button type="primary" onClick={handleStop}>
                    暂停直播
                  </Button>
                  <div>推流链接：{liveRoom.pushUrl}</div>
                  <div>播流链接：{liveRoom.pullUrl}</div>
                </div>
              ) : (
                <Button type="primary" onClick={handleStart}>
                  开始直播
                </Button>
              )}
            </Col>
            <Col span={12}>
              <Button type="primary" onClick={() => setVisible(true)}>
                修改信息
              </Button>
            </Col>
          </Row>
        </Form>
      );
    } else {
      return void 0;
    }
  };

  const handleCreate = async (values: { title: string; description: string }) => {
    if (liveId) {
      const res = await updateLiveRoom({ liveId, ...values });
      if (res.error) {
        message.error(res.error);
      } else {
        message.success('更新成功');
        await getLiveRoomInfo();
      }
    } else {
      const ret = await createLiveRoom({ username, ...values });
      if (ret.error) {
        message.error(ret.error);
      } else {
        setLiveId(ret.data?.liveId);
      }
    }
    setVisible(false);
  };

  const renderCreateLiveHome = () => {
    return (
      <div>
        <div>您还未创建直播间...</div>
        <Button type="primary" onClick={() => setVisible(true)}>
          创建直播间
        </Button>
      </div>
    );
  };

  return (
    <PageContainer>
      <Card>
        <Alert
          message="我的直播间"
          type="info"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        {liveId === 0 ? renderCreateLiveHome() : renderLiveHome()}
      </Card>
      <Modal
        footer={null}
        title="直播信息"
        visible={visible}
        width={650}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Form onFinish={handleCreate}>
          <Form.Item label="直播间标题" name="title">
            <Input placeholder="请输入直播间标题" />
          </Form.Item>
          <Form.Item label="直播间简介" name="description">
            <Input placeholder="请输入直播间简介" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              确认
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Create;
