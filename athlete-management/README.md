## Installation and Setup

### 1. Prerequisites

Make sure the following software is installed:

- Node.js and npm
- MariaDB

### 2. Set Up the Database

1. Start the MariaDB server.
2. Open HeidiSQL or another MariaDB client.
3. Execute `database.sql` to create the `athlete_db` database and `athletes` table.
4. Create a MariaDB user with SELECT, INSERT, UPDATE, and DELETE permissions for `athlete_db`, or use an existing authorized user.

**Note:** The database creation script only needs to be executed during the initial setup. Start MariaDB whenever you want to run the application.

### 3. Configure the Backend

Navigate to the backend directory:

cd backend
npm install

Copy `.env.example` to `.env` and configure your database credentials:

```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=athlete_db
PORT=3000
```

Start the backend server:

npm run dev

The REST API will be available at:

http://localhost:3000/api/athletes

### 4. Start the Frontend

Open a second terminal and navigate to the frontend directory:

cd frontend
npm install
npm run dev

Open the application in your browser:

http://localhost:5173

**Important:** Keep MariaDB, the backend server, and the frontend development server running while using the application.

### 5. Running the Application Later

After the initial installation, you do not need to execute `database.sql` or reinstall dependencies each time.

Simply:

1. Start MariaDB.
2. Run `npm run dev` in the `backend` directory.
3. Run `npm run dev` in the `frontend` directory.
4. Open http://localhost:5173.
