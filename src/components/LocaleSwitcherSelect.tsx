"use client";

import { setUserLocale } from "@/i18n-request/local";
import { Locale } from "@/i18n/config";
import * as Select from "@radix-ui/react-select";
import clsx from "clsx";
import { CheckIcon, Globe } from "lucide-react";
import { useTransition } from "react";

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string; code: string }>;
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label,
}: Props) {
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  const localItem = items.filter((item) => item.value === defaultValue);

  if (localItem?.length === 0) {
    throw Error("Local not found");
  }

  return (
    <div className="relative">
      <Select.Root defaultValue={defaultValue} onValueChange={onChange}>
        <Select.Trigger
          aria-label={label}
          className={clsx(
            "rounded-sm p-2 flex items-center gap-2 group transition-colors hover:bg-slate-200",
            isPending && "pointer-events-none opacity-60"
          )}
        >
          <Select.Icon>
            <Globe className="h-5 w-5 text-white group-hover:text-black" />
          </Select.Icon>
          <span className="font-medium text-white  group-hover:text-black">
            {localItem[0].code.toUpperCase()}
          </span>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            align="end"
            className="min-w-[8rem] overflow-hidden rounded-sm bg-white py-1 shadow-md border border-slate-200"
            position="popper"
          >
            <Select.Viewport>
              {items.map((item) => (
                <Select.Item
                  key={item.value}
                  className="flex cursor-default items-center justify-between px-3 py-2 text-base data-[highlighted]:bg-slate-100 outline-none"
                  value={item.value}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900 min-w-[2rem]">
                      {item.code.toUpperCase()}
                    </span>
                    <span className="text-slate-700">{item.label}</span>
                  </div>
                  {item.value === defaultValue && (
                    <CheckIcon className="h-4 w-4 text-slate-600" />
                  )}
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.Arrow className="fill-white text-white" />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}