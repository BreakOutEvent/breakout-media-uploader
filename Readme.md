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
--------
breakout-media-uploader. The media uploader for BreakOut

Copyright (C) 2015-2016 Philipp Piwowarsky

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see http://www.gnu.org/licenses/