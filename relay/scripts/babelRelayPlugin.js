var getbabelRelayPlugin = require('babel-relay-plugin');
var schema = require('../src/common/schema.json');

module.exports = getbabelRelayPlugin(schema.data);
