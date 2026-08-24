import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { OnboardingValues } from "@/lib/validation/onboarding.validation";
import {
  answers,
  saveOnboardingAnswer,
  stepIndex,
  steps,
} from "@/constants/onboarding";
import SafeAreaScreen from "@/components/ui/safe-area-screen";
import { useAppThemeColor } from "@/theme/app.theme";
import { Feather } from "@expo/vector-icons";
import Button from "@/components/ui/button";
import GenderStep from "@/components/onboarding/gender-step";
import GoalStep from "@/components/onboarding/goal-step";
import ExperienceStep from "@/components/onboarding/experience-step";

export default function onboardingSteps() {
  const foreground = useAppThemeColor("foreground");
  const { step: key = "" } = useLocalSearchParams<{ step: string }>();
  const router = useRouter();
  const [values, setValues] = useState<Partial<OnboardingValues>>(() => ({
    ...answers,
  }));
  const index = stepIndex(key);
  const step = steps[index];
  if (!step) return <Redirect href={"/(public)/welcome"} />;
  const next = steps[index + 1];

  const onselect = (value: OnboardingValues[typeof step.field]) => {
    const nextValues = { ...values, [step.field]: value };
    saveOnboardingAnswer(step.field, value);
    setValues(nextValues);
  };
  const goback = () => {
    if (index == 0) {
      router.replace("/(public)/welcome");
    } else {
      router.back();
    }
  };
  const goNext = () => {
    if (next) {
      router.push({
        pathname: "/onboarding/[step]",
        params: { step: next.key },
      });
    } else {
      router.push("/(public)/sign-up");
    }
  };

  return (
   <SafeAreaScreen>
  <View className="flex-1 px-6">

    {/* Header */}
    <View className="pb-5 pt-4">
      <View className="flex-row items-center gap-2">
        <Pressable
          className="-ml-3 h-11 w-11 items-center justify-center rounded-full active:bg-muted"
          onPress={goback}
        >
          <Feather name="arrow-left" color={foreground} size={23} />
        </Pressable>

        <View className="h-2 flex-1 overflow-hidden rounded-full bg-border">
          <View
            className="h-full rounded-full bg-primary"
            style={{
              width: `${((index + 1) / steps.length) * 100}%`,
            }}
          />
        </View>
      </View>
    </View>

    {/* Step content */}
    <View className="flex-1">
      {step.key === "gender" && (
        <GenderStep
          value={values.gender}
          onSelect={onselect}
        />
      )}

      {step.key === "goal" && (
        <GoalStep
          value={values.goal}
          onSelect={onselect}
        />
      )}

      {step.key === "experience" && <ExperienceStep value={values.experience} onSelect={onselect}/>}
    </View>

    {/* Bottom button */}
    <Button className="mb-3"
      disabled={!values[step.field]}
      onPress={goNext}
    >
      {next ? "Next" : "Continue to sign Up"}
    </Button>

  </View>
</SafeAreaScreen>
  );
}
