# Aplikacja Rezerwacji Kina

## Opis projektu

Aplikacja umożliwia zarządzanie repertuarem kina oraz rezerwacjami biletów.
Składa się z backendu i frontendu, oferując użytkownikom funkcjonalności takie jak rejestracja, logowanie, przeglądanie filmów oraz rezerwacja biletów na wybrane wydarzenia.

---

## Funkcjonalności

### Ogólne
1. **Rejestracja i logowanie**:
   - Bezpieczna autoryzacja użytkowników przy użyciu Identity.
   - Możliwość rejestracji i logowania, aby uzyskać dostęp do funkcji personalnych.

2. **Lista filmów**:
   - Katalog filmów zawierający tytuły, opisy oraz oceny.

3. **Kalendarz wydarzeń filmowych**:
   - Każdy film posiada swój kalendarz pokazujący zaplanowane wydarzenia.
   - Użytkownik może przeglądać wydarzenia w widoku dnia, tygodnia lub miesiąca.

4. **Rezerwacja biletów**:
   - Możliwość rezerwacji biletów na wybrane wydarzenie filmowe bezpośrednio z kalendarza.

5. **Mój kalendarz**:
   - Spersonalizowany kalendarz pokazujący rezerwacje użytkownika.

6. **Zarządzanie rezerwacjami**:
   - Edycja rezerwacji: użytkownik może zmieniać liczbę zarezerwowanych biletów.
   - Anulowanie rezerwacji: możliwość anulowania dokonanych rezerwacji.

---

## Technologie

### Backend
- **Framework**: ASP.NET Core
- **Autoryzacja i uwierzytelnianie**: Identity z JWT Bearer
- **Baza danych**: SQLite z Entity Framework Core
- **Dokumentacja API**: OpenAPI/Swagger
- **Seeding danych**: AppDbContextSeeder

### Frontend
- **Framework**: React z TypeScript
- **Zarządzanie stanem**: Zustand
- **Formularze**: React Hook Form z walidacją Zod
- **Routing**: React Router
- **Stylizacja**: TailwindCSS
- **Powiadomienia**: React Toastify
- **Kalendarz**: FullCalendar
- **Autoryzacja**: React OIDC Context z oidc-client-ts
- **Zapytania do API**: Axios
- **Narzędzie budowania**: Vite

---


## Architektura aplikacji

### Backend
- **Kontrolery**:
  - `AuthController`: Obsługuje rejestrację, logowanie oraz uwierzytelnianie użytkowników.
  - `MoviesController`: Zarządza listą filmów oraz ich szczegółami.
  - `ReservationController`: Obsługuje rezerwacje biletów oraz funkcje związane z rezerwacjami użytkownika.
  
- **Modele danych**:
  - `User`: Reprezentuje użytkowników aplikacji.
  - `Movie`: Zawiera szczegóły filmu, takie jak tytuł, opis i oceny.
  - `Event`: Reprezentuje zaplanowane wydarzenie filmowe.
  - `Reservation`: Śledzi rezerwacje biletów.
  
- **DTO (Data Transfer Objects)**:
  - Używane do transferu danych między frontendem a backendem (np. `LoginDto`, `AddReservationDto`).

### Frontend
- Wykorzystuje podejście modułowe z możliwością ponownego użycia komponentów i hooków do zarządzania stanem i API.
- Integracja **FullCalendar** do wizualizacji wydarzeń.
- **TailwindCSS** zapewnia responsywny i nowoczesny wygląd aplikacji.

---

## Zrzuty ekranu
## Zrzuty ekranu

### Strona rejestracji
![image](https://github.com/user-attachments/assets/47058756-53db-4d7b-99bf-95539b55705f)

### Strona logowania
![image](https://github.com/user-attachments/assets/f6aa6fc2-70d6-4fe0-89b5-a4b202d29077)

### Lista filmów
![image](https://github.com/user-attachments/assets/fa51e509-5a8e-41d8-8876-ff6d148c8ba4)

### Kalendarz wydarzeń
![image](https://github.com/user-attachments/assets/450ee24b-83d5-429f-aaa2-4bc96046eb26)

![image](https://github.com/user-attachments/assets/79a3689a-a0fd-4d04-8511-d4d536e09cc1)

### Rezerwacja biletów
![image](https://github.com/user-attachments/assets/11d9f683-8dc0-4c7e-98c7-d753f923f4ef)

### Kalendarz Użytkownika
![image](https://github.com/user-attachments/assets/208df778-4a88-46ce-ab73-eee28460895b)

### Podgląd Rezerwacji 
![image](https://github.com/user-attachments/assets/3154e1ce-7846-4e45-9761-8f592a5e9690)


### Podgląd Rezerwacji 
![image](https://github.com/user-attachments/assets/1d66a521-b13d-47f5-9752-056b7ece8b1e)

### Refresh Token 
![image](https://github.com/user-attachments/assets/28515128-0ce2-420e-8109-f17e73c7ad15)

### Refresh Token - response
![image](https://github.com/user-attachments/assets/b22c8e73-0ff9-486b-a089-7e9dbe2a72df)

### Token w Header
![image](https://github.com/user-attachments/assets/596fb432-d9d0-4838-be71-93bcc60c7102)

