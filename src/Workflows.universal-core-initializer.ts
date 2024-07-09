import CoreInitializer from '@universal-packages/core/CoreInitializer'

export default class WorkflowsInitializer extends CoreInitializer {
  public static readonly initializerName = 'workflows'
  public static readonly description: string = 'Workflows core initializer'

  public readonly templatesLocation: string = `${__dirname}/templates`
}
