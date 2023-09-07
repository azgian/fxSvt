module.exports = {
	apps: [
		{
			name: 'Project Name',

			script: 'build/index.js',

			instances: 1,

			autorestart: true,

			watch: false,

			max_memory_restart: '1G',

			env: {
				NODE_ENV: 'production',

				PORT: 3000

				// 기타 환경 변수 설정
			}
		}
	]
};
