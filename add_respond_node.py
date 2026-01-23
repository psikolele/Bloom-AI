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
print("ADDING 'RESPOND TO WEBHOOK' NODE")
print("=" * 80)

workflow = get_workflow()

# Create "Respond to Webhook" node
respond_node = {
    "parameters": {
        "respondWith": "json",
        "responseBody": "={{ $json }}",
        "options": {}
    },
    "id": "respond-to-webhook",
    "name": "Respond to Webhook",
    "type": "n8n-nodes-base.respondToWebhook",
    "typeVersion": 1.1,
    "position": [1350, 368]
}

# Check if it already exists
already_exists = any(node.get("name") == "Respond to Webhook" for node in workflow["nodes"])

if not already_exists:
    workflow["nodes"].append(respond_node)
    print("\n[1] Added 'Respond to Webhook' node")
    
    # Update connections: Set Success Response -> Respond to Webhook
    if "Set Success Response" in workflow["connections"]:
        workflow["connections"]["Set Success Response"]["main"].append([{
            "node": "Respond to Webhook",
            "type": "main",
            "index": 0
        }])
    else:
        workflow["connections"]["Set Success Response"] = {
            "main": [[{
                "node": "Respond to Webhook",
                "type": "main",
                "index": 0
            }]]
        }
    
    print("[2] Updated connections: Set Success Response -> Respond to Webhook")
    print("\n[3] Updating workflow...")
    
    updated = update_workflow(workflow)
    
    with open("workflow_with_respond_node.json", "w", encoding="utf-8") as f:
        json.dump(updated, f, indent=2)
    
    print("\n✅ DONE! Workflow now has explicit response handling")
else:
    print("\n⚠️ 'Respond to Webhook' node already exists. No changes made.")

print("=" * 80)
