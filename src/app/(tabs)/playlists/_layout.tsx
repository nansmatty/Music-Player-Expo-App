import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const PlaylistsScreenLayout = () => {
	return (
		<View style={defaultStyles.container}>
			<Stack screenOptions={{ headerTitleAlign: 'center' }}>
				<Stack.Screen
					name="index"
					options={{
						headerTitle: 'Playlists',
					}}
				/>
			</Stack>
		</View>
	)
}

export default PlaylistsScreenLayout
