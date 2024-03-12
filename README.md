# Prerequisites
1. [node.js](https://nodejs.org/)
2. Emulator (Android Studio is recommended)

# Setup
1. Clone this repository.
2. Navigate to the directory containing `App.js`.
3. Run the following command to install dependencies:
    ```
    npm install
    ```
4. Open your emulator and run the command below.

## Emulator Configuration
Before running the Android app, it's recommended to configure your emulator for optimal performance. Follow these steps:

1. **Device Manager**: Open Android Studio and navigate to `Tools > AVD Manager`.
2. **Edit Device**: Select the device you want to use and click on the pencil icon to edit its settings.
3. **Show Advanced Settings**: Enable advanced settings to access additional configurations.
4. **Change Device Model**: Adjust the device model to match your requirements.
5. **Emulate Performance**: Set the desired performance level for the emulator.
6. **Graphics**: Select "Use hardware" for graphics acceleration.
7. **Quick Boot**: Enable quick boot for faster emulator startup.
8. **Multi-core CPU**: Allocate multiple CPU cores for better performance.
9. **Increase RAM**: Adjust the RAM size allocated to the emulator.
10. **VM Heap**: Increase the VM heap size for improved memory management.
11. **Internal Storage**: Allocate sufficient internal storage space for app installation.

## Running the App
Once the emulator is configured, you can run the Android app with the following command:
   ```
   npm run android
   ```

After running `npm run android`, the mobile app should appear on your desktop screen. If the app doesn't show up, navigate to 'Expo Go' in the emulator and enter the path to the app as shown in the command line output.

5. check the repo https://github.com/6410685173/BackendUniconnect/ and make sure it has running on the background. This will be the backend server side.
6. make sure you have .env file in the same directory as App.js this is the template for .env
    ```
    API_host = "10.0.2.2"
    API_port = "3000"
    ```
where API_host is the host of your backend. for Android studio Emulator, It is `10.0.2.2` this is Special alias to your host loopback interface (127.0.0.1 on your development machine). visit [Set up Android Emulator networking](https://developer.android.com/studio/run/emulator-networking) for more.

API_port is simply port of the backend server side.

## note
Sometime when you config the .env file, The metro bundle might not be updated due to caching, To fix this run `npx expo start --android --reset-cache` after that the variables in .env file should be updated.

Visit [Setting up the development environment](https://reactnative.dev/docs/environment-setup) for more information.
It also includes instructions for installing Android Studio.
