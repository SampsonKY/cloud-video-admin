// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取用户信息 GET /user/info */
export async function getUserInfo(username: string, options?: { [key: string]: any }) {
  return request<API.ResType<API.CurrentUser>>('/user/info', {
    method: 'GET',
    params: {
      username,
    },
    ...(options || {}),
  });
}

/** 登录接口 POST /user/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.ResType<API.LoginResult>>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户作品 */
export async function getUserWorks(params: API.WorkParams, options?: { [key: string]: any }) {
  const { username, pn = 0 } = params;
  return request<
    API.ResType<{
      works: string;
    }>
  >('/user/works', {
    method: 'GET',
    params: {
      username,
      pn,
    },
    ...(options || {}),
  });
}

// 获取视频标签
export async function getTag() {
  return request<API.ResType<API.Tag[]>>('/tag', {
    method: 'GET',
  });
}

// 上传视频
export async function CreateVideo(body: API.UploadVideoBody) {
  return request<API.ResType<string>>('/video/create', {
    method: 'POST',
    data: body,
  });
}

// 获取用户权限
export async function isUserAdmin(username: string) {
  return request<API.ResType<{ is_admin: number }>>('/user/is_admin', {
    method: 'POST',
    data: {
      username,
    },
  });
}

// 获取管理员列表
export async function getAdminList() {
  return request<API.ResType<string[]>>('/user/admin_list', {
    method: 'GET',
  });
}

// 重新发起视频审核
export async function doVideoReview(videoId: number) {
  return request<API.ResType<string>>('/video/review', {
    method: 'POST',
    data: {
      videoId,
    },
  });
}

// 获取视频审核列表
export async function getReviewList() {
  return request<API.ResType<API.ReviewList[]>>('/review/list', {
    method: 'GET',
  });
}

// 审核视频
export async function doReview(body: API.ReviewMsg) {
  return request<API.ResType<string>>('/review', {
    method: 'POST',
    data: body,
  });
}

// 判断用户是否开通直播间
export async function hasLiveHome(body: { username: string }) {
  return request<API.ResType<{ liveId: number }>>(`/live/exist?username=${body.username}`, {
    method: 'GET',
  });
}

// 创建直播间
export async function createLiveRoom(body: API.LiveHome) {
  return request<API.ResType<{ liveId: number }>>('/live/create', {
    method: 'POST',
    data: body,
  });
}

// 开始直播
export async function startLive(body: { liveId: number }) {
  return request<API.ResType<{ pushUrl: string }>>('/live/start', {
    method: 'POST',
    data: body,
  });
}

// 关闭直播
export async function stopLive(body: { liveId: number }) {
  return request<API.ResType<string>>('/live/stop', {
    method: 'POST',
    data: body,
  });
}

// 修改直播间信息
export async function updateLiveRoom(body: API.LiveRoomInfo) {
  return request<API.ResType<string>>('/live/update', {
    method: 'POST',
    data: body,
  });
}

// 根据liveId获取直播间信息
export async function getLiveRoom(liveId: number) {
  return request<API.ResType<API.LiveMsg>>(`/live/${liveId}`, {
    method: 'GET',
  });
}
