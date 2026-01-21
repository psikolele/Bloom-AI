import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("NOTION_API_KEY")
DATABASE_ID = "c024f662-8528-4572-86bb-8c1809680da2"
HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28"
}

url = f"https://api.notion.com/v1/databases/{DATABASE_ID}"
response = requests.get(url, headers=HEADERS)
if response.status_code == 200:
    props = response.json().get("properties", {})
    for name, details in props.items():
        print(f"Property: {name} - Type: {details['type']}")
else:
    print(response.text)
