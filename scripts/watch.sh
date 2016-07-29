#!/bin/sh

node_modules/.bin/watchify src/index.jsx \
	--detect-globals false \
	--extension=.jsx \
	--external classnames \
	--external react \
	--external react-dom \
	--outfile 'derequire > build/index.js' \
	--standalone HireFormsAutocomplete \
	--transform [ babelify --presets [ es2015 react stage-1 ] ] \
	--verbose
