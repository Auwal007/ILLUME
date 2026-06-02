"use client"

import { useState } from "react"
import { updateInquiryStatus } from "@/app/actions/admin"

interface InquiryStatusSelectProps {
  inquiryId: string
  initialStatus: string
}

export default function InquiryStatusSelect({
  inquiryId,
  initialStatus,
}: InquiryStatusSelectProps) {
  const [status, setStatus] = useState(initialStatus)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value
    setIsUpdating(true)
    try {
      await updateInquiryStatus(inquiryId, newStatus)
      setStatus(newStatus)
    } catch (error) {
      console.error("Failed to update inquiry status:", error)
      // Revert select value on error
      e.target.value = status
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="relative inline-block">
      <select
        value={status}
        onChange={handleChange}
        disabled={isUpdating}
        className={`px-2 py-1 text-xs font-medium rounded-full border-none focus:ring-0 cursor-pointer transition-opacity ${
          status === "NEW"
            ? "bg-blue-100 text-blue-800"
            : status === "CONTACTED"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-green-100 text-green-800"
        } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <option value="NEW">NEW</option>
        <option value="CONTACTED">CONTACTED</option>
        <option value="CLOSED">CLOSED</option>
      </select>
    </div>
  )
}
