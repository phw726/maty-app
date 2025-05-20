import React from 'react'
import styled from '@emotion/native'
import {View} from 'react-native'

export const StatusBar = () => {
	return (
		<Section>
			<ShadowOverlay1 />
			<ShadowOverlay2 />

			<MinusWrapper>
				{/* <TopLine /> */}
				<Minus />
			</MinusWrapper>
		</Section>
	)
}
const Section = styled(View)({
	position: 'relative',
	width: '100%',
	marginBottom: 30
})
const ShadowOverlay1 = styled(View)({
	position: 'absolute',
	top: 5,
	left: 0,
	right: 0,
	height: 40,
	backgroundColor: 'rgba(0, 0, 0, 0.257)',
	zIndex: -10,
	borderTopLeftRadius: 20,
	borderTopRightRadius: 20,
	opacity: 0.1
})
const ShadowOverlay2 = styled(View)({
	position: 'absolute',
	top: 7,
	left: 0,
	right: 0,
	height: 20,
	backgroundColor: 'rgba(0, 0, 0, 0.257)',
	zIndex: -10,
	borderTopLeftRadius: 20,
	borderTopRightRadius: 20,
	opacity: 0.1
})

const MinusWrapper = styled(View)({
	position: 'absolute',
	width: '100%',
	height: 21,
	backgroundColor: '#faf9f9',
	borderTopLeftRadius: 40,
	borderTopRightRadius: 40,
	marginTop: 9,
	overflow: 'hidden',
	zIndex: 10
})

const Minus = styled(View)({
	position: 'absolute',
	width: 40,
	height: 4,
	backgroundColor: '#d3d3d386',
	borderRadius: 40,
	marginTop: 10,
	left: '43%'
})
