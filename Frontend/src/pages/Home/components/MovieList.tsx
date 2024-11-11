import { Stars } from "@/components/Stars"
import { Card, CardContent } from "@/components/ui/card"
import { useMovieListVm } from "./useMovieList.vm"
import { Spinner } from "@/components/spinner";
import { ErrorDisplay } from "@/components/error-display";

// Przykładowe dane dla kart
export const MovieList = () => {
  const vm = useMovieListVm();

  if (vm.isLoading) {
    return <Spinner size="lg" />
  }

  if (vm.isError) {
    return <ErrorDisplay error={"Problem z pobraniem listy filmow"} />
  }

  if (!vm.data || vm.data.length === 0) {
    return <h1>We have no data</h1>
  }

  const cardList = vm.data.map((card) => (
    <Card
      onClick={() => vm.navigate(`/movie/${card.id}`)}
      key={card.id}
      className="shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:scale-105 cursor-pointer" // Dodano animację i cursor-pointer
    >
      <CardContent className="p-0">
        <div
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${card.background})` }}
        />
        <div className="p-4 bg-black bg-opacity-50 flex flex-col justify-end h-36">
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
        {cardList}
      </div>
    </div>
  )
}
