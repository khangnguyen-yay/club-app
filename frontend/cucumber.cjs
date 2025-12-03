module.exports = {
  default: {
    timeout: 10000,
    import: [
      'ts-node/register',
      'tests/world.ts',
      'tests/hooks.ts',
      'tests/features/step_definitions/**/*.ts'
    ],
    paths: [
      'tests/features/**/*.feature'
    ],
    format: ['progress', 'html:reports/cucumber-report.html']
  }
};

