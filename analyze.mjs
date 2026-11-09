export function analyze(input) {
  const rules = {
    StopLogging: ["AWS", "Logging disabled"],
    DeleteTrail: ["AWS", "Trail deleted"],
    AttachUserPolicy: ["AWS", "User policy attached"],
    "microsoft.authorization/roleassignments/write": ["Azure", "Role assignment changed"],
    "microsoft.insights/diagnosticsettings/delete": ["Azure", "Diagnostic settings deleted"]
  };
  const findings = input.events.flatMap(event => {
    if (event.errorCode || /failed/i.test(event.status?.value ?? "")) return [];
    const operation = event.eventName ?? event.operationName?.value?.toLowerCase();
    const rule = Object.hasOwn(rules, operation) ? rules[operation] : null;
    return rule ? [{id: event.eventID ?? event.eventDataId, provider: rule[0], operation, reason: rule[1]}] : [];
  });
  return {scanned: input.events.length, count: findings.length, findings};
}
