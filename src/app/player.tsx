import { MovingText } from '@/components/MovingText'
import { unknownTrackImageUri } from '@/constants/images'
import { colors, fontSize, screenPadding } from '@/constants/tokens'
import { defaultStyles, utilsStyles } from '@/styles'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useActiveTrack } from 'react-native-track-player'
import { FontAwesome } from '@expo/vector-icons'
import { PlayerControls } from '@/components/PlayerControls'
import PlayerProgressBar from '@/components/PlayerProgressBar'
import PlayerVolumeBar from '@/components/PlayerVolumeBar'
import PlayerRepeatToggle from '@/components/PlayerRepeatToggle'
import { usePlayerBackground } from '@/hooks/usePlayerBackground'
import { LinearGradient } from 'expo-linear-gradient'
import { useTrackPlayerFavourites } from '@/hooks/useTrackPlayerFavourite'

const PlayerScreen = () => {
	const activeTrack = useActiveTrack()
	const { gradientColors } = usePlayerBackground(activeTrack?.artwork ?? unknownTrackImageUri)
	const { top, bottom } = useSafeAreaInsets()

	const { toggleFavorite, isFavourite } = useTrackPlayerFavourites()

	if (!activeTrack) {
		return (
			<View style={[defaultStyles.container, { justifyContent: 'center' }]}>
				<ActivityIndicator size="large" color={colors.icon} />
			</View>
		)
	}

	return (
		<LinearGradient style={{ flex: 1 }} colors={gradientColors as [string, string]}>
			<View style={styles.overlayContainer}>
				<DismissPlayerSymbol />
				<View style={{ flex: 1, marginTop: top + 70, marginBottom: bottom }}>
					<View style={styles.artworkImageContainer}>
						<FastImage
							source={{
								uri: activeTrack.artwork ?? unknownTrackImageUri,
								priority: FastImage.priority.high,
							}}
							resizeMode="cover"
							style={styles.artworkImage}
						/>
					</View>

					<View style={{ flex: 1 }}>
						<View style={{ marginTop: 'auto' }}>
							<View style={{ height: 60 }}>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<View style={styles.trackTitleContainer}>
										<MovingText
											text={activeTrack.title ?? ''}
											animationThreshold={30}
											style={styles.trackTitleText}
										/>
									</View>
									<FontAwesome
										name={isFavourite ? 'heart' : 'heart-o'}
										size={20}
										color={isFavourite ? colors.primary : colors.icon}
										style={{ marginHorizontal: 14 }}
										onPress={toggleFavorite}
									/>
								</View>

								{/* Track Artist */}
								{activeTrack.artist && (
									<Text numberOfLines={1} style={[styles.trackArtistText, { marginTop: 6 }]}>
										{activeTrack.artist}
									</Text>
								)}
							</View>
							<PlayerProgressBar style={{ marginTop: 30 }} />
							<PlayerControls style={{ marginTop: 30 }} />
						</View>
						<PlayerVolumeBar style={{ marginTop: 'auto', marginBottom: 25 }} />

						<View style={utilsStyles.centeredRow}>
							<PlayerRepeatToggle size={30} style={{ marginBottom: 15 }} />
						</View>
					</View>
				</View>
			</View>
		</LinearGradient>
	)
}

const DismissPlayerSymbol = () => {
	const { top } = useSafeAreaInsets()

	return (
		<View
			style={{
				position: 'absolute',
				top: top + 8,
				right: 0,
				left: 0,
				flexDirection: 'row',
				justifyContent: 'center',
			}}
		>
			<View
				accessible={false}
				style={{ width: 50, height: 8, borderRadius: 8, backgroundColor: '#fff', opacity: 0.7 }}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	overlayContainer: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
		backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
	},
	artworkImageContainer: {
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.5,
		shadowRadius: 11.0,
		shadowColor: '#000',
		elevation: 6,
		flexDirection: 'row',
		justifyContent: 'center',
		height: '45%',
	},
	artworkImage: {
		width: '100%',
		height: '100%',
		borderRadius: 12,
		resizeMode: 'cover',
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: 22,
		fontWeight: 'bold',
	},
	trackArtistText: {
		...defaultStyles.text,
		fontSize: fontSize.base,
		opacity: 0.8,
		maxWidth: '90%',
	},
})

export default PlayerScreen
