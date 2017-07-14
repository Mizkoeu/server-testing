module.exports = {
    apps: [{
	    name: 'mike-server',
	    script: './index.js'
	}],
    deploy: {
	production: {
	    user: 'ubuntu',
	    host: 'ec2-13-58-191-238.us-east-2.compute.amazonaws.com',
	    key: '~/.ssh/mike-server.pem',
	    ref: 'origin/master',
	    repo : 'git@github.com:Mizkoeu/server-testing.git',
	    path : '/home/ubuntu/server/current',
	    'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
	   }
  }
}
