using WebApi.Data;
using WebApi.Models;

namespace WebApi.Seeder;

public static class AppDbContextSeeder
{
    public static void Seed(AppDbContext context)
    {
        // Sprawdź, czy baza danych jest pusta
        if (!context.Movies.Any())
        {
            // Seedowanie filmów
            var movies = new List<Movie>
            {
                new Movie
                {
                    Id = Guid.NewGuid(),
                    AuthorName = "Andrzej Wajda",
                    Title = "Ashes and Diamonds",
                    Description = "A Polish resistance fighter faces moral dilemmas at the end of World War II.",
                    Rating = 8.2,
                    Background = "https://s3.amazonaws.com/criterion-production/films/79fdfc7b70bc68259dd9c75d8a12684d/AtP0Z6p4KnQINmkSp0Q4bOYxH08q1D_large.jpg",
                    ReleaseDate = "1958-05-08",
                    Director = "Andrzej Wajda",
                    Duration = "2h",
                    Cast = "Zbigniew Cybulski, Ewa Krzyżewska"
                },
                new Movie
                {
                    Id = Guid.NewGuid(),
                    AuthorName = "Roman Polanski",
                    Title = "Knife in the Water",
                    Description = "A tense psychological thriller set on a sailboat.",
                    Rating = 7.6,
                    Background = "https://example.com/knife.jpg",
                    ReleaseDate = "1962-10-09",
                    Director = "Roman Polanski",
                    Duration = "1h 34m",
                    Cast = "Leon Niemczyk, Jolanta Umecka"
                },
                new Movie
                {
                    Id = Guid.NewGuid(),
                    AuthorName = "Krzysztof Kieślowski",
                    Title = "The Double Life of Véronique",
                    Description = "A mysterious and lyrical tale of two women leading parallel lives.",
                    Rating = 7.8,
                    Background = "https://multikino.pl/-/jssmedia/multikino/images/film-and-events/2024/vaiana-2/vaiana-2-plakat.jpg?mw=208&rev=b07d707b113949df8800acb69759634c",
                    ReleaseDate = "1991-05-15",
                    Director = "Krzysztof Kieślowski",
                    Duration = "1h 38m",
                    Cast = "Irène Jacob, Halina Gryglaszewska",
                },
                new Movie
                {
                    Id = Guid.NewGuid(),
                    AuthorName = "Paweł Pawlikowski",
                    Title = "Ida",
                    Description = "A young nun in 1960s Poland discovers a dark family secret.",
                    Rating = 7.4,
                    Background = "https://multikino.pl/-/jssmedia/multikino/images/film-and-events/2024/vaiana-2/vaiana-2-plakat.jpg?mw=208&rev=b07d707b113949df8800acb69759634c",
                    ReleaseDate = "2013-10-25",
                    Director = "Paweł Pawlikowski",
                    Duration = "1h 22m",
                    Cast = "Agata Kulesza, Agata Trzebuchowska",
                },
                new Movie
                {
                    Id = Guid.NewGuid(),
                    AuthorName = "Steven Spielberg",
                    Title = "Schindler's List",
                    Description = "The story of a man who saved over a thousand Jewish lives during the Holocaust.",
                    Rating = 8.9,
                    Background = "https://example.com/schindler.jpg",
                    ReleaseDate = "1993-12-15",
                    Director = "Steven Spielberg",
                    Duration = "3h 15m",
                    Cast = "Liam Neeson, Ben Kingsley"
                },
                new Movie
                {
                    Id = Guid.NewGuid(),
                    AuthorName = "Francis Ford Coppola",
                    Title = "The Godfather",
                    Description = "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
                    Rating = 9.2,
                    Background = "https://example.com/godfather.jpg",
                    ReleaseDate = "1972-03-24",
                    Director = "Francis Ford Coppola",
                    Duration = "2h 55m",
                    Cast = "Marlon Brando, Al Pacino"
                },
                new Movie
                {
                    Id = Guid.NewGuid(),
                    AuthorName = "Christopher Nolan",
                    Title = "Inception",
                    Description = "A thief who steals corporate secrets through dream-sharing technology is given a chance to erase his criminal history.",
                    Rating = 8.8,
                    Background = "https://example.com/inception.jpg",
                    ReleaseDate = "2010-07-16",
                    Director = "Christopher Nolan",
                    Duration = "2h 28m",
                    Cast = "Leonardo DiCaprio, Joseph Gordon-Levitt"
                },
                new Movie
                {
                    Id = Guid.NewGuid(),
                    AuthorName = "Quentin Tarantino",
                    Title = "Pulp Fiction",
                    Description = "The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine in four tales of violence and redemption.",
                    Rating = 8.9,
                    Background = "https://example.com/pulpfiction.jpg",
                    ReleaseDate = "1994-10-14",
                    Director = "Quentin Tarantino",
                    Duration = "2h 34m",
                    Cast = "John Travolta, Uma Thurman"
                },
                new Movie
                {
                    Id = Guid.NewGuid(),
                    AuthorName = "Peter Jackson",
                    Title = "The Lord of the Rings: The Return of the King",
                    Description = "The final confrontation between the forces of good and evil fighting for control of Middle-earth.",
                    Rating = 8.9,
                    Background = "https://example.com/lotr.jpg",
                    ReleaseDate = "2003-12-17",
                    Director = "Peter Jackson",
                    Duration = "3h 21m",
                    Cast = "Elijah Wood, Viggo Mortensen"
                },
                new Movie
                {
                    Id = Guid.NewGuid(),
                    AuthorName = "David Fincher",
                    Title = "Fight Club",
                    Description = "An insomniac office worker forms an underground fight club as a form of male bonding.",
                    Rating = 8.8,
                    Background = "https://example.com/fightclub.jpg",
                    ReleaseDate = "1999-10-15",
                    Director = "David Fincher",
                    Duration = "2h 19m",
                    Cast = "Brad Pitt, Edward Norton"
                },
                new Movie
                {
                    Id = Guid.NewGuid(),
                    AuthorName = "Martin Scorsese",
                    Title = "Goodfellas",
                    Description = "The story of Henry Hill and his life in the mob, covering his relationship with his wife and his partners in crime.",
                    Rating = 8.7,
                    Background = "https://example.com/goodfellas.jpg",
                    ReleaseDate = "1990-09-19",
                    Director = "Martin Scorsese",
                    Duration = "2h 26m",
                    Cast = "Robert De Niro, Ray Liotta"
                },
                new Movie
                {
                    Id = Guid.NewGuid(),
                    AuthorName = "Ridley Scott",
                    Title = "Gladiator",
                    Description = "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
                    Rating = 8.5,
                    Background = "https://example.com/gladiator.jpg",
                    ReleaseDate = "2000-05-05",
                    Director = "Ridley Scott",
                    Duration = "2h 35m",
                    Cast = "Russell Crowe, Joaquin Phoenix"
                },
                new Movie
                {
                    Id = Guid.NewGuid(),
                    AuthorName = "James Cameron",
                    Title = "Titanic",
                    Description = "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
                    Rating = 7.8,
                    Background = "https://example.com/titanic.jpg",
                    ReleaseDate = "1997-12-19",
                    Director = "James Cameron",
                    Duration = "3h 15m",
                    Cast = "Leonardo DiCaprio, Kate Winslet"
                },
                new Movie
                {
                    Id = Guid.NewGuid(),
                    AuthorName = "Robert Zemeckis",
                    Title = "Forrest Gump",
                    Description = "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
                    Rating = 8.8,
                    Background = "https://example.com/forrestgump.jpg",
                    ReleaseDate = "1994-07-06",
                    Director = "Robert Zemeckis",
                    Duration = "2h 22m",
                    Cast = "Tom Hanks, Robin Wright"
                },
                new Movie
                {
                    Id = Guid.NewGuid(),
                    AuthorName = "George Lucas",
                    Title = "Star Wars: Episode IV - A New Hope",
                    Description = "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee, and two droids to save the galaxy from the Empire's world-destroying battle station.",
                    Rating = 8.6,
                    Background = "https://example.com/starwars.jpg",
                    ReleaseDate = "1977-05-25",
                    Director = "George Lucas",
                    Duration = "2h 1m",
                    Cast = "Mark Hamill, Harrison Ford"
                },
                new Movie
                {
                    Id = Guid.NewGuid(),
                    AuthorName = "Alfred Hitchcock",
                    Title = "Psycho",
                    Description = "A Phoenix secretary embezzles $40,000 from her employer's client, goes on the run, and checks into a remote motel run by a young man under the domination of his mother.",
                    Rating = 8.5,
                    Background = "https://example.com/psycho.jpg",
                    ReleaseDate = "1960-09-08",
                    Director = "Alfred Hitchcock",
                    Duration = "1h 49m",
                    Cast = "Anthony Perkins, Janet Leigh"
                },
                new Movie
                {
                    Id = Guid.NewGuid(),
                    AuthorName = "Stanley Kubrick",
                    Title = "The Shining",
                    Description = "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence.",
                    Rating = 8.4,
                    Background = "https://example.com/shining.jpg",
                    ReleaseDate = "1980-05-23",
                    Director = "Stanley Kubrick",
                    Duration = "2h 26m",
                    Cast = "Jack Nicholson, Shelley Duvall"
                },
                new Movie
                {
                    Id = Guid.NewGuid(),
                    AuthorName = "Francis Ford Coppola",
                    Title = "Apocalypse Now",
                    Description = "A U.S. Army officer is sent on a mission to assassinate a renegade Special Forces Colonel who sees himself as a god.",
                    Rating = 8.4,
                    Background = "https://example.com/apocalypsenow.jpg",
                    ReleaseDate = "1979-08-15",
                    Director = "Francis Ford Coppola",
                    Duration = "2h 33m",
                    Cast = "Martin Sheen, Marlon Brando"
                },
                new Movie
                {
                    Id = Guid.NewGuid(),
                    AuthorName = "David Lynch",
                    Title = "Mulholland Drive",
                    Description = "After a car wreck on the winding Mulholland Drive renders a woman amnesiac, she and a hopeful actress search for answers.",
                    Rating = 8.0,
                    Background = "https://example.com/mulholland.jpg",
                    ReleaseDate = "2001-10-19",
                    Director = "David Lynch",
                    Duration = "2h 27m",
                    Cast = "Naomi Watts, Laura Harring"
                },
                new Movie
                {
                    Id = Guid.NewGuid(),
                    AuthorName = "Akira Kurosawa",
                    Title = "Seven Samurai",
                    Description = "A poor village under attack by bandits recruits seven unemployed samurai to help them defend themselves.",
                    Rating = 8.6,
                    Background = "https://example.com/sevensamurai.jpg",
                    ReleaseDate = "1954-04-26",
                    Director = "Akira Kurosawa",
                    Duration = "3h 27m",
                    Cast = "Toshirô Mifune, Takashi Shimura"
                },
            };

            context.Movies.AddRange(movies);
            context.SaveChanges();
        }

        if (!context.Events.Any())
        {
            var events = GetEvents();

            var movies = context.Movies.ToList();
            
            var random = new Random();

            foreach (var movie in movies)
            {
                var selectedEvents = events.OrderBy(_ => random.Next()).Take(random.Next(3, 5)).ToList();
                
                foreach (var e in selectedEvents)
                {
                    // Twórz nowe instancje wydarzeń dla danego filmu
                    e.MovieId = movie.Id;
                }
            }

        // Seedowanie wydarzeń

            context.Events.AddRange(events);
        }

        // Zapisanie zmian w bazie danych
        context.SaveChanges();
    }

