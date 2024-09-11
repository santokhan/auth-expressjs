1. **Install Nginx** (if you haven't already):

   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. **Create a new Nginx server block configuration file**. For this example, we'll create a file named `sanb.ssbanglaexpress.com` in the `/etc/nginx/sites-available/` directory:

   ```bash
   sudo nano /etc/nginx/sites-available/sanb.ssbanglaexpress.com.conf
   ```

3. **Add the following configuration** to the file. This assumes that your Express.js app is running on `localhost:3000`. Adjust the port if necessary.
   [nginx.conf](./nginx.conf)

4. **Enable the server block** by creating a symbolic link to the `sites-enabled` directory:

   ```bash
   sudo ln -s /etc/nginx/sites-available/sanb.ssbanglaexpress.com.conf /etc/nginx/sites-enabled/
   ```

5. **Test the Nginx configuration** to make sure there are no syntax errors:

   ```bash
   sudo nginx -t
   ```

   If the output indicates that the syntax is okay, proceed to the next step. If there are errors, correct them before continuing.

6. **Restart Nginx** to apply the changes:

   ```bash
   sudo systemctl restart nginx
   ```

7. **Ensure your Express.js application is running** on port 3000 (or the port you configured). You can start your Express.js application using:

   ```bash
   node /home/app/sanb.ssbanglaexpress.com/express/
   ```

   or using a process manager like [PM2](pm2.md):

8. **Check your DNS settings** to ensure that `sanb.ssbanglaexpress.com` points to the IP address of your server. This typically involves configuring DNS records with your domain registrar or DNS provider.

With this setup, Nginx will listen for requests to `sanb.ssbanglaexpress.com`, forward those requests to your Express.js application, and return the responses to the client. Make sure to adjust the port and other settings according to your specific requirements.
