ONE_SHELL:
SHELL = /bin/bash

BUILD_COMMAND = @cd $@ && npm run build > /dev/null
BUILD_MESSAGE = @echo "Building $@"

DEP_INSTALL_MESSAGE = @echo "Installing dependencies for $@"
DEP_COMMAND = @cd $@ && npm install > /dev/null

CLIENT_INSTALL_MESSAGE = @echo "Installing dependencies for client"
CLIENT_INSTALL_COMMAND = @cd $@ && npm install > /dev/null

CLIENT_BUILD_MESSAGE = @echo "Installing dependencies for client"
CLIENT_BUILD_COMMAND = @cd $@ && npm run build > /dev/null

# build
build-all: posts comments query events moderation

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

moderation:
	$(DEP_INSTALL_MESSAGE)
	$(DEP_COMMAND)
	$(BUILD_MESSAGE)
	$(BUILD_COMMAND)

client:
	$(CLIENT_INSTALL_MESSAGE)
	$(CLIENT_INSTALL_COMMAND)
	$(CLIENT_BUILD_MESSAGE)
	$(CLIENT_BUILD_COMMAND)


.PHONY: build-all posts comments query events moderation client