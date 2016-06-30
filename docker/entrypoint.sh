#!/bin/bash

# NPM link hilib
cd ./hire-forms-options
echo "developer" | sudo -S npm link

# Start tmuxinator
tmuxinator project
