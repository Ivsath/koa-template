'use strict'

const Joi = require('joi')

/**
 * Generate a validation schema using Joi to check the type of your environment variables
 */
const envSchema = Joi.object({
  NODE_ENV: Joi.string().allow('development', 'production', 'test'),
  PORT: Joi.number(),
  API_VERSION: Joi.string(),
})
  .unknown()
  .required()

/**
 * Validate the env variables using Joi.validate()
 */
const { error, value: envVars } = envSchema.validate(process.env)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  env: envVars.NODE_ENV,
  isTest: envVars.NODE_ENV === 'test',
  isDevelopment: envVars.NODE_ENV === 'development',
  server: {
    port: envVars.PORT || 3000,
    apiVersion: envVars.API_VERSION || 'v1',
  },
}

module.exports = config
