.PHONY: 
	netlify-deploy-preview 
	netlify-production 
	netlify-docs-preview 
	netlify-community-preview 
	clear-cache 
	validate 
	test 
	prepare-content-website 
	prepare-content-docs-preview 
	prepare-content-community-preview 
	build-website
	build-docs-preview
	build-community-preview
	prepare-functions

netlify-deploy-preview: clear-cache validate test prepare-content-website build-website prepare-functions
netlify-production: clear-cache prepare-content-website build-website prepare-functions
netlify-docs-preview: clear-cache prepare-content-docs-preview build-docs-preview
netlify-community-preview: clear-cache prepare-content-community-preview build-community-preview

clear-cache:
	make -C "./tools/content-loader" clear-cache

validate:
	npm run conflict-check
	npm run lint-check
	npm run markdownlint
	npm run type-check

test:
	npm run test

prepare-content-website:
	./scripts/prepare-content.sh --prepare-for="website"

prepare-content-docs-preview:
	./scripts/prepare-content.sh --prepare-for="docs-preview" --docs-branches="preview" --docs-src-dir="../../"

prepare-content-community-preview:
	./scripts/prepare-content.sh --prepare-for="community-preview" --community-src-dir="../../"

build-website:
	export BUILD_FOR="website"
	npm run build:prod

build-docs-preview:
	export BUILD_FOR="docs-preview"
	npm run build:prod

build-community-preview:
	export BUILD_FOR="community-preview"
	npm run build:prod

prepare-functions:
	npm run build:functions
