---
title: API
draft: 
tags:
  - notes
  - api
  - programming-concepts
  - backend
---
## What Is an API?

API stands for **Application Programming Interface**. In simple terms, an API is a way for two systems, whether apps, servers, or devices, to communicate with each other. It defines a contract for how data should be requested, sent, and received between these systems.

Think of an API like a waiter at a restaurant. You (the client) tell the waiter what you want (your request), the waiter communicates with the kitchen (the server), and then brings you your order (the response). The entire exchange follows a specific format so that everyone knows what to expect.

## What Can an API Do?

APIs are everywhere and can do a wide variety of tasks:

- Authenticate users
- Process payments
- Retrieve or store data in a database
- Post content to a social media platform
- Send emails or SMS
- Control smart devices
- Connect services together (e.g., Zapier, IFTTT)

## Common API Examples

- **Payment APIs** – Stripe, PayPal, Square
- **Authentication APIs** – Google OAuth, Auth0, Firebase Auth
- **Social Media APIs** – Bluesky API, Facebook Graph API, Instagram Basic Display API
- **Mapping APIs** – Google Maps, Mapbox
- **Weather APIs** – OpenWeatherMap, WeatherStack

## What Is a REST API?

REST stands for **Representational State Transfer**. It is a popular architectural style for designing APIs that use HTTP as the communication protocol. REST APIs work with resources, such as users, posts, or products, and use standard HTTP methods to interact with those resources.

### Core HTTP Methods in REST:

- `GET` – Retrieve data
- `POST` – Create new data
- `PUT` – Update existing data
- `DELETE` – Remove data

REST APIs are stateless, meaning each request contains all the information needed to process it. The server does not remember the state of previous interactions.

A RESTful API typically returns data in JSON format, although XML or other formats are sometimes used.

**Example:**
```js
GET /users/123 Host: api.example.com Authorization: Bearer <token>
```
Response:
```json
{   
	"id": 123,
	"name": "Jane Doe",
	"email": "jane@example.com" 
}
```

## Anatomy of an API

### API Client

This is the application making the request, like a browser, mobile app, or another backend server.

### API Request

- **Endpoint** – The URL route to a specific resource (`/users`, `/orders/123`)
- **Method** – The type of request (`GET`, `POST`, `PUT`, `DELETE`)
- **Parameters** – Optional values to filter or modify the request (e.g., `?limit=10`)
- **Headers** – Key-value pairs sent with the request, often for auth and content type
- **Body** – The data sent in `POST` or `PUT` requests, typically JSON

### API Server

The backend that receives requests, processes them, interacts with databases or services, and returns a response.

### API Response

- **Status Code** – Indicates success or failure (`200`, `404`, `500`)
- **Headers** – Metadata about the response
- **Body** – The data returned, most often in JSON

---

## What I’ve Built with APIs

- **[[web-service-project]]** - A backend web service that connects a shipping client’s mobile app to dynamic shipment data. I used Node.js and Express to build the server, Supabase for the PostgreSQL database, and AWS EC2 for deployment. The service authenticates users with API tokens and only returns shipments linked to that user.