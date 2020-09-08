import os
import json

from notebook.base.handlers import APIHandler
from notebook.utils import url_path_join

import tornado
from tornado.web import StaticFileHandler


class RouteHandler(APIHandler):
    @tornado.web.authenticated
    def get(self):
        self.finish(json.dumps({"GET_RESPONSE": "This is noteline-jupyterlab-extension hello endpoint!"}))

    @tornado.web.authenticated
    def post(self):
        input_data = self.get_json_body()
        data = {"POST_RESPONSE": "Hello {}, enjoy noteline extension!".format(input_data["name"])}
        self.finish(json.dumps(data))


def setup_handlers(web_app, url_path):
    host_pattern = ".*$"
    base_url = web_app.settings["base_url"]

    route_pattern = url_path_join(base_url, url_path, "hello")
    handlers = [(route_pattern, RouteHandler)]
    web_app.add_handlers(host_pattern, handlers)

    doc_url = url_path_join(base_url, url_path, "static")
    doc_dir = os.getenv(
        "JLAB_SERVER_EXAMPLE_STATIC_DIR",
        os.path.join(os.path.dirname(__file__), "static"),
    )
    handlers = [("{}/(.*)".format(doc_url), StaticFileHandler, {"path": doc_dir})]
    web_app.add_handlers(".*$", handlers)
