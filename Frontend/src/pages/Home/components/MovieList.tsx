import { Stars } from "@/components/Stars"
import { Card, CardContent } from "@/components/ui/card"

// Przykładowe dane dla kart
const cardData = [
  { id: 1, title: "Góry", description: "Piękny widok na góry", rating: 4.5 },
  { id: 2, title: "Plaża", description: "Słoneczny dzień na plaży", rating: 4.8 },
  { id: 3, title: "Miasto", description: "Tętniące życiem miasto nocą", rating: 4.2 },
  { id: 4, title: "Las", description: "Spokojny spacer po lesie", rating: 4.6 },
  { id: 5, title: "Jezioro", description: "Spokojne wody jeziora", rating: 4.3 },
  { id: 6, title: "Pustynia", description: "Bezkresne piaski pustyni", rating: 4.1 },
  { id: 7, title: "Wodospad", description: "Majestatyczny wodospad", rating: 4.7 },
  { id: 8, title: "Łąka", description: "Kolorowa łąka pełna kwiatów", rating: 4.4 },
  { id: 9, title: "Kanion", description: "Głęboki kanion o zachodzie słońca", rating: 4.9 },
  { id: 10, title: "Wyspa", description: "Tropikalna wyspa z palmami", rating: 4.6 },
  { id: 11, title: "Góry lodowe", description: "Majestatyczne góry lodowe", rating: 4.8 },
  { id: 12, title: "Sawanna", description: "Dzikie zwierzęta na sawannie", rating: 4.5 },
  { id: 13, title: "Jaskinia", description: "Tajemnicza jaskinia", rating: 4.2 },
  { id: 14, title: "Wulkan", description: "Aktywny wulkan", rating: 4.7 },
  { id: 15, title: "Rzeka", description: "Meandrująca rzeka", rating: 4.3 },
  { id: 16, title: "Pole lawendy", description: "Fioletowe pola lawendy", rating: 4.6 },
]

export const  MovieList = () => {
  const cardList = cardData.map((card) => (
    <Card key={card.id} className="shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <CardContent className="p-0">
        <div 
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(/placeholder.svg?height=200&width=300)` }}
        />
        <div className="p-4 bg-black bg-opacity-50  inset-0 flex flex-col justify-end">
          <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
          <p className="text-sm text-gray-200 mb-2">{card.description}</p>
          <div className="flex items-center">
            <Stars rating={card.rating} />
            <span className="ml-2 text-sm text-white">{card.rating.toFixed(1)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ))


  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        { cardList }
      </div>
    </div>
  )
}

