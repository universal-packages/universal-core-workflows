import { CoreTask } from '@universal-packages/core'
import { Workflow } from '@universal-packages/workflows'

export default class WorkflowTask extends CoreTask {
  public static readonly taskName = 'workflow'
  public static readonly description = 'Workflow runner task'

  private workflow: Workflow

  public async exec(): Promise<void> {
    this.workflow = workflowsSubject.buildFrom(this.directive)

    await this.workflow.run()
    await this.logger.waitForLoggingActivity()

    this.workflow.removeAllListeners()
  }

  public async abort(): Promise<void> {
    await this.workflow.stop()
  }
}
