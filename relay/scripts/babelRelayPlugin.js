var getbabelRelayPlugin = require('babel-relay-plugin');
var schema = require('../app/common/schema.json');

module.exports = getbabelRelayPlugin(schema.data);
