import dotenv from 'dotenv';
import path from 'node:path';
import fs from 'node:fs';

try {

  // Read the (env) argument from CLI
  const environment = process.argv[2];
  const allowedEnvs = ['development', 'staging', 'production'];

  if (!allowedEnvs.includes(environment.toLowerCase())) {
    throw new Error(`Invalid environment selected: ${environment}!`);
  }

  // Set up env file extension
  const envFile = `.env.${environment}`;
  const currentWorkingDirectory = process.cwd();

  // Locate env file in the root directory
  const pathToEnvFile = path.resolve(currentWorkingDirectory, envFile);

  if (!pathToEnvFile) {
    throw new Error(`Env file not found: ${pathToEnvFile}!`);
  }

  // load the environment file (env vars) based on selected environment
  dotenv.config({
    path: pathToEnvFile
  });

  // Environment variable should appear in the process.env object
  console.table({
    environment,
    isProduction: process.env.production,
    greeting: process.env.greeting,
    apiBaseURL: process.env.apiBaseURL
  });

  // Locate the Angular environment file
  const angularEnvFile = `src/environments/environment.${environment}.ts`
  const pathToAngularEnvFile = path.resolve(currentWorkingDirectory, angularEnvFile);

  if (!pathToAngularEnvFile) {
    throw new Error(`Env file not found: ${pathToAngularEnvFile}!`);
  }

  // Read existing content as String
  const currentContent = fs.readFileSync(pathToAngularEnvFile, 'utf8');

  let contentToOverride = '';

  if (!currentContent) {

    // If empty => create new content
    const newContent = `
    export const environment = {
  production: ${process.env.production === 'true'},
  apiBaseURL: '${process.env.apiBaseURL}',
  greeting: '${process.env.greeting}'
};
`;

    contentToOverride = newContent.trim();

  } else {

    // Update the existing contents of Angular environment file (using RegEx)
    const updatedContent = currentContent
      .replace(/production: .*/, `production: ${process.env.production === 'true'},`)
      .replace(/apiBaseURL: .*/, `apiBaseURL: '${process.env.apiBaseURL}',`)
      .replace(/greeting: .*/, `greeting: '${process.env.greeting}',`);

    contentToOverride = updatedContent;
  }

  // Override the file
  fs.writeFileSync(pathToAngularEnvFile, contentToOverride);

  console.log('Environment file updated!');
} catch (ex) {
  console.error(ex);
}
