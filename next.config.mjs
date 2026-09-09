import nextra from 'nextra'

const withNextra = nextra({})

export default withNextra({
  agentRules: false,
  output: 'export',
  trailingSlash: true,
  experimental: {
    useTypeScriptCli: false
  },
  images: {
    unoptimized: true
  }
})
