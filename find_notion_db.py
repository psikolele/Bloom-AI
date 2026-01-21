import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("NOTION_API_KEY")
HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28"
}

def search_database(query):
    url = "https://api.notion.com/v1/search"
    payload = {
        "query": query,
        "filter": {
            "value": "database",
            "property": "object"
        }
    }
    response = requests.post(url, json=payload, headers=HEADERS)
    if response.status_code == 200:
        results = response.json().get("results", [])
        for res in results:
            title_list = res.get("title", [])
            if title_list:
                title = "".join([t["plain_text"] for t in title_list])
                print(f"Found: {title} - ID: {res['id']}")
            else:
                 # Check if it has an icon and title is empty (sometimes happens)
                 print(f"Found Database ID: {res['id']}")
    else:
        print(f"Error: {response.status_code}")
        print(response.text)

if __name__ == "__main__":
    print("Searching for 'Sessioni di lavoro'...")
    search_database("Sessioni di lavoro")
