export const NODE_CLIENT_INSTRUCTIONS = [
  {
    title: 'Install the APM agent',
    textPre: 'Install the APM agent for Node.js as a dependency to your application.',
    commands: [
      'npm install elastic-apm-node --save'
    ]
  },
  {
    title: 'Configure the agent',
    textPre: 'Agents are libraries that run inside of your application process.' +
      ' APM services are created programmatically based on the `serviceName`.' +
      ' This agent supports Express, Koa, hapi, and custom Node.js.',
    commands: [
      `// Add this to the VERY top of the first file loaded in your app`,
      `var apm = require('elastic-apm-node').start({curlyOpen}`,
      `  // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)`,
      `  serviceName: '',`,
      `  `,
      `  // Use if APM Server requires a token`,
      `  secretToken: '',`,
      `  `,
      `  // Set custom APM Server URL (default: http://localhost:8200)`,
      `  serverUrl: ''`,
      `{curlyClose})`,
    ],
    textPost: 'See [the documentation]({config.docs.base_url}guide/en/apm/agent/nodejs/current/index.html)' +
    ' for advanced usage. Babel users, please refer to [the documentation]' +
    '({config.docs.base_url}guide/en/apm/agent/nodejs/current/advanced-setup.html#es-modules).'
  }
];

export const DJANGO_CLIENT_INSTRUCTIONS = [
  {
    title: 'Install the APM agent',
    textPre: 'Install the APM agent for Python as a dependency.',
    commands: [
      '$ pip install elastic-apm'
    ]
  },
  {
    title: 'Configure the agent',
    textPre: 'Agents are libraries that run inside of your application process.' +
      ' APM services are created programmatically based on the `SERVICE_NAME`.',
    commands: [
      `# Add the agent to the installed apps`,
      `INSTALLED_APPS = (`,
      `  'elasticapm.contrib.django',`,
      `  # ...`,
      `)`,
      ` `,
      `# Choose a service name and optionally a secret token`,
      `ELASTIC_APM = {curlyOpen}`,
      `  'SERVICE_NAME': '<SERVICE-NAME>',`,
      `  'SECRET_TOKEN': '<SECRET-TOKEN>',`,
      `{curlyClose}`,
      ` `,
      `# To send performance metrics, add our tracing middleware:`,
      `MIDDLEWARE = (`,
      `  'elasticapm.contrib.django.middleware.TracingMiddleware',`,
      `  #...`,
      `)`
    ],
    textPost: 'See the [documentation]' +
      '({config.docs.base_url}guide/en/apm/agent/python/current/django-support.html) for advanced usage.'
  }
];

export const RAILS_CLIENT_INSTRUCTIONS = [
  {
    title: 'Install the APM agent',
    textPre: 'Add the agent to your Gemfile.',
    commands: [
      `gem 'elastic-apm'`
    ]
  },
  {
    title: 'Configure the agent',
    textPre: 'APM is automatically installed. Configure the agent, by creating the config file `config/elastic_apm.yml`',
    commands: [
      `# config/elastic_apm.yml`,
      `server_url: 'http://localhost:8200'`,
    ],
    textPost: 'See the [documentation]' +
      '({config.docs.base_url}guide/en/apm/agent/ruby/1.x/index.html) for configuration options and advanced usage.' +
      '**Warning: The Ruby agent is currently in Beta and not meant for production use.**'
  }
];
