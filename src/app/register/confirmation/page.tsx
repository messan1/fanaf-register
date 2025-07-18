"use client"

import { useRouter } from "next/navigation"
import { useQueryState } from "nuqs"
import { Button } from "@/components/ui/button"
import { CardDescription } from "@/components/ui/card"
import { useTranslations } from "next-intl"

export default function ConfirmationPage() {
  const router = useRouter()
  const t = useTranslations("Reservation.Confirmation")
  const tLegal = useTranslations("Reservation.legal")

  const [hotelName] = useQueryState("hotelName")
  const [checkInDate] = useQueryState("checkInDate")
  const [checkOutDate] = useQueryState("checkOutDate")
  const [roomType] = useQueryState("roomType")
  const [numberOfRooms] = useQueryState("numberOfRooms")

  const handleConfirm = () => {
    // Here you would typically send the data to your backend
    alert("Reservation Confirmed!")
    // Redirect to a success page or home
    router.push("/")
  }

  return (
    <div className="space-y-6 p-6">
      <CardDescription className="text-center text-lg text-gray-600">{t("description")}</CardDescription>

      <div className="space-y-4 text-lg">
        <div className="flex justify-between">
          <span className="font-medium">{t("details.hotel")}:</span>
          <span>{hotelName || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">{t("details.checkIn")}:</span>
          <span>{checkInDate || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">{t("details.checkOut")}:</span>
          <span>{checkOutDate || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">{t("details.roomType")}:</span>
          <span>{roomType || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">{t("details.numberOfRooms")}:</span>
          <span>{numberOfRooms || "N/A"}</span>
        </div>
      </div>

      <div className="flex justify-between gap-4 mt-8">
        <Button
          type="button"
          variant="outline"
          className="flex-1 py-7 text-lg rounded-full font-semibold text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
          onClick={() =>
            router.push(
              `/reservation/chamber?hotelName=${encodeURIComponent(hotelName || "")}&checkInDate=${encodeURIComponent(checkInDate || "")}&checkOutDate=${encodeURIComponent(checkOutDate || "")}`,
            )
          }
        >
          {t("actions.back")}
        </Button>
        <Button
          type="button"
          className="flex-1 flex items-center bg-blue-600 py-7 text-lg rounded-full font-semibold text-white hover:bg-blue-700"
          onClick={handleConfirm}
        >
          <p className="flex-1">{t("actions.confirm")}</p>
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
    </div>
  )
}
