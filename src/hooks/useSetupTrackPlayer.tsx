import { useEffect, useRef } from 'react'
import TrackPlayer, {
	Capability,
	RepeatMode,
	useTrackPlayerEvents,
} from 'react-native-track-player'

const setupTrackPlayer = async () => {
	await TrackPlayer.setupPlayer({
		maxCacheSize: 1024 * 10, // 10MB
	})
	await TrackPlayer.setVolume(0.3) // Set the volume to 0.03 (3%)
	await TrackPlayer.setRepeatMode(RepeatMode.Queue) // Set the repeat mode to Queue
	// await TrackPlayer.updateOptions({
	// 	capabilities: [
	// 		Capability.Play,
	// 		Capability.Pause,
	// 		Capability.Stop,
	// 		Capability.SkipToNext,
	// 		Capability.SkipToPrevious,
	// 	],
	// 	playback: true,
	// 	stopWithApp: false,
	// 	capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
	// 	compactCapabilities: [Capability.Play, Capability.Pause],
	// })
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

	// const trackPlayer = useTrackPlayerEvents([Event.PlaybackState], async (event) => {
	// 	if (event.type === Event.PlaybackState) {
	// 		console.log('Playback state changed:', event.state)
	// 	}
	// })

	// return { trackPlayer, setupTrackPlayer }
}
