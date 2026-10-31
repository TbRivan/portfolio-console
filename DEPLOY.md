# VPS Deployment Guide

This guide explains how to deploy your Portfolio application to any Linux VPS (Ubuntu, Debian, CentOS, etc.) using Docker and Docker Compose.

---

## 1. Prerequisites on VPS

Ensure Docker and Docker Compose (v2) are installed on your VPS:

```bash
# Update package lists
sudo apt update && sudo apt upgrade -y

# Install Docker & Docker Compose plugin (Ubuntu / Debian)
sudo apt install -y docker.io docker-compose-v2

# Start and enable Docker service
sudo systemctl enable --now docker

# Optional: Allow non-root user to run Docker commands
sudo usermod -aG docker $USER
newgrp docker
```

---

## 2. Quick Deployment (1-Command)

1. **Clone your repository** onto the VPS:
   ```bash
   git clone <YOUR_GIT_REPO_URL> portfolio
   cd portfolio
   ```

2. **(Optional) Configure Port**:
   If port `80` is free, no configuration is needed. If port `80` is already in use by another service on your VPS, create a `.env` file:
   ```bash
   cp .env.example .env
   # Edit PORT in .env (e.g. PORT=8080 or PORT=3000)
   nano .env
   ```

3. **Build and start the container**:
   ```bash
   docker compose up -d --build
   ```

4. **Verify container status**:
   ```bash
   docker compose ps
   ```

You can now visit `http://YOUR_VPS_IP` (or `http://YOUR_VPS_IP:PORT`).

---

## 3. Domain & Free SSL (HTTPS) Setup

### Option A: Using Nginx on the VPS Host as Reverse Proxy

If you already have Nginx installed on your VPS or want Let's Encrypt SSL:

1. In `.env`, set:
   ```env
   PORT=3000
   ```
   and run `docker compose up -d`.

2. Install Certbot and Nginx:
   ```bash
   sudo apt install -y nginx certbot python3-certbot-nginx
   ```

3. Create Nginx site config `/etc/nginx/sites-available/portfolio`:
   ```nginx
   server {
       server_name yourdomain.com www.yourdomain.com;

       location / {
           proxy_pass http://127.0.0.1:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

4. Enable site and obtain SSL:
   ```bash
   sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

### Option B: Using Cloudflare (Free SSL & CDN)

1. Point your domain DNS **A Record** to your VPS IP in Cloudflare.
2. Turn on the orange cloud (**Proxied**).
3. Under **SSL/TLS settings**, choose **Flexible** or **Full**.
4. Your site will automatically have valid HTTPS without configuring SSL certificates on the VPS.

---

## 4. Maintenance & Useful Commands

| Task | Command |
|---|---|
| View container logs | `docker compose logs -f` |
| Restart application | `docker compose restart` |
| Stop application | `docker compose down` |
| Pull updates & rebuild | `git pull && docker compose up -d --build` |
| Check resource usage | `docker stats portfolio-app` |
