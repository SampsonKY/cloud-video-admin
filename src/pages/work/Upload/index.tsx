import { CreateVideo, getTag } from '@/services/api';
import { UploadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Card, message, Form, Input, Button, Upload, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';
import { useModel, history } from 'umi';

const baseURL = 'http://localhost:7001';

interface FormItems {
  title: string;
  description: string;
  tags: number[];
}

const UploadVideo: React.FC = () => {
  const { username } = useModel('user');
  const [tags, setTags] = useState<API.Tag[]>([]);
  const [url, setUrl] = useState<string>('');
  const [cover, setCover] = useState<string>('');

  const onFinish = async (values: FormItems) => {
    const ret = await CreateVideo({ url, cover, author: username, ...values });
    if (ret.error) {
      return message.error(ret.error);
    } else {
      message.success('创建成功');
      history.push('/work/my');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    getTag().then((res) => {
      if (res.error) {
        message.error(res.error);
      } else {
        res.data && setTags(res.data);
      }
    });
  }, []);

  return (
    <PageContainer>
      <Card>
        <Alert
          message="上传视频"
          type="info"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="视频"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Upload
              name="file"
              action={`${baseURL}/upload/video`}
              onChange={({ file }: { file: any }) => {
                if (file.status === 'done') {
                  setUrl(file.response.url);
                }
              }}
            >
              <Button icon={<UploadOutlined />}>点击上传视频文件</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="视频标题"
            name="title"
            rules={[{ required: true, message: '请输入视频标题!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="视频简介"
            name="description"
            rules={[{ required: true, message: '请输入视频简介!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="视频封面" rules={[{ required: true, message: '请上传视频封面!' }]}>
            <Upload
              name="file"
              action={`${baseURL}/upload/image`}
              onChange={({ file }: { file: any }) => {
                if (file.status === 'done') {
                  setCover(file.response.url);
                }
              }}
            >
              <Button icon={<UploadOutlined />}>点击上传视频封面</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="视频标签"
            name="tags"
            rules={[{ required: true, message: '请选择视频标签!' }]}
          >
            <Checkbox.Group>
              {tags.map((tag) => {
                return (
                  <Checkbox key={tag.id} value={tag.id}>
                    {tag.tag}
                  </Checkbox>
                );
              })}
            </Checkbox.Group>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default UploadVideo;
