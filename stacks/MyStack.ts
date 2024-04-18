import { StackContext, Api, StaticSite, Bucket} from "sst/constructs";

export function API({ stack }: StackContext) {
  const audience = `api-JobTrackerApp-${stack.stage}`;
  const assetBucket = new Bucket(stack, "assets");
  assetBucket.bucketName

  const api = new Api(stack, "api", {
    authorizers: {
      myAuthorizer: {
        type: "jwt",
        jwt: {
          issuer: "https://jobtracker.kinde.com",
          audience: [audience],
        },
      },
    },
    defaults: {
      authorizer: "myAuthorizer",
      function: {
        environment: {
          DRIZZLE_DATABASE_URL: process.env.DRIZZLE_DATABASE_URL!,
        },
      },
    },
    routes: {
      "GET /": {
        authorizer: "none",
        function: {
          handler: "packages/functions/src/lambda.handler",
        },
      },
      "GET /all-jobs": "packages/functions/src/all-jobs.handler",
      "POST /all-jobs": "packages/functions/src/all-jobs.handler",
      "POST /signed-url": {
        function:{
          environment:{
            ASSETS_BUCKET_NAME: assetBucket.bucketName,
          },
            handler:"packages/functions/src/s3.handler",
          }
        }
      },
  });

  api.attachPermissionsToRoute("POST /signed-url", [assetBucket,"grantPut"])

  // this code setup the static site
  const web = new StaticSite(stack, "web", {
    path: "packages/web",
    buildOutput: "dist",
    buildCommand: "bun run build",
    environment: {
      VITE_APP_API_URL: api.url,
      VITE_APP_KINDE_AUDIENCE: audience,
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    WebsiteURL: web.url,
  });
}
