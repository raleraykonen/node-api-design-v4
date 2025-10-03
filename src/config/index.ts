import merge from "lodash.merge";
import prodConfig from "./prod.js";
import testingConfig from "./testing.js";
import localConfig from "./local.js";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const stage = process.env.STAGE || "local";

let envConfig;

if(stage === "production") {
  envConfig = prodConfig;
} else if(stage === "testing") {
  envConfig = testingConfig;
} else {
  envConfig = localConfig;
}

export default merge({
  stage,
  env: process.env.NODE_ENV,
  port: process.env.PORT || 4000,
  secrets: {
    jwt: process.env.JWT_SECRET,
    dbUrl: process.env.DATABASE_URL
  }
}, envConfig);