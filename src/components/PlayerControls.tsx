import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import TrackPlayer, { useIsPlaying } from 'react-native-track-player'
import { FontAwesome6 } from '@expo/vector-icons'
import { colors } from '@/constants/tokens'

type PlayerControlProps = {
	style?: ViewStyle
}

type PlayerButtonProps = {
	style?: ViewStyle
	iconSize?: number
}

export const PlayerControls = ({ style }: PlayerControlProps) => {
	return (
		<View style={[styles.container, style]}>
			<View style={styles.row}>
				<PreviousTrackButton iconSize={30} />
				<PlayPauseButton iconSize={50} />
				<NextTrackButton iconSize={30} />
			</View>
		</View>
	)
}

export const PlayPauseButton = ({ style, iconSize }: PlayerButtonProps) => {
	const { playing } = useIsPlaying()

	return (
		<View style={[{ height: iconSize }, style]}>
			<TouchableOpacity
				activeOpacity={0.85}
				onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
			>
				<FontAwesome6
					name={playing ? 'pause' : 'play'} // Change icon based on playing state
					size={iconSize ?? 24} // Default icon size if not provided
					color={colors.text} // Change to your desired color
				/>
			</TouchableOpacity>
		</View>
	)
}

export const NextTrackButton = ({ iconSize = 30 }: PlayerButtonProps) => {
	return (
		<TouchableOpacity activeOpacity={0.85} onPress={() => TrackPlayer.skipToNext()}>
			<FontAwesome6 name="forward" size={iconSize} color={colors.text} />
		</TouchableOpacity>
	)
}

export const PreviousTrackButton = ({ iconSize = 30 }: PlayerButtonProps) => {
	return (
		<TouchableOpacity activeOpacity={0.85} onPress={() => TrackPlayer.skipToPrevious()}>
			<FontAwesome6 name="backward" size={iconSize} color={colors.text} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
	},
})
