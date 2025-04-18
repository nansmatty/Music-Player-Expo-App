import { colors } from '@/constants/tokens'
import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { getColors } from 'react-native-image-colors'
import { AndroidImageColors, IOSImageColors } from 'react-native-image-colors/build/types'

// This code has been altered based on plaform-specific requirements and the original code structure.

export const usePlayerBackground = (imageUrl: string) => {
	const [gradientColors, setGradientColors] = useState<string[]>([
		colors.background,
		colors.background,
	])

	useEffect(() => {
		const fetchColors = async () => {
			const result = await getColors(imageUrl, {
				fallback: colors.background,
				cache: true,
				key: imageUrl,
			})

			if (Platform.OS === 'android') {
				const androidColors = result as AndroidImageColors
				setGradientColors([
					androidColors.dominant || colors.background,
					androidColors.average || colors.background,
				])
			}
			if (Platform.OS === 'ios') {
				const iosColors = result as IOSImageColors
				setGradientColors([
					iosColors.primary || colors.background,
					iosColors.background || colors.background,
				])
			}
		}

		fetchColors()
	}, [imageUrl])

	return { gradientColors }
}
