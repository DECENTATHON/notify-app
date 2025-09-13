
"use client";
import { Button } from "antd";
import Image from "next/image";
// import OnboardingImage from "@/shared/assets/images/png/OnboardingImage.png";
// import BackgroundImage from "@/shared/assets/images/png/BackgroundImage.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();
  return (
    <div className="relative flex flex-col items-center justify-between w-full h-[100dvh] bg-[#F14635] text-center overflow-hidden ">
      {/* <Image
        src={BackgroundImage}
        alt="Фоновый элемент"
        fill
        className="object-contain z-0 mt-[50px] max-w-[100%] max-h-[80%]"
        priority
      /> */}

      <div className="absolute inset-0 bg-black/10 z-[1]" />

      <div className="relative z-10 flex flex-col items-center justify-between w-full h-full">
        <div className="flex flex-col mt-[100px] max-w-[320px] mx-auto px-4">
          <h1 className="text-white text-[24px] leading-tight font-object-bold">
            Привет!
          </h1>
        </div>

        <div className="flex flex-col gap-4 mt-10 w-full max-w-[320px] px-4">
        <Button
      type="primary"
      htmlType="submit"
      className="onboard bg-white w-full !h-[46px] !font-golos-bold !rounded-lg disabled:!bg-gray disabled:!text-white"
      onClick={() => {
        router.push("/auth/login");
      }}
    >
      Войти
    </Button>
        </div>

        <div className="w-full">
          {/* <Image
            src={OnboardingImage}
            alt="Image"
            width={500}
            height={500}
            className="w-full h-auto object-contain"
            priority
          /> */}
        </div>
      </div>
    </div>
  );
}
