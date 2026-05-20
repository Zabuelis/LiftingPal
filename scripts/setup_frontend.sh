#!/usr/bin/env bash
set -e

sudo apt install make -y

# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash

# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"

# Download and install Node.js:
nvm install 24

cd ../src/application

npm install

echo "Make sure to restart your shell for node and npm installations to take action or else use the abstract path."
echo "All required dependencies have been installed, now you can run the mobile application DEV server using npx expo start in the ../src/application catalogue."
echo "For reference checkout https://docs.expo.dev/get-started/set-up-your-environment/"
