import { doReview, getReviewList } from '@/services/api';
import { PageContainer, PageLoading } from '@ant-design/pro-layout';
import { Alert, Card, List, Image, message, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useModel } from 'umi';
import Player from './work/My/components/Player';

const Review: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { username } = useModel('user');
  const is_admin = initialState?.adminList?.includes(username);
  const [reviewList, setReviewList] = useState<API.ReviewList[]>([]);

  const [visible, setVisible] = useState(false);
  const [url, setUrl] = useState<string>();
  const playerRef: any = useRef(null);

  const init = async () => {
    const reviews = await getReviewList();
    if (reviews.error) {
      message.error(reviews.error);
    }
    setReviewList(reviews.data!);
  };

  useEffect(() => {
    if (is_admin) {
      init();
    }
  }, []);

  const openDrawer = (url: string) => {
    setVisible(true);
    setUrl(url);
  };

  const handleClick = async (videoId: number, result: number) => {
    const res = await doReview({ result, videoId });
    if (res.error) {
      message.error(res.error);
    } else {
      await init();
    }
  };

  return (
    <PageContainer>
      <Card>
        <Alert
          message="审核列表"
          type="info"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        {is_admin ? (
          <List
            itemLayout="horizontal"
            dataSource={reviewList}
            renderItem={(item, index) => (
              <List.Item
                actions={[
                  <a onClick={() => handleClick(item.videoId, 1)}>通过</a>,
                  <a onClick={() => handleClick(item.videoId, 2)}>不通过</a>,
                ]}
                key={index}
              >
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
                  description={
                    <>
                      <div>{item.description}</div>
                      <div>@{item.author}</div>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <div>抱歉，你没有权限访问该页面...</div>
        )}
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

export default Review;
