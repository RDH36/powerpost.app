"use client";
import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

type Step = {
  id: string;
  label: string;
  identification: string;
  status: "pending" | "loading" | "completed";
};

export function PowerPostLoader() {
  const [steps, setSteps] = useState<Step[]>([
    {
      id: "fetching",
      label: "We are fetching post for you...",
      status: "loading",
      identification: "Fetching post",
    },
    {
      id: "analyzing",
      label: "We are analyzing post for you...",
      status: "pending",
      identification: "Analyzing post",
    },
    {
      id: "creating",
      label: "We are creating Power Post for you...",
      status: "pending",
      identification: "Creating post",
    },
    {
      id: "title",
      label: "We are finding title for you...",
      status: "pending",
      identification: "Generate Title",
    },
    {
      id: "cover",
      label: "We are generating cover for you...",
      status: "pending",
      identification: "Generate Cover",
    },
    {
      id: "publish",
      label: "Publishing post...",
      status: "pending",
      identification: "Publish post",
    },
  ]);

  const [currentStep, setCurrentStep] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setSteps((prevSteps) => {
        const newSteps = [...prevSteps];
        if (currentStep < newSteps.length) {
          newSteps[currentStep].status = "completed";
          if (currentStep + 1 < newSteps.length) {
            newSteps[currentStep + 1].status = "loading";
          }
        }
        return newSteps;
      });
      setCurrentStep((prevStep) => prevStep + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentStep]);

  useEffect(() => {
    if (currentStep < steps.length) {
      setMessage(steps[currentStep].label);
    } else {
      setMessage(steps[steps.length - 1].label);
    }
  }, [currentStep, steps]);

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardContent className="space-y-6">
        <p className="p-5 text-center text-lg text-muted-foreground">
          {message}
        </p>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center justify-center space-y-2 rounded-lg border border-dashed p-4 text-center"
            >
              <div className="flex size-8 items-center justify-center">
                {step.status === "completed" ? (
                  <CheckIcon className="size-5 text-primary" />
                ) : step.status === "loading" ? (
                  <ReloadIcon className="size-5 animate-spin text-primary" />
                ) : (
                  <div className="size-5 rounded-full border-2 border-muted" />
                )}
              </div>
              <span className="text-sm font-medium">{step.identification}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