    private static List<Event> GetEvents()
    {
        return new List<Event>()
        {
            new Event
            {
                Id = Guid.NewGuid(),
                Title = "Premiere Night",
                Start = "2024-11-25 18:00",
                End = "2024-11-25 21:00",
                AvailableSeats = 100,
                Price = 20.00,
                Description = "Special premiere night for Ashes and Diamonds.",
            },
            new Event
            {
                Id = Guid.NewGuid(),
                Title = "Q&A Session",
                Start = "2024-11-26 20:00",
                End = "2024-11-26 22:00",
                AvailableSeats = 50,
                Price = 15.00,
                Description = "Q&A with the cast and crew.",
            },
            new Event
            {
                Id = Guid.NewGuid(),
                Title = "Premiere Night",
                Start = "2024-11-25 18:00",
                End = "2024-11-25 21:00",
                AvailableSeats = 100,
                Price = 20.00,
                Description = "Special premiere night for Ashes and Diamonds.",
            },
            new Event
            {
                Id = Guid.NewGuid(),
                Title = "Q&A Session",
                Start = "2024-11-26 20:00",
                End = "2024-11-26 22:00",
                AvailableSeats = 50,
                Price = 15.00,
                Description = "Q&A with the cast and crew.",
            },
            new Event
            {
                Id = Guid.NewGuid(),
                Title = "Special Screening",
                Start = "2024-12-01 18:30",
                End = "2024-12-01 21:00",
                AvailableSeats = 80,
                Price = 25.00,
                Description = "Special screening of the restored version of Ashes and Diamonds.",
            },
            new Event
            {
                Id = Guid.NewGuid(),
                Title = "Director's Commentary Night",
                Start = "2024-12-02 19:00",
                End = "2024-12-02 21:30",
                AvailableSeats = 60,
                Price = 30.00,
                Description = "Experience Ashes and Diamonds with live commentary from the director.",
            },
            new Event
            {
                Id = Guid.NewGuid(),
                Title = "Fans Meetup",
                Start = "2024-12-03 17:00",
                End = "2024-12-03 20:00",
                AvailableSeats = 50,
                Price = 10.00,
                Description = "A gathering of fans to discuss Ashes and Diamonds.",
            },
            new Event
            {
                Id = Guid.NewGuid(),
                Title = "Outdoor Screening",
                Start = "2024-12-04 18:30",
                End = "2024-12-04 21:30",
                AvailableSeats = 200,
                Price = 15.00,
                Description = "Enjoy Ashes and Diamonds under the stars.",
            },
            new Event
            {
                Id = Guid.NewGuid(),
                Title = "Exclusive Behind-the-Scenes",
                Start = "2024-12-05 19:00",
                End = "2024-12-05 21:00",
                AvailableSeats = 40,
                Price = 50.00,
                Description = "Behind-the-scenes look at the making of Ashes and Diamonds.",
            },
            new Event
            {
                Id = Guid.NewGuid(),
                Title = "Late-Night Screening",
                Start = "2024-12-06 22:00",
                End = "2024-12-07 00:30",
                AvailableSeats = 100,
                Price = 20.00,
                Description = "Late-night screening for night owls.",
            },
            new Event
            {
                Id = Guid.NewGuid(),
                Title = "Anniversary Celebration",
                Start = "2024-12-07 18:00",
                End = "2024-12-07 21:00",
                AvailableSeats = 120,
                Price = 25.00,
                Description = "Celebrate the anniversary of Ashes and Diamonds with us.",
            },
            new Event
            {
                Id = Guid.NewGuid(),
                Title = "Student Film Night",
                Start = "2024-12-08 16:00",
                End = "2024-12-08 18:00",
                AvailableSeats = 150,
                Price = 5.00,
                Description = "Special pricing for students for Ashes and Diamonds screening.",
            },
            new Event
            {
                Id = Guid.NewGuid(),
                Title = "Classic Cinema Night",
                Start = "2024-12-09 19:00",
                End = "2024-12-09 21:30",
                AvailableSeats = 70,
                Price = 18.00,
                Description = "Relive the golden age of cinema with Ashes and Diamonds.",
            },
            new Event
            {
                Id = Guid.NewGuid(),
                Title = "Christmas Special",
                Start = "2024-12-25 20:00",
                End = "2024-12-25 22:30",
                AvailableSeats = 100,
                Price = 25.00,
                Description = "Celebrate Christmas with Ashes and Diamonds.",
            },
        };
    }
}
