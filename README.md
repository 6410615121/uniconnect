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
4. Open your emulator.

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

# Running the App
Once the emulator is configured, you can run the Android app with the following command:
   ```
   npm run android
   ```


After running `npm run android`, the mobile app should appear on your desktop screen. If the app doesn't show up, navigate to 'Expo Go' in the emulator and enter the path to the app as shown in the command line output.

Visit [Setting up the development environment](https://reactnative.dev/docs/environment-setup) for more information.
It also includes instructions for installing Android Studio.
