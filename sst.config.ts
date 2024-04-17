import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";
import dotenv from "dotenv";
dotenv.config();

export default {
  config(_input) {
    return {
      name: "job-tracker",
      region: "us-west-2",
    };
  },
  stacks(app) {
    app.stack(API);
  }
} satisfies SSTConfig;
