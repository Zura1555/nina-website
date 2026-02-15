import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'q19duczp',
    dataset: 'production'
  },
  studioHost: 'nina-studio',
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
    appId: 'zgwgogt68dfi30g56zgdtzf1',
  }
})
