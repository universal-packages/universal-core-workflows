import { WorkflowsModule } from '../src'

jestCore.runBare({
  coreConfigOverride: {
    config: { location: './tests/__fixtures__/config-test' },
    modules: { location: './tests/__fixtures__' },
    logger: { silence: true }
  }
})

describe(WorkflowsModule, (): void => {
  it('behaves as expected', async (): Promise<void> => {
    expect(global.workflowsSubject).not.toBeUndefined()
    expect(global.workflowsSubject).toEqual(core.coreModules['workflowsModule'])
  })
})
