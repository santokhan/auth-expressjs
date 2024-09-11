1. **Create the Ecosystem File**:

   In your project’s root directory, create a file named `ecosystem.config.js`:

   ```bash
   nano ecosystem.config.js
   ```

2. **Add Basic Configuration**:

   Add the following basic configuration to [ecosystem.config.js](ecosystem.config.js). This configuration assumes your main file is `app.js` and you want to run it in cluster mode with automatic port management:

3. **Start Your Application with PM2**:

   Use the following command to start your application with PM2:

   ```bash
   pm2 start ecosystem.config.js
   ```

4. **Save the PM2 Process List**:

   To ensure your application restarts automatically after a server reboot, save the PM2 process list:

   ```bash
   pm2 save
   ```

5. **Set PM2 to Start on Boot**:

   Set up PM2 to start on server boot:

   ```bash
   pm2 startup
   ```

   Follow the instructions that appear after running this command.
