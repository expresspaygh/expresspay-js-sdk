## build: Build from typescript to JS
build-tsc:
	tsc

## test: Run package test cases
test:
	npm test

## help: Command to view help
help: Makefile
	@echo
	@echo "Choose a command to run in Expresspay JS-SDK:"
	@echo
	@sed -n 's/^##//p' $< | column -t -s ':' |  sed -e 's/^/ /'
	@echo
