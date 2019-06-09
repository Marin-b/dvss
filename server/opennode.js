const opennode = require('opennode');
opennode.setCredentials(process.env.OPENNODE_KEY, 'dev');

export default opennode
