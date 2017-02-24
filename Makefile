ifdef ComSpec
	RMRF=powershell function rmrf ($$path) { if (Test-Path $$path) { Remove-Item -Recurse -Force $$path } }; rmrf
else
	RMRF=rm -rf
endif

# rwildcard doesn't work well with spaces, beware!
rwildcard=$(foreach d,$(wildcard $1*),$(call rwildcard,$d/,$2) $(filter $(subst *,%,$2),$d))

SRCDIR = app
SOURCES = $(call rwildcard, $(SRCDIR), *.js *.json *.css *.less *.svg)

all: dist

node_modules: package.json
	npm install

dist: node_modules webpack.config.js .babelrc $(SOURCES)
	npm run build

run: node_modules
	npm start

check: node_modules
	npm test

clean:
	npm prune
	${RMRF} dist

distclean: clean
	${RMRF} node_modules

.PHONY: all run check clean distclean