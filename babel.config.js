module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'@emotion',
			{
				sourceMap: true,
				autoLabel: 'dev-only',
				labelFormat: '[local]',
				cssPropOptimization: false
			}
		],
		[
			'module:react-native-dotenv',
			{
				moduleName: '@env',
				path: '.env'
			}
		]
	]
}
