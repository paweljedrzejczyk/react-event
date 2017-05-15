NP     := $(CURDIR)/node_modules/np/cli.js
JEST   := $(CURDIR)/node_modules/jest/bin/jest.js
ROLLUP := $(CURDIR)/node_modules/rollup/bin/rollup

test: node_modules src
	$(JEST) --testMatch $(CURDIR)/test/**/*.js
.PHONY: test

build: node_modules src
	$(ROLLUP) --config $(CURDIR)/rollup.config.js
.PHONY: build

publish: build
	$(NP)
.PHONY: publish
