import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import TrackPlayer, { Track } from 'react-native-track-player'
import { defaultStyles } from '@/styles'
import { colors, fontSize } from '@/constants/tokens'
import { Ionicons } from '@expo/vector-icons'

type QueueControlsProps = {
	tracks: Track[]
	style?: ViewStyle
}

const QueueControls = ({ tracks, style }: QueueControlsProps) => {
	const handlePlay = async () => {
		await TrackPlayer.setQueue(tracks)
		await TrackPlayer.play()
	}

	const handleShuffle = async () => {
		const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5)
		await TrackPlayer.setQueue(shuffledTracks)
		await TrackPlayer.play()
	}

	return (
		<View style={[{ flexDirection: 'row', columnGap: 16 }, style]}>
			{/* Play Button */}
			<View style={{ flex: 1 }}>
				<TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handlePlay}>
					<Ionicons name="play" size={24} color={colors.primary} />
					<Text style={styles.btnText}>Play</Text>
				</TouchableOpacity>
			</View>

			{/* Shuffle Button */}
			<View style={{ flex: 1 }}>
				<TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleShuffle}>
					<Ionicons name="shuffle-sharp" size={24} color={colors.primary} />
					<Text style={styles.btnText}>Shuffle</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	button: {
		padding: 12,
		backgroundColor: 'rgba(47, 47, 47, 0.5)',
		borderRadius: 8,
		borderColor: colors.primary,
		borderWidth: 0.5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		columnGap: 8,
	},

	btnText: {
		...defaultStyles.text,
		color: colors.primary,
		fontSize: fontSize.base,
		fontWeight: '600',
		textAlign: 'center',
	},
})

export default QueueControls
