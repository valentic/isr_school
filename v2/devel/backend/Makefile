
.PHONY: help bundle watch setup

TARGETDIR=venv

help:
	@echo "Targets:"
	@echo "  setup      create development environment"
	@echo "  update     update development environment"
	@echo "  wheel      create wheel"
	@echo "  clean      remove build files"

clean:
	rm -rf dist build *.egg-info $(TARGETDIR) instance
	find server -type f -name '*pyc' -exec rm '{}' ';'

wheel:	
	source $(TARGETDIR)/bin/activate; \
	python setup.py bdist_wheel	

setup:
	virtualenv $(TARGETDIR); \
	source $(TARGETDIR)/bin/activate; \
	pip install --upgrade pip; \
	pip install --upgrade wheel; \
	pip install --upgrade setuptools; \
	pip install -e . 

update:
	source $(TARGETDIR)/bin/activate; \
	pip install -e .		


