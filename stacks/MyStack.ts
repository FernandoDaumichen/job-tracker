import { StackContext, Api , StaticSite} from "sst/constructs";

export function API({ stack }: StackContext) {

  const api = new Api(stack, "api", {
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
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
