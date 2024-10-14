from src import app
from logging import getLogger,config
from json import load

#ログの設定
with open("log_config.json") as f:
    log_conf = load(f)

config.dictConfig(log_conf)

logger = getLogger(__name__)
if __name__ == '__main__':
    app.run()