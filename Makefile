ONE_SHELL:
SHELL = /bin/bash

BUILD_COMMAND = @cd $@ && npm run build > /dev/null
BUILD_MESSAGE = @echo "Building $@"

DEP_INSTALL_MESSAGE = @echo "Installing dependencies for $@"
DEP_COMMAND = @cd $@ && npm install > /dev/null

# build
build-all: posts comments query events

posts:
	$(DEP_INSTALL_MESSAGE)
	$(DEP_COMMAND)
	$(BUILD_MESSAGE) #this is a comment
	$(BUILD_COMMAND)

comments:
	$(DEP_INSTALL_MESSAGE)
	$(DEP_COMMAND)
	$(BUILD_MESSAGE)
	$(BUILD_COMMAND)

query:
	$(DEP_INSTALL_MESSAGE)
	$(DEP_COMMAND)
	$(BUILD_MESSAGE)
	$(BUILD_COMMAND)

events:
	$(DEP_INSTALL_MESSAGE)
	$(DEP_COMMAND)
	$(BUILD_MESSAGE)
	$(BUILD_COMMAND)

.PHONY: build-all posts comments query events