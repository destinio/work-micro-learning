ONE_SHELL:

SHELL = /bin/zsh
BUILD_COMMAND = @cd $@ && npm run build > /dev/null
BUILD_MESSAGE = @echo "Building $@"

build: posts comments query events

posts:
	$(BUILD_MESSAGE)
	$(BUILD_COMMAND)

comments:
	$(BUILD_MESSAGE)
	$(BUILD_COMMAND)

query:
	$(BUILD_MESSAGE)
	$(BUILD_COMMAND)

events:
	$(BUILD_MESSAGE)
	$(BUILD_COMMAND)

.PHONY: build posts comments query events