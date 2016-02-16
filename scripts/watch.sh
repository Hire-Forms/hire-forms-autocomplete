#!/bin/sh

node_modules/.bin/watchify src/index.jsx \
	--detect-globals false \
	--extension=.jsx \
	--external react \
	--external classnames \
	--external react-dom \
	--outfile 'derequire > build/index.js' \
	--standalone HireFormsAutocomplete \
	--transform [ babelify --plugins object-assign ] \
	--verbose