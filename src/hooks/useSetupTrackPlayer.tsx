import { useEffect, useRef } from 'react'
import TrackPlayer, {
	AppKilledPlaybackBehavior,
	Capability,
	RatingType,
	RepeatMode,
} from 'react-native-track-player'

const setupTrackPlayer = async () => {
	await TrackPlayer.setupPlayer({
		maxCacheSize: 1024 * 10, // 10MB
	})
	await TrackPlayer.setVolume(0.3) // Set the volume to 0.03 (3%)
	await TrackPlayer.setRepeatMode(RepeatMode.Queue) // Set the repeat mode to Queue
	await TrackPlayer.updateOptions({
		android: {
			appKilledPlaybackBehavior: AppKilledPlaybackBehavior.PausePlayback,
		},
		ratingType: RatingType.Heart,
		capabilities: [
			Capability.Play,
			Capability.Pause,
			Capability.Stop,
			Capability.SkipToNext,
			Capability.SkipToPrevious,
		],
	})
}

export const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
	const isInitialized = useRef(false)

	useEffect(() => {
		setupTrackPlayer()
			.then(() => {
				isInitialized.current = true
				onLoad?.()
			})
			.catch((error) => {
				isInitialized.current = false
				console.error('Error setting up TrackPlayer:', error)
			})
	}, [onLoad])
}
