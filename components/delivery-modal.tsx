"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin } from "lucide-react"

export default function DeliveryModal() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-amber-800 hover:bg-amber-900">
          Order Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <Tabs defaultValue="delivery" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
            <TabsTrigger value="pickup">Pickup</TabsTrigger>
          </TabsList>

          <TabsContent value="delivery" className="space-y-4">
            <div className="flex justify-center mb-4">
              <Button variant="outline" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Find Your Nearest Branch
              </Button>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Select Branch</h3>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Please select your location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="karachi">Karachi</SelectItem>
                  <SelectItem value="lahore">Lahore</SelectItem>
                  <SelectItem value="islamabad">Islamabad</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full bg-gray-800 hover:bg-gray-900" onClick={() => setOpen(false)}>
              Start My Order
            </Button>
          </TabsContent>

          <TabsContent value="pickup" className="space-y-4">
            <div className="flex justify-center mb-4">
              <Button variant="outline" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Find Your Nearest Branch
              </Button>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Select Branch</h3>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Please select your location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="karachi">Karachi</SelectItem>
                  <SelectItem value="lahore">Lahore</SelectItem>
                  <SelectItem value="islamabad">Islamabad</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full bg-gray-800 hover:bg-gray-900" onClick={() => setOpen(false)}>
              Start My Order
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
