import { Star } from "lucide-react"

type Props = {
    rating: number;
};

export const Stars = ({ rating }: Props) => {
    const starsList =  [...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-400'
          }`}
        />
      ))

      return (
        <>
            { starsList }
        </>
      )
}