*This project is meant as start code for frontend projects

## CA-2 frontend startcode (group A, Bornholm)

### Quick start guide

### Frontend
- Clone the project and remove .git (rm -rf .git)
- Run npm install and npm run dev
- Change urls in settings.js


#### Backend
- Clone the project and remove .git (rm -rf .git)
- Set up your own git repository, CI pipeline (Github Actions) (Remember secrets!)
- Make your databases (both local and on the droplet)
- Change pom.xml and persictence.xml to match database
- Set up Tomcat
- Enjoy coding
#### Deploy top droplet!
1. SSH into your droplet
   root@164.92.207.22

2. Type:  cd /var/www and create a new folder to hold the front-end project:  mkdir frontendProjectName

3. Set permissions so we can upload the project:  chmod -R 755 frontendProjectName

4. On your droplet, open this configuration file:   nano /etc/nginx/sites-available/default

5. add a new location? / change location:
   location / {
   root /var/www/frontendProjectName;
   }

   OBS! er ikke sikker på om det skal være: /var/www/frontendProjectName;  ELLER /var/www/frontendProjectName/;

6. Close the file, and restart Nginx:      sudo service nginx restart

7. In your frontend project:
   change URL i settings.js
   fx: const URL = "https://sem3nicki.dk/tomcat/backendProjectName";

8. npm run build

9. cd dist

10. scp -r * root@164.92.207.22:/var/www/exam_frontend# exam_frontend
