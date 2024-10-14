##
# @file     utils.py
# @ver      0.1.0
# @author   arugo11
# @brief    APIの処理などを行う



import json
from openai import OpenAI
client = OpenAI()

def generate_json_from_text(input_text):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system", 
                "content": "You are an AI specialized in converting natural language text to structured JSON data about characters, organizations, and their relationships."
            },
            {
                "role": "user", 
                "content": f"""あなたは自然言語のテキストを構造化されたJSONデータに変換する専門家です。以下の指示に従って、与えられたテキストを解析し、指定された形式でJSONデータを生成してください。

タスク：
入力されたテキストから登場人物や組織、それらの関係性を抽出し、ノード（nodes）、エッジ（edges）、グループ（groups）の3つの要素を持つJSONオブジェクトを生成してください。

以下のテキストを解析し、指定された形式でJSONデータを生成してください：

{input_text}

出力形式：
{{
  "nodes": [
    {{
      "id": "n_X",
      "name": "名前",
      "image": "path/to/n_X.png",
      "description": "説明"
    }},
    ...
  ],
  "edges": [
    {{
      "source": "n_X",
      "target": "n_Y",
      "label": "関係の説明",
      "bidirectional": true/false
    }},
    ...
  ],
  "groups": [
    {{
      "id": "g_X",
      "name": "グループ名",
      "nodes": ["n_X", "n_Y", ...],
      "description": "グループの説明"
    }},
    ...
  ]
}}

注意点：
- 全てのidは一意である必要があります。
- エッジの方向性に注意し、適切にbidirectionalを設定してください。
- 重要度や文脈に応じて、適切な数のノード、エッジ、グループを作成してください。
- 情報が不足している場合は、合理的な推測を行っても構いませんが、その場合は説明に「推測」と明記してください。"""
            }
        ],
        response_format={"type": "json_object"}
    )

    return json.loads(response.choices[0].message.content)
