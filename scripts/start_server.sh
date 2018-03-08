#!/bin/bash
cd /var/www/html/spaceShare
node server/index.js > stdout.txt 2> stderr.txt &
