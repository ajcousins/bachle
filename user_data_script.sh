#!/bin/bash -ex

# download nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# source nvm
. /.nvm/nvm.sh

# install node
nvm install 16

# export NVM dir
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"


# upgrade yum
sudo yum upgrade

# install git
sudo yum install git -y
cd /home/ec2-user

#get source code from github
git clone https://github.com/ajcousins/bachle.git

cd bachle

sudo chmod -R 755 .

npm run install-server
npm run install-client
npm run prod-build
npm start &