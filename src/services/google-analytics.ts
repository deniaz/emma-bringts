import { initialize, set, pageview } from 'react-ga';

export const init = () => initialize('UA-161893117-1');

export const track = () => {
  set({ page: window.location.pathname });
  pageview(window.location.pathname);
};
