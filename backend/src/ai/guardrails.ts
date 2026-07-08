export interface Sanitizer {
  sanitize(input: string): string;
}

export interface ModerationResult {
  allowed: boolean;
  reason?: string;
}

export interface Moderator {
  checkInput(input: string): Promise<ModerationResult>;
  checkOutput(output: string): Promise<ModerationResult>;
}

export class BasicPromptInjectionSanitizer implements Sanitizer {
  private readonly denyPatterns = [
    /ignore\s+all\s+previous\s+instructions/gi,
    /reveal\s+system\s+prompt/gi,
    /developer\s+message/gi,
    /sudo\s+rm\s+-rf/gi,
  ];

  sanitize(input: string): string {
    let sanitized = input;
    for (const pattern of this.denyPatterns) {
      sanitized = sanitized.replace(pattern, "[blocked]");
    }
    return sanitized;
  }
}

export class PassThroughModerator implements Moderator {
  async checkInput(input: string): Promise<ModerationResult> {
    void input;
    return { allowed: true };
  }

  async checkOutput(output: string): Promise<ModerationResult> {
    void output;
    return { allowed: true };
  }
}
