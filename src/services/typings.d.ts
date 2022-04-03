// @ts-ignore
/* eslint-disable */

declare namespace API {
  type ResType<T> = {
    error: string;
    data?: T;
  };

  type CurrentUser = {
    username: string;
    avatar: string;
    age: number;
    background: string;
    fans: string;
    likes: number;
    sex: number;
    signature: string;
    stars: string;
  };

  type LoginResult = {
    token: string;
  };

  type WorkParams = {
    username: string;
    pn: number;
  };

  type IVideo = {
    id: number;
    author: string;
    url: string;
    title: string;
    description: string;
    cover: string;
    likes: number;
    tags: string;
    createdAt: Date;
    status: number;
    [key: string]: any;
  };

  type Tag = {
    id: number;
    tag: string;
  };

  type UploadVideoBody = {
    title: string;
    description: string;
    cover: string;
    url: string;
    tags: number[];
    author: string;
  };

  type ReviewList = {
    id: number;
    videoId: number;
    result: number;
    url: string;
    author: string;
    title: string;
    description: string;
    cover: string;
  };

  type ReviewMsg = {
    videoId: number;
    recall?: string;
    result: number;
  };

  type LiveHome = {
    title: string;
    description: string;
    username: string;
  };

  type LiveRoomInfo = {
    liveId: number;
    title: string;
    description: string;
  };

  type StartLive = {
    title: string;
    description: string;
    liveId: number;
    playback?: number;
  };

  type LiveMsg = {
    id: number;
    username: string;
    active: number;
    description: string;
    title: string;
    playback: number;
    pushUrl: string;
    pullUrl: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
