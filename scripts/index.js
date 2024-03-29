const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const resolve = (...file) => path.resolve(__dirname, ...file)

const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))

// 导入模板
const {
  vueTemplate,
  tebleTemplate,
  searchTemplate,
  unitTemplate
} = require('./template')

// 生成文件
const generateFile = (path, data) => {
  if (fs.existsSync(path)) {
    errorLog(`${path}文件已存在`)
    return
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', err => {
      if (err) {
        errorLog(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

log('请输入要生成的页面组件名称、会生成在 views/目录下')

process.stdin.on('data', async chunk => {

  // 组件名称
  const inputName = String(chunk).trim().toString()

  // Vue页面组件路径
  const vueComponentPath = resolve('../../../src/views', inputName)
  // components路径
  const componentPath = resolve(`../../../src/views/${inputName}`, 'components')
  // components路径
  const unitPath = resolve(`../../../src/views/${inputName}`, 'unit')

  // vue文件
  const vueFile = resolve(vueComponentPath, 'index.vue')

  // tableCom文件
  const tableVueFile = resolve(componentPath, 'tableCom.vue')

  // searchCom文件
  const searchVueFile = resolve(componentPath, 'searchCom.vue')

  // unit文件
  const unitFile = resolve(unitPath, 'ENUM.vue')

  // 判断组件文件夹是否存在
  const hasComponentExists = fs.existsSync(vueComponentPath)

  if (hasComponentExists) {
    errorLog(`${inputName}页面组件已存在，请重新输入`)
    return
  } else {
    log(`正在生成 component 目录 ${vueComponentPath}`)
    await dotExistDirectoryCreate(vueComponentPath)
  }

  try {
    log(`正在生成 vue 文件 ${vueFile}`)
    await generateFile(vueFile, vueTemplate(inputName))

    log(`正在生成 components 文件`)
    await dotExistDirectoryCreate(componentPath)
    await generateFile(tableVueFile, tebleTemplate())
    await generateFile(searchVueFile, searchTemplate())

    log(`正在生成 unit 文件`)
    await dotExistDirectoryCreate(unitPath)
    await generateFile(unitFile, unitTemplate())

    successLog('生成成功')
  } catch (e) {
    errorLog(e.message)
  }

  process.stdin.emit('end')
})
process.stdin.on('end', () => {
  log('exit')
  process.exit()
})

function dotExistDirectoryCreate(directory) {
  return new Promise((resolve) => {
    mkdirs(directory, function () {
      resolve(true)
    })
  })
}
// 递归创建目录
function mkdirs(directory, callback) {
  var exists = fs.existsSync(directory)
  if (exists) {
    callback()
  } else {
    mkdirs(path.dirname(directory), function () {
      fs.mkdirSync(directory)
      callback()
    })
  }
}
