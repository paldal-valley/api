import moduleAlias from 'module-alias'

moduleAlias.addAliases({
  '@dao': `${__dirname}/../../models`,
  '@db': `${__dirname}/../../models/connection`,
  '@middle': `${__dirname}/../../middlewares`
})
