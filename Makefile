JEST   := $(CURDIR)/node_modules/jest/bin/jest.js
ROLLUP := $(CURDIR)/node_modules/rollup/bin/rollup

ROLLUP_CONFIG := $(CURDIR)/rollup.config.js

test: node_modules src
	NODE_ENV=test $(JEST)

build: node_modules src
	$(ROLLUP) --config $(ROLLUP_CONFIG)
