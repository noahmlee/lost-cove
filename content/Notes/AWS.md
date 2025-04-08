---
title: AWS
draft: false
tags:
  - notes
  - webdev
  - tools/services
  - aws
---
## AWS (Amazon Web Services)

AWS is the toolbox you open when you want to deploy something to the cloud — storage, servers, databases, you name it. It's vast, powerful, and a little overwhelming at first. But once you learn what you actually _need_, it becomes way more manageable.

---

### Core Services I Actually Use

- **EC2** — Rent a virtual machine. You pick the OS, instance size, and config. Good for hosting apps or servers (like Node.js backends).
    
- **S3** — Object storage. Upload images, files, backups, etc. Public or private. Great for static websites or media.
    
- **IAM** — Identity & Access Management. Controls who/what can do things on your account. Use roles, not root.
    
- **RDS** — Managed SQL databases. Takes care of backups, scaling, patching.
    
- **Route 53** — DNS service. Use it to point your domain to your EC2, S3, or whatever.
    
- **CloudFront** — CDN for faster content delivery. Works great with S3.

---

### Common Use Case: Deploying a Node Backend on EC2

1. Spin up an EC2 instance (usually Ubuntu).
    
2. SSH into it.
    
3. Install Node, Git, and whatever else.
    
4. Clone your repo.
    
5. Run it like normal, or use `pm2` to keep it alive.
    
6. Configure security groups to allow traffic on the right ports (like 80 or 3000).
    
7. Point your domain at the public IP using Route 53.

---

### Notes to Self

- Always create a **new user** in IAM and give it scoped permissions — never use your root account for anything besides billing and creating IAM users.
- **Security Groups** = firewall rules for your instance. Open only what you need.
- EC2 instance IPs can change — use **Elastic IP** if you want it to stay the same.
- Set up **SSL** with Let's Encrypt + Nginx or use **CloudFront** in front of S3 for HTTPS.

---

### Tools & Helpers

- `AWS CLI`: Manage resources from the command line  
    `aws configure` to get started (access key & secret key)
- `aws-sdk`: Use AWS from Node.js
	```
    const AWS = require('aws-sdk');
    const s3 = new AWS.S3();
    ```
- `EC2 Instance Connect`: Quick way to SSH from the browser if you lose your local key.

---

### AWS in Projects

> I usually use EC2 for servers, S3 for uploads/media, and Route 53 to link domains. IAM roles let me give my Node apps access to S3 without hardcoding secrets.