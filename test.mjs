import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {analyze} from "./analyze.mjs";
const sample = JSON.parse(readFileSync(new URL("./fixture.json", import.meta.url)));
assert.deepEqual(analyze(sample)["count"], 2);
console.log("Fixture passed");
const comparison = {
  "events": [
    {
      "eventName": "StopLogging",
      "eventID": "aws-denied",
      "errorCode": "AccessDenied"
    },
    {
      "operationName": {
        "value": "Microsoft.Authorization/roleAssignments/write"
      },
      "status": {
        "value": "Failed"
      }
    }
  ]
};
assert.deepEqual(analyze(comparison)["count"], 0);
console.log("Comparison fixture passed");
