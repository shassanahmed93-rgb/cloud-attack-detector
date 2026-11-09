# Cloud Attack Detector

Flag CloudTrail and Azure Activity operations that weaken logging or elevate access.

[Run the portfolio demo](https://shassanahmed.space/cyber-labs/cloud-attack-detector/)

## Reproduce the result

Open `index.html` in a modern browser or run `node test.mjs` with Node.js 20+. The demo accepts editable JSON and exports evidence. The sample input is in `fixture.json`.

## Sample evidence

```json
{
  "scanned": 3,
  "count": 2,
  "findings": [
    {
      "id": "aws-4",
      "provider": "AWS",
      "operation": "StopLogging",
      "reason": "Logging disabled"
    },
    {
      "id": "az-4",
      "provider": "Azure",
      "operation": "microsoft.authorization/roleassignments/write",
      "reason": "Role assignment changed"
    }
  ]
}
```

## Scope

Synthetic lab inputs and deterministic rules. Review results before applying them to a real incident.

## What this demonstrates

**Correlate high-impact AWS and Azure administrative changes.** Compare successful logging and privilege changes with a denied action. Approved maintenance can trigger the same rule. Check actor, change ticket, and whether logging resumed.

[Reference guidance](https://attack.mitre.org/datacomponents/DC0090/)
