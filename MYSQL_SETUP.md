# MySQL Setup Guide for Reviewly

## Step 1: Start MySQL Service

Try one of these methods:

### Method 1: Using Homebrew Services
```bash
brew services start mysql
```

### Method 2: If Method 1 fails, try:
```bash
sudo /opt/homebrew/bin/mysqld_safe --user=_mysql &
```

### Method 3: Manual Start
```bash
mysql.server start
```

## Step 2: Secure MySQL Installation (First Time Setup)

If this is your first time setting up MySQL, you may need to secure it:

```bash
mysql_secure_installation
```

Follow the prompts:
- Set root password (remember this password!)
- Remove anonymous users: **Y**
- Disallow root login remotely: **Y** (for local development)
- Remove test database: **Y**
- Reload privilege tables: **Y**

## Step 3: Create the Database

Connect to MySQL:
```bash
mysql -u root -p
```

Enter your root password when prompted.

Then run these SQL commands:

```sql
-- Create the database
CREATE DATABASE platformDB;

-- Use the database
USE platformDB;

-- Create the users table
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(400) DEFAULT NULL,
  `role` enum('System Administrator','Normal User','Store Owner') NOT NULL DEFAULT 'Normal User',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
);

-- Create the stores table
CREATE TABLE `stores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `address` varchar(400) NOT NULL,
  `owner_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `owner_id` (`owner_id`),
  CONSTRAINT `stores_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
);

-- Create the ratings table
CREATE TABLE `ratings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `store_id` int NOT NULL,
  `rating` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_store_unique` (`user_id`,`store_id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`) ON DELETE CASCADE,
  CONSTRAINT `rating_check` CHECK ((`rating` >= 1) AND (`rating` <= 5))
);

-- Exit MySQL
EXIT;
```

## Step 4: Create .env File

Create a `.env` file in the `backend/` directory:

```bash
cd backend
touch .env
```

Add the following content to `.env`:

```properties
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_root_password_here
DB_NAME=platformDB
JWT_SECRET=your_super_secret_jwt_key_make_it_long_and_random_123456789
NODE_ENV=development
```

**Important:** Replace `your_mysql_root_password_here` with the actual MySQL root password you set in Step 2.

## Step 5: (Optional) Create Admin User

If you want to create a default admin user, you'll need to hash a password first:

```bash
cd backend
node -e "const bcrypt = require('bcryptjs'); const hash = bcrypt.hashSync('Admin@123', 10); console.log(hash);"
```

Copy the hash output, then:

```bash
mysql -u root -p platformDB
```

```sql
INSERT INTO `users` (`name`, `email`, `password`, `role`) VALUES
('Admin User', 'admin@example.com', 'PASTE_THE_HASH_HERE', 'System Administrator');
EXIT;
```

## Troubleshooting

### If MySQL won't start:
```bash
# Check MySQL status
brew services list | grep mysql

# Check MySQL logs
tail -f /opt/homebrew/var/mysql/*.err

# Try resetting MySQL
brew services stop mysql
brew services start mysql
```

### If you forgot your MySQL root password:
```bash
# Stop MySQL
brew services stop mysql

# Start MySQL in safe mode (skip grant tables)
mysqld_safe --skip-grant-tables &

# Connect without password
mysql -u root

# Reset password
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
FLUSH PRIVILEGES;
EXIT;

# Restart MySQL normally
brew services restart mysql
```

### Test Connection:
```bash
mysql -u root -p -e "SHOW DATABASES;"
```

If this works, your MySQL is set up correctly!

