Follow this instructions to build your own APK for Android:

before you go deeper pls use the Androidx:

Using androidx libraries in your project
See Migrating to AndroidX to learn how to migrate an existing project.

If you want to use androidx-namespaced libraries in a new project, you need to set the compile SDK to Android 9.0 (API level 28) or higher and set both of the following Android Gradle plugin flags to true in your gradle.properties file.

android.useAndroidX: When this flag is set to true, the Android plugin uses the appropriate AndroidX library instead of a Support Library. The flag is false by default if it is not specified.
android.enableJetifier: When this flag is set to true, the Android plugin automatically migrates existing third-party libraries to use AndroidX dependencies by rewriting their binaries. The flag is false by default if it is not specified.
(from https://developer.android.com/jetpack/androidx)





https://www.instamobile.io/android-development/generate-react-native-release-build-android/
