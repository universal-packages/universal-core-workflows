import { CoreModule } from '@universal-packages/core'
import { BuildFromOptions, Workflow } from '@universal-packages/workflows'

export default class WorkflowsModule extends CoreModule<BuildFromOptions> {
  public static readonly moduleName = 'workflows-module'
  public static readonly description = 'Workflows core module wrapper'
  public static readonly defaultConfig: BuildFromOptions = { stepUsableLocation: './src', workflowsLocation: './' }

  public subject: WorkflowsModule

  public buildFrom(name: string): Workflow {
    return Workflow.buildFrom(name, this.config)
  }

  public async prepare(): Promise<void> {
    this.subject = this
  }

  public async release(): Promise<void> {
    // Do nothing
  }
}
