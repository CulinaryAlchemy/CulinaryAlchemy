interface Step {
	stepName: string;
	stepDescription: string;
}

export function stepValidator(array: unknown[]) {
	for (const step of array as Step[]) {
		if (!step.stepName || typeof step.stepName !== 'string') {
			throw new Error(
				'Invalid type on step, each step must contain a key called stepName, and the value must be of type string'
			);
		}
		if (!step.stepDescription || typeof step.stepDescription !== 'string') {
			throw new Error(
				'Invalid type on step, each step must contain a key called stepDescription, and the value must be of type string'
			);
		}
	}
	return true;
}
