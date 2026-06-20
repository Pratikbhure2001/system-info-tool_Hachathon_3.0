 # System Information & File Manager Tool

## Project Overview

This project is a Node.js based tool that collects and displays system information, environment variables, and provides CRUD (Create, Read, Update, Delete) operations on code files.

The application provides:

* System Information Collection
* Environment Variable Collection
* REST API Endpoints
* Interactive Dashboard
* Code File CRUD Operations
* JSON Output
* Console Output

---

# Technologies Used

* Node.js
* Express.js
* HTML
* CSS
* JavaScript
* File System Module (fs)
* OS Module (os)
* Path Module (path)

---

# Features

## Part 1: System Information

The application collects:

* Operating System
* CPU Architecture
* Hostname
* Node.js Version
* Platform Information
* User Home Directory

### Example

```json
{
  "operatingSystem": "Windows_NT",
  "cpuArchitecture": "x64",
  "hostname": "pratik",
  "nodeVersion": "v22.20.0",
  "platform": "win32",
  "homeDirectory": "C:\\Users\\prati"
}
```

---

## Part 2: Environment Variables

The application collects selected environment variables:

* Username
* Node Environment
* PATH
* TEMP

### Example

```json
{
  "username": "prati",
  "nodeEnv": "Not Available",
  "temp": "C:\\Users\\prati\\AppData\\Local\\Temp"
}
```

---

## Part 3: CRUD Operations

The application performs CRUD operations on code files stored inside the `files` directory.

Supported Operations:

### Create

Creates a new code file.

### Read

Reads file content.

### Update

Updates existing file content.

### Delete

Deletes existing file.

### List Files

Displays all available files.

---

# Project Structure

```text
system-info-tool
│
├── src
│   ├── index.js
│   ├── services
│   │   ├── systemInfo.js
│   │   ├── envInfo.js
│   │   └── fileManager.js
│
├── public
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── files
│
├── package.json
├── package-lock.json
└── README.md
```

---

# Code Flow

## Step 1

User starts application:

```bash
node src/index.js
```

## Step 2

Express server starts.

## Step 3

System information is collected using:

```javascript
os.type()
os.arch()
os.hostname()
os.homedir()
process.version
```

## Step 4

Environment variables are collected using:

```javascript
process.env
```

## Step 5

Data is printed in:

* Console Output
* JSON API Response
* Dashboard Interface

## Step 6

File Manager APIs perform CRUD operations using:

```javascript
fs.writeFileSync()
fs.readFileSync()
fs.unlinkSync()
fs.readdirSync()
```

---

# Strategy

The application is divided into separate modules to improve maintainability and readability.

### systemInfo.js

Responsible for collecting operating system information.

### envInfo.js

Responsible for collecting environment variables.

### fileManager.js

Responsible for file CRUD operations.

### index.js

Acts as the application entry point and API server.

### Frontend Dashboard

Displays system information, environment variables, and file management features.

---

# API Endpoints

## System Information

```http
GET /api/system-info
```

Returns system information and environment variables.

---

## Get All Files

```http
GET /api/files
```

---

## Read File

```http
GET /api/files/:name
```

---

## Create File

```http
POST /api/files
```

---

## Update File

```http
PUT /api/files/:name
```

---

## Delete File

```http
DELETE /api/files/:name
```

---

# Error Handling

The application handles:

* Missing files
* Missing environment variables
* Invalid file operations
* Server errors

Graceful error messages are returned using JSON responses.

---

# Installation

Install dependencies:

```bash
npm install
```

Run application:

```bash
node src/index.js
```

Open browser:

```text
http://localhost:3000
```

---

# Output

The application provides output in:

1. Console Output
2. JSON API Response
3. Interactive Dashboard

---

# Future Improvements

* Cloud Storage Integration
* User Authentication
* Code Editor Syntax Highlighting
* File Upload Support
* File Search Functionality
* Real-Time Monitoring

---

# Author

Pratik Bhure
