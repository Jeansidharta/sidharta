// This is a config file for the process manages `pm2`. See this link for more info:
// https://pm2.keymetrics.io/docs/usage/application-declaration/

module.exports = {
	apps: [{
		name: 'My home page',
		script: 'serve',
		watch: false,
		cwd: require.main.id,
		time: true,
		env: {
			PM2_SERVE_PATH: './out',
			PM2_SERVE_PORT: 3042
		}
	}],
};
