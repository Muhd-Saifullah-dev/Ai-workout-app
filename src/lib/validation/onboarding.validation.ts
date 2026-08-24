import { z } from "zod";

export const OnboardingValuesSchema = z.object({
  experience: z.enum(["beginner", "intermediate", "advanced"]),
  gender: z.enum(["male", "female"]),
  goal: z.enum(["build-muscle", "lose-fat", "maintain"]),
});

export type OnboardingValues = z.infer<typeof OnboardingValuesSchema>;
export type OnboardingExperience=OnboardingValues['experience']
export type OnboardingGender=OnboardingValues['gender']
export type OnboardingGoal=OnboardingValues['goal']