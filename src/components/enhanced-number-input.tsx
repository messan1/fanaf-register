"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Plus, Minus, Infinity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form"
import { Label } from "@/components/ui/label"
import NumberFlow from '@number-flow/react'

interface EnhancedNumberInputProps<TFieldValues extends FieldValues> {
    label: string;
    name?: Path<TFieldValues>;
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number;
    unit?: string;
    disabled?: boolean;
    showFormLabel?: boolean;
    formLabel?: string;
    className?: string;
    hidFormLabel?:boolean
    value?: string | number;
    onChange?: (value: string) => void;
    showInfiniteSwitch?: boolean;
}

export const EnhancedNumberInput = <TFieldValues extends FieldValues>({
    label,
    name,
    min,
    max,
    step = 1,
    unit,
    disabled,
    className,
    formLabel,
    showFormLabel,
    hidFormLabel,
    value: propValue,
    onChange,
    defaultValue,
    showInfiniteSwitch = false,
    ...props
}: EnhancedNumberInputProps<TFieldValues> & Partial<ControllerRenderProps>) => {

    const [isInfinite, setIsInfinite] = useState(() => {
        const value = propValue || defaultValue
        return value === -1 || value === "∞" || value === "-1";
    });
    const [isFocused, setIsFocused] = useState(true);
    const [internalValue, setInternalValue] = useState(() => {
        const value = propValue || defaultValue

        if (value === -1 || value === "∞" || value === "-1") {
            return "-1";
        }
        return propValue !== undefined ? `${propValue}` : '0';
    });

    const effectiveMax = isInfinite ? Infinity : (max ?? 1000000);

    useEffect(() => {
        if (propValue !== undefined) {
            if (propValue === -1 || propValue === "∞" || propValue === "-1") {
                setIsInfinite(true);
                setInternalValue("-1");
            } else {
                setInternalValue(`${propValue}`);
                setIsInfinite(false);
            }
        }
    }, [propValue]);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {
        setIsFocused(internalValue !== '');
        if (props.onBlur) {
            props.onBlur();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (newValue === '' || /^\d*\.?\d*$/.test(newValue)) {
            setInternalValue(newValue);
            if (onChange) {
                onChange(newValue);
            }
        }
    };

    const handleInfiniteToggle = (checked: boolean) => {
        setIsInfinite(checked);
        const newValue = checked ? "-1" : "0";
        setInternalValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    const incrementValue = () => {
        const currentValue = parseFloat(internalValue) || 0;
        const newValue = Math.min(currentValue + step, effectiveMax as number);
        const stringValue = newValue.toString();
        setInternalValue(stringValue);
        if (onChange) {
            onChange(stringValue);
        }
    };

    const decrementValue = () => {
        const currentValue = parseFloat(internalValue) || 0;
        const newValue = Math.max(currentValue - step, min !== undefined ? min : -Infinity);
        const stringValue = newValue.toString();
        setInternalValue(stringValue);
        if (onChange) {
            onChange(stringValue);
        }
    };

    const formatUnit = (unit: string) => {
        if (unit === 'm2') {
            return (
                <>
                    m<sup>2</sup>
                </>
            );
        }
        return unit;
    };

    const displayValue = () => {
        if (isInfinite) return "∞";
        if (internalValue === '') return '0';
        return parseFloat(internalValue).toLocaleString();
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                {showFormLabel && <Label className="font-semibold text-sm">{formLabel}</Label>}
                {showInfiniteSwitch && (
                    <div className="flex items-center justify-end space-x-2">
                        <Label htmlFor="infinite-mode" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {!isInfinite ? "Limitée" : "Illimitée"}
                        </Label>
                        <Switch
                            disabled={disabled}
                            id="infinite-mode"
                            checked={isInfinite}
                            onCheckedChange={handleInfiniteToggle}
                            className="data-[state=checked]:bg-blue-500"
                        />
                    </div>
                )}
            </div>
            <div className={cn("grid grid-cols-2 justify-between items-center gap-4", className)}>
                <div className="text-center flex flex-col">
                    <span className="text-4xl font-bold">
                        
                        <NumberFlow value={displayValue()} />
                    </span>

                    {unit && !isInfinite && (
                        <span className="ml-2 text-2xl font-medium text-gray-600">
                            {formatUnit(unit)}
                        </span>
                    )}
                </div>
                <div className="relative flex items-center">
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        disabled={disabled}
                        className="absolute left-0 disabled:cursor-not-allowed z-10 rounded-l-2xl"
                        onClick={decrementValue}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <input
                        type="text"
                        value={isInfinite ? "∞" : internalValue}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        name={name}
                        defaultValue={defaultValue}
                        disabled={disabled || isInfinite}
                        className={cn(
                            "w-full rounded-2xl border disabled:cursor-not-allowed bg-white focus:outline-none border-gray-300 px-12 pb-1 py-2 text-center",
                            "focus:ring-2 focus:ring-blue-400 focus:border-blue-500 pt-8",
                            "transition-all duration-300 ease-in-out",
                            "animate-focus-ring",
                            hidFormLabel && "py-2"
                        )}
                        {...props}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        disabled={disabled}
                        className="absolute right-0 disabled:cursor-not-allowed z-10 rounded-r-2xl"
                        onClick={incrementValue}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                    <label
                        className={cn(
                            "absolute left-1/2 -translate-x-1/2 text-gray-500 transition-all duration-300 ease-in-out pointer-events-none",
                            isFocused || internalValue !== '0'
                                ? "top-2 text-xs text-gray-500"
                                : "top-[17px] text-base"
                        )}
                    >
                        {label}
                    </label>
                </div>
            </div>
        </div>
    );
};
