breakout-media-uploader
=================
##### Uploading files with JWT-Auth

Installation
-----
* configure folders in config.json
* configure jwt-secret in config.json
* npm install
* npm start

Usage
-----
* POST hostname:3001 as form-data
* set jwt-token as X-UPLOAD-TOKEN Header
* set form-data - id: integer-id of file
* set form-data - file: file to upload

License
-----
MIT