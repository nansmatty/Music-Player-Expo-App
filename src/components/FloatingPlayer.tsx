import { StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native'
import React from 'react'
import { Track, useActiveTrack } from 'react-native-track-player'
import FastImage from 'react-native-fast-image'
import { unknownTrackImageUri } from '@/constants/images'
import { defaultStyles } from '@/styles'
import { NextTrackButton, PlayPauseButton } from '@/components/PlayerControls'
import { useLastActiveTrack } from '@/hooks/useLastActiveTrack'
import { MovingText } from './MovingText'
import { useRouter } from 'expo-router'

const FloatingPlayer = ({ style }: ViewProps) => {
	const router = useRouter()

	const activeTrack = useActiveTrack()
	const lastActiveTrack = useLastActiveTrack()

	if (!activeTrack) return null

	const displayedTrack = activeTrack ?? lastActiveTrack

	const handlePress = () => {
		router.navigate('/player')
	}

	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.85}
			style={[style, styles.trackContainer]}
		>
			<>
				<FastImage
					source={{ uri: displayedTrack.artwork ?? unknownTrackImageUri }}
					style={styles.trackArtworkImage}
				/>
				<View style={styles.trackTitleContainer}>
					<MovingText
						style={styles.trackTitle}
						text={displayedTrack.title ?? ''}
						animationThreshold={25}
					/>
				</View>
				<View style={styles.trackControlsContainer}>
					<PlayPauseButton iconSize={24} />
					<NextTrackButton iconSize={20} />
				</View>
			</>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	trackContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 10,
		paddingVertical: 10,
		backgroundColor: '#252525',
		borderRadius: 12,
	},
	trackArtworkImage: {
		width: 40,
		height: 40,
		borderRadius: 8,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
		marginLeft: 10,
	},
	trackTitle: {
		...defaultStyles.text,
		fontSize: 18,
		fontWeight: 'bold',
		paddingLeft: 10,
		letterSpacing: 1,
	},
	trackControlsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 20,
		marginLeft: 16,
		paddingLeft: 16,
	},
})

export default FloatingPlayer
