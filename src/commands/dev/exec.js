const execa = require('execa')
const Command = require('@netlify/cli-utils')
const { addEnvVarsFromAddons } = require('../utils/dev-exec')

class ExecCommand extends Command {
  async run() {
    const { site } = this.netlify
    if (site.id) {
      const accessToken = await this.authenticate()
      await addEnvVarsFromAddons(site, accessToken)
    }
    execa(this.argv[0], this.argv.slice(1), { env: process.env, stdio: 'inherit' })
  }
}

ExecCommand.description = `Exec command
Runs a command within the netlify dev environment, e.g. with env variables from any installed addons
`

ExecCommand.examples = ['$ netlify exec npm run bootstrap']

ExecCommand.strict = false
ExecCommand.parse = false

module.exports = ExecCommand
