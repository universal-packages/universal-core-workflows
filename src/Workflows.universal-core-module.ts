import { CoreModule } from '@universal-packages/core'
import { BuildFromOptions, Workflow } from '@universal-packages/workflows'
import { WorkflowTerminalPresenter } from '@universal-packages/workflows-terminal-presenter'
import { LOG_CONFIGURATION } from '@universal-packages/workflows-terminal-presenter/LOG_CONFIGURATION'

export default class WorkflowsModule extends CoreModule<BuildFromOptions> {
  public static readonly moduleName = 'workflows-module'
  public static readonly description = 'Workflows core module wrapper'
  public static readonly defaultConfig: BuildFromOptions = { stepUsableLocation: './src', workflowsLocation: './' }

  public subject: WorkflowsModule

  private workflowRunning: Workflow

  public async buildFromAndRun(name: string): Promise<void> {
    if (this.workflowRunning) {
      this.logger.log(
        {
          level: 'WARNING',
          title: 'Workflow already running',
          message: 'A workflow is already running, please wait until it finishes.',
          category: 'WORKFLOWS'
        },
        LOG_CONFIGURATION
      )

      return
    }

    this.workflowRunning = Workflow.buildFrom(name, this.config)

    const workflowTerminalPresenter = new WorkflowTerminalPresenter({
      logger: this.logger,
      showStrategyRoutines: 'running',
      terminalPresenterAccess: 'core',
      workflow: this.workflowRunning
    })

    workflowTerminalPresenter.present()

    await this.workflowRunning.run()
    await this.logger.waitForLoggingActivity()

    this.workflowRunning = null
  }

  public async stop(): Promise<void> {
    if (this.workflowRunning) await this.workflowRunning.stop()
  }

  public async prepare(): Promise<void> {
    this.subject = this
  }

  public async release(): Promise<void> {
    // Do nothing
  }
}
