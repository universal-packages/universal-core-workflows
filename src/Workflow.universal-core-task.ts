import { CoreTask } from '@universal-packages/core'

export default class WorkflowTask extends CoreTask {
  public static readonly taskName = 'workflow'
  public static readonly description = 'Workflow runner task'

  public async exec(): Promise<void> {
    await workflowsSubject.buildFromAndRun(this.directive)
  }

  public async abort(): Promise<void> {
    await workflowsSubject.stop()
  }
}
