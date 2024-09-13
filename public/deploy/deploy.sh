# local
ssh root@82.112.231.160

# remote
cd /home/ubuntu/app/sanb.ssbanglaexpress.com/express
sudo git reset --hard
sudo git pull origin main
# santokhan
# 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

if [ -s ".env.txt" ]; then
    sudo cp .env.txt .env
    echo 'Copied .env.txt to .env'
fi

npm install
echo 'Installed'

pm2 restart ecosystem.config.js
echo 'Restarted pm2'

sudo service nginx reload
echo 'Reloaded nginx'

exit