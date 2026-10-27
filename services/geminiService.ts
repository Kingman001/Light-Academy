export interface PerformanceSample {
  name: string;
  score: number;
}

export interface StudentInsightService {
  getPerformanceInsight(samples: readonly PerformanceSample[]): Promise<string>;
}

export const studentInsightService: StudentInsightService = {
  async getPerformanceInsight(_samples) {
    throw new Error('AI study guidance is not configured. Connect a protected school backend before enabling this feature.');
  },
};

export const getAIPerformanceInsight = (samples: readonly PerformanceSample[]) =>
  studentInsightService.getPerformanceInsight(samples);
