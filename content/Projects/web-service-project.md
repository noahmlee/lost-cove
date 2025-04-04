---
title: Web-Service Project
draft: 
tags:
  - project
  - webdev
  - backend
  - api
  - aws
  - express
  - node
  - supabase
  - database
---
<p align="center"><img src="webservice_diagram.jpg" /></p>

## Web Service Middleware Project

While working in QA with a client that develops custom applications for shipping companies, I was given the task of building a backend-only web service to bridge the gap between the client’s mobile app and their customers’ existing databases. This project served as a middleware integration layer, handling both user authentication and secure shipment data retrieval.
### Purpose

The goal was to develop a web server capable of receiving API requests from the client’s mobile application and returning relevant data from a dynamic customer database. Requirements included:

- User authentication using API tokens.
- Secure access to shipment data ("loads").
- Validation of requests using a secret auth key header.
- Integration with a live, structured database—no hard-coded data allowed.

### Tech Stack

- **Node.js** & **Express** - For creating the backend server and handling routing.
- **Supabase** - Cloud-hosted PostgreSQL database and authentication layer.
- **REST API** - RESTful endpoints were exposed for structured data access.
- **PostgreSQL** - Structured schema for users, loads, and a many-to-many relationship using a junction table.
- **AWS EC2** - Used for deploying the application after moving away from Heroku.

### API Features

- `POST /user` - Authenticates a user and returns their API token.
- `GET /user/:id` - Retrieves user data using a provided token.
- `GET /loads` - Returns shipment loads tied to an authenticated user only.
- All routes validate the `Authorization` header to secure access.

## The Database

<p align="center"><img src="webservice_db.jpg" /></p>

### Challenges Faced

- **Modeling Many-to-Many Relationships**  
    Connecting users and shipment loads required a `user_loads` junction table for a clean and scalable schema design.
- **Supabase Learning Curve**  
    As a new tool for me, Supabase took time to learn, but offered powerful querying and auth features once understood.
- **AWS Deployment**  
	Transitioning from Heroku to AWS EC2 involved configuring environment variables, and security groups manually, something I hadn’t done before.
- **Improving Error Transparency**  
    Supabase’s error feedback was sometimes vague. To work around this, I added fallback logs and refined my catch blocks.

### What I Learned

- How to build a secure, backend-only API using Node.js and Express.
- Practical Supabase usage for both data storage and authentication.
- How to model and query many-to-many relationships using PostgreSQL.
- Secure API design with custom headers and token-based authentication.
- Deployment and configuration of backend services on AWS EC2 instances.