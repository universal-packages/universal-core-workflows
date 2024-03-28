import WorkflowTask from '../src/Workflow.universal-core-task'

describe(WorkflowTask, (): void => {
  it('behaves as expected', async (): Promise<void> => {
    await jestCore.execTask('workflow', {
      directive: 'test',
      coreConfigOverride: {
        config: { location: './tests/__fixtures__/config-test' },
        modules: { location: './tests/__fixtures__' },
        tasks: { location: './tests/__fixtures__' },
        logger: { silence: true, level: 'DEBUG' }
      }
    })
  })
})
