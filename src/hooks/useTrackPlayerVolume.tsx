import React, { useCallback, useEffect } from 'react'
import TrackPlayer from 'react-native-track-player'

export const useTrackPlayerVolume = () => {
	const [volume, setVolume] = React.useState(0.5)

	const getVolume = useCallback(async () => {
		try {
			const currentVolume = await TrackPlayer.getVolume()
			setVolume(currentVolume)
		} catch (error) {
			console.error('Error fetching volume:', error)
		}
	}, [])

	const updateVolume = useCallback(async (newVolume: number) => {
		if (newVolume < 0 || newVolume > 1) return
		setVolume(newVolume)
		try {
			await TrackPlayer.setVolume(newVolume)
		} catch (error) {
			console.error('Error setting volume:', error)
		}
	}, [])

	useEffect(() => {
		getVolume()
	}, [getVolume])

	return { volume, updateVolume }
}
