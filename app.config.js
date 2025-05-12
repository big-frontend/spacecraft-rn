module.exports = {
  expo: {
    name: 'spacecraft-rn',
    slug: 'spacecraft-rn',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    assetBundlePatterns: ['**/*'],
    web: {
      bundler: 'metro',
      favicon: './assets/images/favicon.png'
    },
    plugins: [
      'expo-router',
      'expo-splash-screen',
      'expo-font',
      'expo-web-browser'
    ],
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true
    },
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: 'd594ecac-645f-457a-b547-fd374e1337b8'
      }
    },
    owner: 'ectrolytej',
    updates: {
      enabled: true,
      fallbackToCacheTimeout: 0,
      url: 'https://u.expo.dev/d594ecac-645f-457a-b547-fd374e1337b8'
    },
    runtimeVersion: {
      policy: 'sdkVersion'
    },
    cli: {
      version: '>= 5.9.1',
      appVersionSource: 'remote'
    }
  }
}; 