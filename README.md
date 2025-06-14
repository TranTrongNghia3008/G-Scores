# G-Scores
## Tech Stack

- **Frontend**: React + Vite + TailwindCSS  
- **Backend**: Django + Django REST Framework  
- **Database**: PostgreSQL  
- **Dev Tools**: Docker + Docker Compose  

## Deployment
- Backend: https://g-scores-6.onrender.com
- Frontend: https://g-scores-iyke.vercel.app

## Environment Variables
```env
POSTGRES_DB=diem_thi
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
DB_HOST=db
DB_PORT=5432
ALLOWED_HOSTS = *
```
## Run Backend
```
cd backend
```
### 1. Build & Start All Services
```
docker-compose up --build
```
### 2. Apply Django Migrations
```
docker-compose exec backend python manage.py migrate
```
### 3. (Optional) Create Django Superuser
```
docker-compose exec backend python manage.py createsuperuser
```
### Notes
- Stop service: Ctrl + C then docker-compose down
- Unmount volume (reset database): docker-compose down -v
- Rebuild everything: docker-compose up --build

## Run Frontend
```
cd frontend
```
### 1. Environment Variables
```
VITE_API_BASE_URL=http://localhost:8000
```
### 2. Install dependencies
```
npm install
```
### 3. Run development server
```
npm run dev
```
## Development Details
- Backend : http://localhost:8000
- Frontend : http://localhost:5173
