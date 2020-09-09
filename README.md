## Prerequisites
    JupyterLab

## Dev Install

### Clone the repo to your local environment
    git clone https://github.com/noteline-org/noteline-jupyterlab-extension.git

### Move into repo dir
    cd noteline-jupyterlab-extension

### Install server extension in editable mode
    pip install -e .

### Register server extension
    jupyter serverextension enable --py noteline-jupyterlab-extension

### Install dependencies
    jlpm

### Build Typescript source
    jlpm build

### Install your development version of the extension with JupyterLab
    jupyter labextension install .

### Rebuild Typescript source after making changes
    jlpm build

### Rebuild JupyterLab after making any changes
    jupyter lab build
