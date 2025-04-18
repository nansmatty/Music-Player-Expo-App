import { View, ViewStyle } from 'react-native'
import React from 'react'
import { useSharedValue } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '@/constants/tokens'
import { Slider } from 'react-native-awesome-slider'
import { utilsStyles } from '@/styles'
import { useTrackPlayerVolume } from '@/hooks/useTrackPlayerVolume'

type PlayerVolumeBarProps = {
	style?: ViewStyle
}

const PlayerVolumeBar = ({ style }: PlayerVolumeBarProps) => {
	const { updateVolume, volume } = useTrackPlayerVolume()

	const progress = useSharedValue(0)
	const min = useSharedValue(0)
	const max = useSharedValue(1)

	progress.value = volume ?? 0

	return (
		<View style={style}>
			<View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
				<Ionicons name="volume-low" size={24} color={colors.icon} style={{ opacity: 0.8 }} />
				<Slider
					progress={progress}
					minimumValue={min}
					maximumValue={max}
					containerStyle={utilsStyles.slider}
					thumbWidth={0}
					renderBubble={() => null}
					theme={{
						maximumTrackTintColor: colors.maximumTrackTintColor,
						minimumTrackTintColor: colors.minimumTrackTintColor,
					}}
					onValueChange={(value) => {
						updateVolume(value)
					}}
				/>
				<Ionicons name="volume-high" size={24} color={colors.icon} style={{ opacity: 0.8 }} />
			</View>
		</View>
	)
}

export default PlayerVolumeBar
