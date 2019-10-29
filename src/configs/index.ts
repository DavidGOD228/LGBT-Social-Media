import {CURRENT_ENVIRONMENT} from '../env'

interface Environment {
  proto: string
  host: string
}

interface EnvironmentMap<T> {
  production: T
  staging: T
  dev: T
}

const environments: EnvironmentMap<Environment> = {
  production: {
    proto: 'http',
    host: 'musldevapphost.detectthecompany.com'
  },

  staging: {
    proto: 'http',
    host: 'musldevapphost.detectthecompany.com'
  },

  dev: {
    proto: 'http',
    host: '192.168.0.251'
  }
}

const configurationFabric = (environment: keyof EnvironmentMap<Environment>) => ({
  realm: {
    schemaVersion: 45
  },

  remoteApi: {
    proto: environments[environment].proto,
    host: environments[environment].host,
    namespace: '/api',

    get base() {
      return `${this.common}${this.namespace}`
    },

    get common() {
      return `${this.proto}://${this.host}`
    }
  },

  uploadApi: {
    proto: environments[environment].proto,
    host: environments[environment].host,
    namespace: '/api',

    get base() {
      return `${this.common}/zuul${this.namespace}`
    },

    get common() {
      return `${this.proto}://${this.host}`
    }
  },

  appStore: {
    APP_ID: '1241573685',
    APP_NAME: 'MUSL App'
  }
})

const configuration = configurationFabric(CURRENT_ENVIRONMENT)

export default configuration
