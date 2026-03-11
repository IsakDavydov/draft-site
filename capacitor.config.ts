import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sakfootball.app',
  appName: 'SAK Football',
  webDir: 'capacitor-web',
  server: {
    // Load the live site so the app always matches the web experience.
    url: 'https://sakfootball.com',
    cleartext: false,
  },
};

export default config;
