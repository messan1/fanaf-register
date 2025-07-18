"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useQueryState } from "nuqs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CardDescription } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

export default function HotelPeriodPage() {
  const router = useRouter()
  const t = useTranslations("Reservation.PeriodSelection")
  const tLegal = useTranslations("Reservation.legal")

  const [hotelName] = useQueryState("hotelName")
  const [checkInDate, setCheckInDate] = useQueryState("checkInDate", {
    defaultValue: "",
  })
  const [checkOutDate, setCheckOutDate] = useQueryState("checkOutDate", {
    defaultValue: "",
  })

  const [errors, setErrors] = useState<{
    checkInDate?: string
    checkOutDate?: string
  }>({})

  const validateForm = () => {
    const newErrors: { checkInDate?: string; checkOutDate?: string } = {}
    let isValid = true

    if (!checkInDate || checkInDate.trim() === "") {
      newErrors.checkInDate = t("fields.checkInDate.required")
      isValid = false
    }
    if (!checkOutDate || checkOutDate.trim() === "") {
      newErrors.checkOutDate = t("fields.checkOutDate.required")
      isValid = false
    }

    if (checkInDate && checkOutDate) {
      const inDate = new Date(checkInDate)
      const outDate = new Date(checkOutDate)
      if (inDate >= outDate) {
        newErrors.checkOutDate = "Check-out date must be after check-in date."
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      router.push(
        `/register/chamber?hotelName=${encodeURIComponent(hotelName || "")}&checkInDate=${encodeURIComponent(checkInDate || "")}&checkOutDate=${encodeURIComponent(checkOutDate || "")}`,
      )
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <CardDescription className="text-center text-lg text-gray-600">{t("description")}</CardDescription>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium" htmlFor="checkInDate">
            {t("fields.checkInDate.label")} *
          </Label>
          <Input
            id="checkInDate"
            type="date"
            required
            className="py-4 border-gray-200 rounded-lg"
            value={checkInDate || ""}
            onChange={(e) => {
              setCheckInDate(e.target.value)
              setErrors((prev) => ({ ...prev, checkInDate: undefined }))
            }}
          />
          {errors.checkInDate && <p className="text-red-500 text-sm mt-1">{errors.checkInDate}</p>}
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium" htmlFor="checkOutDate">
            {t("fields.checkOutDate.label")} *
          </Label>
          <Input
            id="checkOutDate"
            type="date"
            required
            className="py-4 border-gray-200 rounded-lg"
            value={checkOutDate || ""}
            onChange={(e) => {
              setCheckOutDate(e.target.value)
              setErrors((prev) => ({ ...prev, checkOutDate: undefined }))
            }}
          />
          {errors.checkOutDate && <p className="text-red-500 text-sm mt-1">{errors.checkOutDate}</p>}
        </div>
      </div>

      <div className="flex justify-between gap-4 mt-8">
        <Button
          type="button"
          variant="outline"
          className="flex-1 py-7 text-lg rounded-full font-semibold text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
          onClick={() => router.push(`/reservation/hotel-name`)}
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
  )
}
