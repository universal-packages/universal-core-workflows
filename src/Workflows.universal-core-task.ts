import { CoreTask } from '@universal-packages/core'
import { populateTemplates } from '@universal-packages/template-populator'
import path from 'path'

export default class WorkflowsTask extends CoreTask {
  public static readonly taskName = 'workflows-task'
  public static readonly description = 'Workflows jobs related tasks'

  public async exec(): Promise<void> {
    switch (this.directive) {
      case 'init':
        await populateTemplates(path.resolve(__dirname, 'template'), './', { override: this.args.f })
        this.logger.log({ level: 'INFO', title: 'Workflows template initialized' })
        break

      default:
        throw new Error(`Unrecognized directive ${this.directive}`)
    }
  }
}
