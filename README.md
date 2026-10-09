# expo-sdk-56-nativewind

An [Expo](https://expo.dev) **SDK 56** template with **Expo Router** (file-based routing) and **NativeWind v4** preconfigured, including the patch required for NativeWind to work with the new Metro bundler in React Native 0.85.

## Stack

| Package | Version |
| --- | --- |
| Expo | ~56.0 (React Native 0.85, React 19.2) |
| expo-router | ~56.2 |
| nativewind | ^4.2 |
| tailwindcss | ^3.4 |
| react-native-reanimated | 4.3 |
| TypeScript | ~6.0 |

## Usage

```bash
npx create-expo-app MyApp --template expo-sdk-56-nativewind
cd MyApp
npm install
npm run android   # or: npm run ios
```

> `npm install` runs a `postinstall` script (`patch-package`) that applies the `react-native-css-interop` patch automatically — do not skip this step.

This template **does not include** the native `android/` and `ios/` folders. They are generated on demand by `expo run:android` / `expo run:ios` (which run prebuild). Because this stack uses native modules (Reanimated, NativeWind), use a **development build** — Expo Go is not supported.

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Starts Metro for an already-installed dev build |
| `npm run android` | Native build, install, and run on Android |
| `npm run ios` | Native build, install, and run on iOS |
| `npm run web` | Run in the browser (Metro bundler) |

After changing native dependencies or native config in `app.json`, run `npm run android` or `npm run ios` to rebuild. For day-to-day JS/TS/style work, `npm start` is enough.

## Project structure

```
src/
├── app/                      # routes (Expo Router)
│   ├── _layout.tsx           # root Stack + global.css import
│   ├── index.tsx             # redirects to (auth) or (private)
│   ├── (auth)/               # public route group
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   └── (private)/            # authenticated route group
│       ├── _layout.tsx
│       └── home.tsx
├── screens/                  # screens + hooks (Home, Login, Register)
└── styles/
    └── global.css            # @tailwind directives
```

The `@/*` import alias maps to `src/*` (e.g. `import { HomeScreen } from "@/screens/Home"`).

## Styling with NativeWind

Use the `className` prop on React Native components:

```tsx
import { Text, View } from "react-native";

export function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">Hello NativeWind!</Text>
    </View>
  );
}
```

## Why is there a patch?

Metro 0.84 (RN 0.85 / SDK 56) changed the file-map `change` event shape to `{ changes: { addedFiles, modifiedFiles, removedFiles }, rootDir }`, but `react-native-css-interop@0.2.4` (used by NativeWind v4) still emits the legacy `{ eventsQueue: [...] }` format. That crashes the dev server with:

```
TypeError: Cannot read properties of undefined (reading 'addedFiles')
```

The patch in `patches/react-native-css-interop+0.2.4.patch` fixes the emitted event format, and `postinstall` reapplies it on every `npm install`.

## Tips

- If NativeWind styles stop applying after config changes, restart Metro with a clean cache: `npx expo start --clear`.
- `app.json` already sets `"userInterfaceStyle": "automatic"` to avoid theme-related warnings.

## License

MIT
