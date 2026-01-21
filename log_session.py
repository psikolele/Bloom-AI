import requests
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("NOTION_API_KEY")
DATABASE_ID = "c024f662-8528-4572-86bb-8c1809680da2"
HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28"
}

def search_page(query):
    url = "https://api.notion.com/v1/search"
    payload = {
        "query": query,
        "filter": {
            "value": "page",
            "property": "object"
        }
    }
    response = requests.post(url, json=payload, headers=HEADERS)
    if response.status_code == 200:
        results = response.json().get("results", [])
        if results:
            return results[0]['id']
    return None

def create_page(project_id, content_markdown):
    url = "https://api.notion.com/v1/pages"
    
    # Construct blocks from markdown (Simplified)
    # We will just dump the text as a few paragraph blocks for simplicity
    blocks = []
    lines = content_markdown.split('\n')
    for line in lines:
        if line.strip():
            # Handle headers roughly
            if line.startswith('### '):
                 blocks.append({
                    "object": "block",
                    "type": "heading_3",
                    "heading_3": { "rich_text": [{ "type": "text", "text": { "content": line.replace('### ', '') } }] }
                })
            elif line.startswith('## '):
                 blocks.append({
                    "object": "block",
                    "type": "heading_2",
                    "heading_2": { "rich_text": [{ "type": "text", "text": { "content": line.replace('## ', '') } }] }
                })
            elif line.startswith('- '):
                 blocks.append({
                    "object": "block",
                    "type": "bulleted_list_item",
                    "bulleted_list_item": { "rich_text": [{ "type": "text", "text": { "content": line.replace('- ', '') } }] }
                })
            else:
                blocks.append({
                    "object": "block",
                    "type": "paragraph",
                    "paragraph": { "rich_text": [{ "type": "text", "text": { "content": line } }] }
                })

    properties = {
        "Descrizione Breve": { "title": [{ "text": { "content": "Dashboard UI & Auth Refinement" } }] },
        "Data Sessione": { "date": { "start": datetime.now().strftime("%Y-%m-%d") } },
        "Minuti Lavorati": { "number": 150 },
        "Categoria": { "select": { "name": "Sviluppo" } },
        "Note": { "rich_text": [{ "text": { "content": "Complete redesign of Dashboard, Login fixes, N8N unified workflow." } }] }
    }

    if project_id:
        properties["Progetto Collegato"] = { "relation": [{ "id": project_id }] }

    payload = {
        "parent": { "database_id": DATABASE_ID },
        "properties": properties,
        "children": blocks
    }

    response = requests.post(url, json=payload, headers=HEADERS)
    if response.status_code == 200:
        print("Success! Page created.")
        print(response.json()['url'])
    else:
        print(f"Error creating page: {response.status_code}")
        print(response.text)


if __name__ == "__main__":
    print("Searching for project 'Social & Marketing'...")
    project_id = search_page("Social & Marketing")
    if project_id:
        print(f"Found Project ID: {project_id}")
    else:
        print("Project not found.")

    with open(r"C:\Users\psiko\.gemini\antigravity\brain\32a6908c-7fb1-4399-b092-cc828608c22b\session_log.md", "r", encoding="utf-8") as f:
        content = f.read()

    create_page(project_id, content)
