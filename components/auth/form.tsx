"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { TailSpin } from "react-loader-spinner"
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { UserAuthSchema, userAuthSchema } from "./schema";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { buttonVariants } from "@/components/ui/button"

export interface AuthFormProps {
  className?: string;
}

export default function AuthForm(props: AuthFormProps) {
  const { className } = props
  const router = useRouter();
  const searchParams = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAuthSchema>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setLoading] = useState(false)

  async function onSubmit(data: UserAuthSchema) {
    // 
    setLoading(true)
    // 
    setTimeout(() => {
      setLoading(false)
      router.push(searchParams.get("redirect") || "/dashboard");
    }, 1000)
  }

  return (
    <div className={cn("grid gap-6", className)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              邮箱
            </Label>
            <Input
              id="email"
              placeholder="请输入你的邮箱"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              密码
            </Label>
            <Input
              id="password"
              placeholder="请输入你的密码"
              type="password"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={cn(buttonVariants())}
            disabled={isLoading}
          >
            {isLoading && (
              <TailSpin height={16} width={16} color="#fff" />
            )}
            邮箱登录
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>
    </div>
  );
}
