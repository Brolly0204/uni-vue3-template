export const MAP_PLATFORM = {
  ios: 'ios',
  android: 'android',
  h5: 'H5',
  'mp-weixin': 'mp-weixin',
} as const;

// 拿到所有 value 联合类型
export type Platform = (typeof MAP_PLATFORM)[keyof typeof MAP_PLATFORM];

export const getPlatform = (): Platform | undefined => {
  let platform = undefined;

  // #ifdef APP-PLUS
  platform = MAP_PLATFORM[getOSName() as 'ios' | 'android'];
  // #endif

  // #ifdef H5
  platform = MAP_PLATFORM.h5;
  // #endif

  // #ifdef MP-WEIXIN
  platform = MAP_PLATFORM['mp-weixin'];
  // #endif

  return platform;
};

export const getOSName = (): 'ios' | 'android' | 'windows' | 'macos' | 'linux' => {
  const { osName } = uni.getSystemInfoSync();
  return osName as 'ios' | 'android' | 'windows' | 'macos' | 'linux';
};

export const getDeviceType = (): 'phone' | 'pad' | 'pc' => {
  const { deviceType } = uni.getDeviceInfo();
  return deviceType as 'phone' | 'pad' | 'pc';
};
