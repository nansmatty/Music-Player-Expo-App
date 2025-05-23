import { useCallback, useEffect, useState } from 'react'
import TrackPlayer, { RepeatMode } from 'react-native-track-player'

export const useTrackPlayerRepeatMode = () => {
	const [repeatMode, setRepeatMode] = useState<RepeatMode>()

	const toggleRepeatMode = useCallback(async (repeatMode: RepeatMode) => {
		await TrackPlayer.setRepeatMode(repeatMode)
		setRepeatMode(repeatMode)
	}, [])

	useEffect(() => {
		TrackPlayer.getRepeatMode().then((mode) => {
			setRepeatMode(mode)
		})
	}, [])

	return { repeatMode, toggleRepeatMode }
}
