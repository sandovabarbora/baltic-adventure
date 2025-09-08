"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Checkbox } from "@/components/ui/checkbox"
import {
  MapPin,
  Calendar,
  Clock,
  Euro,
  Thermometer,
  Bus,
  Ship,
  Leaf,
  TreePine,
  Recycle,
  ChevronDown,
  Plane,
  Train,
  Camera,
  Utensils,
  Bed,
  Star,
} from "lucide-react"

export default function BalticTravelGuide() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({})
  const [scrollProgress, setScrollProgress] = useState(0)

  // Countdown timer to October 10, 2025
  useEffect(() => {
    const targetDate = new Date("2025-10-10T00:00:00")

    const updateCountdown = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const cities = [
    { name: "Vilnius", country: "Lithuania", days: "10-12 Oct", color: "bg-amber-600", temp: "11°C" },
    { name: "Riga", country: "Latvia", days: "12-14 Oct", color: "bg-emerald-600", temp: "10°C" },
    { name: "Tallinn", country: "Estonia", days: "14-16 Oct", color: "bg-orange-600", temp: "9°C" },
    { name: "Helsinki", country: "Finland", days: "16-19 Oct", color: "bg-teal-600", temp: "8°C" },
  ]

  const packingList = [
    "Warm layers & waterproof jacket (recycled materials)",
    "Comfortable walking shoes (sustainable brands)",
    "Umbrella & gloves (bamboo/organic)",
    "Power adapter (Type C/F) & portable solar charger",
    "Travel insurance documents (digital copies)",
    "Passport & travel documents",
    "Camera & chargers (rechargeable batteries)",
    "Medications in reusable containers",
    "Cash (€50-100) & cards",
    "Offline maps downloaded",
    "Reusable water bottle & coffee cup",
    "Eco-friendly toiletries (solid shampoo bars)",
    "Tote bag for local markets",
    "Bamboo utensils for street food",
  ]

  const budgetBreakdown = [
    { category: "Accommodation", amount: 720, color: "bg-primary" },
    { category: "Meals", amount: 405, color: "bg-secondary" },
    { category: "Transport", amount: 130, color: "bg-accent" },
    { category: "Activities", amount: 200, color: "bg-chart-1" },
  ]

  const totalBudget = budgetBreakdown.reduce((sum, item) => sum + item.amount, 0)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const detailedItinerary = {
    vilnius: [
      {
        day: "Day 1 - Thursday, Oct 10",
        subtitle: "Arrival & Old Town exploration",
        activities: [
          { time: "15:20", icon: Plane, text: "Arrival at Vilnius Airport" },
          { time: "16:00", icon: Bus, text: "Bus 88 to city center (€1, 30 minutes)" },
          { time: "16:45", icon: Bed, text: "Check into Artagonist Art Hotel (€120-150/night)" },
          {
            time: "17:30-22:00",
            icon: MapPin,
            text: "Evening exploration: UNESCO Old Town, Cathedral Square, St. Anne's Church",
          },
          {
            time: "Dinner",
            icon: Utensils,
            text: "Etno Dvaras - Try cepelinai potato dumplings (€8-12), cold beetroot soup (€6-8)",
          },
          { time: "Evening", icon: MapPin, text: "Stroll through bohemian Užupis District with its own constitution" },
        ],
      },
      {
        day: "Day 2 - Friday, Oct 11",
        subtitle: "Cultural immersion & amber experience",
        activities: [
          {
            time: "8:00-12:00",
            icon: Star,
            text: "Palace of the Grand Dukes (€8) - 15th-century royal history across 5 floors",
          },
          {
            time: "Morning",
            icon: MapPin,
            text: "Vilnius University complex - 13 courtyards of architectural evolution since 1579",
          },
          { time: "Coffee", icon: Utensils, text: "Taste Map Café (€8-12 breakfast)" },
          { time: "12:00-17:00", icon: TreePine, text: "Bernardine Gardens - 400-year-old oak tree, musical fountain" },
          {
            time: "Afternoon",
            icon: Star,
            text: "Amber Museum-Gallery - Touch 50-million-year-old Baltic amber, barefoot amber walk",
          },
          {
            time: "Views",
            icon: Camera,
            text: "Hill of Three Crosses - Panoramic city views, 15-minute gentle uphill walk",
          },
          {
            time: "Dinner",
            icon: Utensils,
            text: "Lokys medieval hunting lodge (€20-25) - Game meat in 15th-century cellar",
          },
        ],
      },
      {
        day: "Day 3 - Saturday, Oct 12",
        subtitle: "Final explorations & departure to Riga",
        activities: [
          {
            time: "Morning",
            icon: Star,
            text: "KGB Museum (€6) - Former Soviet headquarters with preserved prison cells",
          },
          { time: "Activity", icon: Star, text: "Art Center of Baltic Amber - Make your own pendant workshop" },
          { time: "11:30", icon: Bus, text: "Depart for Riga via Lux Express bus (€17-25, 4 hours)" },
          { time: "15:30", icon: MapPin, text: "Arrival in Riga" },
        ],
      },
    ],
    riga: [
      {
        day: "Day 3 continued - Saturday, Oct 12",
        subtitle: "Arrival & Old Town evening",
        activities: [
          { time: "16:00", icon: Bed, text: "Check into Wellton Centrum Hotel & Spa (€80-110/night)" },
          { time: "17:00-22:00", icon: MapPin, text: "Walking tour: House of the Blackheads, Riga Cathedral" },
          { time: "Dinner", icon: Utensils, text: "Folkklubs (€15-25) - Latvian meatballs in wine cellar setting" },
          { time: "Evening", icon: Utensils, text: "Black Magic Bar - Riga Black Balsam tasting (€8-15)" },
        ],
      },
      {
        day: "Day 4 - Sunday, Oct 13",
        subtitle: "Jurmala seaside escape & Art Nouveau paradise",
        activities: [
          {
            time: "9:00",
            icon: Bus,
            text: "Take train to Jurmala (€2-3, 30 minutes) - Famous Baltic Sea resort town",
          },
          {
            time: "9:30-12:00",
            icon: TreePine,
            text: "Jomas Street pedestrian zone - Wooden architecture & seaside atmosphere",
          },
          {
            time: "Morning",
            icon: Camera,
            text: "Dzintari Beach walk - Autumn Baltic Sea views & fresh air",
          },
          {
            time: "11:00",
            icon: Star,
            text: "Jurmala City Museum (€3) - Resort history & traditional wooden villas",
          },
          { time: "12:30", icon: Bus, text: "Return to Riga by train" },
          {
            time: "14:00-17:00",
            icon: Star,
            text: "Alberta iela - Europe's highest concentration of Art Nouveau buildings",
          },
          {
            time: "Afternoon",
            icon: Star,
            text: "Riga Art Nouveau Centre museum (€9) - Only Baltic Art Nouveau museum",
          },
          {
            time: "17:30-19:00",
            icon: Utensils,
            text: "Riga Central Market in historic Zeppelin hangars - Try grey peas with bacon",
          },
          {
            time: "Evening",
            icon: MapPin,
            text: "Explore hipster Miera iela neighborhood - Local cafes and alternative shops",
          },
          {
            time: "Dinner",
            icon: Utensils,
            text: "Salve Restaurant (€20-30) - Traditional Latvian tasting menu with Black Balsam pairing",
          },
        ],
      },
      {
        day: "Day 5 - Monday, Oct 14",
        subtitle: "Final morning & departure to Tallinn",
        activities: [
          { time: "Morning", icon: MapPin, text: "Final Old Town stroll for souvenirs" },
          { time: "Walk", icon: Camera, text: "Daugava riverfront walk" },
          { time: "12:00", icon: Bus, text: "Depart for Tallinn via Lux Express (€15-30, 4.5 hours)" },
          { time: "16:30", icon: MapPin, text: "Arrival in Tallinn" },
        ],
      },
    ],
    tallinn: [
      {
        day: "Day 5 continued - Monday, Oct 14",
        subtitle: "Arrival & welcome dinner",
        activities: [
          { time: "17:00", icon: Bed, text: "Check into Radisson Collection Hotel (€140-180/night)" },
          {
            time: "18:30-22:00",
            icon: Utensils,
            text: "Welcome dinner at Rataskaevu 16 (€16-22) - Elk soup and braised elk with black currant sauce",
          },
          { time: "Evening", icon: MapPin, text: "Evening stroll through illuminated Town Hall Square" },
        ],
      },
      {
        day: "Day 6 - Tuesday, Oct 15",
        subtitle: "Medieval wonderland & nature",
        activities: [
          { time: "9:00", icon: Star, text: "Purchase 48-hour Tallinn Card (€45) for free entry and transport" },
          {
            time: "9:00-12:30",
            icon: MapPin,
            text: "UNESCO Old Town tour: St. Nicholas' Church, Town Hall, Alexander Nevsky Cathedral",
          },
          {
            time: "Views",
            icon: Camera,
            text: "Toompea Hill viewpoints: Kohtuotsa and Patkuli platforms for panoramic views",
          },
          {
            time: "History",
            icon: Star,
            text: "Kiek in de Kök Museum and underground Bastion Tunnels (free with card)",
          },
          {
            time: "14:00-17:00",
            icon: TreePine,
            text: "Tram to Kadriorg Park: 70-hectare baroque gardens with Swan Pond",
          },
          { time: "Culture", icon: Star, text: "Kadriorg Palace (free with card) - Russian imperial art collection" },
          { time: "18:00-22:00", icon: MapPin, text: "Telliskivi Creative City - Industrial-turned-arts quarter" },
          { time: "Dinner", icon: Utensils, text: "LEE Restaurant (€20-28) - Modern Estonian cuisine" },
        ],
      },
      {
        day: "Day 7 - Wednesday, Oct 16",
        subtitle: "Coastal exploration & ferry to Helsinki",
        activities: [
          { time: "Morning", icon: Camera, text: "Pirita Beach promenade - 2km flat seaside walk" },
          { time: "Lunch", icon: Utensils, text: "III Draakon (€3-5) - Budget-friendly elk soup" },
          { time: "13:00", icon: Bed, text: "Return to hotel for luggage" },
          { time: "14:00", icon: MapPin, text: "Walk to D-Terminal (15 minutes)" },
          { time: "15:30", icon: Ship, text: "Tallink Silja ferry to Helsinki (€45-75, 2 hours)" },
          { time: "17:30", icon: MapPin, text: "Arrival at Helsinki West Terminal 2" },
        ],
      },
    ],
    helsinki: [
      {
        day: "Day 7 continued - Wednesday, Oct 16",
        subtitle: "Arrival & traditional Finnish dinner",
        activities: [
          { time: "18:00", icon: Train, text: "Public transport to city center (€2.80)" },
          { time: "18:30", icon: Bed, text: "Check into Hotel Arthur (€120-180/night)" },
          { time: "19:00-22:00", icon: Utensils, text: "Traditional Finnish dinner at Savotta near Senate Square" },
          { time: "Dinner", icon: Utensils, text: "Try lohikeitto salmon soup (€12) and poronkäristys reindeer (€28)" },
          { time: "Evening", icon: MapPin, text: "Evening walk around illuminated Senate Square" },
        ],
      },
      {
        day: "Day 8 - Thursday, Oct 17",
        subtitle: "Helsinki highlights & essential sauna",
        activities: [
          { time: "9:00", icon: Star, text: "Purchase 48-hour Helsinki Card (€69)" },
          { time: "9:00-12:00", icon: MapPin, text: "Senate Square and neoclassical Helsinki Cathedral" },
          { time: "Morning", icon: Star, text: "Temppeliaukio Church - Unique church carved into solid rock" },
          { time: "Walk", icon: MapPin, text: "Walk through Design District for Finnish design shops" },
          { time: "14:00-17:00", icon: Ship, text: "Ferry to Suomenlinna UNESCO fortress (included in card)" },
          { time: "Island", icon: Star, text: "Explore 18th-century sea fortress across 6 islands with autumn colors" },
          {
            time: "18:00-21:30",
            icon: Star,
            text: "Löyly Sauna experience (€26) - Modern architectural marvel with wood-fired saunas",
          },
          { time: "Sauna", icon: Thermometer, text: "Baltic Sea swimming (optional but invigorating at 10°C!)" },
          { time: "Dinner", icon: Utensils, text: "Dinner at Löyly restaurant with harbor views" },
        ],
      },
      {
        day: "Day 9 - Saturday, Oct 19",
        subtitle: "Departure day",
        activities: [
          { time: "8:00", icon: MapPin, text: "Quick souvenir shopping at Market Square" },
          { time: "9:00", icon: Bed, text: "Check out from hotel" },
          { time: "9:30", icon: Train, text: "Train to Helsinki-Vantaa Airport (€5, 30 minutes)" },
          { time: "11:00", icon: Plane, text: "Arrive at airport" },
          { time: "13:00", icon: Plane, text: "Flight departure" },
        ],
      },
    ],
  }

  const accommodations = [
    {
      city: "Vilnius",
      name: "Artagonist Art Hotel",
      price: "€120-150/night",
      description: "Artistic design in Old Town edge, perfect for mixed ages",
      features: ["Central location", "Artistic design", "Comfortable for all ages"],
    },
    {
      city: "Riga",
      name: "Wellton Centrum Hotel & Spa",
      price: "€80-110/night",
      description: "Spa facilities ideal after travel",
      features: ["Spa facilities", "Central location", "Post-travel relaxation"],
    },
    {
      city: "Tallinn",
      name: "Radisson Collection Hotel",
      price: "€140-180/night",
      description: "5-minute walk to ferry terminal, modern amenities",
      features: ["Ferry terminal proximity", "Modern amenities", "Elevator access"],
    },
    {
      city: "Helsinki",
      name: "Hotel Arthur",
      price: "€120-180/night",
      description: "Near train station, easy airport access",
      features: ["Train station proximity", "Airport access", "Central location"],
    },
  ]

  const transportDetails = [
    {
      route: "Vilnius → Riga",
      date: "October 12",
      time: "11:30 - 15:30",
      duration: "4 hours",
      price: "€17-25",
      provider: "Lux Express",
      type: "bus",
      notes: "Premium buses with entertainment screens, Wi-Fi, café service",
    },
    {
      route: "Riga → Tallinn",
      date: "October 14",
      time: "12:00 - 16:30",
      duration: "4 hours 25 minutes",
      price: "€15-30",
      provider: "Lux Express",
      type: "bus",
      notes: "Comfortable seating ideal for 60-year-old traveler",
    },
    {
      route: "Tallinn → Helsinki",
      date: "October 16",
      time: "15:30 - 17:30",
      duration: "2 hours",
      price: "€45-75",
      provider: "Tallink Silja",
      type: "ferry",
      notes: "Afternoon timing avoids morning fog, provides calm seas",
    },
  ]

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-stone-200 z-50">
        <div className="h-full bg-emerald-600 transition-all duration-300" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Hero Section - Using solid primary background to ensure proper contrast */}
      <section className="relative bg-stone-800 text-white py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-700/90 via-emerald-700/90 to-teal-700/90"></div>
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-8 h-8 text-emerald-300" />
            <span className="text-emerald-300 font-medium">Sustainable Travel</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">Baltic States & Finland Adventure</h1>
          <p className="text-xl md:text-2xl mb-4 text-pretty opacity-90">
            10 days exploring medieval charm and Nordic sophistication
          </p>
          <p className="text-lg mb-8 text-emerald-200 flex items-center justify-center gap-2">
            <TreePine className="w-5 h-5" />
            Mindful travel through Europe's greenest capitals
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Card className="bg-amber-900/40 border-amber-300/30 text-white backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-amber-200" />
                <div className="text-2xl font-bold">10</div>
                <div className="text-sm opacity-90">Days</div>
              </CardContent>
            </Card>
            <Card className="bg-emerald-900/40 border-emerald-300/30 text-white backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-emerald-200" />
                <div className="text-2xl font-bold">4</div>
                <div className="text-sm opacity-90">Cities</div>
              </CardContent>
            </Card>
            <Card className="bg-orange-900/40 border-orange-300/30 text-white backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Euro className="w-8 h-8 mx-auto mb-2 text-orange-200" />
                <div className="text-2xl font-bold">€1,300</div>
                <div className="text-sm opacity-90">Per Person</div>
              </CardContent>
            </Card>
            <Card className="bg-teal-900/40 border-teal-300/30 text-white backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Thermometer className="w-8 h-8 mx-auto mb-2 text-teal-200" />
                <div className="text-2xl font-bold">9-11°C</div>
                <div className="text-sm opacity-90">October</div>
              </CardContent>
            </Card>
          </div>

          {/* Countdown Timer */}
          <Card className="bg-amber-900/40 border-amber-300/30 text-white max-w-md mx-auto backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <Clock className="w-5 h-5 text-amber-200" />
                Departure Countdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-amber-200">{timeLeft.days}</div>
                  <div className="text-sm opacity-90">Days</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-200">{timeLeft.hours}</div>
                  <div className="text-sm opacity-90">Hours</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-200">{timeLeft.minutes}</div>
                  <div className="text-sm opacity-90">Minutes</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-200">{timeLeft.seconds}</div>
                  <div className="text-sm opacity-90">Seconds</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Navigation */}
      <nav className="sticky top-1 bg-stone-100/95 backdrop-blur-sm border-b border-stone-200 z-40 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {cities.map((city) => (
              <Button key={city.name} variant="ghost" size="sm" className="text-sm hover:bg-stone-200 text-stone-700">
                {city.name}
              </Button>
            ))}
            <Button variant="ghost" size="sm" className="hover:bg-stone-200 text-stone-700">
              Budget
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-stone-200 text-stone-700">
              Packing
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-stone-200 text-stone-700">
              Eco Tips
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Eco-friendly Travel Tips */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-800">
                <Leaf className="w-6 h-6" />
                Sustainable Travel Tips
              </CardTitle>
              <CardDescription className="text-emerald-700">
                Make your Baltic adventure eco-friendly and support local communities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <Recycle className="w-5 h-5 text-emerald-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-emerald-800">Local Transport</h4>
                    <p className="text-sm text-emerald-700">
                      Use public transport, bikes, and walking to reduce carbon footprint
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TreePine className="w-5 h-5 text-emerald-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-emerald-800">Local Markets</h4>
                    <p className="text-sm text-emerald-700">Shop at farmers markets and support local artisans</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Leaf className="w-5 h-5 text-emerald-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-emerald-800">Zero Waste</h4>
                    <p className="text-sm text-emerald-700">Bring reusable items and choose plastic-free options</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cities Overview */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-stone-800">Your Journey Through the Baltics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.map((city, index) => (
              <Card
                key={city.name}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white border-stone-200"
              >
                <div className={`h-32 ${city.color} relative`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{city.name}</h3>
                    <p className="text-sm opacity-90">{city.country}</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="secondary" className="bg-stone-100 text-stone-700">
                      {city.days}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-stone-600">
                      <Thermometer className="w-4 h-4" />
                      {city.temp}
                    </div>
                  </div>
                  <Button className="w-full bg-stone-700 hover:bg-stone-800" size="sm">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Main Content Tabs */}
        <Tabs defaultValue="itinerary" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-stone-200">
            <TabsTrigger
              value="itinerary"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-stone-700 font-medium"
            >
              Day by Day
            </TabsTrigger>
            <TabsTrigger
              value="budget"
              className="data-[state=active]:bg-amber-600 data-[state=active]:text-white text-stone-700 font-medium"
            >
              Budget
            </TabsTrigger>
            <TabsTrigger
              value="packing"
              className="data-[state=active]:bg-orange-600 data-[state=active]:text-white text-stone-700 font-medium"
            >
              Packing
            </TabsTrigger>
            <TabsTrigger
              value="transport"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-stone-700 font-medium"
            >
              Transport
            </TabsTrigger>
          </TabsList>

          <TabsContent value="itinerary" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-stone-800">Complete Detailed Itinerary</h2>
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">October 10-19, 2025</Badge>
            </div>

            {/* Trip Overview */}
            <Card className="bg-gradient-to-r from-stone-50 to-amber-50 border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-800">Trip Overview</CardTitle>
                <CardDescription className="text-amber-700">
                  Your 10-day journey through the Baltic capitals and Helsinki combines medieval charm with Nordic
                  sophistication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">Quick Answers to Key Questions:</h4>
                    <ul className="space-y-1 text-amber-700">
                      <li>
                        • <strong>All cities realistic?</strong> Yes, Helsinki slightly rushed but manageable
                      </li>
                      <li>
                        • <strong>Skip Jūrmala?</strong> Yes, closed in October with 4°C water
                      </li>
                      <li>
                        • <strong>Helsinki minimum?</strong> 2 nights works but prioritize carefully
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">City Cards Worth Buying:</h4>
                    <ul className="space-y-1 text-amber-700">
                      <li>
                        • <strong>Tallinn Card:</strong> €45 (48h) - Absolutely worth it
                      </li>
                      <li>
                        • <strong>Helsinki Card:</strong> €69 (48h) - Highly recommended
                      </li>
                      <li>
                        • <strong>Vilnius/Riga:</strong> Skip unless intensive museum visits
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vilnius Itinerary */}
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <div className="w-4 h-4 bg-amber-600 rounded-full" />
                  Vilnius, Lithuania (Oct 10-12)
                </CardTitle>
                <CardDescription>Medieval charm and amber experiences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {detailedItinerary.vilnius.map((day, index) => (
                  <Collapsible key={index}>
                    <CollapsibleTrigger className="flex items-center gap-2 w-full text-left p-4 hover:bg-amber-50 rounded-lg border border-amber-100">
                      <ChevronDown className="w-4 h-4 text-amber-600" />
                      <div className="flex-1">
                        <div className="font-semibold text-amber-800">{day.day}</div>
                        <div className="text-sm text-amber-600">{day.subtitle}</div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-6 pt-4 space-y-3">
                      {day.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="flex items-start gap-3 p-2 rounded bg-amber-50/50">
                          <activity.icon className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-amber-800 text-sm">{activity.time}</span>
                              {activity.time.includes("€") && (
                                <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">
                                  {activity.time.match(/€[\d-]+/)?.[0]}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-stone-700 mt-1">{activity.text}</p>
                          </div>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </CardContent>
            </Card>

            {/* Riga Itinerary */}
            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-800">
                  <div className="w-4 h-4 bg-emerald-600 rounded-full" />
                  Riga, Latvia (Oct 12-14)
                </CardTitle>
                <CardDescription>Art Nouveau paradise and local culture</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {detailedItinerary.riga.map((day, index) => (
                  <Collapsible key={index}>
                    <CollapsibleTrigger className="flex items-center gap-2 w-full text-left p-4 hover:bg-emerald-50 rounded-lg border border-emerald-100">
                      <ChevronDown className="w-4 h-4 text-emerald-600" />
                      <div className="flex-1">
                        <div className="font-semibold text-emerald-800">{day.day}</div>
                        <div className="text-sm text-emerald-600">{day.subtitle}</div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-6 pt-4 space-y-3">
                      {day.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="flex items-start gap-3 p-2 rounded bg-emerald-50/50">
                          <activity.icon className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-emerald-800 text-sm">{activity.time}</span>
                              {activity.time.includes("€") && (
                                <Badge variant="outline" className="text-xs border-emerald-300 text-emerald-700">
                                  {activity.time.match(/€[\d-]+/)?.[0]}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-stone-700 mt-1">{activity.text}</p>
                          </div>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </CardContent>
            </Card>

            {/* Tallinn Itinerary */}
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <div className="w-4 h-4 bg-orange-600 rounded-full" />
                  Tallinn, Estonia (Oct 14-16)
                </CardTitle>
                <CardDescription>Medieval wonderland and creative districts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {detailedItinerary.tallinn.map((day, index) => (
                  <Collapsible key={index}>
                    <CollapsibleTrigger className="flex items-center gap-2 w-full text-left p-4 hover:bg-orange-50 rounded-lg border border-orange-100">
                      <ChevronDown className="w-4 h-4 text-orange-600" />
                      <div className="flex-1">
                        <div className="font-semibold text-orange-800">{day.day}</div>
                        <div className="text-sm text-orange-600">{day.subtitle}</div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-6 pt-4 space-y-3">
                      {day.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="flex items-start gap-3 p-2 rounded bg-orange-50/50">
                          <activity.icon className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-orange-800 text-sm">{activity.time}</span>
                              {activity.time.includes("€") && (
                                <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">
                                  {activity.time.match(/€[\d-]+/)?.[0]}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-stone-700 mt-1">{activity.text}</p>
                          </div>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </CardContent>
            </Card>

            {/* Helsinki Itinerary */}
            <Card className="border-teal-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-teal-800">
                  <div className="w-4 h-4 bg-teal-600 rounded-full" />
                  Helsinki, Finland (Oct 16-19)
                </CardTitle>
                <CardDescription>Nordic sophistication and essential sauna experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {detailedItinerary.helsinki.map((day, index) => (
                  <Collapsible key={index}>
                    <CollapsibleTrigger className="flex items-center gap-2 w-full text-left p-4 hover:bg-teal-50 rounded-lg border border-teal-100">
                      <ChevronDown className="w-4 h-4 text-teal-600" />
                      <div className="flex-1">
                        <div className="font-semibold text-teal-800">{day.day}</div>
                        <div className="text-sm text-teal-600">{day.subtitle}</div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-6 pt-4 space-y-3">
                      {day.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="flex items-start gap-3 p-2 rounded bg-teal-50/50">
                          <activity.icon className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-teal-800 text-sm">{activity.time}</span>
                              {activity.time.includes("€") && (
                                <Badge variant="outline" className="text-xs border-teal-300 text-teal-700">
                                  {activity.time.match(/€[\d-]+/)?.[0]}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-stone-700 mt-1">{activity.text}</p>
                          </div>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </CardContent>
            </Card>

            {/* Accommodations Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bed className="w-5 h-5" />
                  Accommodation Recommendations
                </CardTitle>
                <CardDescription>
                  Best picks for your group with perfect balance of style and accessibility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {accommodations.map((hotel, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-stone-50">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-stone-800">{hotel.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {hotel.price}
                        </Badge>
                      </div>
                      <p className="text-sm text-stone-600 mb-2">{hotel.city}</p>
                      <p className="text-sm text-stone-700 mb-3">{hotel.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {hotel.features.map((feature, fIndex) => (
                          <Badge key={fIndex} variant="secondary" className="text-xs bg-stone-100 text-stone-600">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <h2 className="text-2xl font-bold">Budget Breakdown</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Cost per Person</CardTitle>
                  <CardDescription>€1,200 - €1,400 estimated (add 10% contingency buffer)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Accommodations</span>
                      <span className="font-semibold">€540-900</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Meals</span>
                      <span className="font-semibold">€315-495</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Transport</span>
                      <span className="font-semibold">€100-160</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Activities</span>
                      <span className="font-semibold">€100-305</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Range</span>
                      <span>€1,055-1,860</span>
                    </div>
                    <p className="text-sm text-stone-600 mt-1">Average: €1,300 per person</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Daily Expenses</CardTitle>
                  <CardDescription>Average spending per day by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Accommodation</span>
                      <span>€54-90/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Meals</span>
                      <span>€32-50/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Activities</span>
                      <span>€10-30/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Local transport</span>
                      <span>€5-10/day</span>
                    </div>
                    <div className="border-t pt-3 mt-4">
                      <div className="flex justify-between font-semibold">
                        <span>Daily Total</span>
                        <span>€101-180</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* City-specific costs */}
            <Card>
              <CardHeader>
                <CardTitle>City-Specific Highlights & Costs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-amber-800">Must-Buy City Cards</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between p-2 bg-amber-50 rounded">
                        <span>Tallinn Card (48h)</span>
                        <span className="font-semibold">€45</span>
                      </div>
                      <div className="flex justify-between p-2 bg-teal-50 rounded">
                        <span>Helsinki Card (48h)</span>
                        <span className="font-semibold">€69</span>
                      </div>
                      <p className="text-sm text-stone-600 mt-2">
                        Skip Vilnius and Riga passes unless planning intensive museum visits
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-emerald-800">Special Experiences</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between p-2 bg-emerald-50 rounded">
                        <span>Löyly Sauna (Helsinki)</span>
                        <span className="font-semibold">€26</span>
                      </div>
                      <div className="flex justify-between p-2 bg-orange-50 rounded">
                        <span>Amber Workshop (Vilnius)</span>
                        <span className="font-semibold">€15-25</span>
                      </div>
                      <div className="flex justify-between p-2 bg-stone-50 rounded">
                        <span>Black Balsam Tasting</span>
                        <span className="font-semibold">€8-15</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="packing" className="space-y-6">
            <h2 className="text-2xl font-bold text-stone-800">Sustainable Packing Checklist</h2>

            <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <Leaf className="w-5 h-5" />
                  October Weather Essentials
                </CardTitle>
                <CardDescription className="text-amber-700">
                  Expect 9-11°C days, 3-5°C nights, with 12-16 rainy days. Pack sustainably!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {packingList.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`item-${index}`}
                        checked={checkedItems[`item-${index}`] || false}
                        onCheckedChange={(checked) =>
                          setCheckedItems((prev) => ({ ...prev, [`item-${index}`]: checked as boolean }))
                        }
                        className="border-amber-400 data-[state=checked]:bg-amber-600"
                      />
                      <label
                        htmlFor={`item-${index}`}
                        className={`text-sm ${checkedItems[`item-${index}`] ? "line-through text-stone-500" : "text-stone-700"}`}
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transport" className="space-y-6">
            <h2 className="text-2xl font-bold">Transportation Between Cities</h2>

            <div className="grid gap-6">
              {transportDetails.map((transport, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {transport.type === "bus" && <Bus className="w-5 h-5" />}
                      {transport.type === "ferry" && <Ship className="w-5 h-5" />}
                      {transport.route}
                    </CardTitle>
                    <CardDescription>{transport.notes}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Date & Time:</span>
                          <span className="font-semibold">
                            {transport.date}, {transport.time}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span>{transport.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Price:</span>
                          <span className="font-semibold">{transport.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Provider:</span>
                          <span>{transport.provider}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button className="w-full">
                          Book on {transport.provider}
                          {transport.provider === "Lux Express" && " (luxexpress.eu)"}
                          {transport.provider === "Tallink Silja" && " (tallink.com)"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Booking Tips */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Booking Tips & Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Best Booking Practices:</h4>
                    <ul className="space-y-1 text-blue-700">
                      <li>• Book Lux Express 30 days in advance for best prices</li>
                      <li>• Ferry timing (15:30) avoids morning fog and rough seas</li>
                      <li>• Deck seating sufficient for 2-hour ferry crossing</li>
                      <li>• Premium buses include Wi-Fi, entertainment, café service</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Alternative Options:</h4>
                    <ul className="space-y-1 text-blue-700">
                      <li>• Flights available but buses more scenic and eco-friendly</li>
                      <li>• Train connections limited in Baltic region</li>
                      <li>• Car rental possible but parking challenging in old towns</li>
                      <li>• Local transport excellent in all cities</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Practical Information Section */}
        <section className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Practical Information & Safety</CardTitle>
              <CardDescription>Everything you need to know for a smooth journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-stone-800 mb-3">October Weather</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Daytime:</span>
                      <span>9-11°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nighttime:</span>
                      <span>3-5°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rainy days:</span>
                      <span>12-16 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Daylight:</span>
                      <span>10.6 → 9 hours</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-stone-800 mb-3">Language & Communication</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Estonia English:</span>
                      <span>65% proficiency</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Finland English:</span>
                      <span>70% proficiency</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Latvia English:</span>
                      <span>46% proficiency</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lithuania English:</span>
                      <span>38% proficiency</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-stone-800 mb-3">Payment & Safety</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Cards:</strong> Accepted 90%+ locations
                    </p>
                    <p>
                      <strong>Cash:</strong> Carry €50-100 for markets
                    </p>
                    <p>
                      <strong>Tipping:</strong> 10% in restaurants if satisfied
                    </p>
                    <p>
                      <strong>Safety:</strong> Extremely safe, minimal crime
                    </p>
                    <p>
                      <strong>Emergency:</strong> 112 (all countries)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Special Experiences */}
        <section className="mt-8">
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-800">Special Experiences Not to Miss</CardTitle>
              <CardDescription className="text-purple-700">Unique Baltic and Nordic traditions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-purple-800">Amber Road Experience</h4>
                      <p className="text-sm text-purple-700">
                        Baltic amber workshops in Vilnius and Tallinn - touch 50-million-year-old treasures
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Utensils className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-purple-800">Black Balsam Tradition</h4>
                      <p className="text-sm text-purple-700">
                        Latvia's herbal liqueur tradition in Riga - 24 herbs and spices
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Thermometer className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-purple-800">Finnish Sauna Ritual</h4>
                      <p className="text-sm text-purple-700">
                        Löyly offers the quintessential Nordic experience with Baltic Sea swimming
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Camera className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-purple-800">Art Nouveau Paradise</h4>
                      <p className="text-sm text-purple-700">Riga has Europe's finest concentration on Alberta iela</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Emergency Footer */}
      <footer className="bg-stone-800 text-stone-100 py-4 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="font-semibold">Emergency: 112</span>
            <span>•</span>
            <span>All countries</span>
            <span>•</span>
            <span>Works from any phone</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
