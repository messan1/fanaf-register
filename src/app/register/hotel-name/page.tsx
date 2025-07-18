"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useQueryState } from "nuqs"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CardDescription } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslations } from "next-intl"

export default function HotelNamePage() {
  const router = useRouter()
  const t = useTranslations("Reservation.HotelSelection")

  const [hotelName, setHotelName] = useQueryState("hotelName", {
    defaultValue: "",
  })
  const [error, setError] = useState<string | undefined>(undefined)

  // Dummy data for hotels
  const hotels = ["Grand Hyatt", "The Ritz-Carlton", "Hilton Garden Inn", "Marriott Marquis"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!hotelName || hotelName.trim() === "") {
      setError(t("fields.hotelName.required"))
      return
    }
    setError(undefined)
    router.push(`/register/hotel-period?hotelName=${encodeURIComponent(hotelName)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <CardDescription className="text-center text-lg text-gray-600">{t("description")}</CardDescription>

      <div className="space-y-2">
        <Label className="text-sm font-medium" htmlFor="hotelName">
          {t("fields.hotelName.label")} *
        </Label>
        <Select
          onValueChange={(value) => {
            setHotelName(value)
            setError(undefined) // Clear error on change
          }}
          value={hotelName || ""}
        >
          <SelectTrigger className="py-7 border-gray-200 rounded-lg">
            <SelectValue placeholder={t("fields.hotelName.placeholder")} />
          </SelectTrigger>
          <SelectContent>
            {hotels.map((hotel) => (
              <SelectItem key={hotel} value={hotel}>
                {hotel}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      <Button
        type="submit"
        className="w-full flex items-center bg-blue-600 py-7 text-lg rounded-full font-semibold text-white hover:bg-blue-700 mt-8"
      >
        <p className="flex-1">{t("actions.next")}</p>
        <div className="border border-white rounded-full h-10 flex items-center w-10">
          <ArrowRight className="ml-2 h-5 w-5" />
        </div>
      </Button>
    </form>
  )
}
