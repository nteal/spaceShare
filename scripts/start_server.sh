#!/bin/bash
cd /var/www/spaceShare
node server/index.js > stdout.txt 2> stderr.txt &
