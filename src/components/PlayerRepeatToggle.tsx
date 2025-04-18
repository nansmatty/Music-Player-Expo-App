import React, { ComponentProps } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { RepeatMode } from 'react-native-track-player'
import { match } from 'ts-pattern'
import { colors } from '@/constants/tokens'
import { useTrackPlayerRepeatMode } from '@/hooks/useTrackPlayerRepeatMode'

type IconProps = Omit<ComponentProps<typeof MaterialCommunityIcons>, 'name'>
type IconName = ComponentProps<typeof MaterialCommunityIcons>['name']

const repeatOrder = [RepeatMode.Off, RepeatMode.Track, RepeatMode.Queue] as const

const PlayerRepeatToggle = ({ ...iconProps }: IconProps) => {
	const { repeatMode, toggleRepeatMode } = useTrackPlayerRepeatMode()

	const handleRepeatMode = () => {
		if (repeatMode === null) return
		const currentIndex = repeatMode !== undefined ? repeatOrder.indexOf(repeatMode) : -1
		const nextIndex = (currentIndex + 1) % repeatOrder.length

		toggleRepeatMode(repeatOrder[nextIndex])
	}

	const icon = match(repeatMode)
		.returnType<IconName>()
		.with(RepeatMode.Off, () => 'repeat-off')
		.with(RepeatMode.Track, () => 'repeat-once')
		.with(RepeatMode.Queue, () => 'repeat')
		.otherwise(() => 'repeat-off')

	return (
		<MaterialCommunityIcons
			name={icon}
			onPress={handleRepeatMode}
			color={colors.icon}
			{...iconProps}
		/>
	)
}

export default PlayerRepeatToggle
