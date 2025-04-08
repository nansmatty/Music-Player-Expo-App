import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Platform, useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => {
	// const scheme = useColorScheme()

	return (
		<SafeAreaProvider>
			<RootNavigation />
			<StatusBar style={Platform.OS === 'ios' ? 'auto' : 'light'} />
		</SafeAreaProvider>
	)
}

const RootNavigation = () => {
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	)
}

export default App
