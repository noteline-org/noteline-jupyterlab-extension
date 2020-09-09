from ._version import __version__
from .handlers import setup_handlers


def _jupyter_server_extension_paths():
    return [{"module": "noteline-jupyterlab-extension"}]


def load_jupyter_server_extension(nbapp):
    url_path = "noteline-jupyterlab-extension"
    setup_handlers(nbapp.web_app, url_path)
    nbapp.log.info(
        "Registered noteline-jupyterlab-extension extension at URL path /{}".format(url_path)
    )
