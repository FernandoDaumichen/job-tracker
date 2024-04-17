import { StackContext, Api , StaticSite} from "sst/constructs";

export function API({ stack }: StackContext) {

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        environment: {
          DRIZZLE_DATABASE_URL: process.env.DRIZZLE_DATABASE_URL!,
        },
      },
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /all-jobs": 'packages/functions/src/all-jobs.handler',
      "POST /all-jobs": 'packages/functions/src/all-jobs.handler',
    },
  });

 
// this code setup the static site 
const web= new StaticSite(stack, "web", {
  path: "packages/web",
  buildOutput: "dist",
  buildCommand: "bun run build",
  environment: {
   VITE_APP_API_URL: api.url,
  },
});

  stack.addOutputs({
    ApiEndpoint: api.url,
    WebsiteURL: web.url,
  });
}
