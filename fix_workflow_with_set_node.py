
import json
import requests
import os
from dotenv import load_dotenv

load_dotenv()

N8N_WORKFLOW_ID = "2WKzb93sJnfLO1Bv"
N8N_URL = f"https://emanueleserra.app.n8n.cloud/api/v1/workflows/{N8N_WORKFLOW_ID}"
API_KEY = os.getenv("N8N_API_KEY")

if not API_KEY:
    print("Error: N8N_API_KEY not found in .env")
    exit(1)

def get_workflow():
    headers = {"X-N8N-API-KEY": API_KEY}
    response = requests.get(N8N_URL, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        exit(1)

def update_workflow(workflow_data):
    headers = {"X-N8N-API-KEY": API_KEY, "Content-Type": "application/json"}
    
    settings = workflow_data.get("settings", {})
    clean_settings = {
        "callerPolicy": settings.get("callerPolicy", "workflowsFromSameOwner"),
        "executionOrder": settings.get("executionOrder", "v0")
    }
    
    clean_data = {
        "name": workflow_data["name"],
        "nodes": workflow_data["nodes"],
        "connections": workflow_data["connections"],
        "settings": clean_settings,
        "staticData": workflow_data.get("staticData")
    }
    
    response = requests.put(N8N_URL, headers=headers, json=clean_data)
    if response.status_code == 200:
        print("✅ Workflow updated!")
        return response.json()
    else:
        print(f"❌ Error: {response.status_code}")
        print(response.text)
        exit(1)

print("=" * 80)
print("ADDING SET NODE TO FORCE CORRECT RESPONSE")
print("=" * 80)

workflow = get_workflow()

# Add a SET node between Notion and final response
set_node = {
    "parameters": {
        "mode": "manual",
        "duplicateItem": False,
        "assignments": {
            "assignments": [
                {
                    "id": "success-field",
                    "name": "success",
                    "value": True,
                    "type": "boolean"
                },
                {
                    "id": "message-field", 
                    "name": "message",
                    "value": "User registered successfully",
                    "type": "string"
                }
            ]
        },
        "options": {}
    },
    "id": "set-success-response",
    "name": "Set Success Response",
    "type": "n8n-nodes-base.set",
    "typeVersion": 3.4,
    "position": [1150, 368]
}

# Remove old "Respond to Webhook" node
workflow["nodes"] = [n for n in workflow["nodes"] if n["name"] != "Respond to Webhook"]

# Add the new Set node
workflow["nodes"].append(set_node)

# Update connections: Notion -> Set Success Response
workflow["connections"]["Notion"] = {
    "main": [[{
        "node": "Set Success Response",
        "type": "main",
        "index": 0
    }]]
}

print("\n[1] Removed 'Respond to Webhook' node")
print("[2] Added 'Set Success Response' node")
print("[3] Updated connections: Webhook -> Notion -> Set Success Response")
print("\n[4] Updating workflow...")

updated = update_workflow(workflow)

with open("workflow_with_set_node.json", "w", encoding="utf-8") as f:
    json.dump(updated, f, indent=2)

print("\n✅ DONE! Workflow now returns: {\"success\": true, \"message\": \"User registered successfully\"}")
print("=" * 80)
