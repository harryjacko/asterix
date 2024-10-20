# Asterix - Cat App!

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

It is a personal cat app, where you can upload photos of your furry friends, vote on them and favourite. It's a technical take home test for Waracle.

## Pre-requisites

Follow Expo's development environment steps found [here](https://docs.expo.dev/get-started/set-up-your-environment/)

## Get started

1. Install dependencies

   ```bash
   yarn install
   ```

2. Start the app

   ```
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Tests

### Unit tests

Assuming you can run the builds, no pre-requisites should be needed for the unit tests.

To run:

```
yarn test
```

NOTE: Husky git hooks have been configured to run unit tests on pre-push.

### E2E tests

Application uses [Maestro](https://maestro.mobile.dev/) for E2E tests.

Note: These were configured and tested on iOS emulator.

#### Pre-requisites

Follow the installation steps for your platform [here](https://maestro.mobile.dev/getting-started/installing-maestro)

#### Running tests

1. Run the Application

```
yarn run:ios
```

2. Running the tests

2.1 (Optional step) When running on slower hardware you may need to bump driver startup timeout. [Reference](https://maestro.mobile.dev/advanced/configuring-maestro-driver-timeout).

```
export MAESTRO_DRIVER_STARTUP_TIMEOUT=60000 # setting 60 seconds
```

2.2 Run the test flows

```
maestro test maestro/
```
