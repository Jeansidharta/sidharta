// This is a config file for the process manages `pm2`. See this link for more info:
// https://pm2.keymetrics.io/docs/usage/application-declaration/

module.exports = {
	apps: [{
		name: 'My home page',
		script: 'npm',
		args: ['run', 'serve'],
		watch: false,
		cwd: require.main.id,
		time: true,
	}],
};
