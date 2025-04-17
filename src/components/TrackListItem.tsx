import { unknownTrackImageUri } from '@/constants/images'
import { colors, fontSize } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import React from 'react'
import { View, TouchableHighlight, StyleSheet, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Track, useActiveTrack, useIsPlaying } from 'react-native-track-player'
import { Entypo, Ionicons } from '@expo/vector-icons'
import LoaderKit from 'react-native-loader-kit'

export type TrackListItemProps = {
	track: Track
	onTrackSelect: (track: Track) => void
}

const TrackListItem = ({ track, onTrackSelect: handleTrackSelect }: TrackListItemProps) => {
	const { playing } = useIsPlaying()
	const isActiveTrack = useActiveTrack()?.url === track.url

	return (
		<TouchableHighlight onPress={() => handleTrackSelect(track)}>
			<View style={{ ...styles.trackItemContainer }}>
				<View>
					<FastImage
						source={{
							uri: track.artwork ?? unknownTrackImageUri,
							priority: FastImage.priority.normal,
						}}
						style={{ ...styles.trackArtworkImage, opacity: isActiveTrack ? 0.6 : 1 }}
					/>

					{isActiveTrack &&
						(playing ? (
							<LoaderKit
								style={styles.trackPlayingIconIndicator}
								name="LineScaleParty"
								color={colors.icon}
							/>
						) : (
							<Ionicons
								style={styles.trackPauseIconIndicator}
								name="play"
								size={24}
								color={colors.icon}
							/>
						))}
				</View>

				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					{/* Track title + artist */}
					<View style={{ width: '100%' }}>
						<Text
							numberOfLines={1}
							style={{
								...styles.trackTitleText,
								color: isActiveTrack ? colors.primary : colors.text,
							}}
						>
							{track.title}
						</Text>
						{track.artist && (
							<Text
								numberOfLines={1}
								style={{
									...styles.trackArtistText,
								}}
							>
								{track.artist}
							</Text>
						)}
					</View>
					<Entypo name="dots-three-horizontal" size={18} color={colors.icon} />
				</View>
			</View>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	trackItemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingRight: 20,
		columnGap: 14,
	},

	trackArtworkImage: {
		borderRadius: 8,
		width: 50,
		height: 50,
	},

	trackTitleText: {
		...defaultStyles.text,
		fontSize: fontSize.base,
		fontWeight: '600',
		maxWidth: '90%',
	},
	trackArtistText: {
		...defaultStyles.text,
		color: colors.textMuted,
		fontSize: fontSize.sm,
		marginTop: 4,
	},
	trackPlayingIconIndicator: {
		position: 'absolute',
		top: 17,
		left: 18,
		width: 20,
		height: 20,
	},
	trackPauseIconIndicator: {
		position: 'absolute',
		top: 14,
		left: 14,
		width: 20,
		height: 20,
	},
})

export default TrackListItem
