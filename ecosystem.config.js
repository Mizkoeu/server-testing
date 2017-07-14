module.exports = {
    apps: [{
	    name: 'mike-server',
	    script: './index.js'
	}],
    deploy: {
	production: {
	    user: 'ubuntu',
	    host: 'ec2-52-209-166-225.eu-west-1.compute.amazonaws.com',
	    key: '~/.ssh/mike-server.pem',
	    ref: 'origin/master',
	    repo : 'git@github.com:Mizkoeu/server-testing.git',
	    path : '/home/ubuntu/server-testing',
	    'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
	   }
  }
}
