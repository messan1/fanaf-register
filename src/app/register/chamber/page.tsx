"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardDescription } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { EnhancedNumberInput } from "@/components/enhanced-number-input";

export default function ChamberPage() {
  const router = useRouter();
  const t = useTranslations("Reservation.RoomSelection");
  const tLegal = useTranslations("Reservation.legal");

  const [hotelName] = useQueryState("hotelName");
  const [checkInDate] = useQueryState("checkInDate");
  const [checkOutDate] = useQueryState("checkOutDate");

  const [roomType, setRoomType] = useQueryState("roomType", {
    defaultValue: "",
  });
  const [numberOfRooms, setNumberOfRooms] = useQueryState("numberOfRooms", {
    defaultValue: "1",
  });

  const [errors, setErrors] = useState<{
    roomType?: string;
    numberOfRooms?: string;
  }>({});

  // Dummy data for room types
  const roomTypes = [
    "Standard Room",
    "Deluxe Room",
    "Suite",
    "Executive Suite",
  ];

  const validateForm = () => {
    const newErrors: { roomType?: string; numberOfRooms?: string } = {};
    let isValid = true;

    if (!roomType || roomType.trim() === "") {
      newErrors.roomType = t("fields.roomType.required");
      isValid = false;
    }
    if (!numberOfRooms || numberOfRooms.trim() === "") {
      newErrors.numberOfRooms = t("fields.numberOfRooms.required");
      isValid = false;
    } else if (isNaN(Number(numberOfRooms)) || Number(numberOfRooms) <= 0) {
      newErrors.numberOfRooms = t("fields.numberOfRooms.invalid");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      router.push(
        `/register/confirmation?hotelName=${encodeURIComponent(
          hotelName || ""
        )}&checkInDate=${encodeURIComponent(
          checkInDate || ""
        )}&checkOutDate=${encodeURIComponent(
          checkOutDate || ""
        )}&roomType=${encodeURIComponent(
          roomType || ""
        )}&numberOfRooms=${encodeURIComponent(numberOfRooms || "")}`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <CardDescription className="text-center text-lg text-gray-600">
        {t("description")}
      </CardDescription>

      <div className="space-y-2">
        <Label className="text-sm font-medium" htmlFor="roomType">
          {t("fields.roomType.label")} *
        </Label>
        <Select
          onValueChange={(value) => {
            setRoomType(value);
            setErrors((prev) => ({ ...prev, roomType: undefined }));
          }}
          value={roomType || ""}
        >
          <SelectTrigger className="py-5 border-gray-200 rounded-lg">
            <SelectValue placeholder={t("fields.roomType.placeholder")} />
          </SelectTrigger>
          <SelectContent>
            {roomTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.roomType && (
          <p className="text-red-500 text-sm mt-1">{errors.roomType}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium" htmlFor="numberOfRooms">
          {t("fields.numberOfRooms.label")} *
        </Label>
        <EnhancedNumberInput
          label="How many Guest"
          name="numberOfRooms"
          min={1}
          max={Infinity}
          step={1}
          unit={"prs"}
        />
        {/* <Input
          id="numberOfRooms"
          type="number"
          required
          min="1"
          className="py-3 border-gray-200 rounded-lg"
          placeholder={t("fields.numberOfRooms.placeholder")}
          value={numberOfRooms || ""}
          onChange={(e) => {
            setNumberOfRooms(e.target.value);
            setErrors((prev) => ({ ...prev, numberOfRooms: undefined }));
          }}
        /> */}
        {errors.numberOfRooms && (
          <p className="text-red-500 text-sm mt-1">{errors.numberOfRooms}</p>
        )}
      </div>

      <div className="flex justify-between gap-4 mt-8">
        <Button
          type="button"
          variant="outline"
          className="flex-1 py-7 text-lg rounded-full font-semibold text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
          onClick={() =>
            router.push(
              `/register/hotel-period?hotelName=${encodeURIComponent(
                hotelName || ""
              )}&checkInDate=${encodeURIComponent(
                checkInDate || ""
              )}&checkOutDate=${encodeURIComponent(checkOutDate || "")}`
            )
          }
        >
          {t("actions.back")}
        </Button>
        <Button
          type="submit"
          className="flex-1 flex items-center bg-blue-600 py-7 text-lg rounded-full font-semibold text-white hover:bg-blue-700"
        >
          <p className="flex-1">{t("actions.next")}</p>
          <div className="border border-white rounded-full h-10 flex items-center w-10">
            <ArrowRight className="ml-2 h-5 w-5" />
          </div>
        </Button>
      </div>

      <p className="px-8 text-center text-sm text-muted-foreground">
        {tLegal("termsText")}{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          {tLegal("termsLink")}
        </a>{" "}
        {tLegal("and")}{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          {tLegal("privacyLink")}
        </a>
        .
      </p>
    </form>
  );
}
