import { CoreTask } from '@universal-packages/core'
import { TerminalTransport } from '@universal-packages/logger'
import { Status } from '@universal-packages/workflows'
import { Workflow } from '@universal-packages/workflows'

export default class WorkflowTask extends CoreTask {
  public static readonly taskName = 'workflow'
  public static readonly description = 'Workflow runner task'

  private workflow: Workflow

  public async exec(): Promise<void> {
    const terminalTransport = this.logger.getTransport('terminal') as TerminalTransport
    terminalTransport.options.categoryColors['WORKFLOWS'] = 'GREEN'

    this.workflow = workflowsSubject.buildFrom(this.directive)

    this.workflow.on(Status.Running, () => {
      this.logger.publish('INFO', 'Workflow started', `Workflow "${this.workflow.name || this.directive}" started`, 'WORKFLOWS')
    })

    this.workflow.on(Status.Success, (event) => {
      this.logger.publish('INFO', 'Workflow completed successfully', `Workflow "${this.workflow.name || this.directive}" completed successfully`, 'WORKFLOWS', {
        measurement: event.measurement
      })
    })

    this.workflow.on(Status.Failure, (event) => {
      this.logger.publish('ERROR', 'Workflow failed', `Workflow "${this.workflow.name || this.directive}" failed`, 'WORKFLOWS', { measurement: event.measurement })
    })

    this.workflow.on(Status.Stopping, () => {
      this.logger.publish('WARNING', 'Workflow stopping', `Workflow "${this.workflow.name || this.directive}" stopping`, 'WORKFLOWS')
    })

    this.workflow.on(Status.Stopped, (event) => {
      this.logger.publish('INFO', 'Workflow stopped', `Workflow "${this.workflow.name || this.directive}" stopped`, 'WORKFLOWS', { measurement: event.measurement })
    })

    this.workflow.on(Status.Error, (event) => {
      this.logger.publish('ERROR', 'Workflow error', `Workflow "${this.workflow.name || this.directive}" error`, 'WORKFLOWS', { error: event.error })
    })

    this.workflow.on(`routine:${Status.Running}`, (event) => {
      this.logger.publish('INFO', 'Routine started', `Routine "${event.payload.name}" started`, 'WORKFLOWS')
    })

    this.workflow.on(`routine:${Status.Success}`, (event) => {
      this.logger.publish('INFO', 'Routine completed successfully', `Routine "${event.payload.name}" completed successfully`, 'WORKFLOWS')
    })

    this.workflow.on(`routine:${Status.Failure}`, (event) => {
      this.logger.publish('ERROR', 'Routine failed', `Routine "${event.payload.name}" failed`, 'WORKFLOWS')
    })

    this.workflow.on(`routine:${Status.Stopping}`, (event) => {
      this.logger.publish('WARNING', 'Routine stopping', `Routine "${event.payload.name}" stopping`, 'WORKFLOWS')
    })

    this.workflow.on(`routine:${Status.Stopped}`, (event) => {
      this.logger.publish('INFO', 'Routine stopped', `Routine "${event.payload.name}" stopped`, 'WORKFLOWS')
    })

    this.workflow.on(`routine:${Status.Error}`, (event) => {
      this.logger.publish('ERROR', 'Routine error', `Routine "${event.payload.name}" error`, 'WORKFLOWS', { error: event.error })
    })

    this.workflow.on(`step:${Status.Running}`, (event) => {
      this.logger.publish('INFO', 'Step started', `Routine "${event.payload.routine}": Step #${event.payload.index + 1} started`, 'WORKFLOWS')
    })

    this.workflow.on(`step:${Status.Success}`, (event) => {
      this.logger.publish('INFO', 'Step completed successfully', `Routine "${event.payload.routine}": Step #${event.payload.index + 1} completed successfully`, 'WORKFLOWS')
    })

    this.workflow.on(`end`, () => {
      this.logger.publish('DEBUG', 'Workflow Graph', null, 'WORKFLOWS', { metadata: { graph: this.workflow.graph } })
    })

    await this.workflow.run()

    await this.logger.await

    this.workflow.removeAllListeners()
  }

  public async abort(): Promise<void> {
    await this.workflow.stop()
  }
}
