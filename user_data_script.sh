#!/bin/bash -ex

# download nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# export NVM dir
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

nvm install 16

# upgrade yum
sudo yum upgrade

# install git
sudo yum install git -y
cd /home/ec2-user

#get source code from github
git clone https://github.com/ajcousins/bachle.git

cd bachle

npm run install-server
npm run install-client
npm run prod-build
npm run prod-start