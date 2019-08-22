const vueTemplate = require('./template/index')
const tebleTemplate = require('./template/tableCom')
const searchTemplate = require('./template/searchCom')
const unitTemplate = require('./template/unit')

module.exports = {
  vueTemplate: () => {
    return vueTemplate
	},
	tebleTemplate: () => {
		return tebleTemplate
	},
	searchTemplate: () => {
		return searchTemplate
	},
	unitTemplate: () => {
		return unitTemplate
	}
}
