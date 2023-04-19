import { request } from './request';

export const postQuestion = (params) => {
  return request('/proxyapi', params, {
    Authorization: 'Bearer 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',
    ParamUrl: 'https://api.openai.com/v1/chat/completions',
  });
};
// SD txt2img
export const txt2img = (params) => {
  return request('/shadan/sdapi/v1/txt2img', params);
};
