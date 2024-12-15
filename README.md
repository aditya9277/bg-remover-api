# Background Removal API Documentation

## Brief
Before going into details, lets get directly to the main thing<br>
Our API Endpoint is live on `POST https://hehe-1-n40u.onrender.com/api/remove-background`

---

## Overview
The Background Removal API is a service that removes backgrounds from product images for e-commerce platforms. It accepts image URLs and bounding box coordinates, processes the images to remove backgrounds, and returns the processed images with transparent backgrounds.

---

## Table of Contents
- [Technical Stack](#technical-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Postman Collection](#postman-collection)
- [Error Handling](#error-handling)
- [Logging](#logging)

---

## Technical Stack

### Core Technologies
- **Node.js** (v14+)
- **Express.js** - Web framework
- **Remove.bg API** - For background removal processing

### Dependencies
- `express` - Web server framework
- `axios` - HTTP client
- `dotenv` - Environment configuration
- `joi` - Request validation
- `remove.bg` - Background removal service
- `winston` - Logging

### Development Dependencies
- `nodemon` - Development server
- `supertest` - API testing

---

## Project Structure
```plaintext
.
├── src/
│   ├── controllers/
│   │   └── imageController.js    # Image processing controller
│   ├── middleware/
│   │   ├── errorHandler.js       # Global error handling
│   │   └── validateRequest.js    # Request validation
│   ├── routes/
│   │   └── index.js             # API routes
│   ├── services/
│   │   ├── backgroundRemoval.js  # Background removal logic
│   │   └── storage.js           # S3 storage operations
│   ├── utils/
│   │   └── logger.js            # Logging configuration
│   ├── validators/
│   │   └── imageValidator.js    # Input validation schemas
│   └── server.js                # Application entry point
├── tests/
│   └── image.test.js            # API tests
├── .env.example                 # Environment variables template
├── package.json
└── README.md
```

---

## Setup Instructions

### Prerequisites
1. **Node.js** (v14 or higher)
2. **Remove.bg API key**
3. **Git**

### Local Development Setup
1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd background-removal-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your credentials:
   ```plaintext
   REMOVE_BG_API_KEY=your_remove_bg_api_key
   ```
---
Currently the `src/services/storage.js` is setup for storing Processed image in Render's temporary storage<br>
In order to save images into your local computer, replace the storage directory line i.e. `Line 5` with <br>
```javascript
const storageDir = path.join(__dirname, '../public/images');
```
---

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## API Documentation

### Remove Background Endpoint

**Endpoint:** `POST https://hehe-1-n40u.onrender.com/api/remove-background`

**Request Headers:**
```plaintext
Content-Type: application/json
```

**Request Body:**
```json
{
    "image_url": "https://example.com/image.jpg",
    "bounding_box": {
        "x_min": 0,
        "y_min": 0,
        "x_max": 100,
        "y_max": 100
    }
}
```

**Success Response (200 OK):**
```json
{
    "original_image_url": "https://example.com/image.jpg",
    "processed_image_url": "https://your-bucket.s3.region.amazonaws.com/processed-image.png"
}
```

**Error Response (400 Bad Request):**
```json
{
    "error": "Invalid image URL format"
}
```

### Sample Test Images

| Product   | Image URL                                                                                      | Suggested Coordinates                          |
|-----------|------------------------------------------------------------------------------------------------|-----------------------------------------------|
| Sofa      | [Link](https://plus.unsplash.com/premium_photo-1681449856688-2abd99ab5a73)                      | `{"x_min": 100, "y_min": 200, "x_max": 800, "y_max": 600}` |
| Jacket    | [Link](https://plus.unsplash.com/premium_photo-1675186049563-000f7ac02c44)                      | `{"x_min": 200, "y_min": 100, "x_max": 700, "y_max": 900}` |
| Oil Bottle| [Link](https://images.unsplash.com/photo-1549049950-48d5887197a0)                               | `{"x_min": 300, "y_min": 150, "x_max": 500, "y_max": 800}` |
| Car       | [Link](https://images.unsplash.com/photo-1469285994282-454ceb49e63c)                           | `{"x_min": 150, "y_min": 200, "x_max": 900, "y_max": 600}` |

---


### API Endpoint
The API is accessible at: `https://hehe-1-n40u.onrender.com/api/remove-background`

---


---

### Example Request
```json
{
    "image_url": "https://example.com/product.jpg",
    "bounding_box": {
        "x_min": 100,
        "y_min": 100,
        "x_max": 500,
        "y_max": 600
    }
}
```


## Error Handling

The API implements comprehensive error handling for:
- Invalid input validation
- Image processing failures
- Storage errors
- Network issues

Error responses follow a consistent format:
```json
{
    "error": "Descriptive error message"
}
```

---

## Logging

Logs are stored in:
- `error.log`: Error-level logs
- `combined.log`: All logs

Log format:
```json
{
    "timestamp": "2024-01-01T00:00:00.000Z",
    "level": "error",
    "message": "Error details"
}
