import { doVideoReview, getUserWorks } from '@/services/api';
import { PageContainer, PageLoading } from '@ant-design/pro-layout';
import { Alert, Card, List, message, Image, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Player from './components/Player';
import { useModel } from 'umi';

const My: React.FC = () => {
  const { username } = useModel('user');
  const [works, setWorks] = useState<API.IVideo[]>([]);
  const [visible, setVisible] = useState(false);
  const [url, setUrl] = useState<string>();
  const playerRef: any = useRef(null);

  const init = async () => {
    const work = await getUserWorks({ username, pn: 0 });
    if (work.error) {
      message.error(work.error);
    } else {
      work.data && setWorks(JSON.parse(work.data.works));
    }
  };

  useEffect(() => {
    init();
  }, []);

  const openDrawer = (url: string) => {
    setVisible(true);
    setUrl(url);
  };

  const ReReview = async (videoId: number) => {
    const res = await doVideoReview(videoId);
    if (res.error) {
      message.error(res.error);
    } else {
      message.success('重新发起审核成功');
      await init();
    }
  };

  return (
    <PageContainer>
      <Card>
        <Alert
          message="我的作品"
          type="info"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <List
          itemLayout="horizontal"
          dataSource={works}
          renderItem={(item, index) => (
            <List.Item actions={[<a onClick={() => ReReview(item.id)}>发起审核</a>]} key={index}>
              <List.Item.Meta
                avatar={
                  <Image
                    onClick={() => openDrawer(item.url)}
                    preview={false}
                    height={100}
                    width={200}
                    src={item.cover}
                  />
                }
                title={item.title}
                description={item.description}
              />
              <div>
                {item.status === 0 ? '审核中....' : item.status === 1 ? '审核通过' : '审核未通过'}
              </div>
            </List.Item>
          )}
        />
      </Card>
      <Modal
        footer={null}
        title="视频详情"
        visible={visible}
        width={650}
        onCancel={() => {
          setVisible(false);
          playerRef.current!.destroy();
        }}
      >
        {url ? <Player ref={playerRef} url={url} /> : <PageLoading />}
      </Modal>
    </PageContainer>
  );
};

export default My;
