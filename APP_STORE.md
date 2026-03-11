# SAK Football – App Store / Play Store

The app is built with **Capacitor**. It loads your live site (**https://sakfootball.com**) inside a native shell, so the app and the website look and behave the same with a single codebase.

---

## What’s already done in the repo

- **Capacitor** is configured in `capacitor.config.ts` (app id `com.sakfootball.app`, app name “SAK Football”).
- The app opens directly to `https://sakfootball.com` in a WebView.
- Scripts in `package.json`: `cap:add:ios`, `cap:add:android`, `cap:open:ios`, `cap:open:android`, `cap:sync`.

---

## Prerequisites

- **Node 18+** and `npm install` (already done for the site).
- **iOS (App Store):**
  - Mac with **Xcode** (from the Mac App Store).
  - **Apple Developer account** ($99/year): [developer.apple.com](https://developer.apple.com).
- **Android (Play Store):**
  - **Android Studio**: [developer.android.com/studio](https://developer.android.com/studio).
  - **Google Play Developer account** (one-time fee): [play.google.com/console](https://play.google.com/console).

---

## One-time setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Add native projects** (run once; creates `ios/` and `android/`):
   ```bash
   npm run cap:add:ios
   npm run cap:add:android
   ```

3. **Sync** (run after changing `capacitor.config.ts` or app name/id):
   ```bash
   npm run cap:sync
   ```

---

## Run the app on a device or simulator

- **iOS:**  
  `npm run cap:open:ios`  
  Then in Xcode: pick a simulator or a connected iPhone, and run (▶).

- **Android:**  
  `npm run cap:open:android`  
  Then in Android Studio: pick an emulator or device, and run (▶).

The app will open and load sakfootball.com. You can use the site as usual (sign in, predictions, leaderboard, etc.).

---

## Build for store submission

### iOS (App Store)

1. In Xcode, select the **SAK Football** project → **Signing & Capabilities**.
2. Select your **Team** (Apple Developer account). Create a **Bundle ID** if needed (e.g. `com.sakfootball.app`).
3. **Product → Archive**. When the archive is ready, **Distribute App** → **App Store Connect** and follow the wizard.
4. In [App Store Connect](https://appstoreconnect.apple.com), create the app (name, description, screenshots, privacy policy URL, etc.) and submit the build for review.

### Android (Play Store)

1. In Android Studio, **Build → Generate Signed Bundle / APK** → **Android App Bundle** (recommended).
2. Create or use an existing keystore; complete the signing steps.
3. Upload the `.aab` in [Google Play Console](https://play.google.com/console): create the app, set store listing (description, screenshots, privacy policy), then upload the bundle and send for review.

---

## Changing the app name or URL

- **App name / id:** Edit `capacitor.config.ts` (`appName`, `appId`). Then run `npm run cap:sync` and re-open the native projects.
- **Site URL:** Edit `server.url` in `capacitor.config.ts` (e.g. for staging). Run `npm run cap:sync` and rebuild.

---

## Notes

- The app **requires internet**; it loads the live site. No offline caching of the full site is configured.
- **Same look as the site:** Because the app is your website in a WebView, any change you deploy to sakfootball.com is what users see in the app (no separate app release needed for content/features).
- **Store policies:** Apple and Google require a privacy policy URL and may ask for login/sign-up details; use your existing privacy page (e.g. `https://sakfootball.com/privacy`).
