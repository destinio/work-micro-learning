ONE_SHELL:

SHELL = /bin/zsh

BUILD_COMMAND = @cd $@ && npm run build > /dev/null

build: posts comments query events

posts:
	@echo "Building posts"
	$(BUILD_COMMAND)
comments:
	@echo "Building comments"
	$(BUILD_COMMAND)
comments:
query:
	@echo "Building query"
	$(BUILD_COMMAND)
comments:
events:
	@echo "Building events"
	$(BUILD_COMMAND)
comments:

.PHONY: build posts comments query events